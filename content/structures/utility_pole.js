/** @file utility_pole.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xyz } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { Geometry } from '../../src/core/geometry.js'
import { Structure } from '../../src/architecture/structure.js'

// TODO: refactor to merge this with _makeLine() in Swingset
function _makeLine (waypoints, ray, color) {
  const adjustedWaypoints = ray.applyRay(waypoints)
  const line = new Geometry.Line(adjustedWaypoints)
  return new Geometry.Instance(line, 0, color)
}

/**
 * Class representing a typical suburban telephone pole or powerline pole.
 */
class UtilityPole extends Structure {
  constructor (plato, city, { name, at = xyz(0, 0, 0) } = {}) {
    super(plato, city, name || 'Utility pole')
    at.z = 0
    at.facing = Facing.NORTH
    const ray = this._plato.goto(at)

    const WOOD = 0x663300
    const height = UNIT.feet(35)
    const pole = [
      xyz(0, 0, -6),
      xyz(0, 0, height)
    ]
    const upperCrossarm = [
      xyz(-4.5, 0, height - 2),
      xyz(+4.5, 0, height - 2)
    ]
    const lowerCrossarm = [
      xyz(-4, 0, height - 5),
      xyz(+4, 0, height - 5)
    ]
    this.add(_makeLine(pole, ray, WOOD))
    this.add(_makeLine(upperCrossarm, ray, WOOD))
    this.add(_makeLine(lowerCrossarm, ray, WOOD))
  }
}

export { UtilityPole }