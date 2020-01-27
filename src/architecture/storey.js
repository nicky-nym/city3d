/** @file storey.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Use } from './use.js'
import { Wall } from './wall.js'

const WHITE = 0xffffff
const RED = 0xcc0000 // eslint-disable-line no-unused-vars
const BLACKTOP = 0x1a1a1a // very dark grey
const GREEN = 0x00ff00 // eslint-disable-line no-unused-vars
const BLUE = 0x0000ff
const YELLOW = 0xffff00

const GREEN_GRASS = 0x003300
const BROWN = 0x806633
const DARK_GRAY = 0x404040
const LIGHT_GRAY = 0xdddddd
const BLUE_GLASS = 0x9a9aff // eslint-disable-line no-unused-vars
const MARTIAN_ORANGE = 0xdf4911

const COLORS_BY_USE = {
  STREET: BLACKTOP,
  BIKEPATH: MARTIAN_ORANGE,
  WALKWAY: YELLOW,
  ROOM: BROWN,
  CIRCULATION: YELLOW,
  UNFINISHED: LIGHT_GRAY,
  BARE: LIGHT_GRAY,
  PARCEL: GREEN_GRASS,
  CANAL: BLUE,
  WALL: WHITE,
  ROOF: DARK_GRAY,
  DOOR: YELLOW
}

const METRICS_BY_USE = {
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
}

function _addWalls (group, xyPolygon, height, z, openingsByWall, cap) {
  let i = 0
  for (const v of xyPolygon) {
    const entryForThisWall = openingsByWall.find(item => item[0] === i)
    const openings = entryForThisWall ? entryForThisWall[1] : []
    i++
    if (cap || i < xyPolygon.length) {
      const next = i % xyPolygon.length
      const near = v
      const far = xyPolygon[next]
      group.add(new Wall({ name: `Wall ${i}`, deprecatedSpec: { v1: near, v2: far, height, z, openings } }))
    }
  }
}

/**
 * Storey is a class for representing one storey of a building.
 */
class Storey extends Model {
  /**
   * Creates an instance of a Storey, with walls and a floor.
   * @param {string} [name] - name of the storey
   * @param {xy[]} outline - vertices of floor, expected to be in counterclockwise order
   * @param {Ray} placement - location and compass direction
   * @param {string} use - e.g. Use.ROOM
   * @param {number} [z=0] - z-offset of the wall
   * @param {number} [incline=0] - z-offset of second corner relative to first
   * @param {number} [depth=-0.5] - floor is between z and z + depth, so positive means bottom of floor is at
   *                                z and negative means top of floor is at z.
   * @param {boolean} [cap=true] - whether to include floor
   * @param {number} [wall=0] - height of walls
   * @param {xy[][]} [openings=[]] - array of openings, where each is specified by an array of xy values
   */
  constructor ({
    name,
    outline,
    placement,
    deprecatedSpec = {}
  } = {}) {
    const use = deprecatedSpec.use
    let z = deprecatedSpec.z || 0
    const incline = deprecatedSpec.incline || 0
    const depth = deprecatedSpec.depth || -0.5
    const cap = deprecatedSpec.cap || true
    const wall = deprecatedSpec.wall || 0
    const openings = deprecatedSpec.openings || []
    super({ name: name || use })
    this._depth = depth
    z = z + placement.xyz.z
    name = name || `${Use[use]}${outline.name ? ` (${outline.name})` : ''}`
    const adjustedCorners = placement.applyRay(outline)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    if (cap) {
      const color = COLORS_BY_USE[use]
      const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline: incline, depth: depth })
      const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, { ...xyPolygon[0], z }, color,
        { layer: Floor.layer })
      this.add(concreteThickPolygon)
      const squareFeet = xyPolygon.area()

      const metric = METRICS_BY_USE[use]
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
    if (wall !== 0) {
      _addWalls(this, xyPolygon, wall, z, openings, cap)
    }
  }

  floorDepth () {
    return this._depth
  }
}

// This can stay here unless and until another class needs it.
class Floor {}
Floor.layer = Feature.registerLayer(Floor, 'floors & ramps', { category: 'Buildings' })

export { Storey }
