/** @file water.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { LAYER } from './layer.js'
import { METRIC } from './metric.js'
import { Pavement } from './pavement.js'

/**
* Water is a class for representing creeks, canals, ponds, and water fountains
*/
class Water extends Pavement {
  /**
   * Creates an instance for a body of water.
   * @param {string} [name]
   * @param {Ray} placement - location and compass direction
   * @param {object} [spec] - a specification object
   */
  constructor ({
    name = 'Water',
    placement,
    spec
  } = {}) {
    super({ name, placement, spec })
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object
   * @param {Ray} placement - location and compass direction
   */
  makeModelFromSpec (spec, placement) {
    const BLUE = 0x0000ff
    const layer = LAYER.WATER
    const metric = METRIC.WATER_AREA
    this._makeGeometry(spec, placement, layer, metric, BLUE)
  }
}

export { Water }
