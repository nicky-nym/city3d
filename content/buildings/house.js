/** @file house.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz, xyzAdd, xywh2rect, countTo } from '../../src/core/util.js'

import { Byway } from '../../src/architecture/byway.js'
import { Facing } from '../../src/core/facing.js'
import { Roof } from '../../src/architecture/roof.js'
import { Storey } from '../../src/architecture/storey.js'
import { Structure } from '../../src/architecture/structure.js'
import { Use } from '../../src/architecture/use.js'

const PARCEL_DY = UNIT.feet(50)
const PARCEL_X0_NORTH = -232.72
const PARCEL_X0_SOUTH = -224.15

const FENCE_HEIGHT = 6
const FENCE_LINE = [
  xy(-52, 0),
  xy(PARCEL_X0_SOUTH, 0),
  xy(PARCEL_X0_NORTH, PARCEL_DY),
  xy(0, PARCEL_DY)]

const DRIVEWAY = [
  xy(-194, 2),
  xy(-194, 13),
  xy(-181, 13),
  xy(-181, 23),
  xy(-165, 23),
  xy(-165, 13),
  xy(-0, 13),
  xy(-0, 2)]
DRIVEWAY.name = 'driveway'

const DOORPATH = [
  xy(-15.5, 31.75),
  xy(-0, 31.75),
  xy(-0, 26.75),
  xy(-15.5, 26.75)]
DOORPATH.name = 'door path'

const ADU_DOORPATH = [
  xy(-160, 13),
  xy(-160, 36),
  xy(-155, 36),
  xy(-155, 13)]

// exterior walls (0.5 feet thick), clockwise from the back wall of the house
const KITCHEN_WINDOWS = [xywh2rect(3.958, 2.583, 5.750, 4.083)]
const DINING_ROOM_WINDOWS = [
  xywh2rect(4.166, 2.0, 2.250, 6.400),
  xywh2rect(7.083, 2.0, 2.250, 6.400)]
const BAY_WINDOW_NORTHEAST = [xywh2rect(1.000, 2.0, 2.750, 6.400)]
const BAY_WINDOW_EAST = [xywh2rect(1.525, 2.0, 4.333, 6.400)]
const BAY_WINDOW_SOUTHEAST = [xywh2rect(1.000, 2.0, 2.750, 6.400)]
const PORCH_WINDOWS = [
  xywh2rect(0.875, 0, 3.0, 7.0), // door
  xywh2rect(7.583, 2.0, 2.250, 6.400),
  xywh2rect(10.500, 2.0, 2.250, 6.400)]
const OFFICE_WINDOW = [xywh2rect(6.916, 2.0, 2.250, 6.400)]
const BED_AND_BATH_WINDOWS = [
  xywh2rect(3.875, 2.166, 3.666, 6.250), // bedroom
  xywh2rect(12.708, 4.166, 2.375, 3.083)] // bathroom
const HOUSE_SPEC = [
  [xy(-57.792, 44.542), KITCHEN_WINDOWS],
  [xy(-44.333, 44.542), []],
  [xy(-44.333, 47), DINING_ROOM_WINDOWS],
  [xy(-19.375, 47), BAY_WINDOW_NORTHEAST],
  [xy(-16, 43.65), BAY_WINDOW_EAST],
  [xy(-16, 36.1), BAY_WINDOW_SOUTHEAST],
  [xy(-19.375, 32.75), []],
  [xy(-25.792, 32.75), PORCH_WINDOWS],
  [xy(-25.792, 14.75), OFFICE_WINDOW],
  [xy(-41.167, 14.75), []],
  [xy(-41.167, 16.75), BED_AND_BATH_WINDOWS],
  [xy(-57.792, 16.75), []]
]
const HOUSE = HOUSE_SPEC.map(([point, openings]) => point)

// const HOUSE_WINDOWS = [(i, entry[1]) for i, entry in enumerate(HOUSE_SPEC)] // TODO: fix me!!
// TODO: refactor this code for both HOUSE_WINDOWS and ADDON_WINDOWS
const HOUSE_WINDOWS = []
let i = 0
for (const [point, windows] of HOUSE_SPEC) { // eslint-disable-line no-unused-vars
  HOUSE_WINDOWS.push([i, windows])
  i++
}

const WEST_WINDOWS = [
  xywh2rect(1.500, 4.500, 1.750, 2.083), // half-bath
  xywh2rect(5.104, 2.583, 5.750, 4.083), // laundry
  xywh2rect(11.354, 0, 2.666, 6.666), // door
  xywh2rect(18.875, 4.333, 3.750, 2.083)] // kitchen
const ADDON_SPEC = [
  [xy(-63.75, 43.625), []],
  [xy(-57.792, 43.625), []],
  [xy(-57.792, 17.833), []],
  [xy(-63.75, 17.833), WEST_WINDOWS]
]

const ADDON = ADDON_SPEC.map(([point, openings]) => point)

// const ADDON_WINDOWS = [(i, entry[1]) for i, entry in enumerate(ADDON_SPEC)] // TODO: fix me!!
// TODO: refactor this code for both HOUSE_WINDOWS and ADDON_WINDOWS
const ADDON_WINDOWS = []
let j = 0
for (const [point, windows] of ADDON_SPEC) { // eslint-disable-line no-unused-vars
  ADDON_WINDOWS.push([j, windows])
  j++
}
function nudgeXY (xy, delta) {
  return { x: xy.x + delta.x, y: xy.y + delta.y }
}
const ATTIC = [
  nudgeXY(HOUSE[0], xy(-1, 1)),
  nudgeXY(HOUSE[1], xy(-1, 1)),
  nudgeXY(HOUSE[2], xy(-1, 1)),
  nudgeXY(xy(HOUSE[4].x, HOUSE[3].y), xy(1, 1)),
  nudgeXY(xy(HOUSE[5].x, HOUSE[6].y), xy(1, -1)),
  nudgeXY(HOUSE[7], xy(1, -1)),
  nudgeXY(HOUSE[8], xy(1, -1)),
  nudgeXY(HOUSE[9], xy(-1, -1)),
  nudgeXY(HOUSE[10], xy(-1, -1)),
  nudgeXY(HOUSE[11], xy(-1, -1))]
const PORCH = [
  xy(-25.792, 32.75),
  xy(-25.792 + 5.333, 32.75),
  xy(-25.792 + 5.333, 32.75 - 17.083),
  xy(-25.792, 32.75 - 17.083)]
const NUM_STAIR_STEPS = 5
const STAIR_X = -25.792 + 5.333 + NUM_STAIR_STEPS
const STAIR = [
  xy(STAIR_X, 31.75),
  xy(STAIR_X + 1, 31.75),
  xy(STAIR_X + 1, 26.75),
  xy(STAIR_X, 26.75)]

const D1 = (ATTIC[0].y - ATTIC[9].y) / 2.0
const PEAK_BACK = xyz(HOUSE[0].x + D1, HOUSE[0].y - D1, D1)
const PEAK_BACK_INSET = xyz(ATTIC[5].x - D1, PEAK_BACK.y, D1)

const D2 = (ATTIC[5].x - ATTIC[1].x) / 2.0
const PEAK_NORTH = xyz(ATTIC[2].x + D2, ATTIC[2].y - D2, D2)
const PEAK_NORTH_INSET = xyz(PEAK_NORTH.x, PEAK_NORTH.y - (ATTIC[2].y - ATTIC[1].y), D2)

const D3 = (ATTIC[6].x - ATTIC[7].x) / 2.0
const PEAK_OFFICE = xyz(ATTIC[7].x + D3, ATTIC[7].y + D3, D3)
const PEAK_OFFICE_INSET = xyz(PEAK_OFFICE.x, PEAK_OFFICE.y + (ATTIC[8].y - ATTIC[7].y), D3)

const D4 = (ATTIC[3].y - ATTIC[4].y) / 2.0
const PEAK_FRONT = xyz(ATTIC[3].x, (ATTIC[3].y + ATTIC[4].y) / 2.0, D4)
const PEAK_FRONT_INSET = xyz(ATTIC[5].x - D4, PEAK_FRONT.y, D4)

function xy2xyz (xy, z) {
  return { x: xy.x, y: xy.y, z: z }
}
// corners of porch roof
const VERTICES_OF_PORCH_ROOF = []
VERTICES_OF_PORCH_ROOF[0] = xy2xyz(PORCH[0], 2)
VERTICES_OF_PORCH_ROOF[1] = xy2xyz(PORCH[1], 0)
VERTICES_OF_PORCH_ROOF[2] = xy2xyz(PORCH[2], 0)
VERTICES_OF_PORCH_ROOF[3] = xy2xyz(PORCH[3], 2)

const INDICES_OF_PORCH_ROOF_FACES = [
  face(0, 1, 2),
  face(2, 3, 0)
]

// corners of back addition addon roof
const VERTICES_OF_ADDON_ROOF = []
VERTICES_OF_ADDON_ROOF[0] = xy2xyz(ADDON[0], 0)
VERTICES_OF_ADDON_ROOF[1] = xy2xyz(ADDON[1], 2)
VERTICES_OF_ADDON_ROOF[2] = xy2xyz(ADDON[2], 2)
VERTICES_OF_ADDON_ROOF[3] = xy2xyz(ADDON[3], 0)

const INDICES_OF_ADDON_ROOF_FACES = [
  face(0, 1, 2),
  face(2, 3, 0)
]

// corners of attic roof
const VERTICES_OF_ROOF = []
for (const i of countTo(ATTIC.length)) {
  VERTICES_OF_ROOF[i] = xy2xyz(ATTIC[i], 0)
}
VERTICES_OF_ROOF[10] = PEAK_BACK
VERTICES_OF_ROOF[11] = PEAK_BACK_INSET
VERTICES_OF_ROOF[12] = PEAK_NORTH
VERTICES_OF_ROOF[13] = PEAK_NORTH_INSET
VERTICES_OF_ROOF[14] = PEAK_FRONT
VERTICES_OF_ROOF[15] = PEAK_FRONT_INSET
VERTICES_OF_ROOF[16] = PEAK_OFFICE
VERTICES_OF_ROOF[17] = PEAK_OFFICE_INSET

const INDICES_OF_ROOF_FACES = [
  face(10, 9, 0),
  face(10, 0, 1),
  face(10, 1, 13),
  face(10, 13, 11),
  face(13, 1, 2),
  face(13, 2, 12),
  face(12, 2, 15),
  face(15, 2, 3),
  face(15, 3, 14),
  face(15, 14, 4),
  face(15, 4, 5),
  face(5, 12, 15),
  face(5, 13, 12),
  face(5, 11, 13),
  face(5, 17, 11),
  face(5, 16, 17),
  face(5, 6, 16),
  face(6, 7, 16),
  face(7, 8, 16),
  face(8, 17, 16),
  face(8, 11, 17),
  face(8, 10, 11),
  face(8, 9, 10)
]

// TODO: determine accurate locations
const PEAK_DORMER = xyz(ATTIC[5].x - 1, PEAK_OFFICE_INSET.y + 1.5, PEAK_OFFICE_INSET.z - 1)
const PEAK_DORMER_INSET = xyz(ATTIC[5].x - 7, PEAK_DORMER.y, PEAK_DORMER.z)
const DORMER_NW = xyzAdd(PEAK_DORMER_INSET, xyz(2.5, 2.5, -2.5))
const DORMER_SW = xyzAdd(PEAK_DORMER_INSET, xyz(2.5, -2.5, -2.5))
const DORMER_NE = xyz(PEAK_DORMER.x, DORMER_NW.y, DORMER_NW.z)
const DORMER_SE = xyz(PEAK_DORMER.x, DORMER_SW.y, DORMER_SW.z)

// corners of dormer roof
const VERTICES_OF_DORMER_ROOF = []
VERTICES_OF_DORMER_ROOF[0] = PEAK_DORMER
VERTICES_OF_DORMER_ROOF[1] = DORMER_SE
VERTICES_OF_DORMER_ROOF[2] = DORMER_SW
VERTICES_OF_DORMER_ROOF[3] = PEAK_DORMER_INSET
VERTICES_OF_DORMER_ROOF[4] = DORMER_NW
VERTICES_OF_DORMER_ROOF[5] = DORMER_NE

const INDICES_OF_DORMER_ROOF_FACES = [
  face(0, 1, 2),
  face(2, 3, 0),
  face(3, 4, 0),
  face(4, 5, 0)
]

const CHIMNEY_HEIGHT = 16
const CHIMNEY_XYZ = xyzAdd(PEAK_BACK, xyz(-1.5, 3, -PEAK_BACK.z))
const CHIMNEY = [
  CHIMNEY_XYZ,
  xyzAdd(CHIMNEY_XYZ, xyz(0.0, 2.95, 0)),
  xyzAdd(CHIMNEY_XYZ, xyz(2.1, 2.95, 0)),
  xyzAdd(CHIMNEY_XYZ, xyz(2.1, 0.00, 0))
]

const CRAWL_SPACE_HEIGHT = 4
const GROUND_FLOOR_HEIGHT = 11.5
const ADDON_HEIGHT = 8

function face (a, b, c) {
  return [a, b, c]
}

/**
* House objects know how to describe a Queen Anne single-family house.
*/
class House extends Structure {
  constructor ({ city, ray, x0, y0, at = xyz(0, 0, 0), name } = {}) {
    super({ city, ray, x0, y0, name: name || 'House' })
    this.makeBuilding(at)
  }

