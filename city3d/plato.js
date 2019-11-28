/** @file plato.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xyz, xyzSum, nudge } from './util.js'
import Facing from './facing.js'
import { Geometry } from './geometry.js'
import Place from './place.js'
import Sector from './sector.js'

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

const COLORS_OF_PLACES = {
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

/**
 * @deprecated use util.js xy() instead
 */
function xyArray (x, y) {
  return [x, y]
}

/**
 * @deprecated use ??? instead
 */
function xywh2rect (y, z, width, height) {
  // [(3, 2), (8, 2), (8, 6), (3, 6)] == yzwh2rect(3, 2, 5, 4)
  return [xyArray(y, z), xyArray(y + width, z), xyArray(y + width, z + height), xyArray(y, z + height)]
}

function rotateXY (xy, facing) {
  const { x, y } = xy
  switch (facing) {
    case Facing.NORTH:
      return { x, y }
    case Facing.SOUTH:
      return { x: -x, y: -y }
    case Facing.EAST:
      return { x: y, y: -x }
    case Facing.WEST:
      return { x: -y, y: x }
  }
  const SIN45 = 0.707
  const COS45 = 0.707
  switch (facing) {
    case Facing.NORTHEAST:
      return { x: x * COS45 - y * SIN45, y: x * COS45 + y * SIN45 }
    case Facing.SOUTHEAST:
      throw new Error('not implemented')
    case Facing.SOUTHWEST:
      throw new Error('not implemented')
    case Facing.NORTHWEST:
      throw new Error('not implemented')
  }
  throw new Error('bad compass facing in plato.rotate(): ' + facing.value.toString())
}

/**
 * @deprecated use rotateXY instead
 */
function rotate (xy, facing) {
  const [x, y] = xy
  switch (facing) {
    case Facing.NORTH:
      return [x, y]
    case Facing.SOUTH:
      return [-x, -y]
    case Facing.EAST:
      return [y, -x]
    case Facing.WEST:
      return [-y, x]
  }
  const SIN45 = 0.707
  const COS45 = 0.707
  switch (facing) {
    case Facing.NORTHEAST:
      return [x * COS45 - y * SIN45, x * COS45 + y * SIN45]
    case Facing.SOUTHEAST:
      throw new Error('not implemented')
    case Facing.SOUTHWEST:
      throw new Error('not implemented')
    case Facing.NORTHWEST:
      throw new Error('not implemented')
  }
  throw new Error('bad compass facing in plato.rotate(): ' + facing.value.toString())
}

function print (str) {
  console.log(str)
}

/**
 * Plato can envision 3D architectural spaces, with walls, floors, etc.
 */
class Plato {
  /**
   * Sets plato's initial state.
   */
  constructor (city, hurry = false) {
    this._xyz = xyz(0, 0, 0)
    this._facing = Facing.NORTH
    this.hurry(hurry)
    this.study()
    this._city = city
    this._paths = []
    print('plato: "Hello world!"')
  }

  addPath (place, relPath) {
    // const dxyz = [this._x, this._y, this._z]
    const dxyz = [this._xyz.x, this._xyz.y, this._xyz.z]
    const path = []
    for (const segment of relPath) {
      const [x, y, z] = segment
      const xy = rotate([x, y], this._facing)
      const xyz = [...xy, z]
      path.push(nudge(xyz, { dxyz }))
    }
    this._paths.push(path)
    return path
  }

  hurry (hurry = false) {
    this._hurry = hurry
    return this
  }

  study (topic = '', { x0 = 0, y0 = 0 } = {}) {
    if (topic) {
      print('plato: studying ' + topic)
      this._sector = new Sector(topic)
      this._city.add(this._sector)
    }
    this._topic = topic
    this._squareFeet = {}
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

  deleteAllObjects () {
    print('plato: deleteAllObjects ')
    this._city.deleteAllObjects()
  }

  makePlace (place, corners, { z = 0, incline = 0, depth = -0.5, nuance = false, flip = false, cap = true, wall = 0, openings = [] } = {}) {
    z = z + this._xyz.z
    const group = this._city.makeGroup(`${Place[place]}${corners.name ? ` (${corners.name})` : ''}`)
    const xyPolygon = new Geometry.XYPolygon()
    for (let xy of corners) {
      xy = rotateXY(xy, this._facing)
      xy = { x: xy.x + this._xyz.x, y: xy.y + this._xyz.y }
      xyPolygon.push(xy)
    }
    if (cap) {
      const color = COLORS_OF_PLACES[place]
      const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline: incline, depth: depth })
      const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, z, color)
      group.add(concreteThickPolygon)
      const squareFeet = xyPolygon.area()
      this._squareFeet[place] = squareFeet + (this._squareFeet[place] || 0)
    }
    if (wall !== 0) {
      this.addWalls(group, xyPolygon, wall, z, openings, cap)
    }
    this._sector.add(group)
    return this
  }

  addWalls (group, xyPolygon, height, z, openingsByWall, cap) {
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
        group.add(concreteWall)
      }
    }
  }

  makeRoof (place, verticesOfRoof, indicesOfFaces, name) {
    const color = COLORS_OF_PLACES[place]
    const vertices = verticesOfRoof.map(xyz => xyzSum(xyz, this._xyz))
    const abstractRoof = new Geometry.TriangularPolyhedron(vertices, indicesOfFaces)
    const concreteRoof = new Geometry.Instance(abstractRoof, 0, color, name || 'roof')
    this._sector.add(concreteRoof)
  }

  pontificate () {
    // Print a report of square footage of rooms, walkways, etc.
    const milliseconds = Date.now() - this._t0
    print(`plato: construction time was ${milliseconds} milliseconds`)
    this._sector.addMetric('Floor area', this._squareFeet, 'square feet')
    const floor = this._squareFeet[Place.ROOM] || 0
    const parcel = this._squareFeet[Place.PARCEL] || 10
    const street = this._squareFeet[Place.STREET] || 0
    if (parcel) {
      const parcelFar = floor / parcel
      const urbanFar = floor / (parcel + street)
      this._sector.addMetric('Parcel FAR', parcelFar.toFixed(1), 'floor area ratio')
      this._sector.addMetric('Overall FAR', urbanFar.toFixed(1), 'floor area ratio')
    }
    // const proximity = 0
    // const megastokes = 0
    // this._sector.addMetric('Proximity', proximity, 'square-meters per meter')
    // this._sector.addMetric('Kinematic Fluidity', megastokes, 'megaStokes (MSt)')

    return this
  }
}

export { Plato, rotate, rotateXY, xywh2rect }
