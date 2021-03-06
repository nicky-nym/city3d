/** @file midrise_complex.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */
import { xy, xyz, xyzAdd, count, countTo, randomInt, hypotenuse } from '../../src/core/util.js'
import { Byway } from '../../src/architecture/byway.js'
import { Facing } from '../../src/core/facing.js'
import { FeatureGroup } from '../../src/core/feature.js'
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
const DIAMOND_OUTLINE = {
  shape: 'polygon',
  corners: [
    xy(-3, 0),
    xy(0, -3),
    xy(+3, 0),
    xy(0, +3)
  ]
}
const BASEMENT_OUTLINE = {
  shape: 'polygon',
  corners: [
    xy(D1, 0),
    xy(2 * D1 + RAMP_RUN_LENGTH, 0),
    xy(2 * D1 + RAMP_RUN_LENGTH, 2 * D1 + RAMP_RUN_LENGTH),
    xy(0, 2 * D1 + RAMP_RUN_LENGTH),
    xy(0, D1),
    xy(D2, D1),
    xy(D1, D2)
  ]
}
const APARTMENT_WIDTH = D1 + RAMP_RUN_LENGTH + (D1 + D2) / 2

const DOOR_HEIGHT = UNIT.feet(6 + 8 / 12)
// const DOORS = [
//   xywh2rect(1.2, 0.01, 3, DOOR_HEIGHT),
//   xywh2rect(4.285, 0.01, 3, DOOR_HEIGHT)
// ]
const DOOR = { shape: 'rectangle', size: { x: 3, y: DOOR_HEIGHT } }
const DOORS = [
  { outline: DOOR, at: { x: 1.2, y: 0.01, from: 'left' } },
  { outline: DOOR, at: { x: 4.285, y: 0.01, from: 'left' } }
]

const RECT = { shape: 'rectangle', size: { x: 2.5, y: 5 } }
const WINDOWS = [
  { outline: RECT, at: { x: 1.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 4.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 8.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 11.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 15.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 18.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 22.75, y: 3, from: 'left' } },
  { outline: RECT, at: { x: 25.75, y: 3, from: 'left' } }
]

const SPAN = RAMP_RUN_LENGTH + (D1 + D2) / 2
const APARTMENT_SPEC = [
  [xy(D1, D2), WINDOWS],
  [xy(D1 + RAMP_RUN_LENGTH, D2), []],
  [xy(D1 + SPAN, D1), WINDOWS],
  [xy(D1 + SPAN, D1 + RAMP_RUN_LENGTH), []],
  [xy(D1 + RAMP_RUN_LENGTH, D1 + SPAN), WINDOWS],
  [xy(D1, D1 + SPAN), []],
  [xy(D2, D1 + RAMP_RUN_LENGTH), WINDOWS],
  [xy(D2, D1), DOORS]
]
const APARTMENT = APARTMENT_SPEC.map(([point, openings]) => point)
const APARTMENT_OUTLINE = {
  shape: 'polygon',
  corners: APARTMENT
}

const APARTMENT_WINDOWS = []
let i = 0
for (const [point, windows] of APARTMENT_SPEC) { // eslint-disable-line no-unused-vars
  APARTMENT_WINDOWS.push([i, windows])
  i++
}

function _nudgeXY (xy, delta) {
  return { x: xy.x + delta.x, y: xy.y + delta.y }
}

