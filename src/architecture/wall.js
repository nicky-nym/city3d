/** @file wall.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { xy, hypotenuse } from '../core/util.js'

const ALMOST_WHITE = 0x999999
const DEFAULT_WALL_THICKNESS = 0.5

/**
* Wall is a class to represent a single flat wall on a single storey of a building.
* For example, a square garden shed would have four walls, and four instances of Wall.
* A one-storey house would have 4 instances of Wall, and a two-storey house would
* have 8 instances of wall.
* Walls can have Doors and Windows.
*/
class Wall extends Model {
  /**
   * Creates an instance of a wall between two points.
   * @param {xy} v1 - first endpoint of the base of the wall, projected onto XY plane
   * @param {xy} v2 - second endpoint of the base of the wall, projected onto XY plane
   * @param {number} height - height of the wall
   * @param {number} [z=0] - z-offset of the wall
   * @param {number} [depth=DEFAULT_WALL_THICKNESS] - thickness of the wall
   * @param {xy[][]} [openings] - array of openings, where each is specified by an array of xy values
   * @param {string} [name]
   */
  constructor ({
    name = 'Wall',
    deprecatedSpec = {} // v1, v2, height, z, depth, openings
  } = {}) {
    const v1 = deprecatedSpec.v1
    const v2 = deprecatedSpec.v2
    const height = deprecatedSpec.height
    const z = deprecatedSpec.z || 0
    const depth = deprecatedSpec.depth || -DEFAULT_WALL_THICKNESS
    const openings = deprecatedSpec.openings || []

    super({ name, layer: Wall.layer })
    this._height = height
    const dx = v2.x - v1.x
    const dy = v2.y - v1.y
    const length = hypotenuse(dx, dy)
    const xyPolygon = new Geometry.XYPolygon([xy(0, 0), xy(0, height), xy(length, height), xy(length, 0)])
    const zRotation = Math.atan2(dy, dx)
    const abstractWall = new Geometry.ThickPolygon(xyPolygon, { incline: height, zRotation, depth, openings })
    const concreteWall = new FeatureInstance(abstractWall, { ...v1, z }, ALMOST_WHITE)
    this.add(concreteWall)

    this.setValueForMetric(METRIC.WALL_AREA, abstractWall.area())
    this.setValueForMetric(METRIC.WINDOW_AREA, abstractWall.areaOfOpenings()) // TODO: separate out doors vs. windows
    // this.setValueForMetric(METRIC.DOOR_AREA, abstractWall.areaOfOpenings()) // TODO: separate out doors vs. windows
  }

  height () {
    return this._height
  }
}

Wall.layer = Feature.registerLayer(Wall, 'walls', { category: 'Buildings' })

export { Wall }
