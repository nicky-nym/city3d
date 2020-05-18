/** @file three_output.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import * as THREE from '../../node_modules/three/build/three.module.js'
import Stats from '../../node_modules/stats.js/src/Stats.js'
import { GUI } from '../../node_modules/dat.gui/build/dat.gui.module.js'

import { Feature } from '../core/feature.js'
import { xyz } from '../core/util.js'
import { Output } from './output.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { ThreeOutputScene } from './three_output_scene.js'
import { SumoExporter } from '../exporters/sumo/sumo_exporter.js'

const ONE_MILE = 5280
const COLOR_BRIGHT_SKY = 0xddeeff // eslint-disable-line no-unused-vars
const COLOR_DIM_GROUND = 0x202020 // eslint-disable-line no-unused-vars

const NO_CLIPPING_PLANES = Object.freeze([])
const CLIPPING_PLANES = []

/**
 * ThreeOutput can render faces in three.js.
 */
class ThreeOutput extends Output {
  /**
   * Creates an output instance to view the given Models.
   * @param {City.Model[]} models - an list of CITY.Model instances
   */
  constructor (models) {
    super(models)

    this._modelByName = {}
    for (const model of models) {
      this._modelByName[model.name] = model
    }

    this._selectedModel = models[0]
    this._modelsInScene = []
  }

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
    infoIcon.src = '/assets/images/icons/Information_icon.svg'
    infoIcon.style.cssText = 'width: 31px; height: 31px'
    infoIconDiv.appendChild(infoIcon)
    outputDivElement.appendChild(infoIconDiv)
    infoIconDiv.addEventListener('click', event => this._onShowKeyboardCommands(event), false)

    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const NEAR_CAMERA_LIMIT = 1
    const FAR_CAMERA_LIMIT = ONE_MILE * 2

    // textures
    const loader = new THREE.TextureLoader()
    const textures = new Map()
    textures.set('ground', loader.load('/assets/images/textures/metallic-green-glitter-texture.jpg'))

    // scene
    this._scene = new ThreeOutputScene(textures)

