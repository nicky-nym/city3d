/** @file wurster.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const HIGHRISE_BUILDING_SPEC = {
  name: 'High-rise building',
  storeyHeight: { type: 'randomInt', min: 9, max: 14 },
  offset: xyz(0, 0, 0),
  numStoreys: { type: 'randomInt', min: 4, max: 60 },
  shape: { type: 'rectangle', data: null }, // rectangle size is set in constructor
  walls: [{
    windows: [{ type: 'rectangle', data: null, at: xy(1, 3) }]
  }, {
    windows: [{ type: 'rectangle', data: null, at: xy(1, 3) }]
  }, {
    windows: [{ type: 'rectangle', data: null, at: xy(1, 3) }]
  }, {
    windows: [{ type: 'rectangle', data: null, at: xy(1, 3) }]
  }],
  roof: {
    parapetHeight: UNIT.feet(4)
  }
}

/**
 * Class representing a high-rise building.
 */
class Highrise extends Building {
  constructor (size, { city, ray, x0, y0, name, at } = {}) {
    HIGHRISE_BUILDING_SPEC.shape.data = size
    for (const wallSpec of HIGHRISE_BUILDING_SPEC.walls) {
      for (const windowSpec of wallSpec.windows) {
        windowSpec.data = xy(size.x - 2, 5.5)
      }
    }
    super(HIGHRISE_BUILDING_SPEC, { city, ray, x0, y0, name, at })
  }
}

export { Highrise }
