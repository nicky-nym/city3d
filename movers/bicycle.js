// bicycle.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'
import { countTo, randomInt } from '../city3d/util.js'

const BICYCLE_TIRE = 0x202020
const BICYCLE_SPOKE = 0x606060
const BICYCLE_FRAME = 0x0000FF

export default class Bicycle {
  constructor (plato) {
    this._plato = plato
    this.bicycles = []

    const wheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.06, 16, 32),
      new THREE.MeshLambertMaterial({ color: BICYCLE_TIRE })
    )
    const spokeColor = new THREE.MeshPhongMaterial({
      color: BICYCLE_SPOKE,
      specular: 0x101010,
      shininess: 16
    })
    const spoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 1.5, 32, 1),
      spokeColor
    )
    wheel.add(spoke.clone())
    spoke.rotation.z = Math.PI / 3
    wheel.add(spoke.clone())
    spoke.rotation.z = -Math.PI / 3
    wheel.add(spoke.clone())
    wheel.rotation.x = Math.PI / 2
    wheel.position.z = 0.75
    this.frontWheelModel = wheel.clone()
    this.backWheelModel = wheel.clone()
    this.frontWheelModel.position.x = 1
    this.backWheelModel.position.x = -1

    this.bicycleModel = new THREE.Object3D()
    const frameColor = new THREE.MeshPhongMaterial({
      color: BICYCLE_FRAME,
      specular: 0x101010,
      shininess: 16
    })
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.4, 32, 1),
      frameColor
    )
    tube.position.x = -0.2
    tube.position.z = 1.2
    tube.rotation.x = Math.PI / 2
    tube.rotation.z = Math.PI / 8
    this.bicycleModel.add(tube)
    // TODO: add rest of frame and other parts (other than wheels, which need to be be handled separately)
    this.bicycleModel.scale.set(8, 8, 8)
  }

  update () {
    const ff = 0.04
    for (const bike of this.bicycles) {
      bike.position.addScaledVector(bike.velocity, ff)
      for (const wheel of bike.wheels) {
        wheel.rotation.z -= ff * bike.velocity.length() / Math.PI
      }
    }
  }

  addBicycles (n) {
    for (const i of countTo(n)) {
      const p = new THREE.Vector3(-50 * i, randomInt(-50, 50), 0)
      const v = new THREE.Vector3(randomInt(-5, 5) + 0.5, randomInt(-5, 5), 0)
      this.addBicycle(p, v)
    }
    this._plato.addAnimatedComponent(this)
  }

  addBicycle (p, v) {
    const bike = this.bicycleModel.clone()
    bike.position.copy(p)
    bike.wheels = [this.frontWheelModel.clone(), this.backWheelModel.clone()]
    bike.add(...bike.wheels)
    bike.velocity = v
    bike.rotation.z = v.angleTo(new THREE.Vector3(1, 0, 0)) * (v.y > 0 ? 1 : -1)
    this.bicycles.push(bike)
    this._plato.addMover(bike)
  }
}
