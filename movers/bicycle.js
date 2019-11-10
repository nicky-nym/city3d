// bicycle.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'
import { countTo, randomInt } from '../city3d/util.js'

const TIRE_COLOR = 0x202020
const SPOKE_COLOR = 0x606060
const FRAME_COLOR = 0x0000FF
const LOW_RES_DISTANCE = 300
const MED_RES_DISTANCE = 100
const WHEEL_HEIGHT = 0.75
const FRONT_WHEEL_X_OFFSET = 1.25
const BACK_WHEEL_X_OFFSET = -1.25
const INNERTUBE_RADIUS = 0.06
const BICYCLE_SCALE_FACTOR = 2.5

export default class Bicycle {
  constructor (plato) {
    this._plato = plato
    this.bicycles = []

    const wheelLODModel = new THREE.LOD()

    // lowest resolution wheel
    const lowResWheel = new THREE.Mesh(
      new THREE.TorusGeometry(WHEEL_HEIGHT, INNERTUBE_RADIUS, 4, 8),
      new THREE.MeshLambertMaterial({ color: TIRE_COLOR })
    )
    lowResWheel.rotation.x = Math.PI / 2
    wheelLODModel.addLevel(lowResWheel, LOW_RES_DISTANCE)

    // medium resolution wheel
    const medResWheel = lowResWheel.clone()
    medResWheel.geometry = new THREE.TorusGeometry(WHEEL_HEIGHT, INNERTUBE_RADIUS, 4, 8)
    const spokeMaterial = new THREE.MeshPhongMaterial({
      color: SPOKE_COLOR,
      specular: 0x101010,
      shininess: 16
    })
    const medResSpoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 1.5, 4, 1),
      spokeMaterial
    )
    medResWheel.add(medResSpoke.clone())
    medResSpoke.rotation.z = Math.PI / 3
    medResWheel.add(medResSpoke.clone())
    medResSpoke.rotation.z = -Math.PI / 3
    medResWheel.add(medResSpoke.clone())
    wheelLODModel.addLevel(medResWheel, MED_RES_DISTANCE)

    // high resolution wheel
    const highResWheel = lowResWheel.clone()
    highResWheel.geometry = new THREE.TorusGeometry(WHEEL_HEIGHT, INNERTUBE_RADIUS, 32, 64)
    const highResSpoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 1.5, 16, 1),
      spokeMaterial
    )
    for (const i of countTo(6)) {
      highResSpoke.rotation.z = i * Math.PI / 6
      highResWheel.add(highResSpoke.clone())
    }
    wheelLODModel.addLevel(highResWheel, 0)

    wheelLODModel.position.z = WHEEL_HEIGHT
    this.frontWheel = wheelLODModel
    this.backWheel = wheelLODModel.clone()
    this.frontWheel.position.x = FRONT_WHEEL_X_OFFSET
    this.backWheel.position.x = BACK_WHEEL_X_OFFSET

    const frame = new THREE.LOD()

    // lowest resolution frame
    const frameLowRes = new THREE.Group()
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: FRAME_COLOR,
      specular: 0x101010,
      shininess: 16
    })
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.1, 32, 1),
      frameMaterial
    )
    tube.position.x = -0.4
    tube.position.z = 1.3
    tube.rotation.x = Math.PI / 2
    tube.rotation.z = Math.PI / 8
    frameLowRes.add(tube)
    frame.addLevel(frameLowRes, LOW_RES_DISTANCE)

    // medium resolution frame
    const frameMedRes = frameLowRes.clone()
    const seat = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      frameMaterial
    )
    seat.scale.set(0.25, 0.15, 0.08)
    seat.position.x = -0.8
    seat.position.z = 2.3
    frameMedRes.add(seat)
    frame.addLevel(frameMedRes, MED_RES_DISTANCE)

    // high resolution frame
    const frameHighRes = frameMedRes.clone()
    const tube2 = tube.clone()
    tube2.rotation.z = Math.PI / 2
    tube2.scale.set(1, 0.6, 1)
    tube2.position.x = -0.05
    tube2.position.z = 2.0
    frameHighRes.add(tube2)
    frame.addLevel(frameHighRes, 0)

    this.bicycleModel = new THREE.Object3D()
    this.bicycleModel.add(frame)
    const s = BICYCLE_SCALE_FACTOR
    this.bicycleModel.scale.set(s, s, s)
  }

  update () {
    const ff = 0.04
    for (const bike of this.bicycles) {
      if (bike.position.lengthSq() > 528 * 528) {
        bike.velocity.negate()
        bike.rotateZ(Math.PI)
      }
      bike.position.addScaledVector(bike.velocity, ff)
      for (const wheel of bike.wheels) {
        wheel.rotation.y += ff * bike.velocity.length() / Math.PI
      }
    }
  }

  addBicycles (n) {
    for (const i of countTo(n)) {
      const p = new THREE.Vector3(-50 * i % 311, randomInt(-50, 50), 0)
      const v = new THREE.Vector3(randomInt(-5, 5) + 0.5, randomInt(-5, 5), 0)
      this.addBicycle(p, v)
    }
    this._plato.addAnimatedComponent(this)
  }

  addBicycle (p, v) {
    const bike = this.bicycleModel.clone()
    bike.position.copy(p)
    bike.wheels = [this.frontWheel.clone(), this.backWheel.clone()]
    bike.add(...bike.wheels)
    bike.velocity = v
    if (v.lengthSq() > 0) {
      bike.rotation.z = v.angleTo(new THREE.Vector3(1, 0, 0)) * (v.y > 0 ? 1 : -1)
    }
    this.bicycles.push(bike)
    this._plato.addMover(bike)
  }
}
