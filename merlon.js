// merlon.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { xyz, yzwh2rect, nudge, count, countTo, randomInt } from './util.js'
import Place from './place.js'
import Facing from './facing.js'

// Data types
// Landing = Tuple[Num, Iterable[Facing]]  # (landing_altitude, [ramp_facings])
// const LANDING_ALTITUDE = 0
// const RAMP_FACINGS = 1

// in feet
const STORY_HEIGHT = 10
const ROOFLINE = STORY_HEIGHT * 5
const RAMP_WIDTH = 6
const RAMP_LENGTH = 30
const RAMP_HEIGHT = 2.5
const TOWER_WIDTH = RAMP_LENGTH + 12
const LANDING_WIDTH = RAMP_WIDTH + TOWER_WIDTH - RAMP_LENGTH
const TOWER_SPACING = TOWER_WIDTH + RAMP_WIDTH

const D1 = LANDING_WIDTH / 2.0
const D2 = RAMP_WIDTH / 2.0
const RAMP = [
  xyz(+D2, D1, 0),
  xyz(+D2, D1 + RAMP_LENGTH, RAMP_HEIGHT),
  xyz(-D2, D1 + RAMP_LENGTH, RAMP_HEIGHT),
  xyz(-D2, D1, 0)]
const OCTAGONAL_LANDING = [
  xyz(-D1, -D2, 0),
  xyz(-D2, -D1, 0),
  xyz(+D2, -D1, 0),
  xyz(+D1, -D2, 0),
  xyz(+D1, +D2, 0),
  xyz(+D2, +D1, 0),
  xyz(-D2, +D1, 0),
  xyz(-D1, +D2, 0)]
const DIAMOND_CENTER = [
  xyz(-3, 0, 0),
  xyz(0, +3, 0),
  xyz(+3, 0, 0),
  xyz(0, -3, 0)]
const BASEMENT = [
  xyz(D1, 0, 0),
  xyz(D1, D2, 0),
  xyz(D2, D1, 0),
  xyz(0, D1, 0),
  xyz(0, 2 * D1 + RAMP_LENGTH, 0),
  xyz(2 * D1 + RAMP_LENGTH, 2 * D1 + RAMP_LENGTH, 0),
  xyz(2 * D1 + RAMP_LENGTH, 0, 0)]
const APARTMENT_WIDTH = D1 + RAMP_LENGTH + (D1 + D2) / 2

const DOOR_HEIGHT = 6 + 8 / 12
const DOORS = [
  yzwh2rect(1.2, 0.01, 3, DOOR_HEIGHT),
  yzwh2rect(4.285, 0.01, 3, DOOR_HEIGHT)]
const WINDOWS = [
  yzwh2rect(1.75, 3, 2.5, 5),
  yzwh2rect(4.75, 3, 2.5, 5),

  yzwh2rect(8.75, 3, 2.5, 5),
  yzwh2rect(11.75, 3, 2.5, 5),

  yzwh2rect(15.75, 3, 2.5, 5),
  yzwh2rect(18.75, 3, 2.5, 5),

  yzwh2rect(22.75, 3, 2.5, 5),
  yzwh2rect(25.75, 3, 2.5, 5)]
const SPAN = RAMP_LENGTH + (D1 + D2) / 2
const APARTMENT_SPEC = [
  (xyz(D1, D2, 0), DOORS),
  (xyz(D2, D1, 0), WINDOWS),
  (xyz(D2, D1 + RAMP_LENGTH, 0), []),
  (xyz(D1, D1 + SPAN, 0), WINDOWS),
  (xyz(D1 + RAMP_LENGTH, D1 + SPAN, 0), []),
  (xyz(D1 + SPAN, D1 + RAMP_LENGTH, 0), WINDOWS),
  (xyz(D1 + SPAN, D1, 0), []),
  (xyz(D1 + RAMP_LENGTH, D2, 0), WINDOWS)]
// const APARTMENT = [entry[0] for entry in APARTMENT_SPEC] // TODO: fix me!!
const APARTMENT = APARTMENT_SPEC.map(([point, openings]) => point)
// const APARTMENT = APARTMENT_SPEC.map((entry) => entry[0])

// const APARTMENT_WINDOWS = [(i, entry[1]) for i, entry in enumerate(APARTMENT_SPEC)] // TODO: fix me!!
// TODO: refactor this code with code in cottage.js for HOUSE_WINDOWS and ADDON_WINDOWS
const APARTMENT_WINDOWS = []
let i = 0
for (const entry in APARTMENT_SPEC) {
  APARTMENT_WINDOWS.push([i, entry])
  i++
}

