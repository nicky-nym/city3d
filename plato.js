// plato.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { rgba, countTo, randomInt, nudge } from 'util.js'
import { Place } from 'place.js'
import { Facing } from 'facing.js'

let bpy // TODO!!
let bmesh // TODO!!

const WHITE = rgba(1, 1, 1, 1) // opaque white
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

  WALL: WHITE,
  ROOF: DARK_GRAY,
  DOOR: YELLOW
}

function print (str) {
  // pass
  return null
}

function rotate (xyz, facing) {
  const [x, y, z] = xyz
  switch (facing) {
    case Facing.NORTH:
      return xyz(x, y, z)
    case Facing.SOUTH:
      return xyz(-x, -y, z)
    case Facing.EAST:
      return xyz(y, -x, z)
    case Facing.WEST:
      return xyz(-y, x, z)
  }
  const SIN45 = 0.707
  const COS45 = 0.707
  switch (facing) {
    case Facing.NORTHEAST:
      return xyz(x * COS45 - y * SIN45, x * COS45 + y * SIN45, z)
    case Facing.SOUTHEAST:
      throw new Error('not implemented')
    case Facing.SOUTHWEST:
      throw new Error('not implemented')
    case Facing.NORTHWEST:
      throw new Error('not implemented')
  }
  throw new Error('bad compass facing in plato.rotate(): ' + facing.value.toString())
}

function _materialByPlace (place) {
  let material = bpy.data.materials.get(place.name)
  if (material === null) {
    material = bpy.data.materials.new(place.name)
    material.diffuse_color = COLORS_OF_PLACES[place]
  }
  return material
}

