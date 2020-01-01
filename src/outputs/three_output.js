/** @file three_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import * as THREE from '../../node_modules/three/build/three.module.js'
import Stats from '../../node_modules/stats.js/src/Stats.js'

import { Geometry } from '../core/geometry.js'
import { fullName } from '../core/util.js'
import { Group, LODGroup } from '../architecture/group.js'
import { Output } from './output.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'

const ONE_MILE = 5280
const FIXME_FUCHSIA = 0xff00ff // used as a default so it's obvious when a color is missing
const COLOR_GREY = 0x808080
const BLUE = 0x0000ff
const BLUE_GLASS = 0x9999ff // eslint-disable-line no-unused-vars
const ALMOST_WHITE = 0x999999 // eslint-disable-line no-unused-vars
const COLOR_BRIGHT_SKY = 0xddeeff // eslint-disable-line no-unused-vars
const COLOR_DIM_GROUND = 0x202020 // eslint-disable-line no-unused-vars

/**
 * ThreeOutput can render faces in three.js.
 */
class ThreeOutput extends Output {
  setDisplayDiv (outputDivElement) {
    this.stats = new Stats()
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    outputDivElement.appendChild(this.stats.dom)

    const infoIconDiv = document.createElement('div')
    // TODO: Make a css file and figure out where to put it.
    infoIconDiv.style.position = 'fixed'
    infoIconDiv.style.bottom = '0'
    infoIconDiv.style.right = '0'
    infoIconDiv.style.height = '31px'
    infoIconDiv.style.cursor = 'pointer'
    infoIconDiv.style.zIndex = '10000'
    const infoIcon = document.createElement('img')
    infoIcon.src = '../src/outputs/images/Information_icon.svg'
    infoIcon.style.cssText = 'width: 31px; height: 31px'
    infoIconDiv.appendChild(infoIcon)
    outputDivElement.appendChild(infoIconDiv)
    infoIconDiv.addEventListener('click', event => this._onShowKeyboardCommands(event), false)

    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const NEAR_CAMERA_LIMIT = 1
    const FAR_CAMERA_LIMIT = ONE_MILE * 2

    this._materials = {
      lowest: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} },
      medium: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} },
      high: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} }
    }

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
    const texture = loader.load('../src/outputs/textures/metallic-green-glitter-texture.jpg')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(100, 100) // 25, 25)
    texture.anisotropy = 16
    var groundMaterial = new THREE.MeshLambertMaterial({ map: texture })
    const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(ONE_MILE, ONE_MILE), groundMaterial)
    ground.geometry.rotateX(Math.PI / 2)
    ground.position.y = -250
    ground.position.z = -0.01
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    ground.userData.noHighlight = true
    this._scene.add(ground)

    this._renderer = new THREE.WebGLRenderer({ antialias: true })
    this._renderer.setSize(WIDTH, HEIGHT)
    this._renderer.setClearColor(0xCCCCCC, 1) // set our background color
    outputDivElement.appendChild(this._renderer.domElement)
    window.addEventListener('resize', evt => this._onWindowResize(evt), false)

    // DOM setup for tooltips
    this._tooltipDiv = document.createElement('div')
    this._tooltipDiv.className = 'tooltip'
    outputDivElement.appendChild(this._tooltipDiv)

    this.controls = new OrbitControls(this._camera, this._renderer.domElement)
    this.controls.enabled = true
    this._highlightingOn = true

    if (window.sessionStorage.getItem('OrbitControls')) {
      const oc = JSON.parse(window.sessionStorage.getItem('OrbitControls'))
      this.controls.position0 = new THREE.Vector3(...oc.position)
      this.controls.target0 = new THREE.Vector3(...oc.target)
      this.controls.zoom0 = oc.zoom
      this.controls.reset()
      console.log('Restored camera coordinates from sessionStorage. To revert to default coordinates, open in a new tab.')
    }

    // keyboard commands
    window.addEventListener('keydown', evt => {
      console.log(evt.code, evt.shiftKey)

      switch (evt.code) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown': this.controls.enabled = true; return
        case 'KeyA': return this._onLeft()
        case 'KeyD': return this._onRight()
        case 'KeyE': return this._onTurnRight()
        case 'KeyF': return this._onDown()
        case 'KeyG': return this._onGoTo()
        case 'KeyH': return this._onToggleHighlighting()
        case 'KeyK': return this._onShowKeyboardCommands(evt)
        case 'KeyQ': return this._onTurnLeft()
        case 'KeyR': return evt.shiftKey ? this._onRestoreOrbitControlsState() : this._onUp()
        case 'KeyS': return evt.shiftKey ? this._onSaveOrbitControlsState() : this._onBackward()
        case 'KeyW': return this._onForward()
        case 'KeyX': return this._onHideKeyboardCommands(evt)
        case 'Space': return this._onToggleAnimation()
      }
    }, false)
    this._keyInfoDiv = document.createElement('div')
    this._keyInfoDiv.style.position = 'fixed'
    this._keyInfoDiv.style.top = '50%'
    this._keyInfoDiv.style.left = '50%'
    this._keyInfoDiv.style.transform = 'translate(-50%, -50%)'
    this._keyInfoDiv.style.backgroundColor = 'white'
    this._keyInfoDiv.style.padding = '0 20px 20px 20px'
    this._keyInfoDiv.style.opacity = 0 // invisible
    outputDivElement.appendChild(this._keyInfoDiv)
    this._keyInfoDiv.innerHTML = `
    <h4>Keyboard Commands</h4>
    S: save camera coordinates<br>
    R: restore camera coordinates<br>
    &lt;space&gt;: toggle animation<br>
    h: toggle highlighting<br>
    k: show keyboard commands (this box)<br>
    x: close this box (TODO: any key or click should work)<br>
    <h5>These commands disable the orbit controls until the next arrow key is pressed:</h5>
    w: move forward one foot<br>
    a: move left one foot<br>
    s: move backward one foot<br>
    d: move right one foot<br>
    q: turn left 5 degrees<br>
    e: turn right 5 degrees<br>
    r: move up one foot<br>
    f: move down one foot<br>
    g: go to where the cursor is pointing<br>
    <h5>Orbit controls use the mouse and arrow keys.</h5>
    `
    // enable selecting objects with mouse
    this._raycaster = new THREE.Raycaster()
    this._mouse = new THREE.Vector2()
    this._intersected = null
    window.addEventListener('mousemove', evt => {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      this._mouse.x = (evt.clientX / window.innerWidth) * 2 - 1
      this._mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1
      this._mouseClientX = evt.clientX
      this._mouseClientY = evt.clientY
    }, false)

    this._animatedComponents = []
    this._animationOn = true

    // add an origin marker for debugging purposes
    const ORIGIN_MARKER_HEIGHT = 100
    const ORIGIN_SIGN_LENGTH = 30
    const geometry = new THREE.BoxGeometry(4, 4, ORIGIN_MARKER_HEIGHT)
    const material = this._material('high', BLUE, false)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = 'origin marker'
    mesh.position.z = ORIGIN_MARKER_HEIGHT / 2
    this._scene.add(mesh)
    const geometryX = new THREE.BoxGeometry(ORIGIN_SIGN_LENGTH, 1, 8)
    const materialX = this._material('high', 0xff0000, false)
    const meshX = new THREE.Mesh(geometryX, materialX)
    meshX.name = '+X axis (East)'
    meshX.position.x = ORIGIN_SIGN_LENGTH / 2
    meshX.position.z = ORIGIN_MARKER_HEIGHT * 0.7
    this._scene.add(meshX)
    const geometryY = new THREE.BoxGeometry(1, ORIGIN_SIGN_LENGTH, 8)
    const materialY = this._material('high', 0x00ff00, false)
    const meshY = new THREE.Mesh(geometryY, materialY)
    meshY.name = '+Y axis (North)'
    meshY.position.y = ORIGIN_SIGN_LENGTH / 2
    meshY.position.z = ORIGIN_MARKER_HEIGHT * 0.7
    this._scene.add(meshY)

    const SHOW_PATH = true
    if (SHOW_PATH) {
      const material = new THREE.LineBasicMaterial({ color: 0xFF00FF })
      for (const route of this._city.getRoutes()) {
        const geometry = new THREE.Geometry()
        geometry.vertices.push(...route.waypoints().map(p => new THREE.Vector3(p.x, p.y, p.z)))
        const line = new THREE.Line(geometry, material)
        this._scene.add(line)
      }
    }

    this._traverse(this._city, this._scene)
  }

  add (thing) {
    this._traverse(thing, this._scene)
  }

  _traverse (thing, threeObject) {
    if (thing instanceof Group) {
      if (thing instanceof LODGroup) {
        const lod = this.makeLODFromLODGroup(thing)
        threeObject.add(lod)
      } else {
        const group = new THREE.Group()
        group.name = thing.name
        threeObject.add(group)
        for (const child of thing.children) {
          this._traverse(child, group)
        }
      }
    } else if (thing.threeComponent) {
      threeObject.add(thing.threeComponent)
      if (thing.threeComponent.update) {
        this._animatedComponents.push(thing.threeComponent)
      }
    } else if (thing instanceof Geometry.Instance) {
      const material = this._material('high', thing.hexColor, true)
      const mesh = this.makeMeshFromInstanceGeometry(thing.geometry, material, thing.hexColor, thing.zOffset)
      mesh.name = thing.name
      threeObject.add(mesh)
    } else {
      // TODO
    }
  }

  makeLODFromLODGroup (lodGroup) {
    const lod = new THREE.LOD()
    if (lodGroup.offset) {
      lod.translateX(lodGroup.offset.x)
      lod.translateY(lodGroup.offset.y)
      lod.translateZ(lodGroup.offset.z)
    }
    const group = new THREE.Group()
    group.name = lodGroup.name
    for (const child of lodGroup.children) {
      this._traverse(child, group)
    }
    lod.addLevel(group, 0)

    const levels = lodGroup.getLevelsOfDetail()

    // Sort so highest threshold (= lowest resolution) is first.
    levels.sort(level => -level.distanceThreshold)

    let materialCost = 'lowest'
    for (const level of levels) {
      const object = this.makeLowResObject(level.instance, materialCost)
      lod.addLevel(object, level.distanceThreshold)
      materialCost = 'medium'
    }
    return lod
  }

  makeLowResObject (instance, materialCost) {
    if (instance instanceof Group) {
      const group = new THREE.Group()
      group.name = instance.name
      for (const child of instance.children) {
        group.add(this.makeLowResObject(child, materialCost))
      }
      return group
    }
    if (!instance.geometry) {
      console.error('Error: instance must either be an instance of Group or have a property "geometry"')
      return
    }

    const material = this._material(materialCost, instance.hexColor, true)
    return this.makeMeshFromInstanceGeometry(instance.geometry, material, instance.hexColor, instance.zOffset)
  }

  makeMeshFromInstanceGeometry (instanceGeometry, material, color, zOffset) {
    if (instanceGeometry instanceof Geometry.ThickPolygon) {
      return this.makeThickPolygonMesh(instanceGeometry, zOffset, material)
    }
    if (instanceGeometry instanceof Geometry.ThickPolygon2) {
      return this.makeThickPolygon2Mesh(instanceGeometry, zOffset, material)
    }
    if (instanceGeometry instanceof Geometry.TriangularPolyhedron) {
      return this.makeTriangularPolyhedronMesh(instanceGeometry, material)
    }
    if (instanceGeometry instanceof Geometry.OutlinePolygon) {
      return this.makeOutlinePolygonLines(instanceGeometry, color, zOffset)
    }
    if (instanceGeometry instanceof Geometry.Line) {
      return this.makeLines(instanceGeometry, color)
    }
    console.error('unknown geometry')
  }

  // TODO: consider refactoring to merge this with makeOutlinePolygonLines()
  makeLines (outlinePolygon, hexColor) {
    const material = new THREE.LineBasicMaterial({ color: hexColor })
    const geometry = new THREE.Geometry()
    const corners = outlinePolygon.xyzWaypoints
    const vectors = []
    for (const corner of corners) {
      vectors.push(new THREE.Vector3(corner.x, corner.y, corner.z))
    }
    geometry.vertices.push(...vectors)
    const line = new THREE.Line(geometry, material)
    return line
  }

  // TODO: consider refactoring to merge this with makeLines()
  makeOutlinePolygonLines (outlinePolygon, hexColor, zOffset) {
    const material = new THREE.LineBasicMaterial({ color: hexColor })
    const geometry = new THREE.Geometry()
    const corners = outlinePolygon.xyPolygon
    const vectors = []
    for (const corner of corners) {
      vectors.push(new THREE.Vector3(corner.x, corner.y, zOffset))
    }
    geometry.vertices.push(...vectors)
    const line = new THREE.Line(geometry, material)
    return line
  }

  makeThickPolygonMesh (thickPolygon, zOffset, material) {
    const xyPolygon = thickPolygon.xyPolygon
    const x0 = xyPolygon[0].x
    const y0 = xyPolygon[0].y
    const shape = new THREE.Shape(xyPolygon)
    shape.closePath()

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickPolygon.depth,
      bevelEnabled: false
    })

    geometry.translate(-x0, -y0, 0)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    if (thickPolygon.incline) {
      const x1 = xyPolygon[1].x
      const y1 = xyPolygon[1].y
      const edge = new THREE.Vector3(x1 - x0, y1 - y0, 0)
      const hypotenuse = edge.length()
      const angle = Math.asin(thickPolygon.incline / hypotenuse)

      // want to rotate around axis perpendicular to edge and in x-y plane
      const axis = new THREE.Vector3().crossVectors(edge, new THREE.Vector3(0, 0, 1))
      axis.normalize()
      const R = new THREE.Matrix4().makeRotationAxis(axis, -angle)
      mesh.applyMatrix(R)
    }
    const T = new THREE.Matrix4().setPosition(x0, y0, zOffset)
    mesh.applyMatrix(T)
    return mesh
  }

  makeThickPolygon2Mesh (thickPolygon, zOffset, material) {
    const xyPolygon = thickPolygon.xyPolygon
    const shape = new THREE.Shape(xyPolygon)
    shape.closePath()

    for (const opening of thickPolygon.openings) {
      const points = opening.map(xy => new THREE.Vector2(xy.x, xy.y))
      const path = new THREE.Path(points)
      shape.holes.push(path)
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickPolygon.depth,
      bevelEnabled: false
    })

    geometry.rotateX(thickPolygon.xRotation)
    geometry.rotateZ(thickPolygon.zRotation)
    geometry.translate(thickPolygon.xOffset, thickPolygon.yOffset, zOffset)

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    return mesh
  }

  /**
   * Returns a THREE.Mesh() with a geometry that matches the given spec
   * @param {Object} triangularPolyhedron - an object like { vertices: [xyz, xyz...], indicesOfFaces: [3, 8, 2...] }
   * @param {THREE.Material} material - the material for the new Mesh
   * @returns {THREE.Mesh} an array of integers
   */
  makeTriangularPolyhedronMesh (triangularPolyhedron, material) {
    const geometry = new THREE.Geometry()
    geometry.vertices = triangularPolyhedron.vertices.map(xyz => new THREE.Vector3(xyz.x, xyz.y, xyz.z))
    geometry.faces = triangularPolyhedron.indicesOfFaces.map(abc => new THREE.Face3(...abc))
    geometry.computeBoundingSphere()
    geometry.computeFaceNormals()
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  }

  _onWindowResize () {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  _onSaveOrbitControlsState () {
    console.log('pos', this._camera.position)
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

  _onToggleAnimation () {
    this._animationOn = !this._animationOn
  }

  _onShowKeyboardCommands (event) {
    event.preventDefault()
    this._keyInfoDiv.style.opacity = 0.9
  }

  _onHideKeyboardCommands (event) {
    event.preventDefault()
    this._keyInfoDiv.style.opacity = 0
  }

  _onToggleHighlighting () {
    this._highlightingOn = !this._highlightingOn
  }

  _onUp () {
    this.controls.enabled = false
    this._camera.position.z += 1
  }

  _onDown () {
    this.controls.enabled = false
    this._camera.position.z -= 1
  }

  _onLeft () {
    this.controls.enabled = false
    const v = new THREE.Vector3()
    this._camera.getWorldDirection(v)
    console.log(v)
    v.z = 0
    v.normalize()
    this._camera.position.x -= v.y
    this._camera.position.y += v.x
  }

  _onRight () {
    this.controls.enabled = false
    const v = new THREE.Vector3()
    this._camera.getWorldDirection(v)
    console.log(v)
    v.z = 0
    v.normalize()
    this._camera.position.x += v.y
    this._camera.position.y -= v.x
  }

  _onTurnLeft () {
    this.controls.enabled = false
    this._camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 36)
  }

  _onTurnRight () {
    this.controls.enabled = false
    this._camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 36)
  }

  _onBackward () {
    this.controls.enabled = false
    const v = new THREE.Vector3()
    this._camera.getWorldDirection(v)
    console.log(v)
    v.z = 0
    v.normalize()
    this._camera.position.x -= v.x
    this._camera.position.y -= v.y
  }

  _onForward () {
    this.controls.enabled = false
    const v = new THREE.Vector3()
    this._camera.getWorldDirection(v)
    console.log(v)
    v.z = 0
    v.normalize()
    this._camera.position.x += v.x
    this._camera.position.y += v.y
  }

  _onGoTo () {
    this.controls.enabled = false

    // update the picking ray with the camera and mouse position
    this._raycaster.setFromCamera(this._mouse, this._camera)

    // calculate objects intersecting the picking ray
    const intersects = this._raycaster.intersectObjects(this._scene.children, true)

    if (intersects.length > 0) {
      const diff = new THREE.Vector3()
      diff.subVectors(intersects[0].point, this._camera.position)
      this._camera.position.copy(intersects[0].point)
      this._camera.position.z += 5
      const focus = this._camera.position.clone().add(new THREE.Vector3(diff.x, diff.y, 0))
      this._camera.lookAt(focus)
    }
  }

  _material (materialCost, color, twoSided = false) {
    if (isNaN(color)) {
      color = FIXME_FUCHSIA
    }
    const side = twoSided ? THREE.DoubleSide : THREE.FrontSide
    if (!(color in this._materials[materialCost][side])) {
      if (materialCost === 'lowest') {
        this._materials[materialCost][side][color] = new THREE.MeshBasicMaterial({ color, side })
      } else if (materialCost === 'medium') {
        this._materials[materialCost][side][color] = new THREE.MeshLambertMaterial({ color, side })
      } else if (materialCost === 'high') {
        this._materials[materialCost][side][color] = new THREE.MeshPhongMaterial({ color, side })
      } else {
        console.error('unknown materialCost', materialCost)
      }
    }
    return this._materials[materialCost][side][color]
  }

  animate () {
    window.requestAnimationFrame(() => this.animate())
    if (this.controls.enabled) {
      this.controls.update()
    }
    if (this._animationOn) {
      for (const component of this._animatedComponents) {
        component.update()
      }
    }
    this.render()
    this.stats.update()
  }

  render () {
    this.handleCurrentTarget()
    this._renderer.render(this._scene, this._camera)
  }

  handleCurrentTarget () {
    if (!this._highlightingOn) {
      if (this._intersected) this.unhighlight(this._intersected)
      this._intersected = null
      return
    }

    // update the picking ray with the camera and mouse position
    this._raycaster.setFromCamera(this._mouse, this._camera)

    // calculate objects intersecting the picking ray
    const intersects = this._raycaster.intersectObjects(this._scene.children, true)

    if (intersects.length > 0) {
      if (this._intersected !== intersects[0].object) {
        if (this._intersected) this.unhighlight(this._intersected)
        this._intersected = intersects[0].object
        if (this._intersected.userData.noHighlight) {
          this._intersected = null
        } else {
          this.highlight(this._intersected)
        }
      }
    } else {
      if (this._intersected) this.unhighlight(this._intersected)
      this._intersected = null
    }
  }

  highlight (obj) {
    const label = fullName(obj)
    console.log(obj.uuid, label)
    this._tooltipDiv.textContent = label

    // position tooltip near mouse, offsetting based on which quadrant it's in
    const xOffset = this._mouse.x < 0 ? 50 : -50
    const yOffset = this._mouse.y < 0 ? -50 : 50
    this._tooltipDiv.style.left = `${this._mouseClientX + xOffset}px`
    this._tooltipDiv.style.top = `${this._mouseClientY + yOffset}px`

    // make tooltip visible
    this._tooltipDiv.style.opacity = 0.8

    obj.currentMaterial = obj.material
    obj.material = obj.material.clone()
    obj.material.color.setHex(0xff00ff)
  }

  unhighlight (obj) {
    obj.material = obj.currentMaterial

    // make tooltip invisible
    this._tooltipDiv.style.opacity = 0
  }
}

export { ThreeOutput }
