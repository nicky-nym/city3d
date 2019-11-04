// cottage.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { xyz, countTo, nudge, xy2xyz, yzwh2rect } from '../city3d/util.js'
import Place from '../city3d/place.js'
import Facing from '../city3d/facing.js'
import Structure from '../city3d/structure.js'

const X = 0
const Y = 1
const Z = 2

// in feet
const PARCEL_DY = 50
const PARCEL_X0_NORTH = -232.72
const PARCEL_X0_SOUTH = -224.15
const PARCEL = [
  xyz(PARCEL_X0_SOUTH, 0, 0),
  xyz(PARCEL_X0_NORTH, PARCEL_DY, 0),
  xyz(0, PARCEL_DY, 0),
  xyz(0, 0, 0)]

const FENCE_HEIGHT = 6
const FENCE_LINE = [
  xyz(-52, 0, 0),
  xyz(PARCEL_X0_SOUTH, 0, 0),
  xyz(PARCEL_X0_NORTH, PARCEL_DY, 0),
  xyz(0, PARCEL_DY, 0)]

const DRIVEWAY = [
  xyz(-194, 2, 0.01),
  xyz(-194, 13, 0.01),
  xyz(-181, 13, 0.01),
  xyz(-181, 23, 0.01),
  xyz(-165, 23, 0.01),
  xyz(-165, 13, 0.01),
  xyz(-0, 13, 0.01),
  xyz(-0, 2, 0.01)]

const DOORPATH = [
  xyz(-15.5, 31.75, 0.01),
  xyz(-0, 31.75, 0.01),
  xyz(-0, 26.75, 0.01),
  xyz(-15.5, 26.75, 0.01)]

const GARAGE_HEIGHT = 8
const GARAGE_SPEC = [
  [xyz(-185, 23, 0), []],
  [xyz(-185, 44, 0), []],
  [xyz(-161, 44, 0), []],
  [xyz(-161, 23, 0), []]]
// const GARAGE = [entry[0] for entry in GARAGE_SPEC] // TODO: fix me!!
const GARAGE = GARAGE_SPEC.map(([point, openings]) => point)
// const GARAGE = GARAGE_SPEC.map((entry) => entry[0])

const ADU_SPEC = [
  [xyz(-154, 23, 0), []],
  [xyz(-154, 44, 0), []],
  [xyz(-124, 44, 0), []],
  [xyz(-124, 23, 0), []]]
// const ADU = [entry[0] for entry in ADU_SPEC] // TODO: fix me!!
const ADU = ADU_SPEC.map(([point, openings]) => point)
// const ADU = ADU_SPEC.map((entry) => entry[0])

const ADU_DOORPATH = [
  xyz(-160, 13, 0),
  xyz(-160, 36, 0),
  xyz(-155, 36, 0),
  xyz(-155, 13, 0)]

// exterior walls (0.5 feet thick), clockwise from the back wall of the house
const KITCHEN_WINDOWS = [yzwh2rect(3.958, 2.583, 5.750, 4.083)]
const DINING_ROOM_WINDOWS = [
  yzwh2rect(4.166, 2.0, 2.250, 6.400),
  yzwh2rect(7.083, 2.0, 2.250, 6.400)]
const BAY_WINDOW_NORTHEAST = [yzwh2rect(1.000, 2.0, 2.750, 6.400)]
const BAY_WINDOW_EAST = [yzwh2rect(1.525, 2.0, 4.333, 6.400)]
const BAY_WINDOW_SOUTHEAST = [yzwh2rect(1.000, 2.0, 2.750, 6.400)]
const PORCH_WINDOWS = [
  yzwh2rect(0.875, 0, 3.0, 7.0), // door
  yzwh2rect(7.583, 2.0, 2.250, 6.400),
  yzwh2rect(10.500, 2.0, 2.250, 6.400)]
const OFFICE_WINDOW = [yzwh2rect(6.916, 2.0, 2.250, 6.400)]
const BED_AND_BATH_WINDOWS = [
  yzwh2rect(3.875, 2.166, 3.666, 6.250), // bedroom
  yzwh2rect(12.708, 4.166, 2.375, 3.083)] // bathroom
const HOUSE_SPEC = [
  [xyz(-57.792, 44.542, 0), KITCHEN_WINDOWS],
  [xyz(-44.333, 44.542, 0), []],
  [xyz(-44.333, 47, 0), DINING_ROOM_WINDOWS],
  [xyz(-19.375, 47, 0), BAY_WINDOW_NORTHEAST],
  [xyz(-16, 43.65, 0), BAY_WINDOW_EAST],
  [xyz(-16, 36.1, 0), BAY_WINDOW_SOUTHEAST],
  [xyz(-19.375, 32.75, 0), []],
  [xyz(-25.792, 32.75, 0), PORCH_WINDOWS],
  [xyz(-25.792, 14.75, 0), OFFICE_WINDOW],
  [xyz(-41.167, 14.75, 0), []],
  [xyz(-41.167, 16.75, 0), BED_AND_BATH_WINDOWS],
  [xyz(-57.792, 16.75, 0), []]
]
// const HOUSE = [entry[0] for entry in HOUSE_SPEC]
const HOUSE = HOUSE_SPEC.map(([point, openings]) => point)
// const HOUSE = HOUSE_SPEC.map((entry) => entry[0])

