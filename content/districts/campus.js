/** @file campus.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { countTo, xy } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { District } from '../../src/architecture/district.js'
import { WursterHall } from '../buildings/wurster_hall.js'

/**
 * Class representing a college campus.
 * @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
 */
class Campus extends District {
  makeCampus (numBuildings = 1) {
    for (const i in countTo(numBuildings)) {
      const offset = xy(560 + i * 400, 140)
      const placement = this.goto(offset)
      placement.az = Facing.WEST
      this.add(new WursterHall({ placement }))
    }
  }
}

export { Campus }
