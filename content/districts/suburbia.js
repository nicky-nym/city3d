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
      const placement = this.goto(offset)
      const outline = cornersFromShape(PARCEL.shape)
      const deprecatedSpec = { outline }
      const parcel = new Parcel({ deprecatedSpec, placement })
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

      this.add(new Byway({ placement, outline: SIDEWALK, deprecatedSpec: { use: Use.WALKWAY } }))
      this.add(new Byway({ placement, outline: STREET, deprecatedSpec: { use: Use.STREET } }))

      parcel.add(new Cottage({ placement: placement.add(xy(-154, 23)) }))
      parcel.add(new Garage({ placement: placement.add(xy(-185, 23)) }))
      parcel.add(new House({ placement }))

      const PEOPLE_PER_PARCEL = 3
      this.setValueForMetric(METRIC.POPULATION, numParcels * PEOPLE_PER_PARCEL)
    }
  }
}

export { Suburbia }