// const HOUSE_WINDOWS = [(i, entry[1]) for i, entry in enumerate(HOUSE_SPEC)] // TODO: fix me!!
// TODO: refactor this code for both HOUSE_WINDOWS and ADDON_WINDOWS
const HOUSE_WINDOWS = []
let i = 0
for (const entry in HOUSE_SPEC) {
  HOUSE_WINDOWS.push([i, entry])
  i++
}

const WEST_WINDOWS = [
  yzwh2rect(1.500, 4.500, 1.750, 2.083), // half-bath
  yzwh2rect(5.104, 2.583, 5.750, 4.083), // laundry
  yzwh2rect(11.354, 0, 2.666, 6.666), // door
  yzwh2rect(18.875, 4.333, 3.750, 2.083)] // kitchen
const ADDON_SPEC = [
  [xyz(-63.75, 43.625, 0), []],
  [xyz(-57.792, 43.625, 0), []],
  [xyz(-57.792, 17.833, 0), []],
  [xyz(-63.75, 17.833, 0), WEST_WINDOWS]
]

// const ADDON = [entry[0] for entry in ADDON_SPEC]
const ADDON = ADDON_SPEC.map(([point, openings]) => point)
// const ADDON = ADDON_SPEC.map((entry) => entry[0])

// const ADDON_WINDOWS = [(i, entry[1]) for i, entry in enumerate(ADDON_SPEC)] // TODO: fix me!!
// TODO: refactor this code for both HOUSE_WINDOWS and ADDON_WINDOWS
const ADDON_WINDOWS = []
let j = 0
for (const entry in ADDON_SPEC) {
  ADDON_WINDOWS.push([j, entry])
  j++
}
const ATTIC = [
  nudge(HOUSE[0], { dx: -1, dy: 1 }),
  nudge(HOUSE[1], { dx: -1, dy: 1 }),
  nudge(HOUSE[2], { dx: -1, dy: 1 }),
  nudge(xyz(HOUSE[4][X], HOUSE[3][Y], 0), { dx: 1, dy: 1 }),
  nudge(xyz(HOUSE[5][X], HOUSE[6][Y], 0), { dx: 1, dy: -1 }),
  nudge(HOUSE[7], { dx: 1, dy: -1 }),
  nudge(HOUSE[8], { dx: 1, dy: -1 }),
  nudge(HOUSE[9], { dx: -1, dy: -1 }),
  nudge(HOUSE[10], { dx: -1, dy: -1 }),
  nudge(HOUSE[11], { dx: -1, dy: -1 })]
const PORCH = [
  xyz(-25.792, 32.75, 0),
  xyz(-25.792 + 5.333, 32.75, 0),
  xyz(-25.792 + 5.333, 32.75 - 17.083, 0),
  xyz(-25.792, 32.75 - 17.083, 0)]
const NUM_STAIR_STEPS = 5
const STAIR_X = -25.792 + 5.333 + NUM_STAIR_STEPS
const STAIR = [
  xyz(STAIR_X, 31.75, 0),
  xyz(STAIR_X + 1, 31.75, 0),
  xyz(STAIR_X + 1, 26.75, 0),
  xyz(STAIR_X, 26.75, 0)]

const D1 = (ATTIC[0][Y] - ATTIC[9][Y]) / 2.0
const PEAK_BACK = (HOUSE[0][X] + D1, HOUSE[0][Y] - D1, D1)
const PEAK_BACK_INSET = (ATTIC[5][X] - D1, PEAK_BACK[Y], D1)

const D2 = (ATTIC[5][X] - ATTIC[1][X]) / 2.0
const PEAK_NORTH = (ATTIC[2][X] + D2, ATTIC[2][Y] - D2, D2)
const PEAK_NORTH_INSET = (PEAK_NORTH[X], PEAK_NORTH[Y] - (ATTIC[2][Y] - ATTIC[1][Y]), D2)

const D3 = (ATTIC[6][X] - ATTIC[7][X]) / 2.0
const PEAK_OFFICE = xyz(ATTIC[7][X] + D3, ATTIC[7][Y] + D3, D3)
const PEAK_OFFICE_INSET = xyz(PEAK_OFFICE[X], PEAK_OFFICE[Y] + (ATTIC[8][Y] - ATTIC[7][Y]), D3)

