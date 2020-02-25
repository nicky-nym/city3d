/** @file pose.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Facing } from '../core/facing.js'
import { UNIT } from '../core/unit.js'

/**
 * A point (or vector) in a 3D space
 * @typedef {object} xyz
 * @property {number} [x=0] - distance on x-axis
 * @property {number} [y=0] - distance on y-axis
 * @property {number} [z=0] - distance on z-axis
 */

/**
 * A placement transformation for repositioning 3D objects
 * @typedef {object} pose
 * @property {number} [x=0] - distance on x-axis
 * @property {number} [y=0] - distance on y-axis
 * @property {number} [z=0] - distance on z-axis
 * @property {number} [rotated=0] - angle in degrees
 * @property {boolean} [mirrored=false] - true if transformed points are to be reflected about the x-axis
 * @property {pose} [subPose=null] - an additional pose to apply
 */

/**
 * Pose is a class for representing how an instance of a 3D object is place in a position.
 * See: pose.schema.json.js
 */
class Pose {
  static origin () {
    return { x: 0, y: 0, z: 0, rotated: 0, mirrored: false }
  }

  /**
   * Returns a copy of a pose object
   * @param {pose} pose - any pose object
   * @returns {pose} a new copy of the pose
   */
  static copy (pose) {
    const copy = { ...pose }
    if (copy.subPose) {
      copy.subPose = Pose.copy(copy.subPose)
    }
    return copy
  }

  /**
   * Places points according to the pose settings
   * @param {pose} pose - any pose object
   * @param {xyz|xyz[]} xyzOrList - point(s) to place into this pose
   * @returns {xyz|xyz[]} corresponding points, placed into the pose
   */
  static relocate (pose, xyzOrList) {
    if (Array.isArray(xyzOrList)) {
      return xyzOrList.map(xyz => Pose._relocatePoint(pose, xyz))
    } else {
      return Pose._relocatePoint(pose, xyzOrList)
    }
  }

  /**
   * Places points according to the pose settings
   * @param {pose} parentPose - any pose object
   * @param {pose} childPose - any second pose object
   * @returns {pose} a new pose that will apply both parent and child poses
   */
  static combine (parentPose, childPose) {
    const topCopy = Pose.copy(parentPose)
    let copy = topCopy
    while (copy.subPose) {
      copy = copy.subPose
    }
    copy.subPose = Pose.copy(childPose)
    return topCopy
  }

  static _relocatePoint (pose, xyz) {
    if (pose.subPose) {
      xyz = Pose._mirrorRotateTranslate(pose.subPose, xyz)
    }
    return Pose._mirrorRotateTranslate(pose, xyz)
  }

  static _mirrorRotateTranslate (pose, xyz) {
    const mirrored = { ...xyz }
    mirrored.x = pose.mirrored ? -mirrored.x : mirrored.x
    const rotated = Pose._xyRotate(mirrored, pose.rotated)
    rotated.z = mirrored.z
    return Pose._xyzAdd(rotated, pose)
  }

  static _xyzAdd (xyz0, xyz1) {
    return {
      x: (xyz0.x || 0) + (xyz1.x || 0),
      y: (xyz0.y || 0) + (xyz1.y || 0),
      z: (xyz0.z || 0) + (xyz1.z || 0)
    }
  }

  static _xyRotate (xy, facing = 0) {
    const { x, y } = xy
    switch (facing) {
      case Facing.NORTH:
        return { x, y }
      case Facing.SOUTH:
        return { x: -x, y: -y }
      case Facing.EAST:
        return { x: y, y: -x }
      case Facing.WEST:
        return { x: -y, y: x }
    }
    const radians = UNIT.convert({ from: UNIT.degrees(facing), to: UNIT.radians })
    const xOut = x * Math.cos(radians) - y * Math.sin(radians)
    const yOut = x * Math.sin(radians) + y * Math.cos(radians)
    return { x: xOut, y: yOut }
  }
}

export { Pose }
