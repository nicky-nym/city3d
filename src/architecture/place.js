/** @file place.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Facing } from '../core/facing.js'
import { Ray } from '../core/ray.js'
import { xyz } from '../core/util.js'

/**
 * Place is an abstract superclass for places that have land, parcels, and buildings.
 */
class Place {
  constructor (plato, district) {
    this._plato = plato
    this._district = district
    this._ray = new Ray(Facing.NORTH, xyz(0, 0, 0))
    this._x0 = district._ray.xyz.x
    this._y0 = district._ray.xyz.y
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._ray.goto(facing, xyz(this._x0 + x, this._y0 + y, z))
    return this._ray
  }

  add (group) {
    this._district.add(group)
  }
}

export { Place }
