/** @file kayak.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import * as THREE from '../../node_modules/three/build/three.module.js'
import { xyz, randomInt } from '../core/util.js'
import Mover from './mover.js'

function _newLine (start, end, material) {
  const geometry = new THREE.Geometry()
  const from = new THREE.Vector3(start.x, start.y, start.z)
  const to = new THREE.Vector3(end.x, end.y, end.z)
  geometry.vertices.push(from, to)
  const line = new THREE.Line(geometry, material)
  return line
}

class KayakFactory {
  _newKayakObject () {
    const kayak = new THREE.Group()
    kayak.name = 'kayak'

    const shellMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 })
    const shell = new THREE.Mesh(new THREE.SphereGeometry(), shellMaterial)
    shell.scale.set(12, 2.6, 1.2)

    const RESOLUTION = 16
    const RADIUS = 1.8
    const circle = new THREE.CircleGeometry(RADIUS, RESOLUTION)
    const cockpitMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 })
    const cockpit = new THREE.Mesh(circle, cockpitMaterial)
    cockpit.position.z = 1.2

    const PADDLE_LENGTH = 8
    const paddleMaterial = new THREE.MeshLambertMaterial({ color: 0x222222, side: THREE.DoubleSide })
    const left = { x: 3, y: PADDLE_LENGTH / 2, z: 0 }
    const right = { x: -3, y: -PADDLE_LENGTH / 2, z: 0 }
    const pole = _newLine(left, right, paddleMaterial)

    const BLADE_SIZE = 1.2
    const leftCircle = new THREE.CircleGeometry(BLADE_SIZE, 6)
    const leftBlade = new THREE.Mesh(leftCircle, paddleMaterial)
    leftBlade.position.x = left.x
    leftBlade.position.y = left.y

    const rightCircle = new THREE.CircleGeometry(BLADE_SIZE, 6)
    const rightBlade = new THREE.Mesh(rightCircle, paddleMaterial)
    rightBlade.position.x = right.x
    rightBlade.position.y = right.y

    const paddle = new THREE.Group()
    paddle.add(pole, leftBlade, rightBlade)
    paddle.position.x = 2
    paddle.position.z = 2

    kayak.userData = { spinningWheels: [] }
    kayak.userData.spinningWheels.push(paddle)

    // kayak.position.z = 20
    // kayak.position.y = 0
    // kayak.position.x = 20
    kayak.add(shell, cockpit, paddle)

    return kayak
  }

  randomRoute () {
    const p1 = xyz(-randomInt(50, 250), -randomInt(50, 250), 0)
    const p2 = xyz(-randomInt(50, 250), -randomInt(50, 250), 0)
    const p3 = xyz(-randomInt(50, 500), -randomInt(50, 250), 0)
    return [p1, p2, p3, p1]
  }

  makeKayak (path, speed = 1) {
    return this._newKayakObject()
  }
}

const kayakFactory = new KayakFactory()

export default class Kayak extends Mover {
  // new Kayak([[0, 0, 0], [0, 200, 10], [100, 200, 10], [0, 0, 0]], 0.8)
  // For a stationary kayak, use speed = 0, and path[0] and path[1] to specify location and orientation.
  constructor (route, speed = 0.1) {
    route = route || kayakFactory.randomRoute()
    super(route, speed, kayakFactory.makeKayak(route, speed))
    this.threeComponent.update = this.update.bind(this)
  }
}
