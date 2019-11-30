/** @file structure.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

/**
 * Structure is an abstract superclass for buildings, city blocks, and other types of structures.
 */
class Structure {
  constructor (plato, city) {
    this._plato = plato
    this._city = city
  }
}

export { Structure }