  makeBuilding (at = { x: 0, y: 0 }) {
    const y = at.y
    const xNorth = 0

    this.makeHouse(xNorth, y, Facing.NORTH)
    this.addAppurtenances(xNorth, y, Facing.NORTH)
  }

  addStairs (x = 0, y = 0, facing = Facing.NORTH) {
    for (const i of countTo(NUM_STAIR_STEPS)) {
      const z = CRAWL_SPACE_HEIGHT / NUM_STAIR_STEPS * i
      x -= 1
      const ray = this.goto({ x: x, y: y, z: z, facing: facing })
      this.add(new Byway(ray, Use.WALKWAY, STAIR))
    }
  }

  addAppurtenances (x = 0, y = 0, facing = Facing.NORTH) {
    const ray = this.goto({ x: x, y: y, z: 0, facing: facing })
    this.add(new Byway(ray, Use.BARE, FENCE_LINE, { wall: FENCE_HEIGHT, cap: false }))
    this.add(new Byway(ray, Use.WALKWAY, DOORPATH))
    this.add(new Byway(ray, Use.STREET, DRIVEWAY, { name: 'Driveway' }))
    this.add(new Byway(ray, Use.WALKWAY, ADU_DOORPATH))
    this.addStairs(x, y, facing)
    return this
  }

