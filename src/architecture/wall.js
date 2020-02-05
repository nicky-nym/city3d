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
import { Pitch } from '../core/pitch.js'
import { Window } from './window.js'
import { xy, hypotenuse } from '../core/util.js'

const ALMOST_WHITE = 0x999999
const DEFAULT_WALL_THICKNESS = 0.5

/**
 * The shape of this section of wall as it meets the roof.
 */
const ROOFLINE = {
  // NOTE: these values must exactly match the values in wall.schema.json.js
  GABLED: 'gabled',
  PITCHED: 'pitched',
  SHED: 'shed'
}

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

  /**
   * Return a number for the height of the wall, in feet (or some other unit).
   * @return {number} - the height of the wall, in feet (or some other unit)
   */
  height () {
    return this._height
  }

  /**
   * Return a number for the length of the wall, in feet (or some other unit).
   * @return {number} - the length of the wall, in feet (or some other unit)
   */
  length () {
    const dx = this._end.x - this._begin.x
    const dy = this._end.y - this._begin.y
    const length = hypotenuse(dx, dy)
    return length
  }

  /**
   * Return the {x:, y:} coordinate for the left corner of the wall (as viewed from the outside/front).
   * @return {object} - an {x:, y:} coordinate
   */
  begin () {
    return this._begin
  }

  /**
   * Return the {x:, y:} coordinate for the right corner of the wall (as viewed from the outside/front).
   * @return {object} - an {x:, y:} coordinate
   */
  end () {
    return this._end
  }

  /**
   * Return the {x:, y:} coordinate for the midpoint of the wall.
   * @return {object} - an {x:, y:} coordinate
   */
  midpoint () {
    const x = ((this._end.x - this._begin.x) / 2) + this._begin.x
    const y = ((this._end.y - this._begin.y) / 2) + this._begin.y
    return { x, y }
  }

  /**
   * Return one of: ROOFLINE.GABLED, ROOFLINE.PITCHED, or ROOFLINE.SHED
   * @return {ROOFLINE} - a type of roofline for this wall
   */
  roofline () {
    return this._roofline
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against wall.schema.json.js
   * @param {Ray} placement - location and compass direction
   */
  makeModelFromSpec (spec, placement) {
    let { name, unit, height, begin, end, roofline, pitch, firstWall, doors, windows /* , outside, inside */ } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    this._begin = begin
    this._end = end
    this._roofline = roofline
    this._pitch = pitch
    this._height = height
    this._firstWall = firstWall

    const length = this.length()

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
    let peakHeight = 0
    const dx = v2.x - v1.x
    const dy = v2.y - v1.y
    const length = hypotenuse(dx, dy)
    let xyPolygon = null

    if (!this._roofline || this._roofline === ROOFLINE.PITCHED) {
      if (height > 0) {
        xyPolygon = new Geometry.XYPolygon([xy(0, 0), xy(0, height), xy(length, height), xy(length, 0)])
      }
    } else if (this._roofline === ROOFLINE.GABLED) {
      const midLength = length / 2
      const pitch = new Pitch(this._pitch.rise, ':', this._pitch.run)
      peakHeight = height + pitch.slope() * midLength
      if (height > 0) {
        xyPolygon = new Geometry.XYPolygon([xy(0, 0), xy(0, height), xy(midLength, peakHeight), xy(length, height), xy(length, 0)])
      } else {
        xyPolygon = new Geometry.XYPolygon([xy(0, 0), xy(midLength, peakHeight), xy(length, 0)])
      }
    } else if (this._roofline === ROOFLINE.SHED) {
      const pitch = new Pitch(this._pitch.rise, ':', this._pitch.run)
      peakHeight = height + pitch.slope() * length
      if (this._firstWall) {
        xyPolygon = new Geometry.XYPolygon([xy(0, 0), xy(0, peakHeight), xy(length, height), xy(length, 0)])
      } else {
        xyPolygon = new Geometry.XYPolygon([xy(0, 0), xy(0, height), xy(length, peakHeight), xy(length, 0)])
      }
    } else {
      throw new Error('bad roofline type in spec for new Wall()')
    }
    if (xyPolygon) {
      const incline = height
      const zRotation = Math.atan2(dy, dx)
      const abstractWall = new Geometry.ThickPolygon(xyPolygon, { incline, zRotation, depth, openings })
      const concreteWall = new FeatureInstance(abstractWall, { ...v1, z }, ALMOST_WHITE)
      this.add(concreteWall)

      this.setValueForMetric(METRIC.WALL_AREA, abstractWall.area())
      this.setValueForMetric(METRIC.WINDOW_AREA, abstractWall.areaOfOpenings()) // TODO: separate out doors vs. windows
      // this.setValueForMetric(METRIC.DOOR_AREA, abstractWall.areaOfOpenings()) // TODO: separate out doors vs. windows
    }
  }
}

Wall.layer = Feature.registerLayer(Wall, 'walls', { category: 'Buildings' })

export { Wall }
