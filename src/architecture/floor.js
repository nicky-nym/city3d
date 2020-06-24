/** @file floor.js
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
import { Pose } from '../core/pose.js'

// const WHITE = 0xffffff
// const RED = 0xcc0000 // eslint-disable-line no-unused-vars
// const BLACKTOP = 0x1a1a1a // very dark grey
// const GREEN = 0x00ff00 // eslint-disable-line no-unused-vars
// const BLUE = 0x0000ff
// const YELLOW = 0xffff00

// const GREEN_GRASS = 0x003300
const BROWN = 0x806633
// const DARK_GRAY = 0x404040
// const LIGHT_GRAY = 0xdddddd
// const BLUE_GLASS = 0x9a9aff // eslint-disable-line no-unused-vars
// const MARTIAN_ORANGE = 0xdf4911

// const COLORS_BY_USE = {
//   STREET: BLACKTOP,
//   BIKEPATH: MARTIAN_ORANGE,
//   WALKWAY: YELLOW,
//   ROOM: BROWN,
//   CIRCULATION: YELLOW,
//   UNFINISHED: LIGHT_GRAY,
//   BARE: LIGHT_GRAY,
//   PARCEL: GREEN_GRASS,
//   CANAL: BLUE,
//   WALL: WHITE,
//   ROOF: DARK_GRAY,
//   DOOR: YELLOW
// }

const METRICS_BY_USE = Object.freeze({
  STREET: METRIC.TRANSPORTATION_AREA,
  BIKEPATH: METRIC.TRANSPORTATION_AREA,
  WALKWAY: METRIC.TRANSPORTATION_AREA,
  CIRCULATION: METRIC.CIRCULATION_AREA,
  UNFINISHED: METRIC.MECHANICAL_AREA,
  BARE: null,
  ROOM: METRIC.NET_ASSIGNABLE_AREA,
  PARCEL: METRIC.LAND_AREA,
  CANAL: METRIC.WATER_AREA,
  ROOF: METRIC.ROOF_AREA
})

/**
* Floor is a class for representing the floorboards or flooring surface of a storey
*/
class Floor extends Model {
  /**
   * Creates an instance for the floor of a storey.
   * @param {string} [name]
   * @param {pose} [pose] - the location and orientation
   * @param {object} [spec] - a specification object that is valid against floor.schema.json.js
   */
  constructor ({
    name = 'Floor',
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
   * @param {object} spec - an specification object that is valid against floor.schema.json.js
   * @param {pose} [pose] - the location and orientation
   */
  makeModelFromSpec (spec, pose) {
    let { name, unit, outline, incline = 0, /* surface, */ openings } = spec
    // EXAMPLE:
    // name: 'Expansive hardwood floor',
    // unit: 'feet',
    // outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
    // surface: { style: 'parquet', material: 'wood' },

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    const openingSpecs = openings || []
    openings = []
    for (const opening of openingSpecs) {
      const corners = Outline.cornersFromSpec(opening)
      const adjustedCorners = Pose.relocate(pose, corners)
      openings.push(adjustedCorners)
    }
    const corners = Outline.cornersFromSpec(outline)
    const adjustedCorners = Pose.relocate(pose, corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const color = BROWN // COLORS_BY_USE[use]
    const depth = -0.5
    // const incline = 0
    const z = pose.z
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline, depth, openings })
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, { ...xyPolygon[0], z }, color,
      { layer: LAYER.FLOORS })
    this.add(concreteThickPolygon)
    const squareFeet = xyPolygon.area()

    const metric = METRICS_BY_USE.BARE
    if (metric) {
      // TODO: This code isn't right.
      // We should only set GROSS_FLOOR_AREA here.
      // Things like CIRCULATION_AREA should be set on a Room by Room basis, not per Storey.
      this.setValueForMetric(metric, squareFeet)
      if (metric === METRIC.CIRCULATION_AREA || metric === METRIC.MECHANICAL_AREA || metric === METRIC.NET_ASSIGNABLE_AREA) {
        this.setValueForMetric(METRIC.GROSS_FLOOR_AREA, squareFeet)
      }
    }
  }
}

export { Floor }