  makeRoof (vertices, indices) {
    const roofSpec = {
      custom: { vertices, indices }
    }
    return new Roof(roofSpec, this._ray)
  }

  makeHouse (x = 0, y = 0, facing = Facing.NORTH) {
    // Crawl space
    this.goto({ x: x, y: y, z: 0, facing: facing })
    this.add(new Storey(this._ray, Use.BARE, HOUSE, { wall: CRAWL_SPACE_HEIGHT }))
    this.add(new Storey(this._ray, Use.BARE, ADDON, { wall: CRAWL_SPACE_HEIGHT }))
    this.add(new Storey(this._ray, Use.BARE, PORCH, { wall: CRAWL_SPACE_HEIGHT }))

    // Main floor
    this.goto({ x: x, y: y, z: CRAWL_SPACE_HEIGHT, facing: facing })
    this.add(new Storey(this._ray, Use.ROOM, HOUSE, { wall: GROUND_FLOOR_HEIGHT, openings: HOUSE_WINDOWS }))
    this.add(new Storey(this._ray, Use.BARE, PORCH))
    this.add(new Storey(this._ray, Use.ROOM, ADDON, { wall: ADDON_HEIGHT, openings: ADDON_WINDOWS }))

    // Attic
    const ATTIC_ELEVATION = GROUND_FLOOR_HEIGHT + CRAWL_SPACE_HEIGHT
    this.goto({ x: x, y: y, z: ATTIC_ELEVATION, facing: facing })
    this.add(new Storey(this._ray, Use.BARE, CHIMNEY, { height: CHIMNEY_HEIGHT }))
    this.add(new Storey(this._ray, Use.BARE, ATTIC))
    this.add(this.makeRoof(VERTICES_OF_ROOF, INDICES_OF_ROOF_FACES))
    this.add(this.makeRoof(VERTICES_OF_DORMER_ROOF, INDICES_OF_DORMER_ROOF_FACES))

    // Porch roofs
    const PORCH_TOP_ELEVATION = ADDON_HEIGHT + CRAWL_SPACE_HEIGHT
    this.goto({ x: x, y: y, z: PORCH_TOP_ELEVATION, facing: facing })
    this.add(this.makeRoof(VERTICES_OF_PORCH_ROOF, INDICES_OF_PORCH_ROOF_FACES))
    this.add(this.makeRoof(VERTICES_OF_ADDON_ROOF, INDICES_OF_ADDON_ROOF_FACES))
  }
}

export { House }
