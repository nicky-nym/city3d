// wurster.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { countTo } from '../city3d/util.js'
import Place from '../city3d/place.js'
import { xy } from '../city3d/plato.js'
import Structure from '../city3d/structure.js'

// in feet
const NUM_TOWER_FLOORS = 10
const NUM_SOUTH_WING_FLOORS = 4
const NUM_NORTH_WING_FLOORS = 3
const NUM_CENTER_WING_FLOORS = 3

const STORY_HEIGHT = 13
const PARAPET_HEIGHT = 4

const NUM_TOWER_CRENELS_X = 12 // eslint-disable-line no-unused-vars
const CRENEL_SPACING = 9.333 // eslint-disable-line no-unused-vars

const AWNING_SEPERATOR_DEPTH = 2.5 // eslint-disable-line no-unused-vars
const AWNING_DEPTH = 5 // eslint-disable-line no-unused-vars
const AWNING_LENGTH = 9 // eslint-disable-line no-unused-vars

const SOUTH_WING_DX = 170
const SOUTH_WING_DY = 85
const SOUTH_WING_X0 = 100
const SOUTH_WING_Y0 = 140

const SOUTH_WING = [
  xy(0, 0),
  xy(SOUTH_WING_DX, 0),
  xy(SOUTH_WING_DX, SOUTH_WING_DY),
  xy(0, SOUTH_WING_DY)
]

const CENTER_WING_DX = 53
const CENTER_WING_DY = 116
const CENTER_WING_X0 = SOUTH_WING_X0
const CENTER_WING_Y0 = SOUTH_WING_Y0 + SOUTH_WING_DY

const CENTER_WING = [
  xy(0, 0),
  xy(CENTER_WING_DX, 0),
  xy(CENTER_WING_DX, CENTER_WING_DY),
  xy(0, CENTER_WING_DY)
]

const NUM_SOUTH_WING_CRENELS_X = 18 // eslint-disable-line no-unused-vars
const NUM_SOUTH_WING_CRENELS_Y = 9 // eslint-disable-line no-unused-vars

const TOWER_DX = 110
const TOWER_DY = 70
const TOWER_X0 = CENTER_WING_X0 + CENTER_WING_DX
const TOWER_Y0 = CENTER_WING_Y0 + CENTER_WING_DY

const TOWER = [
  xy(0, 0),
  xy(TOWER_DX, 0),
  xy(TOWER_DX, TOWER_DY),
  xy(0, TOWER_DY)
]

const TOWER_EAST_DX = 29
const TOWER_EAST_DY = 56
const TOWER_EAST_X0 = TOWER_X0 + TOWER_DX
const TOWER_EAST_Y0 = TOWER_Y0 + 5

const TOWER_EAST = [
  xy(0, 0),
  xy(TOWER_EAST_DX, 0),
  xy(TOWER_EAST_DX, TOWER_EAST_DY),
  xy(0, TOWER_EAST_DY)
]

const TOWER_WEST_DX = 29
const TOWER_WEST_DY = 44
const TOWER_WEST_OFFSET_Y = 17
const TOWER_WEST_X0 = TOWER_X0 - TOWER_EAST_DX
const TOWER_WEST_Y0 = TOWER_Y0 + TOWER_WEST_OFFSET_Y

const TOWER_WEST = [
  xy(0, 0),
  xy(TOWER_WEST_DX, 0),
  xy(TOWER_WEST_DX, TOWER_WEST_DY),
  xy(0, TOWER_WEST_DY)
]

const ATRIUM_DX = 22
const ATRIUM_DY = 46
const ATRIUM_OFFSET_Y = -7
// const ATRIUM_X0 = TOWER_WEST_X0 - ATRIUM_DX
// const ATRIUM_Y0 = TOWER_WEST_Y0 + ATRIUM_OFFSET_Y

const NORTH_WING_DX = 227
const NORTH_WING_DY = 113
const NORTH_WING_X0 = SOUTH_WING_X0 - (NORTH_WING_DX - TOWER_DX - CENTER_WING_DX)
const NORTH_WING_Y0 = TOWER_Y0

