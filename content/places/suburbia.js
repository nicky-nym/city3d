/** @file suburbiajs
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Byway } from '../../src/architecture/byway.js'
import { cornersFromShape, countTo, xy, xyz, xyzAdd } from '../../src/core/util.js'
import { Cottage } from '../buildings/cottage.js'
import { Garage } from '../buildings/garage.js'
import { House } from '../buildings/house.js'
import { Parcel } from '../../src/architecture/parcel.js'
import { Place } from '../../src/architecture/place.js'
import { Use } from '../../src/architecture/use.js'

const PARCEL_DY = 50
const PARCEL_X0_NORTH = -232.72
const PARCEL_X0_SOUTH = -224.15
const PARCEL = {
  offset: xyz(0, 0, 0),
  shape: {
    type: 'xyPolygon',
    data: [
      xy(PARCEL_X0_SOUTH, 0),
      xy(PARCEL_X0_NORTH, PARCEL_DY),
      xy(0, PARCEL_DY),
      xy(0, 0)]
  }
}

/**
* Class representing a low-density suburb of single-family homes.
*/
class Suburbia extends Place {
  addStreet (numParcels = 1) {
    const offset = { ...PARCEL.offset }
    for (const i in countTo(numParcels)) {
      offset.y = PARCEL.offset.y + i * PARCEL_DY
      this.goto(offset)
      const corners = cornersFromShape(PARCEL.shape)
      const parcel = new Parcel(corners, this._ray)
      this._district.add(parcel)

      const STREET_DX = 15
      const STREET_DY = PARCEL_DY

      const SIDEWALK_WIDTH = 6
      const SIDEWALK = [
        xy(0, 0),
        xy(SIDEWALK_WIDTH, 0),
        xy(SIDEWALK_WIDTH, STREET_DY),
        xy(0, STREET_DY)]

      const STREET = [
        xy(SIDEWALK_WIDTH, 0),
        xy(SIDEWALK_WIDTH, STREET_DY),
        xy(SIDEWALK_WIDTH + STREET_DX, STREET_DY),
        xy(SIDEWALK_WIDTH + STREET_DX, 0)]

      this._district.add(new Byway(this._ray, Use.WALKWAY, SIDEWALK))
      this._district.add(new Byway(this._ray, Use.STREET, STREET))

      let at
      const { _ray: ray, _x0: x0, _y0: y0 } = this

      at = xyzAdd(offset, xy(-154, 23))
      parcel.add(new Cottage({ ray, x0, y0, at }))

      at = xyzAdd(offset, xy(-185, 23))
      parcel.add(new Garage({ ray, x0, y0, at }))

      at = xyzAdd(offset, xy(STREET_DX + SIDEWALK_WIDTH, 0))
      parcel.add(new House({ ray, x0, y0, at }))
    }
  }
}

export { Suburbia }
