/** @file lattice.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz, xyRotate, xywh2rect, count, countTo, hypotenuse } from '../../src/core/util.js'
import { Byway } from '../../src/architecture/byway.js'
import { Facing } from '../../src/core/facing.js'
import { Route } from '../../src/routes/route.js'
import { Storey } from '../../src/architecture/storey.js'
import { Structure } from '../../src/architecture/structure.js'
import { Use } from '../../src/architecture/use.js'

const BLOCK_LENGTH = UNIT.feet(660)

const PARCEL = [
  xy(0, 0),
  xy(BLOCK_LENGTH, 0),
  xy(BLOCK_LENGTH, BLOCK_LENGTH),
  xy(0, BLOCK_LENGTH)
]
const EXIT_DOWN = [
  xy(25, 0),
  xy(25, 45),
  xy(30, 90),
  xy(40, 90),
  xy(30, 0)
]
EXIT_DOWN.name = 'exit down'

const RAMP_RUN_LENGTH = UNIT.feet(180)
const RAMP_RISE_HEIGHT = UNIT.feet(7.5)
const HYPOTENUSE = hypotenuse(RAMP_RUN_LENGTH, RAMP_RISE_HEIGHT)
const RAMP_DOWN_TO_LANDING = [
  xy(30, 90),
  xy(30, 90 + HYPOTENUSE),
  xy(40, 90 + HYPOTENUSE),
  xy(40, 90)
]
RAMP_DOWN_TO_LANDING.name = 'ramp down to landing'
const RAMP_UP_FROM_LANDING = [
  xy(30, 390),
  xy(30, 390 + HYPOTENUSE),
  xy(40, 390 + HYPOTENUSE),
  xy(40, 390)
]
RAMP_UP_FROM_LANDING.name = 'ramp up from landing'
const RAMP_DOWN_FROM_LANDING = [
  xy(40, 390),
  xy(40, 390 + HYPOTENUSE),
  xy(50, 390 + HYPOTENUSE),
  xy(50, 390)
]
RAMP_DOWN_FROM_LANDING.name = 'ramp down from landing'
const RAMP_UP_TO_LANDING = [
  xy(40, 90),
  xy(40, 90 + HYPOTENUSE),
  xy(50, 90 + HYPOTENUSE),
  xy(50, 90)
]
RAMP_UP_TO_LANDING.name = 'ramp up to landing'

const LANDING = [
  xy(30, 270),
  xy(30, 390),
  xy(50, 390),
  xy(50, 270)
]
LANDING.name = 'landing'
const LANDING_PARKING = [
  xy(50, 270),
  xy(50, 390),
  xy(55, 390),
  xy(55, 270)
]
const LANDING_PLAZA = [
  xy(55, 270),
  xy(55, 390),
  xy(70, 390),
  xy(70, 270)
]

const RUN_LENGTH = UNIT.feet(59)
const RISE_HEIGHT = UNIT.feet(2.5)
const WALKWAY_HYPOTENUSE = hypotenuse(RUN_LENGTH, RISE_HEIGHT)
const LANDING_NORTH_WALKWAY = [
  xy(70, 381),
  xy(70 + WALKWAY_HYPOTENUSE, 381),
  xy(70 + WALKWAY_HYPOTENUSE, 375),
  xy(70, 375)
]
const LANDING_SOUTH_WALKWAY = [
  xy(70, 285),
  xy(70 + WALKWAY_HYPOTENUSE, 285),
  xy(70 + WALKWAY_HYPOTENUSE, 279),
  xy(70, 279)
]

const ENTRANCE_FROM_BELOW = [
  xy(30, 570),
  xy(25, 615),
  xy(25, 660),
  xy(30, 660),
  xy(40, 570)
]

const RIGHT_TURN_TO_ENTER = [
  xy(40, 570),
  xy(55, 620),
  xy(100, 635),
  xy(100, 625),
  xy(64, 612),
  xy(50, 570)
]
const ENTRANCE_FROM_ABOVE = [
  xy(100, 635),
  xy(170, 635),
  xy(100, 625)]
const EXIT_UP = [
  xy(170, 25),
  xy(100, 25),
  xy(100, 35)
]
const RIGHT_TURN_FROM_EXIT = [
  xy(100, 25),
  xy(55, 40),
  xy(40, 90),
  xy(50, 90),
  xy(64, 48),
  xy(100, 35)
]
RIGHT_TURN_FROM_EXIT.name = 'right turn from exit'

const LOWER_PLAZA = [
  xy(170, 30),
  xy(170, 45),
  xy(490, 45),
  xy(490, 30)
]

const WALKWAY_SPACING = UNIT.feet(96)
const WALKWAY_WIDTH = UNIT.feet(6)
const WALKWAY_XA = UNIT.feet(183)
const LOWER_PLAZA_WALKWAY_A = [
  xy(WALKWAY_XA, 45),
  xy(WALKWAY_XA, 129),
  xy(WALKWAY_XA + WALKWAY_WIDTH, 129),
  xy(WALKWAY_XA + WALKWAY_WIDTH, 45)
]
const WALKWAY_XB = WALKWAY_XA + WALKWAY_SPACING
const LOWER_PLAZA_WALKWAY_B = [
  xy(WALKWAY_XB, 45),
  xy(WALKWAY_XB, 129),
  xy(WALKWAY_XB + WALKWAY_WIDTH, 129),
  xy(WALKWAY_XB + WALKWAY_WIDTH, 45)
]
const WALKWAY_XC = WALKWAY_XB + WALKWAY_SPACING
const LOWER_PLAZA_WALKWAY_C = [
  xy(WALKWAY_XC, 45),
  xy(WALKWAY_XC, 129),
  xy(WALKWAY_XC + WALKWAY_WIDTH, 129),
  xy(WALKWAY_XC + WALKWAY_WIDTH, 45)
]
const WALKWAY_XD = WALKWAY_XC + WALKWAY_SPACING
const LOWER_PLAZA_WALKWAY_D = [
  xy(WALKWAY_XD, 45),
  xy(WALKWAY_XD, 129),
  xy(WALKWAY_XD + WALKWAY_WIDTH, 129),
  xy(WALKWAY_XD + WALKWAY_WIDTH, 45)
]

/**
 * A Lattice is a repeating pattern of Kinematic city bikeways.
 */
