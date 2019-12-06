/** @file ray.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xyzAdd, xyRotate } from '../core/util.js'
import { Facing } from './facing.js'

/**
 * Ray is a class for representing a compass facing azimuth at an xyz location.
 */
class Ray {
  constructor (azimuth = Facing.NORTH, xyz = { x: 0, y: 0, z: 0 }) {
    this.az = azimuth
    this.xyz = xyz
  }

  goto (azimuth, xyz) {
    this.az = azimuth
    this.xyz = xyz
  }

  applyRay (xyzList) {
    const transformed = []
    for (const xyzPoint of xyzList) {
      const rotated = xyRotate(xyzPoint, this.az)
      rotated.z = xyzPoint.z
      transformed.push(xyzAdd(rotated, this.xyz))
    }
    return transformed
  }
}

export { Ray }
