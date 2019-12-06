/** @file campus.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { cornersFromShape, countTo, xy, xyz } from '../core/util.js'
import { Parcel } from '../architecture/parcel.js'
import { Place } from '../architecture/place.js'
import { Wurster } from '../structures/wurster.js'

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
class Campus extends Place {
  makeCampus (numBuildings = 1) {
    const offset = { ...PARCEL.offset }
    for (const i in countTo(numBuildings)) {
      offset.x = i * PARCEL.shape.data.x
      const ray = this._plato.goto(offset)
      const corners = cornersFromShape(PARCEL.shape)
      const parcel = new Parcel(corners, ray)
      this._plato.appendToSector(parcel)

      const wurster = new Wurster(this._plato)
      const groupForBuilding = wurster.makeBuilding(offset)
      parcel.add(groupForBuilding)
    }
  }
}

export { Campus }
