/** @file garage.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const GARAGE_BUILDING_SPEC = {
  name: 'Garage',
  storyHeight: 8,
  offset: xyz(0, 0, 0),
  numStories: 1,
  shape: { type: 'rectangle', data: xy(24, 21) },
  roof: {
    // TODO: make this a peaked roof instead
    parapetHeight: UNIT.feet(1)
  }
}

/**
* Class representing a suburban 2-car garage.
*/
class Garage extends Building {
  makeBuilding (at = { x: 0, y: 0 }) {
    return super.makeBuildingFromSpec(GARAGE_BUILDING_SPEC, at)
  }
}

export { Garage }