class Lattice extends Structure {
  constructor ({ city, ray, x0, y0, numRows = 2, numCols = 2, hideBuildings = false, name } = {}) {
    super({ city, ray, x0, y0, name: name || 'Lattice' })
    this._city = city
    this.addUnitCells(numRows, numCols, !hideBuildings)
  }

  addBoulevard ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    const NUM_LANES = 4
    const LANE_WIDTH = 5
    const LANE = [
      xy(0, 0),
      xy(LANE_WIDTH, 0),
      xy(LANE_WIDTH, BLOCK_LENGTH),
      xy(0, BLOCK_LENGTH)]
    let ray
    ray = this.goto({ x: x, y: y, z: z, facing: facing })
    this.add(new Byway(ray, Use.BARE, LANE)) // median strip
    let delta = 0
    for (const i of countTo(NUM_LANES)) { // eslint-disable-line no-unused-vars
      delta += LANE_WIDTH
      const dxy = xyRotate(xy(delta, 0), facing)
      ray = this.goto({ x: x + dxy.x, y: y + dxy.y, z: z, facing: facing })
      this.add(new Byway(ray, Use.BIKEPATH, LANE))
      const route = new Route(this._ray.applyRay([
        xyz(LANE_WIDTH / 2, 0, 0),
        xyz(LANE_WIDTH / 2, BLOCK_LENGTH, 0)
      ]), Use.BIKEPATH)
      this.add(route)
    }
    delta += LANE_WIDTH
    const dxy = xyRotate(xy(delta, 0), facing)
    ray = this.goto({ x: x + dxy.x, y: y + dxy.y, z: z, facing: facing })
    this.add(new Byway(ray, Use.BARE, LANE)) // shoulder
    return this
  }

  addRamps (self) {
    const ray = this._ray
    this.add(new Byway(ray, Use.BIKEPATH, EXIT_DOWN, { z: 0.1 }))
    this.add(new Byway(ray, Use.BIKEPATH, RAMP_DOWN_TO_LANDING, { incline: RAMP_RISE_HEIGHT }))
    this.add(new Byway(ray, Use.BIKEPATH, LANDING, { z: -7.5 }))
    let route = new Route(this._ray.applyRay([
      xyz(25, 0, 0.1), xyz(35, 90, 0.1), // start and end of EXIT_DOWN
      xyz(35, 270, -7.5), // landing
      xyz(45, 390, -7.5),
      xyz(45, 570, -14.9), xyz(60, 616, -14.9), xyz(100, 630, -14.9), // start, middle, end of RIGHT_TURN_TO_ENTER
      xyz(170, 637.5, -14.9) // end of ENTRANCE_FROM_ABOVE
    ]), Use.BIKEPATH)
    this.add(route)

    this.add(new Byway(ray, Use.BARE, LANDING_PARKING, { z: -7.5 }))
    this.add(new Byway(ray, Use.WALKWAY, LANDING_PLAZA, { z: -7.5 }))
    this.add(new Byway(ray, Use.WALKWAY, LANDING_NORTH_WALKWAY, { z: -7.5, incline: -RISE_HEIGHT }))
    this.add(new Byway(ray, Use.WALKWAY, LANDING_SOUTH_WALKWAY, { z: -7.5, incline: -RISE_HEIGHT }))

    this.add(new Byway(ray, Use.BIKEPATH, RAMP_UP_FROM_LANDING, { z: -7.5, incline: -RAMP_RISE_HEIGHT }))
    this.add(new Byway(ray, Use.BIKEPATH, ENTRANCE_FROM_BELOW, { z: 0.1 }))

    this.add(new Byway(ray, Use.BIKEPATH, RAMP_DOWN_FROM_LANDING, { z: -7.5, incline: RAMP_RISE_HEIGHT }))
    this.add(new Byway(ray, Use.BIKEPATH, RIGHT_TURN_TO_ENTER, { z: -14.9 }))
    this.add(new Byway(ray, Use.BIKEPATH, ENTRANCE_FROM_ABOVE, { z: -14.9 }))

    this.add(new Byway(ray, Use.BIKEPATH, EXIT_UP, { z: -14.9 }))
    this.add(new Byway(ray, Use.BIKEPATH, RIGHT_TURN_FROM_EXIT, { z: -14.9 }))

    route = new Route(this._ray.applyRay([
      xyz(170, 22.5, -14.9), // start of EXIT_UP
      xyz(100, 30, -14.9), xyz(60, 44, -14.9), xyz(45, 90, -14.9), // start, middle, end of RIGHT_TURN_FROM_EXIT
      xyz(45, 270, -7.5), // landing
      xyz(35, 390, -7.5),
      xyz(35, 570, 0.1), xyz(25, 660, 0.1) // start and end of ENTRANCE_FROM_BELOW
    ]), Use.BIKEPATH)
    this.add(route)
    this.add(new Byway(ray, Use.BIKEPATH, RAMP_UP_TO_LANDING, { z: -15, incline: -RAMP_RISE_HEIGHT }))

    this.add(new Byway(ray, Use.WALKWAY, LOWER_PLAZA, { z: -14.9 }))
    this.add(new Byway(ray, Use.WALKWAY, LOWER_PLAZA_WALKWAY_A, { z: -15 }))
    this.add(new Byway(ray, Use.WALKWAY, LOWER_PLAZA_WALKWAY_B, { z: -15 }))
    this.add(new Byway(ray, Use.WALKWAY, LOWER_PLAZA_WALKWAY_C, { z: -15 }))
    this.add(new Byway(ray, Use.WALKWAY, LOWER_PLAZA_WALKWAY_D, { z: -15 }))
    return this
  }

  addHighline ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    const RETAINING_WALL = [
      xy(30, 630),
      xy(30, 30)
    ]
    const HIGHLINE_SOIL = [
      xy(0, 0),
      xy(0, 630.5),
      xy(29.5, 630.5),
      xy(29.5, 0)
    ]
    const HIGHLINE_SOIL_THICKNESS = 4
    const HIGHLINE_WALL_HEIGHT = 3 + HIGHLINE_SOIL_THICKNESS
    const ray = this.goto({ x: x, y: y, z: z, facing: facing })
    this.add(new Storey(ray, Use.BARE, RETAINING_WALL, { wall: HIGHLINE_WALL_HEIGHT, cap: false }))
    this.add(new Storey(ray, Use.PARCEL, HIGHLINE_SOIL, { depth: HIGHLINE_SOIL_THICKNESS }))
    return this
  }

  addLonghouse ({ x = 0, y = 0, z = 0, height = 10, facing = Facing.NORTH } = {}) {
    const LONGHOUSE = [
      xy(0, 35),
      xy(0, 625),
      xy(30, 625),
      xy(30, 35)
    ]
    // TODO: fix me!
    const WINDOW_RECTS = count(5, 585, 5).map(x => xywh2rect(x, 3, 4, height - 5))
    const WINDOWS = [[2, WINDOW_RECTS]]

    const ray = this.goto({ x: x, y: y, z: z, facing: facing })
    this.add(new Storey(ray, Use.ROOM, LONGHOUSE, { wall: height, openings: WINDOWS }))
    return this
  }

  addBlock (row = 0, col = 0, buildings = true) {
    const x = row * BLOCK_LENGTH
    const y = col * BLOCK_LENGTH
    const EAST_WEST_ALTITUDE = 7.5
    const NORTH_SOUTH_ALTITUDE = 22.5
    const HIGHLINE_ALTITUDE = 37.5

    const ray = this.goto({ x: x, y: y, z: -0.1, facing: Facing.NORTH })
    this.add(new Storey(ray, Use.PARCEL, PARCEL))

    this.addBoulevard({ x: x, y: y, z: NORTH_SOUTH_ALTITUDE, facing: Facing.NORTH })
    if (buildings) {
      this.addHighline({ x: x, y: y, z: HIGHLINE_ALTITUDE, facing: Facing.NORTH })
      this.addLonghouse({ x: x, y: y, z: 0, height: 11.25, facing: Facing.NORTH })
      this.addLonghouse({ x: x, y: y, z: 11.25, height: 11.25, facing: Facing.NORTH })
    }
    this.goto({ x: x, y: y, z: NORTH_SOUTH_ALTITUDE, facing: Facing.NORTH })
    this.addRamps()

    this.addBoulevard({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: NORTH_SOUTH_ALTITUDE, facing: Facing.SOUTH })
    if (buildings) {
      this.addHighline({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: HIGHLINE_ALTITUDE, facing: Facing.SOUTH })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: 0, height: 11.25, facing: Facing.SOUTH })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: 11.25, height: 11.25, facing: Facing.SOUTH })
    }
    this.goto({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: NORTH_SOUTH_ALTITUDE, facing: Facing.SOUTH })
    this.addRamps()

    this.addBoulevard({ x: x, y: y + BLOCK_LENGTH, z: EAST_WEST_ALTITUDE, facing: Facing.EAST })
    if (buildings) {
      this.addHighline({ x: x, y: y + BLOCK_LENGTH, z: HIGHLINE_ALTITUDE, facing: Facing.EAST })
      this.addLonghouse({ x: x, y: y + BLOCK_LENGTH, z: 0, height: 7.5, facing: Facing.EAST })
      this.addLonghouse({ x: x, y: y + BLOCK_LENGTH, z: NORTH_SOUTH_ALTITUDE, height: 15, facing: Facing.EAST })
    }
    this.goto({ x: x, y: y, z: EAST_WEST_ALTITUDE, facing: Facing.EAST })

    this.addBoulevard({ x: x + BLOCK_LENGTH, y: y, z: EAST_WEST_ALTITUDE, facing: Facing.WEST })
    if (buildings) {
      this.addHighline({ x: x + BLOCK_LENGTH, y: y, z: HIGHLINE_ALTITUDE, facing: Facing.WEST })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y, z: 0, height: 7.5, facing: Facing.WEST })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y, z: NORTH_SOUTH_ALTITUDE, height: 15, facing: Facing.WEST })
    }
    this.goto({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: EAST_WEST_ALTITUDE, facing: Facing.WEST })

    return this
  }

  addUnitCells (num_rows = 0, num_cols = 0, { buildings = true } = {}) {
    for (const row of countTo(num_rows)) {
      for (const col of countTo(num_cols)) {
        this.addBlock(row, col, buildings)
      }
    }
  }
}

export { Lattice }