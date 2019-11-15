// output.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js'
import Stats from 'http://mrdoob.github.io/stats.js/build/stats.module.js'

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

const FIXME_FUCHSIA = 0xff00ff // used as a default so it's obvious when a color is missing

function print (str) {
  console.log(str)
}

const ONE_MILE = 5280
const COLOR_GREY = 0x808080
const BLUE = 0x0000ff
const BLUE_GLASS = 0x9999ff // eslint-disable-line no-unused-vars
const ALMOST_WHITE = 0x999999
const COLOR_BRIGHT_SKY = 0xddeeff // eslint-disable-line no-unused-vars
const COLOR_DIM_GROUND = 0x202020 // eslint-disable-line no-unused-vars

export { print }
export default class Output {
  // Output can render faces in three.js.

  constructor () {
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const NEAR_CAMERA_LIMIT = 1
    const FAR_CAMERA_LIMIT = ONE_MILE * 2

    this._materialsByHexColor = {}
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
    if (window.sessionStorage.getItem('OrbitControls')) {
      const oc = JSON.parse(window.sessionStorage.getItem('OrbitControls'))
      this.controls.position0 = new THREE.Vector3(...oc.position)
      this.controls.target0 = new THREE.Vector3(...oc.target)
      this.controls.zoom0 = oc.zoom
      this.controls.reset()
      console.log('Restored camera coordinates from sessionStorage. To revert to default coordinates, open in a new tab.')
    }
    window.addEventListener('keydown', evt => {
      switch (evt.code) {
        case 'KeyS': return this._onSaveOrbitControlsState()
        case 'KeyR': return this._onRestoreOrbitControlsState()
      }
    }, false)

    this._animatedComponents = []

    // add an origin marker for debugging purposes
    const ORIGIN_MARKER_HEIGHT = 100
    const geometry = new THREE.BoxGeometry(4, 4, ORIGIN_MARKER_HEIGHT)
    const material = this._materialByHexColor(BLUE)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.z = ORIGIN_MARKER_HEIGHT / 2
    this._scene.add(mesh)
  }

  _onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  _onSaveOrbitControlsState () {
    this.controls.saveState()
    const { position0: { x: px, y: py, z: pz }, target0: { x: tx, y: ty, z: tz }, zoom0 } = this.controls
    const oc = { position: [px, py, pz], target: [tx, ty, tz], zoom: zoom0 }
    console.log(`position: [${px}, ${py}, ${pz}], target: [${tx}, ${ty}, ${tz}]`)
    window.sessionStorage.setItem('OrbitControls', JSON.stringify(oc))
    console.log('Camera coordinates saved. To return to this view, type "R" or reload the page. To revert to default coordinates, open in a new tab.')
  }

  _onRestoreOrbitControlsState () {
    this.controls.reset()
  }

  _materialByHexColor (hexColor) {
    if (!(hexColor in this._materialsByHexColor)) {
      const material = new THREE.MeshStandardMaterial({
        color: hexColor,
        side: THREE.DoubleSide
      })
      this._materialsByHexColor[hexColor] = material
    }
    return this._materialsByHexColor[hexColor]
  }

  beginArea () {
    this._areaCorners = []
  }

  addCorner (xy) {
    this._areaCorners.push(new THREE.Vector2(...xy))
  }

  endArea (hexColor = FIXME_FUCHSIA, z = 0, { incline = 0, depth = -0.5 } = {}) {
    const x0 = this._areaCorners[0].x
    const y0 = this._areaCorners[0].y
    const shape = new THREE.Shape(this._areaCorners)
    shape.closePath()

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: false
    })

    geometry.translate(-x0, -y0, 0)
    const material = this._materialByHexColor(hexColor)
    // const material = new THREE.MeshStandardMaterial({
    //   color: color,
    //   opacity: opacity,
    //   transparent: (opacity === 1),
    //   side: THREE.DoubleSide
    // })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    const T = new THREE.Matrix4().setPosition(new THREE.Vector3(x0, y0, z))
    if (incline) {
      const x1 = this._areaCorners[1].x
      const y1 = this._areaCorners[1].y
      const edge = new THREE.Vector2(x1 - x0, y1 - y0)
      const hypotenuse = edge.length()
      const angle = Math.asin(incline / hypotenuse)

      const LAST = this._areaCorners.length - 1
      const xN = this._areaCorners[LAST].x
      const yN = this._areaCorners[LAST].y
      const axis = new THREE.Vector3(xN - x0, yN - y0, 0)
      axis.normalize()
      const R = new THREE.Matrix4().makeRotationAxis(axis, -angle)
      mesh.applyMatrix(R)
    }
    mesh.applyMatrix(T)
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

        const DEFAULT_WALL_THICKNESS = 0.5
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: DEFAULT_WALL_THICKNESS,
          bevelEnabled: false
        })
        geometry.rotateX(Math.PI / 2)

        const difference = new THREE.Vector2()
        const netAngle = difference.subVectors(near, far).angle()
        geometry.rotateZ(netAngle - Math.PI)
        geometry.translate(near.x, near.y, z)

        const material = this._materialByHexColor(ALMOST_WHITE)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        this._scene.add(mesh)
      }
    }
  }

  addRoof (hexColor, verticesOfRoof, indicesOfFaces) {
    const geometry = new THREE.Geometry()
    geometry.vertices = verticesOfRoof.map(xyz => new THREE.Vector3(...xyz))
    geometry.faces = indicesOfFaces.map(abc => new THREE.Face3(...abc))
    geometry.computeBoundingSphere()
    geometry.computeFaceNormals()
    const material = this._materialByHexColor(hexColor)
    const mesh = new THREE.Mesh(geometry, material)
    this._scene.add(mesh)
  }

  addTopLevelObject (object) {
    this._scene.add(object)
  }

  animate () {
    window.requestAnimationFrame(() => this.animate())
    this.controls.update()
    for (const component of this._animatedComponents) {
      component.update()
    }
    this.render()
    stats.update()
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
