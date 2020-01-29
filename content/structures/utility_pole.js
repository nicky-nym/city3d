/** @file utility_pole.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xyz } from '../../src/core/util.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { Structure } from '../../src/architecture/structure.js'

// TODO: refactor to merge this with _makeLine() in Swingset
function _makeLine (waypoints, placement, color) {
  const adjustedWaypoints = placement.applyRay(waypoints)
  const line = new Geometry.Line(adjustedWaypoints)
  return new FeatureInstance(line, adjustedWaypoints[0], color, { layer: Structure.layer })
}

/**
 * Class representing a typical suburban telephone pole or powerline pole.
 */
class UtilityPole extends Structure {
  constructor ({ name = 'Utility pole', placement } = {}) {
    super({ name, placement })
    this._makeGeometry()
  }

  _makeGeometry () {
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
    const at = this.placement()
    this.add(_makeLine(pole, at, WOOD))
    this.add(_makeLine(upperCrossarm, at, WOOD))
    this.add(_makeLine(lowerCrossarm, at, WOOD))
  }
}

export { UtilityPole }