    // camera
    this._camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, NEAR_CAMERA_LIMIT, FAR_CAMERA_LIMIT)
    this._camera.position.x = -200
    this._camera.position.y = -300
    this._camera.position.z = 300
    this._camera.up.set(0, 0, 1) // make z be up instead of y
    this._scene.add(this._camera)

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

    this._renderer = new THREE.WebGLRenderer({ antialias: true })
    this._renderer.setSize(WIDTH, HEIGHT)
    this._renderer.setClearColor(0xCCCCCC, 1) // set our background color
    outputDivElement.appendChild(this._renderer.domElement)
    window.addEventListener('resize', evt => this._onWindowResize(evt), false)

    this._renderer.clippingPlanes = NO_CLIPPING_PLANES
    this._addClippingPlanes()
    this._addGuiControlPanel()

    // DOM setup for tooltips
    this._tooltipDiv = document.createElement('div')
    this._tooltipDiv.className = 'tooltip'
    outputDivElement.appendChild(this._tooltipDiv)

    this.controls = new OrbitControls(this._camera, outputDivElement)
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
        // case 'KeyH': // this is used by the dat.gui panel
        case 'KeyK': return this._onShowKeyboardCommands(evt)
        case 'KeyQ': return this._onTurnLeft()
        case 'KeyR': return evt.shiftKey ? this._onRestoreOrbitControlsState() : this._onUp()
        case 'KeyS': return evt.shiftKey ? this._onSaveOrbitControlsState() : this._onBackward()
        case 'KeyT': return this._onToggleHighlighting()
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
    h: show/hide control panel<br>
    k: show keyboard commands (this box)<br>
    t: show/hide tooltips &amp; highlighting<br>
    x: close this box (TODO: any key or click should work)<br>
    PgDn: show more...<br>
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

    this._animationOn = true

    this._buildSceneFrom(this._selectedModel)
  }

  _buildSceneFrom (model) {
    if (!this._modelsInScene.includes(model)) {
      this._scene.queueBuildFrom(model)
      this._modelsInScene.push(model)
    } else {
      window.alert(`${model.name} is already included`)
    }
  }

  add (feature) {
    this._scene.buildSynchronouslyFrom(feature)
  }

  _addClippingPlane (name, xyzVal, distance) {
    const { x, y, z } = xyzVal
    const plane = new THREE.Plane(new THREE.Vector3(x, y, z), distance)
    this._clippingPlanesByName[name] = plane
    CLIPPING_PLANES.push(plane)
  }

  _addClippingPlanes () {
    this._clippingPlanesByName = {}

    const DEFAULT_PLAN_CUT_Z = 6 // feet
    const DEFAULT_DISTANCE = 10000

    this._addClippingPlane('plan cut', xyz(0, 0, -1), DEFAULT_PLAN_CUT_Z)
    this._addClippingPlane('northerly', xyz(0, -1, 0), DEFAULT_DISTANCE)
    this._addClippingPlane('southerly', xyz(0, 1, 0), DEFAULT_DISTANCE)
    this._addClippingPlane('easterly', xyz(-1, 0, 0), DEFAULT_DISTANCE)
    this._addClippingPlane('westerly', xyz(1, 0, 0), DEFAULT_DISTANCE)
  }

  _addGuiControlPanel () {
    const _this = this
    const ui = {
      start: {
        get model () {
          return _this._selectedModel.name
        },
        set model (value) {
          _this._selectedModel = _this._modelByName[value]
          _this._buildSceneFrom(_this._selectedModel)
        },
        'play / pause animation': this._onToggleAnimation.bind(this),
        'save location': this._onSaveOrbitControlsState.bind(this),
        'restore location': this._onRestoreOrbitControlsState.bind(this),
        'show shortcuts': this._onShowKeyboardCommands.bind(this),
        'hide shortcuts': this._onHideKeyboardCommands.bind(this),
        'show / hide toolips': this._onToggleHighlighting.bind(this),
        'highlight color': '#ff00ff'
      },
      nav: {
        forward: this._onForward.bind(this),
        backward: this._onBackward.bind(this),
        up: this._onUp.bind(this),
        down: this._onDown.bind(this),
        left: this._onLeft.bind(this),
        right: this._onRight.bind(this),
        'turn left': this._onTurnLeft.bind(this),
        'turn right': this._onTurnRight.bind(this)
      },
      cut: {
        get enabled () {
          return _this._renderer.clippingPlanes !== NO_CLIPPING_PLANES
        },
        set enabled (value) {
          _this._renderer.clippingPlanes = value ? CLIPPING_PLANES : NO_CLIPPING_PLANES
        },
        get 'plan cut' () {
          return _this._clippingPlanesByName['plan cut'].constant
        },
        set 'plan cut' (value) {
          _this._clippingPlanesByName['plan cut'].constant = value
        },
        get northerly () {
          return _this._clippingPlanesByName.northerly.constant
        },
        set northerly (value) {
          _this._clippingPlanesByName.northerly.constant = value
        },
        get southerly () {
          return _this._clippingPlanesByName.southerly.constant
        },
        set southerly (value) {
          _this._clippingPlanesByName.southerly.constant = value
        },
        get easterly () {
          return _this._clippingPlanesByName.easterly.constant
        },
        set easterly (value) {
          _this._clippingPlanesByName.easterly.constant = value
        },
        get westerly () {
          return _this._clippingPlanesByName.westerly.constant
        },
        set westerly (value) {
          _this._clippingPlanesByName.westerly.constant = value
        }
      },
      layers: {
        // Keep these for reference until all these layers are registered somewhere, and
        // there's a way to configure a layer to be off by default.
        building: {
          'walls & floors': true,
          'doors & windows': true,
          roofs: true
        },
        pavement: {
          'streets, etc.': true
        },
        landscape: {
          'trees & plants': true,
          'ground surface': true,
          water: true
        },
        entourage: {
          people: false,
          animals: false,
          'vehicles & movers': true,
          furniture: false
        },
        weather: {
          clouds: false,
          fog: false,
          lightning: false
        },
        abstract: {
          'vehicle route lines': true,
          'parcel boundary lines': true,
          tooltips: true,
          grid: true,
          'sun path & day arcs': false,
          'daylight factor heatmap': false,
          'kinematic range heatmap': false,
          'green space heatmap': false,
          'assignable FAR heatmap': false
        }
      },
      analytics: {
        'download SUMO file': this._onSumo.bind(this)
      }
    }

    if (window && typeof GUI !== 'undefined') {
      const gui = new GUI()

      const startFolder = gui.addFolder('Start')

      startFolder.add(ui.start, 'model', this._models.map(model => model.name))
      startFolder.add(ui.start, 'play / pause animation')
      startFolder.add(ui.start, 'save location')
      startFolder.add(ui.start, 'restore location')
      startFolder.add(ui.start, 'show shortcuts')
      startFolder.add(ui.start, 'hide shortcuts')
      startFolder.add(ui.start, 'show / hide toolips')
      startFolder.addColor(ui.start, 'highlight color')
      startFolder.open()

      const navigationFolder = gui.addFolder('Navigation')

      navigationFolder.add(ui.nav, 'forward')
      navigationFolder.add(ui.nav, 'backward')
      navigationFolder.add(ui.nav, 'up')
      navigationFolder.add(ui.nav, 'down')
      navigationFolder.add(ui.nav, 'left')
      navigationFolder.add(ui.nav, 'right')
      navigationFolder.add(ui.nav, 'turn left')
      navigationFolder.add(ui.nav, 'turn right')

      const sectionCutsFolder = gui.addFolder('Section cuts')

      sectionCutsFolder.add(ui.cut, 'enabled')
      sectionCutsFolder.add(ui.cut, 'plan cut').min(0).max(100).step(1)
      sectionCutsFolder.add(ui.cut, 'northerly').min(-10000).max(10000).step(1)
      sectionCutsFolder.add(ui.cut, 'southerly').min(-10000).max(10000).step(1)
      sectionCutsFolder.add(ui.cut, 'easterly').min(-10000).max(10000).step(1)
      sectionCutsFolder.add(ui.cut, 'westerly').min(-10000).max(10000).step(1)

      const layersFolder = gui.addFolder('Layers')

      const layerMap = Feature.getRegisteredLayersByCategory()
      for (const [category, layers] of layerMap) {
        if (category) {
          const obj = {}
          layers.forEach(layer => { obj[layer.displayName] = true })

          const categoryFolder = layersFolder.addFolder(category)
          layers.forEach(layer => {
            const controller = categoryFolder.add(obj, layer.displayName)
            this._camera.layers.enable(layer.index)
            controller.onChange(b => {
              const action = b ? 'enable' : 'disable'
              this._camera.layers[action](layer.index)
            })
          })
          ui.layers[category] = obj
        }
      }

      const analyticsFolder = gui.addFolder('Analytics')
      analyticsFolder.add(ui.analytics, 'download SUMO file')
    }
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
    if (event) {
      event.preventDefault()
    }
    this._keyInfoDiv.style.opacity = 0.9
  }

  _onHideKeyboardCommands (event) {
    if (event) {
      event.preventDefault()
    }
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

  _onSumo () {
    const TODO = true
    if (TODO) {
      const sumo = new SumoExporter(null)
      sumo.exportFiles()
    } else {
      // TODO: generate files for each model
      for (const model of this._models) {
        const sumo = new SumoExporter(model)
        sumo.exportFiles()
      }
    }
  }

  animate () {
    window.requestAnimationFrame(() => this.animate())
    if (this.controls.enabled) {
      this.controls.update()
    }
    if (this._animationOn) {
      for (const component of this._scene._animatedComponents) {
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
        } else if (!this._intersected.layers.test(this._camera.layers)) {
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
    let label
    for (let p = obj; (!label) && p; p = p.parent) {
      label = p.userData.feature ? p.userData.feature.fullName() : p.name
    }
    console.log(obj.uuid, label)
    this._tooltipDiv.textContent = label

    // position tooltip near mouse, offsetting based on which quadrant it's in
    const xOffset = this._mouse.x < 0 ? 50 : -50
    const yOffset = this._mouse.y < 0 ? -50 : 50
    this._tooltipDiv.style.left = `${this._mouseClientX + xOffset}px`
    this._tooltipDiv.style.top = `${this._mouseClientY + yOffset}px`

    // make tooltip visible
    this._tooltipDiv.style.opacity = 0.8

    if (obj.material instanceof THREE.Material) {
      obj.currentMaterial = obj.material
      obj.material = obj.material.clone()
      obj.material.color.setHex(0xff00ff)
    } else {
      obj.currentMaterial = null
    }
  }

  unhighlight (obj) {
    if (obj.currentMaterial) {
      obj.material = obj.currentMaterial
    }

    // make tooltip invisible
    this._tooltipDiv.style.opacity = 0
  }
}

export { ThreeOutput }
