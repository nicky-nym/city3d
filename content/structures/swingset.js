/** @file swingset.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xyz } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { Ray } from '../../src/core/ray.js'
import { Structure } from '../../src/architecture/structure.js'

const WOOD = 0x663300
const STEEL = 0x404040

function _makeLine (waypoints, ray, color) {
  const adjustedWaypoints = ray.applyRay(waypoints)
  const line = new Geometry.Line(adjustedWaypoints)
  return new FeatureInstance(line, adjustedWaypoints[0], color, { layer: Structure.layer })
}

/**
 * Class representing a playground swing set.
 * TODO: animate me!
 */
class Swingset extends Structure {
  constructor ({ name, at = xyz(0, 0, 0) } = {}) {
    super({ name: name || 'Swing set', at })
    const height = UNIT.feet(8)
    const halfDepth = UNIT.feet(9) / 2
    const span = UNIT.feet(10)
    const splay = UNIT.feet(1)
    const ray = new Ray(Facing.NORTH)
    const crossBar = [
      xyz(0, 0, height),
      xyz(span, 0, height)
    ]
    const leftTruss = [
      xyz(-splay, -halfDepth, 0),
      xyz(0, 0, height),
      xyz(-splay, +halfDepth, 0)
    ]
    const rightTruss = [
      xyz(splay + span, -halfDepth, 0),
      xyz(span, 0, height),
      xyz(splay + span, +halfDepth, 0)
    ]
    const leftSwing = [
      xyz(2, 0, height),
      xyz(2, -1, 1.5),
      xyz(3.4, -1, 1.5),
      xyz(3.4, 0, height)
    ]
    const rightSwing = [
      xyz(6, 0, height),
      xyz(6, 1.8, 2),
      xyz(7.4, 1.8, 2),
      xyz(7.4, 0, height)
    ]
    this.add(_makeLine(crossBar, ray, WOOD))
    this.add(_makeLine(leftTruss, ray, WOOD))
    this.add(_makeLine(rightTruss, ray, WOOD))
    this.add(_makeLine(leftSwing, ray, STEEL))
    this.add(_makeLine(rightSwing, ray, STEEL))
  }
}

export { Swingset }
