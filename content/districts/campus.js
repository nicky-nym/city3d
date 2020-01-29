/** @file campus.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { cornersFromShape, countTo, xy, xyz } from '../../src/core/util.js'
import { Parcel } from '../../src/architecture/parcel.js'
import { District } from '../../src/architecture/district.js'
import { WursterHall } from '../buildings/wurster_hall.js'

const PARCEL = {
  offset: xyz(0, 0, 0),
  shape: {
    type: 'rectangle',
    data: xy(360, 540)
  }
}

/**
 * Class representing a college campus.
 * @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
 */
class Campus extends District {
  makeCampus (numBuildings = 1) {
    const offset = { ...PARCEL.offset }
    for (const i in countTo(numBuildings)) {
      offset.x = i * PARCEL.shape.data.x
      const placement = this.goto(offset)
      const outline = cornersFromShape(PARCEL.shape)
      const parcel = new Parcel({ outline, placement })
      this.add(parcel)
      parcel.add(new WursterHall({ placement }))
    }
  }
}

export { Campus }