const ATTIC = [
  nudge(APARTMENT[0], { dx: -1.2, dy: -2 }),
  nudge(APARTMENT[1], { dx: -2, dy: -1.2 }),
  nudge(APARTMENT[2], { dx: -2, dy: 1.2 }),
  nudge(APARTMENT[3], { dx: -1.2, dy: 2 }),
  nudge(APARTMENT[4], { dx: 1.2, dy: 2 }),
  nudge(APARTMENT[5], { dx: 2, dy: 1.2 }),
  nudge(APARTMENT[6], { dx: 2, dy: -1.2 }),
  nudge(APARTMENT[7], { dx: 1.2, dy: -2 })]

function _getCloverleafLandingPattern () {
  // Make an empty 3-by-3 spatial grid for planning landings and ramps
  const landings = [
    [[], [], []],
    [[], [], []],
    [[], [], []]
  ]

  const SOUTH_WEST_FIRST_PATTERN = true
  if (SOUTH_WEST_FIRST_PATTERN) {
    // Start the first spiral on the SOUTH WEST corner
    landings[1][1].append([0.0, [Facing.WEST]])
    landings[0][1].append([2.5, [Facing.SOUTH]])
    landings[0][0].append([5.0, [Facing.EAST, Facing.WEST]])
    landings[1][0].append([7.5, [Facing.NORTH, Facing.SOUTH]])

    landings[1][1].append([10.0, [Facing.NORTH]])
    landings[1][2].append([12.5, [Facing.WEST]])
    landings[0][2].append([15.0, [Facing.NORTH, Facing.SOUTH]])
    landings[0][1].append([17.5, [Facing.EAST, Facing.WEST]])

    landings[1][1].append([20.0, [Facing.EAST]])
    landings[2][1].append([22.5, [Facing.NORTH]])
    landings[2][2].append([25.0, [Facing.EAST, Facing.WEST]])
    landings[1][2].append([27.5, [Facing.NORTH, Facing.SOUTH]])

    landings[1][1].append([30.0, [Facing.SOUTH]])
    landings[1][0].append([32.5, [Facing.EAST]])
    landings[2][0].append([35.0, [Facing.NORTH, Facing.SOUTH]])
    landings[2][1].append([37.5, [Facing.EAST, Facing.WEST]])
  } else {
    // Start the first spiral on the NORTH EAST corner
    landings[1][1].append([0.0, [Facing.NORTH]])
    landings[1][2].append([2.5, [Facing.EAST]])
    landings[2][2].append([5.0, [Facing.NORTH, Facing.SOUTH]])
    landings[2][1].append([7.5, [Facing.EAST, Facing.WEST]])

    landings[1][1].append([10.0, [Facing.WEST]])
    landings[0][1].append([12.5, [Facing.NORTH]])
    landings[0][2].append([15.0, [Facing.EAST, Facing.WEST]])
    landings[1][2].append([17.5, [Facing.NORTH, Facing.SOUTH]])

    landings[1][1].append([20.0, [Facing.SOUTH]])
    landings[1][0].append([22.5, [Facing.WEST]])
    landings[0][0].append([25.0, [Facing.NORTH, Facing.SOUTH]])
    landings[0][1].append([27.5, [Facing.EAST, Facing.WEST]])

    landings[1][1].append([30.0, [Facing.EAST]])
    landings[2][1].append([32.5, [Facing.SOUTH]])
    landings[2][0].append([35.0, [Facing.EAST, Facing.WEST]])
    landings[1][0].append([37.5, [Facing.NORTH, Facing.SOUTH]])
  }

  landings[1][1].append([40.0, []])
  return landings
}

function _getLandingPatternForFourCloverleafs () {
  function _flipRamp (ramp, northSouth, eastWest) {
    if (northSouth && ramp === Facing.NORTH) {
      return Facing.SOUTH
    }
    if (northSouth && ramp === Facing.SOUTH) {
      return Facing.NORTH
    }
    if (eastWest && ramp === Facing.EAST) {
      return Facing.WEST
    }
    if (eastWest && ramp === Facing.WEST) {
      return Facing.EAST
    }
    return ramp
  }

  function _flipRamps (landings, northSouth, eastWest) {
    const out = []
    for (const landing of landings) {
      const [z, ramps] = landing
      const flippedRamps = ramps.map((ramp) => _flipRamp(ramp, northSouth, eastWest))
      out.append([z, flippedRamps])
    }
    return out
  }

  // Make an empty 5-by-5 spatial grid for planning landings and ramps
  const landingPattern = [
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []]
  ]
  const pattern = _getCloverleafLandingPattern()
  for (const i of countTo(3)) {
    for (const j of countTo(3)) {
      landingPattern[i][j] = pattern[i][j]
    }
    landingPattern[i][3] = _flipRamps(pattern[i][1], true, false)
    landingPattern[i][4] = _flipRamps(pattern[i][0], true, false)
  }
  landingPattern[3] = landingPattern[1].map((landings) => _flipRamp(landings, false, true))
  landingPattern[4] = landingPattern[0].map((landings) => _flipRamp(landings, false, true))
  return landingPattern
}

