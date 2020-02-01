/** @file window.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Opening } from './opening.js'

/**
* Window is a class for representing any kind of window in a wall
*/
class Window extends Opening {
  /**
   * Creates an instance of a window in a wall.
   * @param {string} [name]
   * @param {Ray} placement - location and compass direction
   * @param {object} [spec] - a specification object that is valid against window.schema.json.js
   */
  constructor ({
    name = 'Window',
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
   * @param {object} spec - an specification object that is valid against window.schema.json.js
   * @param {Ray} placement - location and compass direction
   */
  makeModelFromSpec (spec, placement) {
    const { name, unit, wallLength, /* motion, */ outline, /* leafCount, handleSide, */ at /*, casing */ } = spec
    // EXAMPLE:
    // name: 'kitchen window',
    // unit: 'feet',
    // motion: 'casement',
    // outline: { shape: 'rectangle', data: { x: 16, y: 7 } },
    // leafCount: { cols: 2 },
    // lites: { rows: 2, cols: 1 },
    // at: { x: 4, y: 3, from: 'left' },
    // casing: { width: 0.5 },

    this.name = name || this.name
    this.setWallLength(wallLength)
    this.setOutline(outline)
    at.y -= outline.size.y / 2
    this.setAt(at)

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }
  }
}

export { Window }
