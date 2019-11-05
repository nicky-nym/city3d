// plato.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { rgba } from './util.js'
import Place from './place.js'
import Facing from './facing.js'
import Output, { print } from './output.js'

const WHITE = rgba(1, 1, 1, 1) // eslint-disable-line no-unused-vars
const RED = rgba(0.8, 0, 0, 1) // opaque red
const GREEN = rgba(0, 1, 0, 1) // eslint-disable-line no-unused-vars
const BLUE = rgba(0, 0, 1, 1) // opaque blue
const YELLOW = rgba(1, 1, 0, 1) // opaque yellow

const GREEN_GRASS = rgba(0, 0.3, 0, 1) // opaque dark green
const BROWN = rgba(0.5, 0.4, 0.2, 1)
const DARK_GRAY = rgba(0.25, 0.25, 0.25, 1) // opaque dark gray
const LIGHT_GRAY = rgba(0.8745, 0.8745, 0.8745, 1) // opaque light gray
const BLUE_GLASS = rgba(0.6, 0.6, 1, 0.8) // eslint-disable-line no-unused-vars
const MARTIAN_ORANGE = rgba(0.8745, 0.2863, 0.0667, 1) // opaque Martian orange

const COLORS_OF_PLACES = {
  STREET: RED,
  BIKEPATH: MARTIAN_ORANGE,
  WALKWAY: YELLOW,
  ROOM: BROWN,
  BARE: LIGHT_GRAY,
  PARCEL: GREEN_GRASS,
  CANAL: BLUE,

  WALL: BLUE_GLASS, // temporarily making this non-white so it's obvious that it's working
  // WALL: WHITE,
  ROOF: DARK_GRAY,
  DOOR: YELLOW
}

function xy (x, y) {
  return [x, y]
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

function _materialByPlace (place) { // eslint-disable-line no-unused-vars
  const oldPythonCode = false
  let bpy // TODO!!
  if (oldPythonCode) {
    let material = bpy.data.materials.get(place.name)
    if (material === null) {
      material = bpy.data.materials.new(place.name)
      material.diffuse_color = COLORS_OF_PLACES[place]
    }
    return material
  }
}

// function _xyzFromDotOnEdge (length, height, edge) {
//   const [x0, y0, z0] = edge[0]
//   const [x1, y1, z1] = edge[1] // eslint-disable-line no-unused-vars
//   const xSpan = x1 - x0
//   const ySpan = y1 - y0
//   const edgeLength = Math.sqrt(xSpan ** 2 + ySpan ** 2)

//   const dx = length * xSpan / edgeLength
//   const dy = length * ySpan / edgeLength
//   return [x0 + dx, y0 + dy, z0 + height]
// }

function nudge2 (xy, { dx = 0, dy = 0, dxy = [0, 0] } = {}) {
  const [x, y] = xy
  const [dX, dY] = dxy
  return [x + dx + dX, y + dy + dY]
}

export { rotate, xy }
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
    print('plato: "Hello world!"')
  }

  envision () {
    const t0 = Date.now()
    this._output.animate()
    print(`plato: rendering time time was ${Date.now() - t0} milliseconds`)
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

  addPlace (place, area, { z = 0, nuance = false, flip = false, cap = true, wall = 0, openings = [] } = {}) {
    // print(`plato: adding ${place} with cap = ${cap}, wall = ${wall}`)
    z = z + this._z
    this._output.beginArea()
    for (let xy of area) {
      xy = rotate(xy, this._facing)
      const dxy = [this._x, this._y]
      xy = nudge2(xy, { dxy: dxy })
      this._output.addCorner(xy)
    }
    if (cap) {
      const color = COLORS_OF_PLACES[place]
      const squareFeet = this._output.endArea(color, z)
      this._squareFeet[place] = squareFeet + (this._squareFeet[place] || 0)
    }
    if (wall !== 0) {
      this._output.addWalls(wall, { z: z, openings: openings, nuance: nuance, cap: cap })
    }
    return this
  }

  // add (place, { shape, openings = [], nuance = false, flip = false } = {}) {
  //   // Add a new mesh to the blender scene.

  //   if (nuance && this._hurry) {
  //     return this
  //   }
  //   const color = COLORS_OF_PLACES[place]
  //   // const at = [this._x, this._y, this._z]
  //   this._beginFace()
  //   if (this._hurry || openings.length === 0) {
  //     for (const xyz of shape) {
  //       this._newVert(xyz)
  //     }
  //     this._endFace(color)
  //   } else {
  //     const edge = (shape[0], shape[1])
  //     this._newVert(shape[0])
  //     // let i = 0
  //     for (let opening of openings) {
  //       // i++
  //       opening = opening.copy()
  //       const first = opening.shift()
  //       opening.push(first)
  //       opening.reverse()
  //       let length = 0
  //       let height = 0
  //       ;[length, height] = opening[0]
  //       const Z = 2
  //       const basePoint = _xyzFromDotOnEdge(length, shape[0][Z], edge)
  //       this._newVert(basePoint)
  //       for (const qz of opening) {
  //         ;[length, height] = qz
  //         const xyz = _xyzFromDotOnEdge(length, height, edge)
  //         this._newVert(xyz)
  //       }
  //       ;[length, height] = opening[0]
  //       const xyz = _xyzFromDotOnEdge(length, height, edge)
  //       this._newVert(xyz)
  //       this._newVert(basePoint)
  //     }
  //     for (const xyz of shape) {
  //       this._newVert(xyz)
  //     }
  //     this._endFace(color)
  //   }
  //   return this
  // }

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
