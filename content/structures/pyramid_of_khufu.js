/** @file pyramid_of_khufu.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xy } from '../../src/core/util.js'
import { Roof } from '../../src/architecture/roof.js'
import { Structure } from '../../src/architecture/structure.js'
import { Wall } from '../../src/architecture/wall.js'

const FEET_PER_CUBIT = 1.717
const cubits = UNIT.define('cubits', length => length * FEET_PER_CUBIT)

const height = cubits(280)
const baseSpan = cubits(440)
const halfBaseSpan = baseSpan / 2

/**
 * Class representing the Great Pyramid of Giza (aka the Pyramid of Khufu).
 */
class PyramidOfKhufu extends Structure {
  constructor ({ name = 'Great Pyramid of Giza', pose } = {}) {
    super({ name, pose })

    const NE = xy(halfBaseSpan, halfBaseSpan)
    const SE = xy(halfBaseSpan, -halfBaseSpan)
    const SW = xy(-halfBaseSpan, -halfBaseSpan)
    const NW = xy(-halfBaseSpan, halfBaseSpan)

    const spec = {
      name: 'Roof',
      form: 'hipped',
      outline: { shape: 'polygon', corners: [NW, SW, SE, NE] },
      pitch: { rise: height, run: halfBaseSpan },
      eaves: 0
    }
    // TODO: refactor Roof so that we don't need to pass in any walls
    const walls = [
      new Wall({ spec: { begin: NW, end: SW } }),
      new Wall({ spec: { begin: SW, end: SE } }),
      new Wall({ spec: { begin: SE, end: NE } }),
      new Wall({ spec: { begin: NE, end: NW } })
    ]
    this.add(new Roof({ pose: this.pose(), spec, walls }))
  }
}

export { PyramidOfKhufu }
