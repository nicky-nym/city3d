// city3d.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from './three/three.module.js'
import Plato from './plato.js'
import Manhattan from './manhattan.js'
// import { Merlon } from 'merlon.js'
// import { Bikeway } from 'bikeway.js'
// import { Cottage } from 'cottage.js'

// declarations for the "standard" linter:
/* global THREE, requestAnimationFrame */

let scene
let camera
let renderer
let cube

const MARTIAN_ORANGE = 0xDF4911

function init () {
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setClearColor(0xCCCCCC, 1)
  document.body.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize, false)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
  camera.position.z = 50
  scene.add(camera)

  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  const material = new THREE.MeshBasicMaterial({ color: MARTIAN_ORANGE })
  cube = new THREE.Mesh(boxGeometry, material)
  scene.add(cube)
  cube.rotation.set(0.4, 0.2, 0)
}

function addBuildings () {
  const plato = new Plato()

  // just trying to successfully load for now
  return

  plato.deleteAllObjects()

  // plato.study('Cottage(s)', { x0: -100, y0: 100 })
  // const cottage = new Cottage(plato)
  // cottage.addStreet(12)
  // plato.pontificate()

  const CITY_SIZE = 2
  plato.study('Manhattan New York', { x0: -800 * CITY_SIZE, y0: -600 * CITY_SIZE })
  const nyc = new Manhattan(plato)
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  plato.pontificate()

  // plato.study('Merlon Buildings', { x0: 238, y0: 238 })
  // const merlon = new Merlon(plato)
  // merlon.addBuildings(8, 8, { buildings: true })
  // plato.pontificate()

  // plato.study('Bikeways', { x0: 100, y0: 100 })
  // const bikeway = new Bikeway(plato)
  // bikeway.addBikeways(3, 3, { buildings: true })
  // plato.pontificate()

  // plato.study('Wurster Hall(s)', { x0: 100, y0: -600 })
  // const wurster = new Wurster(plato)
  // wurster.addBuildings(1)
  // plato.pontificate()
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.005
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}

init()
addBuildings()
animate()
