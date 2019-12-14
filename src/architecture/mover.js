/** @file mover.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import * as THREE from '../../node_modules/three/build/three.module.js'
import { xyzAdd, xyzSubtract, hypotenuse, countTo } from '../core/util.js'

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
  focus = new THREE.Vector3(focus.x, focus.y, focus.z)
  const f = focus.sub(obj.position).normalize()
  const s = new THREE.Vector3().crossVectors(up, f).normalize()
  const v = new THREE.Vector3().crossVectors(f, s)
  const m = new THREE.Matrix4().makeBasis(f, s, v)
  obj.setRotationFromMatrix(m)
}

/**
 * Mover is an abstract superclass for objects that follow a Route.
 */
class Mover {
  /**
   * @param {Route} route - specifies a sequence of waypoints to travel between
   * @param {number} speed - for now, speed is in units of unit vectors per frame
   * @param {THREE.Object3D} [threeComponent] - three.js representation of the Mover
   */
  constructor (route, speed, threeComponent) {
    this.route = route
    const waypoints = route.waypoints()
    this.speed = speed
    this.threeComponent = threeComponent
    this.position = waypoints[0]
    this.routeIndex = 0
    this.routeSegments = []
    this.delta = speed

    // TODO: now that we have a real Route class, should this
    // code be part of Route, with a route.segments() accessor?
    for (const i of countTo(waypoints.length - 1)) {
      const vector = xyzSubtract(waypoints[i + 1], waypoints[i])
      const len = hypotenuse(vector.x, vector.y, vector.z)
      const vNorm = { x: vector.x / len, y: vector.y / len, z: vector.z / len }
      this.routeSegments.push({ vNorm, len })
    }
    this.remainingDist = this.routeSegments[0].len
    this.currSegment = this.routeSegments[0]

    if (this.threeComponent) {
      this.threeComponent.position.set(waypoints[0].x, waypoints[0].y, waypoints[0].z)
      lookAt(this.threeComponent, waypoints[1])
    }
  }

  addScaledVectorToPosition (vector, c) {
    const scaledVector = { x: vector.x * c, y: vector.y * c, z: vector.z * c }
    this.position = xyzAdd(this.position, scaledVector)
  }

  update () {
    if (this.speed === 0) return
    let newTarget = null
    this.remainingDist -= this.delta
    const waypoints = this.route.waypoints()
    if (this.remainingDist <= 0) {
      this.routeIndex = (this.routeIndex + 1) % (waypoints.length - 1)
      this.currSegment = this.routeSegments[this.routeIndex]
      // TODO: update speed based on slope of current segment
      this.position = waypoints[this.routeIndex]
      this.addScaledVectorToPosition(this.currSegment.vNorm, -this.remainingDist)
      this.remainingDist += this.currSegment.len
      newTarget = waypoints[this.routeIndex + 1]
    } else {
      this.addScaledVectorToPosition(this.currSegment.vNorm, this.delta)
    }

    if (this.threeComponent) {
      this.threeComponent.position.set(this.position.x, this.position.y, this.position.z)
      if (newTarget) {
        lookAt(this.threeComponent, newTarget)
      }
      for (const wheel of this.threeComponent.userData.spinningWheels) {
        wheel.rotation.y += this.speed / Math.PI
      }
    }
  }

  // This makes Mover a ThreeOutput plugin.
  threeComponent () {
    return this.threeComponent
  }
}

export { Mover }