const D4 = (ATTIC[3][Y] - ATTIC[4][Y]) / 2.0
const PEAK_FRONT = xyz(ATTIC[3][X], (ATTIC[3][Y] + ATTIC[4][Y]) / 2.0, D4)
const PEAK_FRONT_INSET = xyz(ATTIC[5][X] - D4, PEAK_FRONT[Y], D4)

// TODO: determine accurate locations
const PEAK_DORMER = xyz(ATTIC[5][X] - 1, PEAK_OFFICE_INSET[Y] + 1.5, PEAK_OFFICE_INSET[Z] - 1)
const PEAK_DORMER_INSET = xyz(ATTIC[5][X] - 7, PEAK_DORMER[Y], PEAK_DORMER[Z])
const DORMER_NW = nudge(PEAK_DORMER_INSET, { dx: 2.5, dy: 2.5, dz: -2.5 })
const DORMER_SW = nudge(PEAK_DORMER_INSET, { dx: 2.5, dy: -2.5, dz: -2.5 })
const DORMER_NE = xyz(PEAK_DORMER[X], DORMER_NW[Y], DORMER_NW[Z])
const DORMER_SE = xyz(PEAK_DORMER[X], DORMER_SW[Y], DORMER_SW[Z])

const PORCH_ROOF = [
  [ADDON[0], xy2xyz(ADDON[1], 2), xy2xyz(ADDON[2], 2), ADDON[3]],
  [xy2xyz(PORCH[0], 2), PORCH[1], PORCH[2], xy2xyz(PORCH[3], 2)]
]

const ROOF = [
  [PEAK_BACK, ATTIC[0], ATTIC[9]],
  [PEAK_NORTH_INSET, PEAK_BACK_INSET, PEAK_BACK, ATTIC[0], ATTIC[1]],
  [PEAK_NORTH, PEAK_NORTH_INSET, ATTIC[1], ATTIC[2]],
  [PEAK_FRONT, PEAK_FRONT_INSET, PEAK_NORTH, ATTIC[2], ATTIC[3]],
  [PEAK_FRONT, ATTIC[3], ATTIC[4]],
  [PEAK_FRONT_INSET, PEAK_FRONT, ATTIC[4], ATTIC[5]],
  [PEAK_OFFICE, PEAK_OFFICE_INSET, PEAK_BACK_INSET, PEAK_NORTH_INSET, PEAK_NORTH, PEAK_FRONT_INSET, ATTIC[5], ATTIC[6]],
  [PEAK_OFFICE, ATTIC[6], ATTIC[7]],
  [PEAK_OFFICE_INSET, PEAK_OFFICE, ATTIC[7], ATTIC[8]],
  [PEAK_BACK, PEAK_BACK_INSET, PEAK_OFFICE_INSET, ATTIC[8], ATTIC[9]],
  [PEAK_DORMER, PEAK_DORMER_INSET, DORMER_NW, DORMER_NE],
  [PEAK_DORMER_INSET, PEAK_DORMER, DORMER_SE, DORMER_SW]
]

const CHIMNEY_HEIGHT = 16
const CHIMNEY_XYZ = nudge(PEAK_BACK, { dx: -1.5, dy: 3, dz: -PEAK_BACK[Z] })
const CHIMNEY = [
  CHIMNEY_XYZ,
  nudge(CHIMNEY_XYZ, { dx: 0.0, dy: 2.95 }),
  nudge(CHIMNEY_XYZ, { dx: 2.1, dy: 2.95 }),
  nudge(CHIMNEY_XYZ, { dx: 2.1, dy: 0.00 })
]

const CRAWL_SPACE_HEIGHT = 4
const GROUND_FLOOR_HEIGHT = 11.5
const ADDON_HEIGHT = 8

export default class Cottage extends Structure {
  // Cottage objects know how to describe a Queen Anne cottage.