const ATTIC = [
  _nudgeXY(APARTMENT[0], xy(-1.2, -2)),
  _nudgeXY(APARTMENT[1], xy(1.2, -2)),
  _nudgeXY(APARTMENT[2], xy(2, -1.2)),
  _nudgeXY(APARTMENT[3], xy(2, 1.2)),
  _nudgeXY(APARTMENT[4], xy(1.2, 2)),
  _nudgeXY(APARTMENT[5], xy(-1.2, 2)),
  _nudgeXY(APARTMENT[6], xy(-2, 1.2)),
  _nudgeXY(APARTMENT[7], xy(-2, -1.2))
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

function _getLandingPattern (numRowPairs, numColPairs) {
  const pattern = _getLandingPatternForFourCloverleafs()
  let grid = []
  for (const i of countTo((numRowPairs * 2) + 1)) {
    const row = []
    for (const j of countTo((numColPairs * 2) + 1)) {
      row.push(pattern[i % 4][j % 4])
    }
    grid.push(row)
  }
  grid = _trimEdgeRampsFromPattern(grid)
  return grid
}

class MidriseComplex extends Structure {
  // TODO: replace this with a declarative midrise_complex.json.js
  constructor ({ name = 'Midrise Complex', pose, numRowPairs = 1, numColPairs = 1 } = {}) {
    super({ name, pose })

    this.mediumGroup = new FeatureGroup(this.name)
    this.lowGroup = new FeatureGroup(this.name)
    this.addLevelOfDetail(this.mediumGroup, 1000)
    this.addLevelOfDetail(this.lowGroup, 3000)

    this._addBuildings(numRowPairs, numColPairs)
  }

  _addRoofAroundFloor (pose, shape, peakXyz) {
    const spec = {
      name: 'Roof',
      form: 'flat',
      outline: { shape: 'polygon', corners: shape },
      eaves: 0
    }
    this.add(new Roof({ pose, spec }))
    this.mediumGroup.add(new Roof({ pose, spec }))
    this.lowGroup.add(new Roof({ pose, spec }))
  }

  _shiftedPose ({ x = 0, y = 0, z = 0 } = {}, facing) {
    // const pose = Pose.combine(Pose.copy(this.pose()), xyz(x, y, z))
    // pose.rotated = facing
    // return pose
    const pose = xyzAdd(xyz(x, y, z), this.pose())
    pose.rotated = facing
    return pose
  }

  _addFeaturesAtLanding (rampBearings, at) {
    const [x, y, z] = at
    let pose

    // Landing
    pose = this._shiftedPose({ x: x, y: y, z: z }, Facing.NORTH)
    const landingSpec = {
      floors: [{
        outline: {
          shape: 'polygon',
          corners: OCTAGONAL_LANDING
        }
      }]
    }
    this.add(new Byway({ pose, spec: landingSpec }))
    this.mediumGroup.add(new Byway({ pose, spec: landingSpec }))
    if (z % STOREY_HEIGHT === 0) {
      const spec = {
        floors: [{ outline: DIAMOND_OUTLINE }],
        height: 3,
        walls: {
          exterior: [
            { begin: xy(-3, 0), end: xy(0, -3) },
            { end: xy(+3, 0) },
            { end: xy(0, +3) },
            { end: xy(-3, 0) }
          ]
        }
      }
      this.add(new Storey({ pose, spec }))
    }

    // Ramps
    for (const bearing of rampBearings) {
      pose = this._shiftedPose({ x: x, y: y, z: z }, bearing)
      const rampSpec = {
        floors: [{
          incline: RAMP_RISE_HEIGHT,
          outline: {
            shape: 'polygon',
            corners: RAMP_CORNERS
          }
        }]
      }
      this.add(new Byway({ pose, spec: rampSpec }))
      this.mediumGroup.add(new Byway({ pose, spec: rampSpec }))
    }

    // Floors, Walls, and Roof
    if (z % STOREY_HEIGHT === 0) {
      for (const bearing of rampBearings) {
        // parcel
        pose = this._shiftedPose({ x: x, y: y, z: 0 }, bearing)

        // lower floors
        for (const altitude of count(0, z, STOREY_HEIGHT)) {
          pose = this._shiftedPose({ x: x, y: y, z: altitude }, bearing)
          const spec = {
            floors: [{ outline: BASEMENT_OUTLINE }]
          }
          this.add(new Storey({ pose, spec }))
        }

        // upper floors
        for (const altitude of count(z, ROOFLINE, STOREY_HEIGHT)) {
          pose = this._shiftedPose({ x: x, y: y, z: altitude }, bearing)
          const spec = {
            floors: [{ outline: APARTMENT_OUTLINE }],
            height: STOREY_HEIGHT
            // TODO:
            // walls: {
            //   exterior: []
            // }
            // windows: APARTMENT_WINDOWS
          }
          this.add(new Storey({ pose, spec }))
        }
        pose = this._shiftedPose({ x: x, y: y, z: z }, bearing)
        this.mediumGroup.add(this.makePlaceholder(pose, Use.WALL, APARTMENT, ROOFLINE - z))
        this.lowGroup.add(this.makePlaceholder(pose, Use.WALL, APARTMENT, ROOFLINE - z))

        // roof
        const midpoint = (APARTMENT_WIDTH + D2) / 2
        const peak = xyz(midpoint, midpoint, randomInt(0, 4) * 7)
        pose = this._shiftedPose({ x: x, y: y, z: ROOFLINE }, bearing)
        this._addRoofAroundFloor(pose, ATTIC, peak)
      }
    }
  }

  _addBuildings (numRowPairs = 1, numColPairs = 1) {
    let i = 0
    for (const row of _getLandingPattern(numRowPairs, numColPairs)) {
      let j = 0
      for (const gridCell of row) {
        const x = i * TOWER_SPACING
        const y = j * TOWER_SPACING
        for (const landingSpec of gridCell) {
          const z = landingSpec[0]
          const rampBearings = landingSpec[1]
          this._addFeaturesAtLanding(rampBearings, [x, y, z])
        }
        j++
      }
      i++
    }
  }
}

export { MidriseComplex }
