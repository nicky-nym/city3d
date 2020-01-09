/** @file city.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { District } from './district.js'
import { Kayak } from '../../content/movers/kayak.js'
import { Model } from './model.js'
import { Use } from './use.js'
import { Vehicle } from '../../content/movers/vehicle.js'
import { randomInt } from '../../src/core/util.js'

/**
 * City is a class for representing a hierarchical collection of 3D places.
 */
class City extends Model {
  populateRoutes () {
    for (const route of this.getRoutes()) {
      // TODO: use route.speedLimit(), maybe by having a maxSpeed option for Movers.
      if (route.use === Use.CANAL) {
        this.add(new Kayak(route))
      } else {
        this.add(new Vehicle(route, randomInt(3, 10) * 0.04))
      }
    }
  }

  getDistricts () {
    return this.children.filter(c => c instanceof District)
  }
}

export { City }
