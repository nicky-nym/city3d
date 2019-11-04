// output.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from './three/build/three.module.js'
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js'

const FIXME_FUCHSIA = [1, 0, 1, 0] // used as a default so it's obvious when a color is missing

function print (str) {
  console.log(str)
}

export { print }
export default class Output {
  // Output can render faces in three.js.

  constructor () {
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight

    this._shape = null
    this._scene = new THREE.Scene()
    this._camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
    this._camera.position.x = 300
    this._camera.position.y = 500
    this._camera.position.z = 600
    this._camera.up.set(0, 0, 1) // make z be up instead of y
    this._scene.add(this._camera)

    const light = new THREE.DirectionalLight(0xffffff, 3.0)
    light.position.set(-500, -800, 1500)
    this._scene.add(light)
    const ambientLight = new THREE.HemisphereLight(
      0xddeeff, // bright sky color
      0x202020, // dim ground color
      3 // intensity
    )
    this._scene.add(ambientLight)

    this._renderer = new THREE.WebGLRenderer({ antialias: true })
    this._renderer.setSize(WIDTH, HEIGHT)
    this._renderer.setClearColor(0xCCCCCC, 1) // set our background color
    document.body.appendChild(this._renderer.domElement)
    window.addEventListener('resize', evt => this._onWindowResize(evt), false)

    this.controls = new OrbitControls(this._camera, this._renderer.domElement)

    // add an origin marker for debugging purposes
    const geometry = new THREE.BoxGeometry(10, 10, 100)
    const material = new THREE.MeshStandardMaterial({ color: 0xFF00FF })
    const mesh = new THREE.Mesh(geometry, material)
    this._scene.add(mesh)
  }

  _onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  beginFace () {
    // PYTHON: this._bmesh = bmesh.new()

    this._planarPoints = []
  }

  newVert (xyz) {
    // PYTHON: this._bmesh.verts.new(xyz)

    this._planarPoints.push(new THREE.Vector3(...xyz))
  }

  endFace (rgbaArray = FIXME_FUCHSIA) {
    // PYTHON: this._bmesh.faces.new(this._bmesh.verts)
    // PYTHON: this._bmesh.normal_update()
    // PYTHON: myMesh = bpy.data.meshes.new('')
    // PYTHON: this._bmesh.to_mesh(myMesh)
    // PYTHON: this._bmesh.free()
    // PYTHON: obj =  bpy.data.objects.new('', myMesh)
    // PYTHON: obj.data.materials.append(_materialByPlace(place))
    // PYTHON: scene = bpy.context.scene
    // PYTHON: scene.collection.objects.link(obj)

    if (this._planarPoints.length < 3) {
      console.log('skipping degenerate face')
      return
    }

    // translate to origin
    const p0 = this._planarPoints[0].clone()
    const T = new THREE.Matrix4().setPosition(p0)
    const translatedPoints = this._planarPoints.map(p => p.sub(p0))

    const [, p1, p2] = translatedPoints // enough to determine the transformation matrix

    // For now, just considering 3 possibilities: triangle origin-p1-p2 is in one of the three
    // planes x=0, y=0 or z=0. (Note that this means all the remaining points are also in the same plane.)
    let xyPoints
    const R = new THREE.Matrix4()
    const RInv = new THREE.Matrix4()
    /* eslint-disable eqeqeq */
    // TODO: '==' vs '===' is not the issue: we really should be comparing to Number.EPSILON.
    if (p1.z == 0 && p2.z == 0) {
      // case 1: z=0
      // all points already in x-y plane, so we're done
      xyPoints = translatedPoints
    } else if (p1.x == 0 && p2.x == 0) {
      // case 2: x=0
      // rotate 90 around y-axis
      R.makeRotationY(Math.PI / 2)
      RInv.makeRotationY(-Math.PI / 2)
      xyPoints = translatedPoints.map(p => p.applyMatrix4(R))
    } else if (p1.y == 0 && p2.y == 0) {
      // case 3: y=0
      // rotate 90 around x-axis
      R.makeRotationX(Math.PI / 2)
      RInv.makeRotationX(-Math.PI / 2)
      xyPoints = translatedPoints.map(p => p.applyMatrix4(R))
    } else {
      // something unexpected happened, so ignore this face
      return
    }
    /* eslint-enable eqeqeq */

    const shape = new THREE.Shape(xyPoints.map(p => new THREE.Vector2(p.x, p.y)))
    shape.closePath()
    const geometry = new THREE.ShapeGeometry(shape)
    const color = new THREE.Color(...rgbaArray)
    const material = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.applyMatrix(RInv)
    mesh.applyMatrix(T)
    this._scene.add(mesh)
  }

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
        // print('mode: ' + mode)
        if (mode === 'EDIT') {
          bpy.ops.object.mode_set('OBJECT')
          mode = bpy.context.active_object.mode
          print('new mode: ' + mode)
          // print('SELECT and delete FACE')
          // bpy.ops.mesh.select_all(action='SELECT')
          // bpy.ops.mesh.delete(type='FACE')
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