  addStreet (numStreets = 5) {
    // Tell plato about the street the cottages are on.

    // this._plato.hurry(numStreets > 1)

    const STREET_DX = 15
    const STREET_DY = numStreets * PARCEL_DY

    const SIDEWALK_WIDTH = 6
    const SIDEWALK = [
      xyz(0, 0, 0),
      xyz(SIDEWALK_WIDTH, 0, 0),
      xyz(SIDEWALK_WIDTH, STREET_DY, 0),
      xyz(0, STREET_DY, 0)]

    const CURB_HEIGHT = 0.4
    const STREET = [
      xyz(SIDEWALK_WIDTH, 0, -CURB_HEIGHT),
      xyz(SIDEWALK_WIDTH, STREET_DY, -CURB_HEIGHT),
      xyz(SIDEWALK_WIDTH + STREET_DX, STREET_DY, -CURB_HEIGHT),
      xyz(SIDEWALK_WIDTH + STREET_DX, 0, -CURB_HEIGHT)]

    this._plato.goto({ x: 0, y: 0 })
    this._plato.addPlace(Place.WALKWAY, { shape: SIDEWALK })
    const CURB = [
      xyz(SIDEWALK_WIDTH, 0, -CURB_HEIGHT),
      xyz(SIDEWALK_WIDTH, STREET_DY, -CURB_HEIGHT)]
    this._plato.add_wall({ shape: CURB, height: CURB_HEIGHT, cap: false })
    this._plato.addPlace(Place.STREET, { shape: STREET })
    this._plato.goto({ x: STREET_DX + SIDEWALK_WIDTH })

    const xNorth = 0 // TODO: ???
    const xSouth = 0 // eslint-disable-line no-unused-vars

    for (const i of countTo(numStreets)) {
      const y = i * PARCEL_DY

      this.addParcel(xNorth, y, Facing.NORTH)
      this.addCottage(xNorth, y, Facing.NORTH)
      this.addGarageAndAdu(xNorth, y, Facing.NORTH)

      // this.addParcel(xSouth, y, Facing.SOUTH)
      // this.addCottage(xSouth, y, Facing.SOUTH)
      // this.addGarageAndAdu(xSouth, y, Facing.SOUTH)
    }
  }

  addStairs (x = 0, y = 0, facing = Facing.NORTH) {
    for (const i of countTo(NUM_STAIR_STEPS)) {
      const z = CRAWL_SPACE_HEIGHT / NUM_STAIR_STEPS * i
      x -= 1
      this._plato.goto({ x: x, y: y, z: z, facing: facing })
      this._plato.add(Place.WALKWAY, { shape: STAIR, nuance: true })
    }
  }

  addParcel (x = 0, y = 0, facing = Facing.NORTH) {
    // Tell plato about the yard, fence, sidewalk, etc.
    this._plato.goto({ x: x, y: y, z: 0, facing: facing })
    this._plato.addPlace(Place.PARCEL, { shape: PARCEL })
    this._plato.add_wall({ shape: FENCE_LINE, height: FENCE_HEIGHT, cap: false })
    this._plato.addPlace(Place.WALKWAY, { shape: DOORPATH, nuance: true })
    this._plato.addPlace(Place.STREET, { shape: DRIVEWAY, nuance: true })
    this.addStairs(x, y, facing)
    return this
  }

  addGarageAndAdu (x = 0, y = 0, facing = Facing.NORTH) {
    this._plato.goto({ x: x, y: y, z: 0, facing: facing })
    this._plato.addPlace(Place.BARE, { shape: GARAGE, wall: GARAGE_HEIGHT, nuance: true })
    this._plato.addPlace(Place.ROOM, { shape: ADU, wall: GARAGE_HEIGHT, nuance: true })
    this._plato.addPlace(Place.WALKWAY, { shape: ADU_DOORPATH, nuance: true })
    return this
  }

  addCottage (x = 0, y = 0, facing = Facing.NORTH) {
    // Tell plato about the floors, walls, roof, etc.
    const plato = this._plato

    // Crawl space
    plato.goto({ x: x, y: y, z: 0, facing: facing })
    plato.addPlace(Place.BARE, { shape: HOUSE, wall: CRAWL_SPACE_HEIGHT })
    plato.addPlace(Place.BARE, { shape: ADDON, wall: CRAWL_SPACE_HEIGHT })
    plato.addPlace(Place.BARE, { shape: PORCH, wall: CRAWL_SPACE_HEIGHT })

    // Main floor
    plato.goto({ x: x, y: y, z: CRAWL_SPACE_HEIGHT, facing: facing })
    plato.addPlace(Place.ROOM, { shape: HOUSE, wall: GROUND_FLOOR_HEIGHT, openings: HOUSE_WINDOWS })
    plato.addPlace(Place.BARE, { shape: PORCH })
    plato.addPlace(Place.ROOM, { shape: ADDON, wall: ADDON_HEIGHT, openings: ADDON_WINDOWS })

    // Attic
    const ATTIC_ELEVATION = GROUND_FLOOR_HEIGHT + CRAWL_SPACE_HEIGHT
    plato.goto({ x: x, y: y, z: ATTIC_ELEVATION, facing: facing })
    plato.addPlace(Place.BARE, { shape: ATTIC })
    for (const roof of ROOF) {
      plato.add(Place.ROOF, { shape: roof })
    }
    plato.add_wall({ shape: CHIMNEY, height: CHIMNEY_HEIGHT, nuance: true })

    // Porch roofs
    const PORCH_TOP_ELEVATION = ADDON_HEIGHT + CRAWL_SPACE_HEIGHT
    plato.goto({ x: x, y: y, z: PORCH_TOP_ELEVATION, facing: facing })
    for (const roof of PORCH_ROOF) {
      plato.add(Place.ROOF, { shape: roof })
    }
    return this
  }
}