const NORTH_WING = [
  xy(0, 0),
  xy(NORTH_WING_DX - TOWER_DX, 0),
  xy(NORTH_WING_DX - TOWER_DX, TOWER_WEST_OFFSET_Y),
  xy(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y),
  xy(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xy(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX - ATRIUM_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xy(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX - ATRIUM_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM_DY),
  xy(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM_DY),
  xy(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y + TOWER_WEST_DY),
  xy(NORTH_WING_DX - TOWER_DX, TOWER_WEST_OFFSET_Y + TOWER_WEST_DY),
  xy(NORTH_WING_DX - TOWER_DX, TOWER_DY),
  xy(NORTH_WING_DX, TOWER_DY),
  xy(NORTH_WING_DX, NORTH_WING_DY),
  xy(0, NORTH_WING_DY)
]

const NUM_NORTH_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars
const NUM_CENTER_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars

const FLOOR_TEN_BALCONY_DX = 10
const FLOOR_TEN_BALCONY_DY = 23
const FLOOR_TEN_BALCONY_X0 = TOWER_WEST_X0 - FLOOR_TEN_BALCONY_DX
const FLOOR_TEN_BALCONY_Y0 = TOWER_WEST_Y0

const FLOOR_TEN_BALCONY = [
  xy(0, 0),
  xy(FLOOR_TEN_BALCONY_DX, 0),
  xy(FLOOR_TEN_BALCONY_DX, FLOOR_TEN_BALCONY_DY),
  xy(0, FLOOR_TEN_BALCONY_DY)
]
const PARCEL_DX = 360
const PARCEL_DY = 540

const PARCEL = [
  xy(0, 0),
  xy(PARCEL_DX, 0),
  xy(PARCEL_DX, PARCEL_DY),
  xy(0, PARCEL_DY)
]

export default class Wurster extends Structure {
  // Wurster objects know how to describe UC Berkeley's Wurster Hall.

  addParcel () {
    this._plato.goto({ x: 0, y: 0, z: 0 })
    this._plato.addPlace(Place.PARCEL, PARCEL)
    return this
  }

  addSouthWing () {
    let z
    for (const i in countTo(NUM_SOUTH_WING_FLOORS)) {
      z = i * STORY_HEIGHT
      this._plato.goto({ x: SOUTH_WING_X0, y: SOUTH_WING_Y0, z: z })
      this._plato.addPlace(Place.ROOM, SOUTH_WING, { wall: STORY_HEIGHT })
    }
    this._plato.goto({ x: SOUTH_WING_X0, y: SOUTH_WING_Y0, z: z + STORY_HEIGHT })
    this._plato.addPlace(Place.ROOF, SOUTH_WING, { wall: PARAPET_HEIGHT })
    return this
  }

  addCenterWing () {
    let z
    for (const i in countTo(NUM_CENTER_WING_FLOORS)) {
      z = i * STORY_HEIGHT
      this._plato.goto({ x: CENTER_WING_X0, y: CENTER_WING_Y0, z: z })
      this._plato.addPlace(Place.ROOM, CENTER_WING, { wall: STORY_HEIGHT })
    }
    this._plato.goto({ x: CENTER_WING_X0, y: CENTER_WING_Y0, z: z + STORY_HEIGHT })
    this._plato.addPlace(Place.ROOF, CENTER_WING, { wall: PARAPET_HEIGHT })
    return this
  }

  addNorthWing () {
    let z
    for (const i in countTo(NUM_NORTH_WING_FLOORS)) {
      z = i * STORY_HEIGHT
      this._plato.goto({ x: NORTH_WING_X0, y: NORTH_WING_Y0, z: z })
      this._plato.addPlace(Place.ROOM, NORTH_WING, { wall: STORY_HEIGHT })
    }
    this._plato.goto({ x: NORTH_WING_X0, y: NORTH_WING_Y0, z: z + STORY_HEIGHT })
    this._plato.addPlace(Place.ROOF, NORTH_WING, { wall: PARAPET_HEIGHT })
    return this
  }

  addTower () {
    let z
    for (const i in countTo(NUM_TOWER_FLOORS)) {
      z = i * STORY_HEIGHT

      this._plato.goto({ x: TOWER_X0, y: TOWER_Y0, z: z })
      this._plato.addPlace(Place.ROOM, TOWER, { wall: STORY_HEIGHT })

      this._plato.goto({ x: TOWER_EAST_X0, y: TOWER_EAST_Y0, z: z })
      this._plato.addPlace(Place.ROOM, TOWER_EAST, { wall: STORY_HEIGHT })

      this._plato.goto({ x: TOWER_WEST_X0, y: TOWER_WEST_Y0, z: z })
      this._plato.addPlace(Place.ROOM, TOWER_WEST, { wall: STORY_HEIGHT })
    }

    this._plato.goto({ x: TOWER_X0, y: TOWER_Y0, z: z + STORY_HEIGHT })
    this._plato.addPlace(Place.ROOF, TOWER, { wall: PARAPET_HEIGHT })

    this._plato.goto({ x: TOWER_EAST_X0, y: TOWER_EAST_Y0, z: z + STORY_HEIGHT })
    this._plato.addPlace(Place.ROOF, TOWER_EAST, { wall: PARAPET_HEIGHT })

    z += STORY_HEIGHT
    this._plato.goto({ x: TOWER_WEST_X0, y: TOWER_WEST_Y0, z: z })
    this._plato.addPlace(Place.ROOM, TOWER_WEST, { wall: STORY_HEIGHT })

    this._plato.goto({ x: FLOOR_TEN_BALCONY_X0, y: FLOOR_TEN_BALCONY_Y0, z: z })
    this._plato.addPlace(Place.ROOM, FLOOR_TEN_BALCONY, { wall: PARAPET_HEIGHT })

    this._plato.goto({ x: TOWER_WEST_X0, y: TOWER_WEST_Y0, z: z + STORY_HEIGHT })
    this._plato.addPlace(Place.ROOF, TOWER_WEST, { wall: PARAPET_HEIGHT })

    return this
  }

  addBuildings (num = 1) {
    this.addParcel()
    this.addSouthWing()
    this.addCenterWing()
    this.addNorthWing()
    this.addTower()
    return this
  }
}
