/** @file midrise_complex.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xy, xyz, xywh2rect, count, countTo, randomInt, hypotenuse } from '../../src/core/util.js'
import { Byway } from '../../src/architecture/byway.js'
import { Facing } from '../../src/core/facing.js'
import { Roof } from '../../src/architecture/roof.js'
import { Storey } from '../../src/architecture/storey.js'
import { Structure } from '../../src/architecture/structure.js'
import { UNIT } from '../../src/core/unit.js'
import { Use } from '../../src/architecture/use.js'

const STOREY_HEIGHT = UNIT.feet(10)
const ROOFLINE = STOREY_HEIGHT * 5
const RAMP_WIDTH = UNIT.feet(6)
const RAMP_RUN_LENGTH = UNIT.feet(30)
const RAMP_RISE_HEIGHT = UNIT.feet(2.5)
const TOWER_WIDTH = RAMP_RUN_LENGTH + 12
const LANDING_WIDTH = RAMP_WIDTH + TOWER_WIDTH - RAMP_RUN_LENGTH
const TOWER_SPACING = TOWER_WIDTH + RAMP_WIDTH

const D1 = LANDING_WIDTH / 2.0
const D2 = RAMP_WIDTH / 2.0
const RAMP_HYPOTENUSE = hypotenuse(RAMP_RUN_LENGTH, RAMP_RISE_HEIGHT)
const RAMP_CORNERS = [
  xy(+D2, D1),
  xy(+D2, D1 + RAMP_HYPOTENUSE),
  xy(-D2, D1 + RAMP_HYPOTENUSE),
  xy(-D2, D1)
]
const OCTAGONAL_LANDING = [
  xy(-D1, -D2),
  xy(-D2, -D1),
  xy(+D2, -D1),
  xy(+D1, -D2),
  xy(+D1, +D2),
  xy(+D2, +D1),
  xy(-D2, +D1),
  xy(-D1, +D2)
]
const DIAMOND_CENTER = [
  xy(-3, 0),
  xy(0, +3),
  xy(+3, 0),
  xy(0, -3)
]
const BASEMENT = [
  xy(D1, 0),
  xy(D1, D2),
  xy(D2, D1),
  xy(0, D1),
  xy(0, 2 * D1 + RAMP_RUN_LENGTH),
  xy(2 * D1 + RAMP_RUN_LENGTH, 2 * D1 + RAMP_RUN_LENGTH),
  xy(2 * D1 + RAMP_RUN_LENGTH, 0)
]
const APARTMENT_WIDTH = D1 + RAMP_RUN_LENGTH + (D1 + D2) / 2

const DOOR_HEIGHT = 6 + 8 / 12
const DOORS = [
  xywh2rect(1.2, 0.01, 3, DOOR_HEIGHT),
  xywh2rect(4.285, 0.01, 3, DOOR_HEIGHT)
]
const WINDOWS = [
  xywh2rect(1.75, 3, 2.5, 5),
  xywh2rect(4.75, 3, 2.5, 5),

  xywh2rect(8.75, 3, 2.5, 5),
  xywh2rect(11.75, 3, 2.5, 5),

  xywh2rect(15.75, 3, 2.5, 5),
  xywh2rect(18.75, 3, 2.5, 5),

  xywh2rect(22.75, 3, 2.5, 5),
  xywh2rect(25.75, 3, 2.5, 5)
]
const SPAN = RAMP_RUN_LENGTH + (D1 + D2) / 2
const APARTMENT_SPEC = [
  [xy(D1, D2), DOORS],
  [xy(D2, D1), WINDOWS],
  [xy(D2, D1 + RAMP_RUN_LENGTH), []],
  [xy(D1, D1 + SPAN), WINDOWS],
  [xy(D1 + RAMP_RUN_LENGTH, D1 + SPAN), []],
  [xy(D1 + SPAN, D1 + RAMP_RUN_LENGTH), WINDOWS],
  [xy(D1 + SPAN, D1), []],
  [xy(D1 + RAMP_RUN_LENGTH, D2), WINDOWS]
]
const APARTMENT = APARTMENT_SPEC.map(([point, openings]) => point)

// TODO: refactor this code with code in house.js for HOUSE_WINDOWS and ADDON_WINDOWS
const APARTMENT_WINDOWS = []
let i = 0
for (const [point, windows] of APARTMENT_SPEC) { // eslint-disable-line no-unused-vars
  APARTMENT_WINDOWS.push([i, windows])
  i++
}

function nudgeXY (xy, delta) {
  return { x: xy.x + delta.x, y: xy.y + delta.y }
}

const ATTIC = [
  nudgeXY(APARTMENT[0], xy(-1.2, -2)),
  nudgeXY(APARTMENT[1], xy(-2, -1.2)),
  nudgeXY(APARTMENT[2], xy(-2, 1.2)),
  nudgeXY(APARTMENT[3], xy(-1.2, 2)),
  nudgeXY(APARTMENT[4], xy(1.2, 2)),
  nudgeXY(APARTMENT[5], xy(2, 1.2)),
  nudgeXY(APARTMENT[6], xy(2, -1.2)),
  nudgeXY(APARTMENT[7], xy(1.2, -2))
]

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
    landings[1][1].push([0.0, [Facing.WEST]])
    landings[0][1].push([2.5, [Facing.SOUTH]])
    landings[0][0].push([5.0, [Facing.EAST, Facing.WEST]])
    landings[1][0].push([7.5, [Facing.NORTH, Facing.SOUTH]])

    landings[1][1].push([10.0, [Facing.NORTH]])
    landings[1][2].push([12.5, [Facing.WEST]])
    landings[0][2].push([15.0, [Facing.NORTH, Facing.SOUTH]])
    landings[0][1].push([17.5, [Facing.EAST, Facing.WEST]])

    landings[1][1].push([20.0, [Facing.EAST]])
    landings[2][1].push([22.5, [Facing.NORTH]])
    landings[2][2].push([25.0, [Facing.EAST, Facing.WEST]])
    landings[1][2].push([27.5, [Facing.NORTH, Facing.SOUTH]])

    landings[1][1].push([30.0, [Facing.SOUTH]])
    landings[1][0].push([32.5, [Facing.EAST]])
    landings[2][0].push([35.0, [Facing.NORTH, Facing.SOUTH]])
    landings[2][1].push([37.5, [Facing.EAST, Facing.WEST]])
  } else {
    // Start the first spiral on the NORTH EAST corner
    landings[1][1].push([0.0, [Facing.NORTH]])
    landings[1][2].push([2.5, [Facing.EAST]])
    landings[2][2].push([5.0, [Facing.NORTH, Facing.SOUTH]])
    landings[2][1].push([7.5, [Facing.EAST, Facing.WEST]])

    landings[1][1].push([10.0, [Facing.WEST]])
    landings[0][1].push([12.5, [Facing.NORTH]])
    landings[0][2].push([15.0, [Facing.EAST, Facing.WEST]])
    landings[1][2].push([17.5, [Facing.NORTH, Facing.SOUTH]])

    landings[1][1].push([20.0, [Facing.SOUTH]])
    landings[1][0].push([22.5, [Facing.WEST]])
    landings[0][0].push([25.0, [Facing.NORTH, Facing.SOUTH]])
    landings[0][1].push([27.5, [Facing.EAST, Facing.WEST]])

    landings[1][1].push([30.0, [Facing.EAST]])
    landings[2][1].push([32.5, [Facing.SOUTH]])
    landings[2][0].push([35.0, [Facing.EAST, Facing.WEST]])
    landings[1][0].push([37.5, [Facing.NORTH, Facing.SOUTH]])
  }

  landings[1][1].push([40.0, []])
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
      out.push([z, flippedRamps])
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
  function _trimEdgeRampsFromLandings (grid, facing) {
    const out = []
    for (const landing of grid) {
      const [z, ramps] = landing
      const trimmedRamps = ramps.filter(ramp => ramp !== facing)
      out.push([z, trimmedRamps])
    }
    return out
  }

  for (const column of grid) {
    const LAST = column.length - 1
    column[0] = _trimEdgeRampsFromLandings(column[0], Facing.SOUTH)
    column[LAST] = _trimEdgeRampsFromLandings(column[LAST], Facing.NORTH)
  }
  let i = 0
  for (const landings of grid[0]) {
    grid[0][i] = _trimEdgeRampsFromLandings(landings, Facing.WEST)
    i++
  }
  i = 0
  const LAST = grid.length - 1
  for (const landings of grid[LAST]) {
    grid[LAST][i] = _trimEdgeRampsFromLandings(landings, Facing.EAST)
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
      row.push(pattern[i % 4][j % 4])
    }
    grid.push(row)
  }
  grid = _trimEdgeRampsFromPattern(grid)
  return grid
}

class MidriseComplex extends Structure {
  constructor ({ city, ray, x0, y0, numRows = 2, numCols = 2, hideBuildings = false, name } = {}) {
    super({ city, ray, x0, y0, name: name || 'Midrise Complex' })
    this.addBuildings(numRows, numCols, !hideBuildings)
  }

  _addRoofAroundFloor (shape, peakXyz) {
    let roofSpec = {}
    if (peakXyz.z === 0) {
      roofSpec = {
        flat: shape
      }
      const roof = new Roof(roofSpec, this._ray)
      this.add(roof)
    } else {
      this.add(new Storey(this._ray, Use.BARE, shape))
      let i = 0
      for (const corner of shape) {
        const next = i + 1 < shape.length ? i + 1 : 0
        i++
        const vertices = [
          xyz(corner.x, corner.y, 0),
          xyz(shape[next].x, shape[next].y, 0),
          peakXyz
        ]
        const indices = [[0, 1, 2]]
        roofSpec = {
          custom: { vertices, indices }
        }
        const roof = new Roof(roofSpec, this._ray)
        this.add(roof)
      }
    }
  }

  _addFeaturesAtLanding (rampBearings, at, buildings = true) {
    const [x, y, z] = at
    let ray

    // Landing
    ray = this.goto({ x: x, y: y, z: z, facing: Facing.NORTH })
    this.add(new Byway(ray, Use.WALKWAY, OCTAGONAL_LANDING))
    if (!buildings && z % STOREY_HEIGHT === 0) {
      this.add(new Storey(ray, Use.BARE, DIAMOND_CENTER, { wall: 3 }))
    }

    // Ramps
    for (const bearing of rampBearings) {
      ray = this.goto({ x: x, y: y, z: z, facing: bearing })
      this.add(new Byway(ray, Use.WALKWAY, RAMP_CORNERS, { incline: RAMP_RISE_HEIGHT }))
    }

    // Floors, Walls, and Roof
    if (buildings && z % STOREY_HEIGHT === 0) {
      for (const bearing of rampBearings) {
        // parcel
        ray = this.goto({ x: x, y: y, z: 0, facing: bearing })
        this.add(new Storey(ray, Use.PARCEL, BASEMENT))

        // lower floors
        for (const altitude of count(0, z, STOREY_HEIGHT)) {
          ray = this.goto({ x: x, y: y, z: altitude, facing: bearing })
          this.add(new Storey(ray, Use.ROOM, BASEMENT))
        }

        // upper floors
        for (const altitude of count(z, ROOFLINE, STOREY_HEIGHT)) {
          ray = this.goto({ x: x, y: y, z: altitude, facing: bearing })
          this.add(new Storey(ray, Use.ROOM, APARTMENT, { wall: STOREY_HEIGHT, openings: APARTMENT_WINDOWS }))
        }

        // roof
        const midpoint = (APARTMENT_WIDTH + D2) / 2
        const peak = xyz(midpoint, midpoint, randomInt(0, 4) * 7)
        this.goto({ x: x, y: y, z: ROOFLINE, facing: bearing })
        this._addRoofAroundFloor(ATTIC, peak)
      }
    }
  }

  addBuildings (numRows = 2, numCols = 2, buildings = true) {
    let i = 0
    for (const row of _getLandingPattern(numRows, numCols)) {
      let j = 0
      for (const gridCell of row) {
        const x = i * TOWER_SPACING
        const y = j * TOWER_SPACING
        for (const landingSpec of gridCell) {
          const z = landingSpec[0]
          const rampBearings = landingSpec[1]
          this._addFeaturesAtLanding(rampBearings, [x, y, z], buildings)
        }
        j++
      }
      i++
    }
  }
}

export { MidriseComplex }
