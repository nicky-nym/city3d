/** @file pose.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { xyzAdd, xyRotate } from '../core/util.js'

/**
 * Pose is a class for representing how an instance of a 3D object is place in a position.
 * See: pose.schema.json.js
 */
class Pose {
  constructor (pose = { x: 0, y: 0, z: 0, rotated: 0, mirrored: false }) {
    this.pose = { ...pose }
  }

  copy () {
    return new Pose(this.pose)
  }

  pose () {
    return this.pose
  }
}

export { Pose }
