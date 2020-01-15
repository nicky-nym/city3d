/** @file garage.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const GARAGE_BUILDING_SPEC = {
  name: 'Garage',
  storeyHeight: 8,
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(24, 21) },
  roof: {
    // TODO: make this a peaked roof instead
    parapetHeight: 1
  }
}

/**
* Class representing a suburban 2-car garage.
*/
class Garage extends Building {
  constructor ({ city, ray, x0, y0, at = xyz(0, 0, 0), name } = {}) {
    super(GARAGE_BUILDING_SPEC, { city, ray, x0, y0, name, at })
  }
}

export { Garage }
