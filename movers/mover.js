// mover.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'
import { countTo } from '../city3d/util.js'

const UP = new THREE.Vector3(0, 0, 1)

/**
 * Rotate a THREE object so that it faces a focus point.
 * To visualize this, pretend that obj is a unicycle. Initially, it's facing in the +X direction,
 * the line through the pedals is parallel to the Y-axis and the seatpost is parallel to the Z-axis.
 * We want the unicycle to be facing the focus, so we want the X-axis to move to vector f.
 * We want the line through the pedals to be perpendicular to f and also, by definition of up, to up.
 * Thus, the Y-axis should move to vector s. Finally, we want the seatpost perpendicular to both
 * the direction of travel, f, and s, which is parallel to the line through the pedals.
 * Thus, the Z-axis should move to vector v.
 * The matrix m maps the X-axis to f, the Y-axis to s and the Z-axis to v, so it performs the
 * desired rotation.
 * @param {THREE.Object3D} obj - an object to rotate
 * @param {xyz} focus - the point for the object to look towards
 * @param {THREE.Vector3} up - which way is up
 */
function lookAt (obj, focus, up = UP) {
  focus = new THREE.Vector3(...focus)
  const f = focus.sub(obj.position).normalize()
  const s = new THREE.Vector3().crossVectors(up, f).normalize()
  const v = new THREE.Vector3().crossVectors(f, s)
  const m = new THREE.Matrix4().makeBasis(f, s, v)
  obj.setRotationFromMatrix(m)
}

/**
 * Mover is an abstract superclass for objects that follow a path.
 */
export default class Mover {
  /**
   * @param {Array[]} path - points specifiying a path
   * @param {number} path[][0] - x-coordinate
   * @param {number} path[][1] - y-coordinate
   * @param {number} path[][2] - z-coordinate
   * @param {number} speed - for now, speed is in units of unit vectors per frame
   * @param {THREE.Object3D} [threeComponent] - three.js representation of the Mover
   */
  constructor (path, speed, threeComponent) {
    this.path = path
    this.speed = speed
    this.threeComponent = threeComponent
    this.position = path[0]
    this.pathIndex = 0
    this.pathSegments = []
    this.delta = speed

    for (const i of countTo(path.length - 1)) {
      const v = [0, 1, 2].map(j => path[i + 1][j] - path[i][j])
      const len = Math.sqrt(v.reduce((a, v) => a + v * v, 0))
      const vNorm = v.map(coord => coord / len)
      this.pathSegments.push({ vNorm, len })
    }
    this.remainingDist = this.pathSegments[0].len
    this.currSegment = this.pathSegments[0]

    if (this.threeComponent) {
      this.threeComponent.position.set(...path[0])
      lookAt(this.threeComponent, path[1])
    }
  }

  addScaledVectorToPosition (v, c) {
    this.position = this.position.map((coord, i) => coord + c * v[i])
  }

  update () {
    if (this.speed === 0) return
    let newTarget = null
    this.remainingDist -= this.delta
    if (this.remainingDist <= 0) {
      this.pathIndex = (this.pathIndex + 1) % (this.path.length - 1)
      this.currSegment = this.pathSegments[this.pathIndex]
      // TODO: update speed based on slope of current segment
      this.position = this.path[this.pathIndex]
      this.addScaledVectorToPosition(this.currSegment.vNorm, -this.remainingDist)
      this.remainingDist += this.currSegment.len
      newTarget = this.path[this.pathIndex + 1]
    } else {
      this.addScaledVectorToPosition(this.currSegment.vNorm, this.delta)
    }

    if (this.threeComponent) {
      this.threeComponent.position.set(...this.position)
      if (newTarget) {
        lookAt(this.threeComponent, newTarget)
      }
      for (const wheel of this.threeComponent.userData.spinningWheels) {
        wheel.rotation.y += this.speed / Math.PI
      }
    }
  }

  getRoute () {
    return this.speed > 0 ? this.path : [this.path[0]]
  }

  // This makes Mover a ThreeOutput plugin.
  threeComponent () {
    return this.threeComponent
  }
}