function _trimEdgeRampsFromPattern (grid) {
  function _trimEdgeRampsFromLandings (landings, facing) {
    const out = []
    for (const landing of landings) {
      const [z, ramps] = landing
      const trimmedRamps = ramps.filter(ramp => ramp !== facing)
      out.append([z, trimmedRamps])
    }
    return out
  }

  // const numRows = grid.length
  // const numCols = grid[0].length
  for (const column of grid) {
    column[0] = _trimEdgeRampsFromLandings(column[0], Facing.SOUTH)
    column[-1] = _trimEdgeRampsFromLandings(column[-1], Facing.NORTH)
  }
  let i = 0
  for (const landings of grid[0]) {
    grid[0][i] = _trimEdgeRampsFromLandings(landings, Facing.WEST)
    i++
  }
  i = 0
  for (const landings of grid[-1]) {
    grid[-1][i] = _trimEdgeRampsFromLandings(landings, Facing.EAST)
    i++
  }
  return grid
}

function _getLandingPattern (numRows, numCols) {
  const pattern = _getLandingPatternForFourCloverleafs()
  let grid = []
  for (const i of countTo(numRows + 1)) {
    const row = []
    for (const j of countTo(numCols + 1)) {
      row.append(pattern[i % 4][j % 4])
    }
    grid.append(row)
  }
  grid = _trimEdgeRampsFromPattern(grid)
  return grid
}

function _addRoofAroundFloor (plato, shape, peakXyz) {
  const Z = 2
  if (peakXyz[Z] === 0) {
    plato.add_place(Place.ROOF, { shape: shape })
  } else {
    plato.add_place(Place.BARE, { shape: shape })
    let i = 0
    for (xyz of shape) {
      const next = i + 1 < shape.length ? i + 1 : 0
      i++
      const triangle = [xyz, shape[next], peakXyz]
      plato.addPlace(Place.ROOF, { shape: triangle })
    }
  }
}

function _addFeaturesAtLanding (plato, rampBearings, at, buildings = true) {
  // Make plato envision the floorspace for a landing and its ramps.
  const [x, y, z] = at

  // Landing
  plato.goto({ x: x, y: y, z: z, facing: Facing.NORTH })
  plato.add_place(Place.WALKWAY, { shape: OCTAGONAL_LANDING })
  if (!buildings && z % 10 === 0) {
    plato.add_place(Place.BARE, { shape: DIAMOND_CENTER, wall: 3 })
  }

  // Ramps
  for (const bearing of rampBearings) {
    plato.goto({ x: x, y: y, z: z, facing: bearing })
    plato.add_place(Place.WALKWAY, { shape: RAMP })
  }

  // Floors, Walls, and Roof
  if (buildings && z % STORY_HEIGHT === 0) {
    for (const bearing of rampBearings) {
      // parcel
      plato.goto({ x: x, y: y, z: 0, facing: bearing })
      plato.add_place(Place.PARCEL, { shape: BASEMENT })
      // lower floors
      for (const altitude of count(0, z, STORY_HEIGHT)) {
        plato.goto({ x: x, y: y, z: altitude, facing: bearing })
        plato.add_place(Place.ROOM, { shape: BASEMENT })
      }
      // upper floors
      for (const altitude of count(z, ROOFLINE, STORY_HEIGHT)) {
        plato.goto({ x: x, y: y, z: altitude, facing: bearing })
        plato.add_place(Place.ROOM, { shape: APARTMENT, wall: STORY_HEIGHT, openings: APARTMENT_WINDOWS })
      }
      // Roof
      const midpoint = (APARTMENT_WIDTH + D2) / 2
      const peak = xyz(midpoint, midpoint, randomInt(0, 4) * 7)
      plato.goto({ x: x, y: y, z: ROOFLINE, facing: bearing })
      _addRoofAroundFloor(plato, { shape: ATTIC, peakXyz: peak })
    }
  }
}

export default class Merlon {
  constructor (plato) {
    this._plato = plato
  }

  addBuildings (numRows = 2, numCols = 2, buildings = true) {
    // Tell plato about all of our landings, ramps, rooms, and roofs.
    let i = 0
    for (const row of _getLandingPattern(numRows, numCols)) {
      let j = 0
      for (const gridCell of row) {
        const x = i * TOWER_SPACING
        const y = j * TOWER_SPACING
        for (const landingSpec of gridCell) {
          const z = landingSpec[0]
          const rampBearings = landingSpec[1]
          _addFeaturesAtLanding(this._plato, rampBearings, [x, y, z], buildings)
        }
        j++
      }
      i++
    }
    return this
  }
}
