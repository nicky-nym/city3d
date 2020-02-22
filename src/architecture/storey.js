/** @file storey.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureGroup, FeatureInstance } from '../core/feature.js'
import { Floor } from './floor.js'
import { Geometry } from '../core/geometry.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Roof } from './roof.js'
// import { Room } from './room.js'
import { Stairs } from './stairs.js'
// import { Use } from './use.js'
import { Wall } from './wall.js'
import { countTo } from '../core/util.js'

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

const LOD = {
  HIGH: 'high',
  LOW: 'low'
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
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   * @param {object} [spec] - a specification object that is valid against storey.schema.json.js
   *
   * @param {string} deprecatedSpec.use - e.g. Use.ROOM
   * @param {number} [deprecatedSpec.z=0] - z-offset of the wall
   * @param {number} [deprecatedSpec.incline=0] - z-offset of second corner relative to first
   * @param {number} [deprecatedSpec.depth=-0.5] - floor is between z and z + depth, so positive means bottom of floor is at
   *                                z and negative means top of floor is at z.
   * @param {boolean} [deprecatedSpec.cap=true] - whether to include floor
   * @param {number} [deprecatedSpec.wall=0] - height of walls
   * @param {xy[][]} [deprecatedSpec.openings=[]] - array of openings, where each is specified by an array of xy values
   */
  constructor ({
    name,
    outline,
    placement,
    deprecatedSpec,
    spec
  } = {}) {
    // name = name || `${Use[use]}${outline.name ? ` (${outline.name})` : ''}`
    name = name || (spec && spec.name) || (deprecatedSpec && deprecatedSpec.use)
    super({ name })
    if (deprecatedSpec) {
      this._makeModelFromDeprecatedSpec(deprecatedSpec, outline, placement)
    }
    if (spec) {
      this.makeModelFromSpec(spec, placement)
    }
  }

  altitude () {
    return this._altitude
  }

  height () {
    return this._height
  }

  floorDepth () {
    return this._depth
  }

  repeat () {
    return this._repeat
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against storey.schema.json.js
   * @param {Ray} [placement] - the location and orientation of this part
   */
  makeModelFromSpec (spec, placement) {
    const resolvedSpec = spec // this._instantiateSpec(buildingSpec)
    this.makeModelForOneLOD(this, LOD.HIGH, resolvedSpec, placement)

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    // const mediumGroup = new FeatureGroup(this.name)
    // this._makeLowResGroupFromSpec(resolvedSpec, mediumGroup, placement)
    // this.addLevelOfDetail(mediumGroup, 1000)

    const lowGroup = new FeatureGroup(this.name)
    this.makeModelForOneLOD(lowGroup, LOD.LOW, resolvedSpec, placement)
    this.addLevelOfDetail(lowGroup, 2000)
  }

  _makePlaceholder (placement, corners, height) {
    const z = placement.xyz.z
    const group = new FeatureGroup()
    const adjustedCorners = placement.applyRay(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const color = DARK_GRAY
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: height })
    const p0 = { ...adjustedCorners[0], z }
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, color)
    group.add(concreteThickPolygon)
    return group
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against storey.schema.json.js
   * @param {Ray} [placement] - the location and orientation of this part
   */
  makeModelForOneLOD (parentGroup, levelOfDetail, spec, placement) {
    const { name, unit, altitude = 0, height = 0, repeat = 1, floors, stairs, ceiling, walls, rooms, roof } = spec

    this.name = name || this.name
    this._altitude = altitude
    this._height = height
    this._repeat = repeat

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    const at = placement.add({ x: 0, y: 0, z: altitude }, placement.az)
    if (levelOfDetail === LOD.LOW) {
      if (floors) {} // do not include at LOD.LOW
      if (stairs) {} // do not include at LOD.LOW
      if (rooms) {} // do not include at LOD.LOW
      if (ceiling) {} // do not include at LOD.LOW
      if (walls && walls.exterior && walls.exterior.length) {
        const totalHeight = height * repeat
        const corners = []
        corners.push(walls.exterior[0].begin)
        for (const wallSpec of walls.exterior) {
          corners.push(wallSpec.end)
        }
        const placeholder = this._makePlaceholder(at, corners, totalHeight)
        parentGroup.add(placeholder)
      }
    } else if (levelOfDetail === LOD.HIGH) {
      for (const i of countTo(repeat)) { // eslint-disable-line no-unused-vars
        if (floors) {
          for (const floorSpec of floors) {
            const floor = new Floor({ spec: floorSpec, placement: at })
            parentGroup.add(floor)
          }
        }

        if (stairs) {
          for (const stairSpec of stairs) {
            const flight = new Stairs({ spec: stairSpec, placement: at })
            parentGroup.add(flight)
          }
        }

        let begin = { x: 0, y: 0 }
        let roofline = 'pitched' // TODO: use enum value from Wall
        const pitch = roof && roof.pitch
        let wallSpecs = []
        if (walls) {
          const exterior = walls.exterior || []
          const interior = walls.interior || []
          wallSpecs = [...exterior, ...interior]
        }
        let firstWall = true
        const allWalls = []
        for (const wallSpec of wallSpecs) {
          Model.mergeValueIfAbsent(wallSpec, { begin, height, roofline, pitch, firstWall })
          const wall = new Wall({ spec: wallSpec, placement: at })
          parentGroup.add(wall)
          allWalls.push(wall)
          begin = wall.end()
          roofline = wall.roofline()
          firstWall = false
        }

        at.xyz.z += height
        parentGroup.add(new Roof({ spec: roof, placement: at, walls: allWalls }))

        if (rooms) {
          for (const roomSpec of rooms) { // eslint-disable-line no-unused-vars
            // TODO: write this code!
            // const room = new Room({ roomSpec, at })
            // parentGroup.add(room)
          }
        }

        if (ceiling) {
          // TODO: write this code!
          // parentGroup.add(new Ceiling({ ceiling, placement }))
        }
      }
    } else {
      throw new Error('Unrecognized "level-of-detail" level in Storey.js')
    }
  }

  // TODO: delete this code when it is no longer used by any content model classes
  _makeModelFromDeprecatedSpec (storeySpec, outline, placement) {
    const use = storeySpec.use
    let z = storeySpec.z || 0
    const incline = storeySpec.incline || 0
    const depth = storeySpec.depth || -0.5
    const cap = storeySpec.cap || true
    const wall = storeySpec.wall || 0
    const openings = storeySpec.openings || []
    this._depth = depth
    z = z + placement.xyz.z
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
}

export { Storey }
