/** @file door.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Opening } from './opening.js'

/**
* Door is a class for representing any kind of door in a wall
*/
class Door extends Opening {
  /**
   * Creates an instance of a door in a wall.
   * @param {string} [name]
   * @param {Ray} placement - location and compass direction
   * @param {object} [spec] - a specification object that is valid against door.schema.json.js
   */
  constructor ({
    name = 'Door',
    placement,
    spec
  } = {}) {
    super({ name })
    if (spec) {
      this.makeModelFromSpec(spec, placement)
    }
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against door.schema.json.js
   * @param {Ray} placement - location and compass direction
   */
  makeModelFromSpec (spec, placement) {
    const { name, unit, wallLength, /* motion, */ outline, /* leafCount, handleSide, */ at /*, casing */ } = spec
    // EXAMPLE:
    // name: 'garage door',
    // unit: 'feet',
    // motion: 'overhead',
    // outline: { shape: 'rectangle', data: { x: 16, y: 7 } },
    // leafCount: { rows: 5 },
    // handleSide: 'left',
    // at: { x: 12 },
    // casing: { width: 0.5 },

    this.name = name || this.name
    this.setWallLength(wallLength)
    this.setOutline(outline)
    this.pushAt(at)

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }
  }
}

export { Door }
