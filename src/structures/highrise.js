/** @file wurster.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../core/unit.js'
import { xy, xyz } from '../core/util.js'
import { Building } from '../architecture/building.js'

const HIGHRISE_BUILDING_SPEC = {
  name: 'High-rise building',
  storyHeight: { type: 'randomInt', min: 9, max: 14 },
  offset: xyz(0, 0, 0),
  numStories: { type: 'randomInt', min: 4, max: 60 },
  shape: { type: 'rectangle', data: xy(10, 10) },
  roof: {
    parapetHeight: UNIT.feet(4)
  }
}

/**
 * Class representing a high-rise building.
 */
class Highrise extends Building {
  makeBuilding (size, at = { x: 0, y: 0 }) {
    HIGHRISE_BUILDING_SPEC.shape.data = size
    return super.makeBuildingFromSpec(HIGHRISE_BUILDING_SPEC, at)
  }
}

export { Highrise }
