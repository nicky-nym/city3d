// plato.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { nudge } from './util.js'
import Place from './place.js'
import Facing from './facing.js'
import Output, { print } from './output.js'

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

function xy (x, y) {
  return [x, y]
}

function xywh2rect (y, z, width, height) {
  // [(3, 2), (8, 2), (8, 6), (3, 6)] == yzwh2rect(3, 2, 5, 4)
  return [xy(y, z), xy(y + width, z), xy(y + width, z + height), xy(y, z + height)]
}

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

function nudgeXY (xy, { dx = 0, dy = 0, dxy = [0, 0] } = {}) {
  const [x, y] = xy
  const [dX, dY] = dxy
  return [x + dx + dX, y + dy + dY]
}

export { rotate, xy, nudgeXY, xywh2rect }
export default class Plato {
  // Plato can envision 3D architectural spaces, with walls, floors, etc.

  constructor (hurry = false) {
    // Sets plato's initial mental state.
    this._x = 0
    this._y = 0
    this._z = 0
    this._facing = Facing.NORTH
    this.hurry(hurry)
    this.study()
    this._output = new Output()
    this._paths = []
    print('plato: "Hello world!"')
  }

  envision () {
    const t0 = Date.now()
    this._output.animate()
    print(`plato: rendering time time was ${Date.now() - t0} milliseconds`)
  }

  // addAnimatedComponent (component) {
  //  this._output._animatedComponents.push(component)
  // }

  // mover must have a method named 'update' used for animation
  addMover (mover) {
    this._output.addTopLevelObject(mover)
    this._output._animatedComponents.push(mover)
  }

  addLine (line) {
    this._output.addTopLevelObject(line)
  }

  addPath (place, relPath) {
    const dxyz = [this._x, this._y, this._z]
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
    }
    this._topic = topic
    this._squareFeet = {}
    this._x0 = x0
    this._y0 = y0
    this._t0 = Date.now()
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._x = this._x0 + x
    this._y = this._y0 + y
    this._z = z
    this._facing = facing
    return this
  }

  deleteAllObjects () {
    print('plato: deleteAllObjects ')
    this._output.deleteAllObjects()
  }

  addPlace (place, area, { z = 0, incline = 0, depth = -0.5, nuance = false, flip = false, cap = true, wall = 0, openings = [] } = {}) {
    // print(`plato: adding ${place} with cap = ${cap}, wall = ${wall}`)
    z = z + this._z
    this._output.beginArea(`${Place[place]}${area.name ? ` (${area.name})` : ''}`)
    for (let xy of area) {
      xy = rotate(xy, this._facing)
      const dxy = [this._x, this._y]
      xy = nudgeXY(xy, { dxy: dxy })
      this._output.addCorner(xy)
    }
    if (cap) {
      const color = COLORS_OF_PLACES[place]
      const squareFeet = this._output.endArea(color, z, { incline: incline, depth: depth })
      this._squareFeet[place] = squareFeet + (this._squareFeet[place] || 0)
    }
    if (wall !== 0) {
      this._output.addWalls(wall, { z: z, openings: openings, nuance: nuance, cap: cap })
    }
    return this
  }

  addRoof (place, verticesOfRoof, indicesOfFaces) {
    const color = COLORS_OF_PLACES[place]
    const dxyz = [this._x, this._y, this._z]
    const vertices = verticesOfRoof.map(xyz => nudge(xyz, { dxyz: dxyz }))
    this._output.addRoof(color, vertices, indicesOfFaces)
  }

  pontificate () {
    // Print a report of square footage of rooms, walkways, etc.
    const milliseconds = Date.now() - this._t0
    print(`plato: construction time was ${milliseconds} milliseconds`)
    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    print(this._topic.toString() + ' floor area')
    for (const roleName of Object.keys(this._squareFeet)) {
      const area = this._squareFeet[roleName]
      print(`  ${roleName}: ${area} square feet`)
    }
    const floor = this._squareFeet[Place.ROOM] || 0
    const parcel = this._squareFeet[Place.PARCEL] || 10
    const street = this._squareFeet[Place.STREET] || 0
    if (parcel) {
      const parcelFar = floor / parcel
      const urbanFar = floor / (parcel + street)
      print('')
      print(`  Parcel FAR:  ${parcelFar.toFixed(1)} floor area ratio`)
      print(`  Overall FAR: ${urbanFar.toFixed(1)} floor area ratio`)
    }
    // const proximity = 0
    // const megastokes = 0
    // print('  Proximity: {:,.2f} ??? square-meters per meter'.format(proximity))
    // print('  Kinematic Fluidity: {:,.2f} ??? megaStokes (MSt)'.format(megastokes))
    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    return this
  }
}
