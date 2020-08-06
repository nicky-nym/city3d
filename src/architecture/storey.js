/** @file storey.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { countTo } from '../core/util.js'
import { FeatureGroup, FeatureInstance } from '../core/feature.js'
import { Floor } from './floor.js'
import { Geometry } from '../core/geometry.js'
import { Model } from './model.js'
import { Pose } from '../core/pose.js'
import { Roof } from './roof.js'
// import { Room } from './room.js'
import { Staircase } from './staircase.js'
// import { Use } from './use.js'
import { Wall } from './wall.js'

// const WHITE = 0xffffff
const RED = 0xcc0000 // eslint-disable-line no-unused-vars
// const BLACKTOP = 0x1a1a1a // very dark grey
const GREEN = 0x00ff00 // eslint-disable-line no-unused-vars
// const BLUE = 0x0000ff
// const YELLOW = 0xffff00

// const GREEN_GRASS = 0x003300
// const BROWN = 0x806633
const DARK_GRAY = 0x404040
// const LIGHT_GRAY = 0xdddddd
const BLUE_GLASS = 0x9a9aff // eslint-disable-line no-unused-vars
// const MARTIAN_ORANGE = 0xdf4911

/*
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
*/

const LOD = Object.freeze({
  HIGH: 'high',
  LOW: 'low'
})

/**
 * Storey is a class for representing one storey of a building.
 */
class Storey extends Model {
  /**
   * Creates an instance of a Storey, with walls and a floor.
   * @param {string} [name] - name of the storey
   * @param {xy[]} outline - vertices of floor, expected to be in counterclockwise order
   * @param {pose} [pose] - the location and orientation of this storey
   * @param {object} [spec] - a specification object that is valid against storey.schema.json.js
   */
  constructor ({
    name,
    outline,
    pose = Pose.DEFAULT,
    spec
  } = {}) {
    name = name || (spec && spec.name) || 'Storey'
    super({ name })
    if (spec) {
      this.makeModelFromSpec(spec, pose)
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
   * @param {pose} [pose] - the location and orientation of this storey
   */
  makeModelFromSpec (spec, pose) {
    const resolvedSpec = spec // this._instantiateSpec(buildingSpec)
    this.makeModelForOneLOD(this, LOD.HIGH, resolvedSpec, pose)

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    // const mediumGroup = new FeatureGroup(this.name)
    // this._makeLowResGroupFromSpec(resolvedSpec, mediumGroup, pose)
    // this.addLevelOfDetail(mediumGroup, 1000)

    const lowGroup = new FeatureGroup(this.name)
    this.makeModelForOneLOD(lowGroup, LOD.LOW, resolvedSpec, pose)
    this.addLevelOfDetail(lowGroup, 2000)
  }

  _makePlaceholder (pose, corners, height) {
    const z = pose.z
    const group = new FeatureGroup()
    const adjustedCorners = Pose.relocate(pose, corners)
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
   * @param {pose} [pose] - the location and orientation of this storey
   */
  makeModelForOneLOD (parentGroup, levelOfDetail, spec, pose) {
    const { name, unit, altitude = 0, height = 0, repeat = 1, incline = 0, floors, staircases, ceiling, walls, rooms, roof } = spec

    this.name = name || this.name
    this._altitude = altitude
    this._height = height
    this._repeat = repeat

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    pose = Pose.copy(pose)
    pose.z += altitude

    if (levelOfDetail === LOD.LOW) {
      if (floors) {} // do not include at LOD.LOW
      if (staircases) {} // do not include at LOD.LOW
      if (rooms) {} // do not include at LOD.LOW
      if (ceiling) {} // do not include at LOD.LOW
      if (walls && walls.exterior && walls.exterior.length) {
        const totalHeight = height * repeat
        const corners = []
        corners.push(walls.exterior[0].begin)
        for (const wallSpec of walls.exterior) {
          corners.push(wallSpec.end)
        }
        const placeholder = this._makePlaceholder(pose, corners, totalHeight)
        parentGroup.add(placeholder)
      }
    } else if (levelOfDetail === LOD.HIGH) {
      for (const i of countTo(repeat)) { // eslint-disable-line no-unused-vars
        if (floors) {
          for (const floorSpec of floors) {
            floorSpec.incline = floorSpec.incline || incline
            const floor = new Floor({ spec: floorSpec, pose })
            parentGroup.add(floor)
          }
        }

        if (staircases) {
          for (const stairSpec of staircases) {
            const flight = new Staircase({ spec: stairSpec, pose })
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
          const wall = new Wall({ spec: wallSpec, pose })
          parentGroup.add(wall)
          allWalls.push(wall)
          begin = wall.end()
          roofline = wall.roofline()
          firstWall = false
        }

        pose.z += height
        parentGroup.add(new Roof({ spec: roof, pose, walls: allWalls }))

        if (rooms) {
          for (const roomSpec of rooms) { // eslint-disable-line no-unused-vars
            // TODO: write this code!
            // const room = new Room({ roomSpec, pose })
            // parentGroup.add(room)
          }
        }

        if (ceiling) {
          // TODO: write this code!
          // parentGroup.add(new Ceiling({ ceiling, pose }))
        }
      }
    } else {
      throw new Error('Unrecognized "level-of-detail" level in Storey.js')
    }
  }
}

export { Storey }