function _xyzFromDotOnEdge (length, height, edge) {
  const [x0, y0, z0] = edge[0]
  const [x1, y1, z1] = edge[1] // eslint-disable-line no-unused-vars
  const xSpan = x1 - x0
  const ySpan = y1 - y0
  const edgeLength = Math.sqrt(xSpan ** 2 + ySpan ** 2)

  // ;[d_edge, dz] = dot
  const dx = length * xSpan / edgeLength
  const dy = length * ySpan / edgeLength
  return [x0 + dx, y0 + dy, z0 + height]
}

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
  }

  hurry (hurry = false) {
    this._hurry = hurry
    return this
  }

  study (topic = '', { x0 = 0, y0 = 0 } = {}) {
    this._topic = topic
    this._squareFeet = {}
    this._x0 = x0
    this._y0 = y0
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._x = this._x0 + x
    this._y = this._y0 + y
    this._z = z
    this._facing = facing
    // print('  goto: ({:,.0f},{:,.0f},{:,.0f})'.format(x, y, z))
    return this
  }

  deleteAllObjects () {
    // Try to delete everything in the Blender scene.

    if (bpy.context.active_object) {
      let mode = bpy.context.active_object.mode
      // print('mode: ' + mode)
      if (mode === 'EDIT') {
        bpy.ops.object.mode_set('OBJECT')
        mode = bpy.context.active_object.mode
        print('new mode: ' + mode)
        // print('SELECT and delete FACE')
        // bpy.ops.mesh.select_all(action='SELECT')
        // bpy.ops.mesh.delete(type='FACE')
      }
      if (mode === 'OBJECT') {
        bpy.ops.object.select_all('SELECT')
        bpy.ops.object.delete(false)
      }
    } else {
      print('mode: There is no active_object')
    }
    return this
  }

  _beginFace () {
    this._bmesh = bmesh.new()
  }

  _endFace () {
    return this._bmesh.faces.new(this._bmesh.verts)
  }

  _newBpyObjectForFace () {
    this._bmesh.normal_update()
    const myMesh = bpy.data.meshes.new('')
    this._bmesh.to_mesh(myMesh)
    this._bmesh.free()
    return bpy.data.objects.new('', myMesh)
  }

  _newVert (xyz) {
    xyz = rotate(xyz, this._facing)
    const dxyz = (this._x, this._y, this._z)
    xyz = nudge(xyz, { dxyz: dxyz })
    this._bmesh.verts.new(xyz)
  }

  add (place, { shape, openings = [], nuance = false, flip = false } = {}) {
    // Add a new mesh to the blender scene.

    let face = null
    if (nuance && this._hurry) {
      return this
    }
    // const at = [this._x, this._y, this._z]
    this._beginFace()
    if (this._hurry || openings.length === 0) {
      for (const xyz of shape) {
        this._newVert(xyz)
      }
      face = this._endFace()
    } else {
      const edge = (shape[0], shape[1])
      this._newVert(shape[0])
      // let i = 0
      for (let opening of openings) {
        // i++
        opening = opening.copy()
        const first = opening.shift()
        opening.push(first)
        opening.reverse()
        let length = 0
        let height = 0
        ;[length, height] = opening[0]
        const Z = 2
        const basePoint = _xyzFromDotOnEdge(length, shape[0][Z], edge)
        this._newVert(basePoint)
        for (const qz of opening) {
          ;[length, height] = qz
          const xyz = _xyzFromDotOnEdge(length, height, edge)
          this._newVert(xyz)
        }
        ;[length, height] = opening[0]
        const xyz = _xyzFromDotOnEdge(length, height, edge)
        this._newVert(xyz)
        this._newVert(basePoint)
      }
      for (const xyz of shape) {
        this._newVert(xyz)
      }
      face = this._endFace()
    }

    const area = face.calc_area()
    this._squareFeet[place] = area + this._squareFeet.get(place, 0)

    const obj = this._newBpyObjectForFace()
    obj.data.materials.append(_materialByPlace(place))
    const scene = bpy.context.scene
    scene.collection.objects.link(obj)
    return this
  }

  addPlace (place, { shape, nuance = false, flip = false, wall = 0, openings = [] } = {}) {
    this.add(place, { shape: shape, nuance: nuance, flip: flip })
    if (wall !== 0) {
      this.addWall({ shape: shape, height: wall, openings: openings, nuance: nuance })
    }
    return this
  }

  addWall ({ shape, nuance = false, cap = true, height = 10, openings = [] } = {}) {
    let i = 0
    for (const xyz of shape) {
      i++
      let windows = []
      for (const opening of openings) {
        if (opening[0] === i) {
          windows = opening[1]
        }
      }
      if (cap || i + 1 < shape.length) {
        let next = 0
        if (i + 1 < shape.length) {
          next = i + 1
        }
        const wall = [
          xyz,
          shape[next],
          nudge(shape[next], { dz: height }),
          nudge(xyz, { dz: height })]
        this.add(Place.WALL, { shape: wall, nuance: nuance, openings: windows })
      }
    }
    return this
  }

  pontificate () {
    // Print a report of square footage of rooms, walkways, etc.

    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    print('')
    print(this._topic.toString() + ' floor area')
    print('')
    for (const roleName of this._squareFeet.keys()) {
      const area = this._squareFeet[roleName]
      print('  {}: {:,.0f} square feet'.format(roleName.name, area))
    }

    const floor = this._squareFeet.get(Place.ROOM, 0)
    const parcel = this._squareFeet.get(Place.PARCEL, 10)
    const street = this._squareFeet.get(Place.STREET, 0)
    if (parcel) {
      const parcelFar = floor / parcel
      const urbanFar = floor / (parcel + street)
      print('')
      print('  Parcel FAR:   {:,.2f} floor area ratio'.format(parcelFar))
      print('  Citywide FAR: {:,.2f} floor area ratio'.format(urbanFar))
    }

    const proximity = 0
    const megastokes = 0
    print('  Proximity: {:,.2f} ??? square-meters per meter'.format(proximity))
    print('  Kinematic Fluidity: {:,.2f} ??? megaStokes (MSt)'.format(megastokes))
    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    return this
  }

  addCubes (numberOfCubes = 1) {
    // Create N new cubes at random locations, with different orientations.
    for (const i of countTo(numberOfCubes)) {
      const x = randomInt(-10, 20)
      const y = randomInt(-10, 20)
      const z = randomInt(-10, 20)
      bpy.ops.mesh.primitive_cube_add([x, y, z], 4)
      const radians = i * (3.14 / (4 * numberOfCubes))
      bpy.ops.transform.rotate('Z', radians)
    }
    return this
  }
}
