/** @file pose.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyzAdd, xyRotate } from '../core/util.js'
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
 * Pose is a class for representing how an instance of a 3D object is placed in a position.
 * A pose is a simple sort of 3D transformation. It allows for 3D translations,
 * 2D rotations, and 1D mirroring.
 * See: pose.schema.json.js
 */
class Pose {
  static freeze (pose) {
    return Object.freeze(pose)
  }

  /**
   * Returns a copy of a pose object
   * @param {pose} pose - any pose object
   * @returns {pose} a new copy of the pose
   */
  static copy (pose) {
    return Pose._deepCopy(pose)
  }

  static set (pose, values) {
    pose = Pose.copy(pose)
    return { ...pose, ...values }
  }

  /**
   * Places points according to the pose settings
   * @param {pose} pose - any pose object
   * @param {xyz|xyz[]} xyzOrList - point(s) to place into this pose
   * @returns {xyz|xyz[]} corresponding points, placed into the pose
   */
  static relocate (pose, xyzOrList) {
    const FUTURE = false
    if (FUTURE) {
      if (Array.isArray(xyzOrList)) {
        return xyzOrList.map(xyz => Pose._relocatePoint(pose, xyz))
      } else {
        return Pose._relocatePoint(pose, xyzOrList)
      }
    } else {
      const collapsedPose = Pose.collapse(pose)
      return Pose.applyPose(collapsedPose, xyzOrList)
    }
  }

  /**
   * Adds one pose to another pose as a subpose.
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

  static applyPose (pose, xyzObjOrList) {
    if (Array.isArray(xyzObjOrList)) {
      const transformed = []
      for (const xyzPoint of xyzObjOrList) {
        const rotated = xyRotate(xyzPoint, pose.rotated)
        rotated.z = xyzPoint.z
        if (pose.mirrored) {
          rotated.x = -rotated.x
        }
        transformed.push(xyzAdd(rotated, pose))
      }
      return transformed
    } else {
      const rotated = xyRotate(xyzObjOrList, pose.rotated)
      rotated.z = xyzObjOrList.z
      if (pose.mirrored) {
        rotated.x = -rotated.x
      }
      return xyzAdd(rotated, pose)
    }
  }

  static collapse (pose) {
    return Pose._collapsePose(pose)
  }

  static _deepCopy (pose) {
    const copy = { ...pose }
    if (copy.subPose) {
      copy.subPose = Pose.copy(copy.subPose)
    }
    return copy
  }

  static _collapsePose (pose) {
    let { x, y, z, rotated, mirrored, subPose } = pose
    let poseIn = {
      rotated: rotated || Facing.NORTH,
      x,
      y,
      z,
      mirrored: mirrored || false
    }
    while (subPose) {
      const netMirrored = subPose.mirrored ? !mirrored : mirrored

      const rotated = xyRotate(subPose, poseIn.rotated)
      rotated.z = subPose.z
      if (poseIn.mirrored) {
        rotated.x = -rotated.x
      }
      const subXyz = xyzAdd(rotated, poseIn)

      poseIn = {
        rotated: poseIn.rotated + (subPose.rotated || 0),
        x: subXyz.x,
        y: subXyz.y,
        z: subXyz.z,
        mirrored: netMirrored
      }

      subPose = subPose.subPose
    }
    const newPose = Pose.copy(poseIn)
    return newPose
  }

  static _relocatePoint (pose, xyz) {
    if (pose.subPose) {
      xyz = Pose._relocatePoint(pose.subPose, xyz)
    }
    return Pose._rotateMirrorTranslate(pose, xyz)
  }

  /*
  static _mirrorRotateTranslate (pose, xyz) {
    const mirrored = { ...xyz }
    mirrored.x = pose.mirrored ? -mirrored.x : mirrored.x
    const rotated = Pose._xyRotate(mirrored, pose.rotated)
    rotated.z = mirrored.z
    return Pose._xyzAdd(rotated, pose)
  }
  */

  static _rotateMirrorTranslate (pose, xyz) {
    const rotated = Pose._xyRotate(xyz, pose.rotated)
    rotated.z = xyz.z
    const mirrored = rotated
    mirrored.x = pose.mirrored ? -mirrored.x : mirrored.x
    return Pose._xyzAdd(mirrored, pose)
  }

  /*
  static _mirrorTranslateRotate (pose, xyz) {
    const mirrored = { ...xyz }
    mirrored.x = pose.mirrored ? -mirrored.x : mirrored.x
    const translated = Pose._xyzAdd(mirrored, pose)
    const rotated = Pose._xyRotate(translated, pose.rotated)
    rotated.z = mirrored.z
    return rotated
  }
  */

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

Pose.DEFAULT = Pose.freeze({ x: 0, y: 0, z: 0, rotated: 0, mirrored: false })

export { Pose }
