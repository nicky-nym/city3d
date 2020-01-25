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
      group.add(new Wall(near, far, height, { z, openings, name: `Wall ${i}` }))
    }
  }
}

/**
 * Storey is a class for representing one storey of a building.
 */
class Storey extends Model {
  /**
   * Creates an instance of a Storey, with walls and a floor.
   * @param {Ray} ray - location and compass direction
   * @param {string} use - e.g. Use.ROOM
   * @param {xy[]} corners - vertices of floor, expected to be in counterclockwise order
   * @param {number} [z=0] - z-offset of the wall
   * @param {number} [incline=0] - z-offset of second corner relative to first
   * @param {number} [depth=-0.5] - floor is between z and z + depth, so positive means bottom of floor is at
   *                                z and negative means top of floor is at z.
   * @param {boolean} [cap=true] - whether to include floor
   * @param {number} [wall=0] - height of walls
   * @param {xy[][]} [openings=[]] - array of openings, where each is specified by an array of xy values
   * @param {string} [name] - name of the storey
   */
  constructor (ray, use, corners, { z = 0, incline = 0, depth = -0.5, cap = true, wall = 0, openings = [], name } = {}) {
    super(name || use)
    this._depth = depth
    z = z + ray.xyz.z
    name = name || `${Use[use]}${corners.name ? ` (${corners.name})` : ''}`
    const adjustedCorners = ray.applyRay(corners)
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
