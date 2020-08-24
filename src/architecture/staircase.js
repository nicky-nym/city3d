/** @file staircase.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { countTo } from '../core/util.js'
import { FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { LAYER } from './layer.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Outline } from '../core/outline.js'
import { Pose } from '../core/pose.js'

const BROWN = 0x806633

/**
* Stairs is a class for representing a flight of stairs
*/
class Staircase extends Model {
  /**
   * Creates an instance of a flight of stairs.
   * @param {string} [name]
   * @param {pose} [pose] - the location and orientation
   * @param {object} [spec] - a specification object that is valid against schema.defs.json.js
   */
  constructor ({
    name = 'Staircase',
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
    const { name, unit, pitch, outline /*, surface */ } = spec
    // EXAMPLE:
    // name: 'Front stairs',
    // unit: 'feet',
    // pitch: { rise: 7, run: 11 },
    // outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
    // surface: { material: 'wood' },

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    const corners = Outline.cornersFromSpec(outline)
    const xyPolygon = new Geometry.XYPolygon(corners)
    const squareFeet = xyPolygon.area()
    const metric = METRIC.CIRCULATION_AREA
    this.setValueForMetric(metric, squareFeet)

    // TODO: this a assumes the outline is a polygon that happens to be rectangular!
    // TODO: this a assumes stairs are oriented East to West!
    const length = corners[1].x - corners[0].x
    const width = corners[2].y - corners[1].y
    const numSteps = Math.abs(length / (pitch.run / 12))

    for (const i of countTo(numSteps)) {
      const z = (i + 1) * (pitch.rise / 12)
      const x = (i + 1) * (pitch.run / 12)
      const at = Pose.copy(pose)
      at.x += corners[0].x - x
      at.y += corners[0].y
      at.z += z
      const outline = {
        shape: 'rectangle',
        size: { x: (pitch.run / 12), y: width }
      }
      const treadCorners = Outline.cornersFromSpec(outline)
      this._makeSlab(treadCorners, at, LAYER.CIRCULATION, BROWN, 0, -0.1)
    }
  }

  // TODO: refactor to merge this with Roof._makeSlab()
  _makeSlab (corners, pose, layer, color, incline = 0, depth = -0.1) {
    const adjustedCorners = Pose.relocate(pose, corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline, depth })
    const p0 = { ...adjustedCorners[0], z: pose.z }
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, color)
    this.add(concreteThickPolygon)
  }
}

export { Staircase }
