/** @file city.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { District } from './district.js'
import { Model } from './model.js'

/**
 * City is a class for representing a hierarchical collection of 3D places.
 */
class City extends Model {
  getDistricts () {
    return this.children.filter(c => c instanceof District)
  }
}

export { City }
