/** @file place.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

/**
 * Place is an abstract superclass for places that have land, parcels, and buildings.
 */
class Place {
  constructor (plato, city) {
    this._plato = plato
    this._city = city
  }
}

export { Place }
