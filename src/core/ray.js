/** @file ray.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Facing } from './facing.js'

/**
 * Ray is a class for representing a compass facing azimuth at an xyz location.
 */
class Ray {
  constructor (azimuth = Facing.NORTH, xyz = { x: 0, y: 0, z: 0 }) {
    this.az = azimuth
    this.xyz = xyz
  }
}

export { Ray }
