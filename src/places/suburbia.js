/** @file suburbiajs
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { cornersFromShape, countTo, xy, xyz, xyzAdd } from '../core/util.js'
import { Place } from '../architecture/place.js'
import { Cottage } from '../structures/cottage.js'
import { Garage } from '../structures/garage.js'
import { House } from '../structures/house.js'

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
    for (const i in countTo(numParcels)) { // eslint-disable-line no-unused-vars
      this._plato.goto(offset)
      const parcel = this._plato.makeParcel(cornersFromShape(PARCEL.shape))

      let at

      const cottage = new Cottage(this._plato)
      at = xyzAdd(offset, xy(-154, 23))
      const groupForCottage = cottage.makeBuilding(at)
      parcel.add(groupForCottage)

      const garage = new Garage(this._plato)
      at = xyzAdd(offset, xy(-185, 23))
      const groupForGarage = garage.makeBuilding(at)
      parcel.add(groupForGarage)

      const house = new House(this._plato)
      at = xyzAdd(offset, xy(0, -200))
      house.makeBuilding(at)
    }
  }
}

export { Suburbia }
