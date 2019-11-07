// output.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js'

const FIXME_FUCHSIA = [1, 0, 1, 0] // used as a default so it's obvious when a color is missing

function print (str) {
  console.log(str)
}

const ONE_MILE = 5280
const COLOR_GREY = 0x808080
const BLUE_GLASS = 0x9999ff
const ALMOST_WHITE = 0x999999
const COLOR_BRIGHT_SKY = 0xddeeff
const COLOR_DIM_GROUND = 0x202020

export { print }
export default class Output {
  // Output can render faces in three.js.

  constructor () {
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const NEAR_CAMERA_LIMIT = 1
    const FAR_CAMERA_LIMIT = ONE_MILE * 2

    this._shape = null

    // scene
    this._scene = new THREE.Scene()
    this._scene.background = new THREE.Color(0xcce0ff)
    this._scene.fog = new THREE.Fog(0xcce0ff, 500, 10000)

    // camera
    this._camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, NEAR_CAMERA_LIMIT, FAR_CAMERA_LIMIT)
    this._camera.position.x = -200
    this._camera.position.y = -300
    this._camera.position.z = 300
    this._camera.up.set(0, 0, 1) // make z be up instead of y
    this._scene.add(this._camera)

    // XYZ axes
    const axesHelper = new THREE.AxesHelper(ONE_MILE)
    this._scene.add(axesHelper)

    // grid
    const gridHelper = new THREE.GridHelper(ONE_MILE, 8, COLOR_GREY, COLOR_GREY)
    gridHelper.geometry.rotateX(Math.PI / 2)
    this._scene.add(gridHelper)

    // lights
    const light = new THREE.DirectionalLight(0xdfebff, 3.0)
    light.position.set(500, 2000, 1000)
    light.castShadow = true
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    const D = 300
    light.shadow.camera.left = -D
    light.shadow.camera.right = D
    light.shadow.camera.top = D
    light.shadow.camera.bottom = -D
    light.shadow.camera.far = 1000
    this._scene.add(light)
    this._scene.add(new THREE.AmbientLight(0x666666))
    // const ambientLight = new THREE.HemisphereLight(
    //   COLOR_BRIGHT_SKY,
    //   COLOR_DIM_GROUND,
    //   3 // intensity
    // )
    // this._scene.add(ambientLight)

