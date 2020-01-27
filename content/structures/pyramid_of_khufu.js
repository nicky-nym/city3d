/** @file pyramid_of_khufu.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xyz } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { Roof } from '../../src/architecture/roof.js'
import { Ray } from '../../src/core/ray.js'
import { Structure } from '../../src/architecture/structure.js'

const FEET_PER_CUBIT = 1.717
const cubits = UNIT.define('cubits', length => length * FEET_PER_CUBIT)

const height = cubits(280)
const halfBaseSpan = cubits(440) / 2

/**
 * Class representing the Great Pyramid of Giza (aka the Pyramid of Khufu).
 */
class PyramidOfKhufu extends Structure {
  constructor ({ name = 'Great Pyramid of Giza', at = xyz(0, 0, 0) } = {}) {
    super({ name, at })
    this._ray = new Ray(Facing.NORTH)

    const PEAK = xyz(0, 0, height)
    const NE = xyz(halfBaseSpan, halfBaseSpan, 0)
    const SE = xyz(halfBaseSpan, -halfBaseSpan, 0)
    const SW = xyz(-halfBaseSpan, -halfBaseSpan, 0)
    const NW = xyz(-halfBaseSpan, halfBaseSpan, 0)

    const vertices = [PEAK, NE, SE, SW, NW]
    const indices = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1]
    ]
    const roofSpec = {
      custom: { vertices, indices }
    }
    this.add(new Roof({ placement: this._ray, deprecatedSpec: roofSpec }))
  }
}

export { PyramidOfKhufu }
