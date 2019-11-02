// output.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from './three/three.module.js'

const MARTIAN_ORANGE = 0xDF4911

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
    this._camera.position.x = -1000
    this._camera.position.y = -500
    this._camera.position.z = 1500
    this._scene.add(this._camera)

    this._renderer = new THREE.WebGLRenderer({ antialias: true })
    this._renderer.setSize(WIDTH, HEIGHT)
    this._renderer.setClearColor(0xCCCCCC, 1) // set our background color
    document.body.appendChild(this._renderer.domElement)
    window.addEventListener('resize', evt => this._onWindowResize(evt), false)
  }

  _onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  beginFace () {
    // PYTHON: this._bmesh = bmesh.new()

    this._shape = new THREE.Shape()
    this.started = false
  }

  newVert (xyz) {
    // PYTHON: this._bmesh.verts.new(xyz)

    const [x, y] = xyz
    if (this.started) {
      this._shape.lineTo(x, y)
    } else {
      this._shape.moveTo(x, y)
      this.started = true
    }
  }

  endFace (color = MARTIAN_ORANGE) {
    // PYTHON: this._bmesh.faces.new(this._bmesh.verts)
    // PYTHON: this._bmesh.normal_update()
    // PYTHON: myMesh = bpy.data.meshes.new('')
    // PYTHON: this._bmesh.to_mesh(myMesh)
    // PYTHON: this._bmesh.free()
    // PYTHON: obj =  bpy.data.objects.new('', myMesh)
    // PYTHON: obj.data.materials.append(_materialByPlace(place))
    // PYTHON: scene = bpy.context.scene
    // PYTHON: scene.collection.objects.link(obj)

    this._shape.closePath()

    const geometry = new THREE.ShapeGeometry(this._shape)
    if (geometry.vertices.length < 3) {
      console.log('skipping degenerate face')
      return
    }
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    // mesh.position.x = 5
    // mesh.position.y = 6
    // mesh.position.y = 7
    // mesh.rotation.set(0.4, 0.2, 0)
    // print('added another face')
    this._scene.add(mesh)
  }

  animate () {
    // TODO: fix me!
    // requestAnimationFrame(animate)
    // mesh.rotation.x += 0.005
    // mesh.rotation.y += 0.01
    this._renderer.render(this._scene, this._camera)
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
