/** @file plato.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xyz, xyzAdd, xyRotate } from '../core/util.js'
import { Facing } from '../core/facing.js'
import { Geometry } from '../core/geometry.js'
import { Group } from '../architecture/group.js'
import { Parcel } from '../architecture/parcel.js'
import { Sector } from './sector.js'
import { Use } from './use.js'

const WHITE = 0xffffff // eslint-disable-line no-unused-vars
const RED = 0xcc0000 // eslint-disable-line no-unused-vars
const BLACKTOP = 0x1a1a1a // very dark grey
const GREEN = 0x00ff00 // eslint-disable-line no-unused-vars
const BLUE = 0x0000ff
const YELLOW = 0xffff00

const GREEN_GRASS = 0x00cc00
const BROWN = 0x806633
const DARK_GRAY = 0x404040
const LIGHT_GRAY = 0xdddddd
const BLUE_GLASS = 0x9a9aff // eslint-disable-line no-unused-vars
const MARTIAN_ORANGE = 0xdf4911
const ALMOST_WHITE = 0x999999

const COLORS_BY_USE = {
  STREET: BLACKTOP,
  BIKEPATH: MARTIAN_ORANGE,
  WALKWAY: YELLOW,
  ROOM: BROWN,
  BARE: LIGHT_GRAY,
  PARCEL: GREEN_GRASS,
  CANAL: BLUE,
  WALL: WHITE,
  ROOF: DARK_GRAY,
  DOOR: YELLOW
}

function _addWalls (group, xyPolygon, height, z, openingsByWall, cap) {
  let wallArea = 0
  let openingArea = 0
  let i = 0
  for (const v of xyPolygon) {
    const entryForThisWall = openingsByWall.find(item => item[0] === i)
    const openings = entryForThisWall ? entryForThisWall[1] : []
    i++
    if (cap || i < xyPolygon.length) {
      const next = i % xyPolygon.length
      const near = v
      const far = xyPolygon[next]
      const abstractWall = new Geometry.Wall(near, far, height, { openings })
      const name = `wall from ${JSON.stringify(near)} to ${JSON.stringify(far)}`
      const concreteWall = new Geometry.Instance(abstractWall, z, ALMOST_WHITE, name)
      wallArea += abstractWall.area()
      openingArea += abstractWall.areaOfOpenings()
      group.add(concreteWall)
    }
  }
  group.addMetric('Wall area', wallArea, 'square feet')
  group.addMetric('Wall opening area', openingArea, 'square feet')
}

/**
 * Plato can envision 3D architectural spaces, with walls, floors, etc.
 */
class Plato {
  /**
   * Sets plato's initial state.
   */
  constructor (city) {
    this._xyz = xyz(0, 0, 0)
    this._facing = Facing.NORTH
    this.study()
    this._city = city
    this._routes = []
  }

  _applyGotoInto (xyzList) {
    const transformed = []
    for (const xyzPoint of xyzList) {
      const rotated = xyRotate(xyzPoint, this._facing)
      rotated.z = xyzPoint.z
      transformed.push(xyzAdd(rotated, this._xyz))
    }
    return transformed
  }

  makeRoute (use, listOfWaypoints) {
    const route = this._applyGotoInto(listOfWaypoints)
    this._routes.push(route)
    return route
  }

  study (topic = '', { x0 = 0, y0 = 0 } = {}) {
    if (topic) {
      this._sector = new Sector(topic)
      this._city.add(this._sector)
    }
    this._topic = topic
    this._x0 = x0
    this._y0 = y0
    this._t0 = Date.now()
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._xyz.x = this._x0 + x
    this._xyz.y = this._y0 + y
    this._xyz.z = z
    this._facing = facing
    return this
  }

  makeParcel (corners) {
    const parcel = new Parcel()
    const adjustedCorners = this._applyGotoInto(corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const concreteOutlinePolygon = new Geometry.Instance(abstractOutlinePolygon, this._xyz.z, MARTIAN_ORANGE)
    parcel.add(concreteOutlinePolygon)
    parcel.addMetric(`Floor area: ${Use.PARCEL}`, xyPolygon.area(), 'square feet')
    this._sector.add(parcel)
    return parcel
  }

  appendToSector (group) {
    this._sector.add(group)
    return group
  }

  makePlaceholder (use, corners, depth, { z = 0, name } = {}) {
    z = z + this._xyz.z
    const group = new Group(name)
    const adjustedCorners = this._applyGotoInto(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const color = COLORS_BY_USE[use]
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth })
    const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, z, color)
    group.add(concreteThickPolygon)
    return group
  }

  makePlace (...args) {
    const group = this.makePlace2(...args)
    this._sector.add(group)
    return this
  }

  makePlace2 (use, corners, { z = 0, incline = 0, depth = -0.5, nuance = false, flip = false, cap = true, wall = 0, openings = [], name } = {}) {
    z = z + this._xyz.z
    name = name || `${Use[use]}${corners.name ? ` (${corners.name})` : ''}`
    const group = new Group(name)
    const adjustedCorners = this._applyGotoInto(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    if (cap) {
      const color = COLORS_BY_USE[use]
      const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline: incline, depth: depth })
      const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, z, color)
      group.add(concreteThickPolygon)
      const squareFeet = xyPolygon.area()
      group.addMetric(`Floor area: ${use}`, squareFeet, 'square feet')
    }
    if (wall !== 0) {
      _addWalls(group, xyPolygon, wall, z, openings, cap)
    }
    return group
  }

  makeRoof (use, verticesOfRoof, indicesOfFaces, name) {
    const color = COLORS_BY_USE[use]
    const vertices = verticesOfRoof.map(xyz => xyzAdd(xyz, this._xyz))
    const abstractRoof = new Geometry.TriangularPolyhedron(vertices, indicesOfFaces)
    const concreteRoof = new Geometry.Instance(abstractRoof, 0, color, name || 'roof')
    this._sector.add(concreteRoof)
  }

  static aggregateMetric (group, metricName) {
    let sum = 0
    group.accept(node => { const m = node.metrics && node.metrics.get(metricName); if (m) sum += m.value })
    return sum
  }

  pontificate () {
    // Print a report of square footage of rooms, walkways, etc.
    const floorArea = {}
    for (const use of Object.keys(Use)) {
      const sum = Plato.aggregateMetric(this._sector, `Floor area: ${use}`)
      if (sum > 0) {
        floorArea[use] = sum
      }
    }
    this._sector.addMetric('Floor area', floorArea, 'square feet')
    if (floorArea[Use.PARCEL]) {
      const parcelFar = floorArea[Use.ROOM] / floorArea[Use.PARCEL]
      const urbanFar = floorArea[Use.ROOM] / (floorArea[Use.PARCEL] + (floorArea[Use.STREET] || 0))
      this._sector.addMetric('Parcel FAR', parcelFar.toFixed(1), 'floor area ratio')
      this._sector.addMetric('Overall FAR', urbanFar.toFixed(1), 'floor area ratio')
    }
    for (const metric of ['Wall area', 'Wall opening area']) {
      const sum = Plato.aggregateMetric(this._sector, metric)
      this._sector.addMetric(metric, sum, 'square feet')
    }
    return this
  }
}

export { Plato }
