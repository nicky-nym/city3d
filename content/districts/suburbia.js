/** @file suburbiajs
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Byway } from '../../src/architecture/byway.js'
import { cornersFromShape, countTo, xy, xyz } from '../../src/core/util.js'
import { Cottage } from '../buildings/cottage.js'
import { District } from '../../src/architecture/district.js'
import { Garage } from '../buildings/garage.js'
import { House } from '../buildings/house.js'
import { METRIC } from '../../src/architecture/metric.js'
import { Parcel } from '../../src/architecture/parcel.js'
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
class Suburbia extends District {
  addStreet (numParcels = 1) {
    const offset = { ...PARCEL.offset }
    for (const i in countTo(numParcels)) {
      offset.y = PARCEL.offset.y + i * PARCEL_DY
      this.goto(offset)
      const parcel = new Parcel({
        outline: cornersFromShape(PARCEL.shape),
        placement: this._ray
      })
      this.add(parcel)

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

      this.add(new Byway(this._ray, Use.WALKWAY, SIDEWALK))
      this.add(new Byway(this._ray, Use.STREET, STREET))

      const ray = this._ray
      const x0 = ray.xyz.x
      const y0 = ray.xyz.y

      parcel.add(new Cottage({ ray, at: xy(-154 + x0, 23 + y0) }))
      parcel.add(new Garage({ ray, at: xy(-185 + x0, 23 + y0) }))
      parcel.add(new House({ ray, at: xy(x0, y0) }))

      const PEOPLE_PER_PARCEL = 3
      this.setValueForMetric(METRIC.POPULATION, numParcels * PEOPLE_PER_PARCEL)
    }
  }
}

export { Suburbia }
