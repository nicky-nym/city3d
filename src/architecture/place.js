/** @file place.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Facing } from '../core/facing.js'
import { xyz } from '../core/util.js'

/**
 * Place is an abstract superclass for places that have land, parcels, and buildings.
 */
class Place {
  constructor (plato, city) {
    this._plato = plato
    this._city = city
    this._ray = plato._ray
    this._x0 = plato._x0
    this._y0 = plato._y0
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._ray.goto(facing, xyz(this._x0 + x, this._y0 + y, z))

    this._plato.goto(...arguments)

    return this._ray
  }

  add (group) {
    this._plato.appendToDistrict(group)
  }
}

export { Place }
