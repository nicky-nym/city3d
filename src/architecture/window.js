/** @file window.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Opening } from './opening.js'
import { countTo } from '../core/util.js'

/**
* Window is a class for representing any kind of window in a wall
*/
class Window extends Opening {
  /**
   * Creates an instance of a window in a wall.
   * @param {string} [name]
   * @param {pose} [pose] - the location and orientation
   * @param {object} [spec] - a specification object that is valid against schema.defs.json.js
   */
  constructor ({
    name = 'Window',
    pose,
    spec
  } = {}) {
    super({ name })
    if (spec) {
      this.makeModelFromSpec(spec, pose)
    }
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against schema.defs.json.js
   * @param {pose} [pose] - the location and orientation
   */
  makeModelFromSpec (spec, pose) {
    let spacing = 0
    let numWindows = 1
    if (spec.repeat) {
      /* Example of repeat pattern:
       * repeat: {
       *   spacing: 9 + 2 / 12,
       *   feature: {
       *     motion: 'awning',
       *     outline: { shape: 'rectangle', size: { x: 8, y: 9 } },
       *     awning: { size: { x: 8, y: 5, z: 0 } }
       *   }
       * }
      */
      spacing = spec.repeat.spacing
      const wallLength = spec.wallLength
      numWindows = Math.floor(wallLength / spacing)
      const specCopy = { ...spec.repeat.feature }
      specCopy.wallLength = spec.wallLength
      specCopy.at = { ...spec.repeat.feature.at }
      spec = specCopy
    }

    const { name, unit, wallLength, /* motion, */ outline, /* leafCount, */ at /*, handleSide, casing */ } = spec
    /* Example of window spec:
     * name: 'kitchen window',
     * unit: 'feet',
     * motion: 'casement',
     * outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
     * leafCount: { cols: 2 },
     * lites: { rows: 2, cols: 1 },
     * at: { x: 4, y: 3, from: 'left' },
     * casing: { width: 0.5 }
     */

    this.name = name || this.name
    this.setWallLength(wallLength)
    this.setOutline(outline)

    for (const i of countTo(numWindows)) {
      const iAt = { ...at }
      iAt.x += (i + 0.5 - (numWindows / 2)) * spacing
      iAt.y -= this._outline.height() / 2
      this.pushAt(iAt)
    }

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }
  }
}

export { Window }
