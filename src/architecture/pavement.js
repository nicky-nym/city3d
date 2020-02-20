/** @file pavement.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { LAYER } from './layer.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Outline } from '../core/outline.js'

const BLACKTOP = 0x1a1a1a // very dark grey
const DARK_GRAY = 0x404040
const LIGHT_GRAY = 0xdddddd
const BROWN = 0x806633

const COLORS_BY_SURFACE = {
  asphalt: BLACKTOP,
  gravel: DARK_GRAY,
  concrete: LIGHT_GRAY,
  dirt: BROWN
}

/**
* Pavement is a class for representing paved outdoor surfaces, like streets, sidewalks, driveways, and bike paths
*/
class Pavement extends Model {
  /**
   * Creates an instance for a section of pavement.
   * @param {string} [name]
   * @param {Ray} placement - location and compass direction
   * @param {object} [spec] - a specification object
   */
  constructor ({
    name = 'Pavement',
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
   * @param {object} spec - an specification object
   * @param {Ray} placement - location and compass direction
   */
  makeModelFromSpec (spec, placement) {
    const color = COLORS_BY_SURFACE[spec.surface.material]
    const layer = LAYER.PAVEMENT
    const metric = METRIC.TRANSPORTATION_AREA
    this._makeGeometry(spec, placement, layer, metric, color)
  }

  _makeGeometry (spec, placement, layer, metric, color) {
    const { name, outline } = spec
    // EXAMPLE:
    // name: 'Gravel driveway',
    // outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
    // surface: { material: 'gravel' },

    this.name = name || this.name

    const corners = Outline.cornersFromSpec(outline)
    const adjustedCorners = placement.applyRay(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const depth = -0.5
    const incline = 0
    const z = placement.xyz.z
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline: incline, depth: depth })
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, { ...xyPolygon[0], z }, color, { layer })
    this.add(concreteThickPolygon)
    const squareFeet = xyPolygon.area()

    this.setValueForMetric(metric, squareFeet)
  }
}

export { Pavement }