    // ground
    const loader = new THREE.TextureLoader()
    const texture = loader.load('./city3d/textures/metallic-green-glitter-texture.jpg')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(100, 100) // 25, 25)
    texture.anisotropy = 16
    var groundMaterial = new THREE.MeshLambertMaterial({ map: texture })
    const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(ONE_MILE, ONE_MILE), groundMaterial)
    ground.geometry.rotateX(Math.PI / 2)
    ground.position.y = -250
    ground.position.z = -1
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this._scene.add(ground)

    this._renderer = new THREE.WebGLRenderer({ antialias: true })
    this._renderer.setSize(WIDTH, HEIGHT)
    this._renderer.setClearColor(0xCCCCCC, 1) // set our background color
    document.body.appendChild(this._renderer.domElement)
    window.addEventListener('resize', evt => this._onWindowResize(evt), false)

    this.controls = new OrbitControls(this._camera, this._renderer.domElement)

    // add an origin marker for debugging purposes
    const ORIGIN_MARKER_HEIGHT = 100
    const geometry = new THREE.BoxGeometry(4, 4, ORIGIN_MARKER_HEIGHT)
    const material = new THREE.MeshStandardMaterial({ color: 0x0000FF })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.z = ORIGIN_MARKER_HEIGHT / 2
    this._scene.add(mesh)
  }

  _onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  beginArea () {
    this._areaCorners = []
  }

  addCorner (xy) {
    this._areaCorners.push(new THREE.Vector2(...xy))
  }

  endArea (rgbaArray = FIXME_FUCHSIA, z = 0, incline = 0) {
    const x0 = this._areaCorners[0].x
    const y0 = this._areaCorners[0].y
    const shape = new THREE.Shape(this._areaCorners)
    shape.closePath()
    const geometry = new THREE.ShapeGeometry(shape)
    geometry.translate(-x0, -y0, 0)
    const color = new THREE.Color(...rgbaArray)
    const opacity = rgbaArray[3]
    const material = new THREE.MeshStandardMaterial({
      color: color,
      opacity: opacity,
      transparent: (opacity === 1),
      side: THREE.DoubleSide
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    if (incline) {
      const LAST = this._areaCorners.length - 1
      const xN = this._areaCorners[LAST].x
      const yN = this._areaCorners[LAST].y
      const axis = new THREE.Vector3(xN - x0, yN - y0, 0)
      print(`axis(${xN - x0}, ${yN - y0})`)
      mesh.rotateOnAxis(axis, -Math.PI / 128) // mesh.rotateOnAxis(axis, -Math.PI / 32)
    }
    mesh.translateX(x0)
    mesh.translateY(y0)
    mesh.translateZ(z)
    this._scene.add(mesh)

    const squareFeet = THREE.ShapeUtils.area(this._areaCorners)
    return squareFeet
  }

  addWalls (height, { z = 0, openings = [], nuance = false, cap = true } = {}) {
    let i = 0
    const area = this._areaCorners
    for (const vector2 of area) {
      let windows = []
      for (const opening of openings) {
        if (opening[0] === i) {
          windows = opening[1]
        }
      }
      i++
      if (cap || i < area.length) {
        let next = 0
        if (i < area.length) {
          next = i
        }
        const near = vector2
        const far = area[next]
        const length = near.distanceTo(far)
        const wall = [
          new THREE.Vector2(0, 0),
          new THREE.Vector2(length, 0),
          new THREE.Vector2(length, height),
          new THREE.Vector2(0, height)
        ]

        const shape = new THREE.Shape(wall)
        shape.closePath()
        for (const window of windows) {
          const points = window.map(xy => new THREE.Vector2(...xy))
          const opening = new THREE.Path(points)
          shape.holes.push(opening)
        }
        const geometry = new THREE.ShapeGeometry(shape)
        geometry.rotateX(Math.PI / 2)

        const difference = new THREE.Vector2()
        const netAngle = difference.subVectors(near, far).angle()
        geometry.rotateZ(netAngle - Math.PI)
        geometry.translate(near.x, near.y, z)

        let material
        if (openings.length) {
          material = new THREE.MeshStandardMaterial({ color: new THREE.Color(ALMOST_WHITE), side: THREE.DoubleSide })
        } else {
          material = new THREE.MeshStandardMaterial({ color: new THREE.Color(BLUE_GLASS), transparent: true, opacity: 0.7, side: THREE.DoubleSide })
        }
        const mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        this._scene.add(mesh)
      }
    }
  }

  addRoof (rgba, verticesOfRoof, indicesOfFaces) {
    const geometry = new THREE.Geometry()
    geometry.vertices = verticesOfRoof.map(xyz => new THREE.Vector3(...xyz))
    geometry.faces = indicesOfFaces.map(abc => new THREE.Face3(...abc))
    geometry.computeBoundingSphere()
    geometry.computeFaceNormals()
    const color = new THREE.Color(...rgba)
    const material = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    this._scene.add(mesh)
  }

  // beginFace () {
  //   this._planarPoints = []
  // }

  // newVert (xyz) {
  //   this._planarPoints.push(new THREE.Vector3(...xyz))
  // }

  // endFace (rgbaArray = FIXME_FUCHSIA) {
  //   if (this._planarPoints.length < 3) {
  //     console.log('skipping degenerate face')
  //     return
  //   }

  //   // translate to origin
  //   const p0 = this._planarPoints[0].clone()
  //   const T = new THREE.Matrix4().setPosition(p0)
  //   const translatedPoints = this._planarPoints.map(p => p.sub(p0))

  //   const [, p1, p2] = translatedPoints // enough to determine the transformation matrix

  //   // For now, just considering 3 possibilities: triangle origin-p1-p2 is in one of the three
  //   // planes x=0, y=0 or z=0. (Note that this means all the remaining points are also in the same plane.)
  //   let xyPoints
  //   const R = new THREE.Matrix4()
  //   const RInv = new THREE.Matrix4()
  //   /* eslint-disable eqeqeq */
  //   // TODO: '==' vs '===' is not the issue: we really should be comparing to Number.EPSILON.
  //   if (p1.z == 0 && p2.z == 0) {
  //     // case 1: z=0
  //     // all points already in x-y plane, so we're done
  //     xyPoints = translatedPoints
  //   } else if (p1.x == 0 && p2.x == 0) {
  //     // case 2: x=0
  //     // rotate 90 around y-axis
  //     R.makeRotationY(Math.PI / 2)
  //     RInv.makeRotationY(-Math.PI / 2)
  //     xyPoints = translatedPoints.map(p => p.applyMatrix4(R))
  //   } else if (p1.y == 0 && p2.y == 0) {
  //     // case 3: y=0
  //     // rotate 90 around x-axis
  //     R.makeRotationX(Math.PI / 2)
  //     RInv.makeRotationX(-Math.PI / 2)
  //     xyPoints = translatedPoints.map(p => p.applyMatrix4(R))
  //   } else {
  //     // something unexpected happened, so ignore this face
  //     return
  //   }
  //   /* eslint-enable eqeqeq */

  //   const shape = new THREE.Shape(xyPoints.map(p => new THREE.Vector2(p.x, p.y)))
  //   shape.closePath()
  //   const geometry = new THREE.ShapeGeometry(shape)
  //   const color = new THREE.Color(...rgbaArray)
  //   const material = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide })
  //   const mesh = new THREE.Mesh(geometry, material)
  //   mesh.applyMatrix(RInv)
  //   mesh.applyMatrix(T)
  //   this._scene.add(mesh)
  // }

  animate () {
    window.requestAnimationFrame(() => this.animate())
    this.controls.update()
    this.render()
  }

  render () {
    this._renderer.render(this._scene, this._camera)
  }

  deleteAllObjects () {
    // Try to delete everything in the scene.

    // TODO: fix me!
    const oldPythonCode = false
    if (oldPythonCode) {
      const bpy = null
      if (bpy.context.active_object) {
        let mode = bpy.context.active_object.mode
        if (mode === 'EDIT') {
          bpy.ops.object.mode_set('OBJECT')
          mode = bpy.context.active_object.mode
          print('new mode: ' + mode)
        }
        if (mode === 'OBJECT') {
          bpy.ops.object.select_all('SELECT')
          bpy.ops.object.delete(false)
        }
      } else {
        print('mode: There is no active_object')
      }
      return this
    }
  }
}
