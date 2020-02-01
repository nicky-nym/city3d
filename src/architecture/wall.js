/** @file wall.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Door } from './door.js'
import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Window } from './window.js'
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
   * @param {string} [name]
   * @param {Ray} placement - location and compass direction
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   * @param {object} [spec] - a specification object that is valid against wall.schema.json.js
   *
   * @param {xy} deprecatedSpec.v1 - first endpoint of the base of the wall, projected onto XY plane
   * @param {xy} deprecatedSpec.v2 - second endpoint of the base of the wall, projected onto XY plane
   * @param {number} deprecatedSpec.height - height of the wall
   * @param {number} [deprecatedSpec.z=0] - z-offset of the wall
   * @param {number} [deprecatedSpec.depth=DEFAULT_WALL_THICKNESS] - thickness of the wall
   * @param {xy[][]} [deprecatedSpec.openings] - array of openings, where each is specified by an array of xy values
   */
  constructor ({
    name = 'Wall',
    placement,
    deprecatedSpec, // v1, v2, height, z, depth, openings
    spec
  } = {}) {
    super({ name, layer: Wall.layer })
    if (deprecatedSpec) {
      this._makeModelFromDeprecatedSpec(deprecatedSpec)
    }
    if (spec) {
      this.makeModelFromSpec(spec, placement)
    }
  }

  height () {
    return this._height
  }

  end () {
    return this._end
  }

  roofline () {
    return this._roofline
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against wall.schema.json.js
   * @param {Ray} placement - location and compass direction
   */
  makeModelFromSpec (spec, placement) {
    let { name, unit, height, begin, end, roofline, doors, windows /* , outside, inside */ } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    this._begin = begin
    this._end = end
    this._roofline = roofline
    this._height = height

    const dx = end.x - begin.x
    const dy = end.y - begin.y
    const length = hypotenuse(dx, dy)

    const openings = []
    doors = doors || []
    for (const doorSpec of doors) {
      doorSpec.wallLength = length
      const door = new Door({ spec: doorSpec })
      openings.push(door.opening())
    }
    windows = windows || []
    for (const windowSpec of windows) {
      windowSpec.wallLength = length
      const window = new Window({ spec: windowSpec })
      openings.push(window.opening())
    }

    const deprecatedSpec = {
      v1: begin,
      v2: end,
      height: height,
      z: placement.xyz.z,
      depth: -DEFAULT_WALL_THICKNESS,
      openings: openings
    }
    this._makeModelFromDeprecatedSpec(deprecatedSpec)
  }

  _makeModelFromDeprecatedSpec (deprecatedSpec) {
    const v1 = deprecatedSpec.v1
    const v2 = deprecatedSpec.v2
    const height = deprecatedSpec.height
    const z = deprecatedSpec.z || 0
    const depth = deprecatedSpec.depth || -DEFAULT_WALL_THICKNESS
    const openings = deprecatedSpec.openings || []

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
}

Wall.layer = Feature.registerLayer(Wall, 'walls', { category: 'Buildings' })

export { Wall }
