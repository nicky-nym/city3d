// bikeway.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { xyz, count, countTo, randomInt, nudge, hypotenuse } from '../city3d/util.js'
import Bicycle from '../movers/bicycle.js'
import Place from '../city3d/place.js'
import Facing from '../city3d/facing.js'
import Structure from '../city3d/structure.js'
import { xy, xywh2rect, rotate } from '../city3d/plato.js'

// in feet
const BLOCK_LENGTH = 660

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

const RAMP_RUN_LENGTH = 180
const RAMP_RISE_HEIGHT = 7.5
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
const RAMP_DOWN_FROM_LANDING = [
  xy(40, 390),
  xy(40, 390 + HYPOTENUSE),
  xy(50, 390 + HYPOTENUSE),
  xy(50, 390)
]
const RAMP_UP_TO_LANDING = [
  xy(40, 90),
  xy(40, 90 + HYPOTENUSE),
  xy(50, 90 + HYPOTENUSE),
  xy(50, 90)
]

const LANDING = [
  xy(30, 270),
  xy(30, 390),
  xy(50, 390),
  xy(50, 270)
]
LANDING.name = 'landing'
const LANDING_LANE = [
  xyz(40, 270, -7.5),
  xyz(40, 390, -7.5)
]
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

const RUN_LENGTH = 59
const RISE_HEIGHT = 2.5
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
  xyz(40, 570, -15),
  xyz(55, 620, -14.9),
  xyz(100, 635, -14.9),
  xyz(100, 625, -14.9),
  xyz(64, 612, -15),
  xyz(50, 570, -15)
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

const WALKWAY_SPACING = 96
const WALKWAY_WIDTH = 6
const WALKWAY_XA = 183
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

export default class Bikeway extends Structure {
  // Bikeway objects know how to describe the Kinematic city bikeways.

  addBoulevard ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    const NUM_LANES = 4
    const LANE_WIDTH = 5
    const LANE = [
      xy(0, 0),
      xy(LANE_WIDTH, 0),
      xy(LANE_WIDTH, BLOCK_LENGTH),
      xy(0, BLOCK_LENGTH)]
    this._plato.goto({ x: x, y: y, z: z, facing: facing })
    this._plato.addPlace(Place.BARE, LANE) // median strip
    let delta = 0
    for (const i of countTo(NUM_LANES)) { // eslint-disable-line no-unused-vars
      delta += LANE_WIDTH
      const [dx, dy] = rotate(xy(delta, 0), facing)
      this._plato.goto({ x: x + dx, y: y + dy, z: z, facing: facing })
      this._plato.addPlace(Place.BIKEPATH, LANE)
      const path = this._plato.addPath(Place.BIKEPATH, [
        [LANE_WIDTH / 2, 0, 0],
        [LANE_WIDTH / 2, BLOCK_LENGTH, 0]])
      this.bicycle.addBicycle(path, randomInt(1, 9) * 0.04)
    }
    delta += LANE_WIDTH
    const [dx, dy] = rotate(xy(delta, 0), facing)
    this._plato.goto({ x: x + dx, y: y + dy, z: z, facing: facing })
    this._plato.addPlace(Place.BARE, LANE) // shoulder
    return this
  }

  addRamps (self) {
    this._plato.addPlace(Place.BIKEPATH, EXIT_DOWN, { z: 0.1 })
    this._plato.addPlace(Place.BIKEPATH, RAMP_DOWN_TO_LANDING, { incline: RAMP_RISE_HEIGHT })
    this._plato.addPlace(Place.BIKEPATH, LANDING, { z: -7.5 })
    let path = this._plato.addPath(Place.BIKEPATH, [
      xyz(25, 0, 0.1), xyz(35, 90, 0.1), // start and end of EXIT_DOWN
      xyz(35, 270, -7.5), // landing
      xyz(45, 390, -7.5),
      xyz(45, 570, -14.9), xyz(60, 616, -14.9), xyz(100, 630, -14.9), // start, middle, end of RIGHT_TURN_TO_ENTER
      xyz(170, 637.5, -14.9) // end of ENTRANCE_FROM_ABOVE
    ])
    this.bicycle.addBicycle(path, randomInt(6, 10) * 0.04)

    this._plato.addPlace(Place.BARE, LANDING_PARKING, { z: -7.5 })
    this._plato.addPlace(Place.WALKWAY, LANDING_PLAZA, { z: -7.5 })
    this._plato.addPlace(Place.WALKWAY, LANDING_NORTH_WALKWAY, { z: -7.5, incline: -RISE_HEIGHT })
    this._plato.addPlace(Place.WALKWAY, LANDING_SOUTH_WALKWAY, { z: -7.5, incline: -RISE_HEIGHT })

    this._plato.addPlace(Place.BIKEPATH, RAMP_UP_FROM_LANDING, { z: -7.5, incline: -RAMP_RISE_HEIGHT })
    this._plato.addPlace(Place.BIKEPATH, ENTRANCE_FROM_BELOW, { z: 0.1 })

    this._plato.addPlace(Place.BIKEPATH, RAMP_DOWN_FROM_LANDING, { z: -7.5, incline: RAMP_RISE_HEIGHT })
    this._plato.addPlace(Place.BIKEPATH, RIGHT_TURN_TO_ENTER, { z: -14.9 })
    this._plato.addPlace(Place.BIKEPATH, ENTRANCE_FROM_ABOVE, { z: -14.9 })

    this._plato.addPlace(Place.BIKEPATH, EXIT_UP, { z: -14.9 })
    this._plato.addPlace(Place.BIKEPATH, RIGHT_TURN_FROM_EXIT, { z: -14.9 })
    path = this._plato.addPath(Place.BIKEPATH, [
      xyz(170, 22.5, -14.9), // start of EXIT_UP
      xyz(100, 30, -14.9), xyz(60, 44, -14.9), xyz(45, 90, -14.9), // start, middle, end of RIGHT_TURN_FROM_EXIT
      xyz(45, 270, -7.5), // landing
      xyz(35, 390, -7.5),
      xyz(35, 570, 0.1), xyz(25, 660, 0.1) // start and end of ENTRANCE_FROM_BELOW
    ])
    this.bicycle.addBicycle(path, randomInt(3, 6) * 0.04)
    this._plato.addPlace(Place.BIKEPATH, RAMP_UP_TO_LANDING, { z: -15, incline: -RAMP_RISE_HEIGHT })

    this._plato.addPlace(Place.WALKWAY, LOWER_PLAZA, { z: -14.9 })
    this._plato.addPlace(Place.WALKWAY, LOWER_PLAZA_WALKWAY_A, { z: -15 })
    this._plato.addPlace(Place.WALKWAY, LOWER_PLAZA_WALKWAY_B, { z: -15 })
    this._plato.addPlace(Place.WALKWAY, LOWER_PLAZA_WALKWAY_C, { z: -15 })
    this._plato.addPlace(Place.WALKWAY, LOWER_PLAZA_WALKWAY_D, { z: -15 })
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
    this._plato.goto({ x: x, y: y, z: z, facing: facing })
    this._plato.addPlace(Place.BARE, RETAINING_WALL, { wall: HIGHLINE_WALL_HEIGHT, cap: false })
    this._plato.addPlace(Place.PARCEL, HIGHLINE_SOIL, { depth: HIGHLINE_SOIL_THICKNESS })
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

    this._plato.goto({ x: x, y: y, z: z, facing: facing })
    this._plato.addPlace(Place.ROOM, LONGHOUSE, { wall: height, openings: WINDOWS })
    return this
  }

  addBlock (row = 0, col = 0, buildings = true) {
    const x = row * BLOCK_LENGTH
    const y = col * BLOCK_LENGTH
    const EAST_WEST_ALTITUDE = 7.5
    const NORTH_SOUTH_ALTITUDE = 22.5
    const HIGHLINE_ALTITUDE = 37.5

    this._plato.goto({ x: x, y: y, z: -0.1, facing: Facing.NORTH })
    this._plato.addPlace(Place.PARCEL, PARCEL)

    this.addBoulevard({ x: x, y: y, z: NORTH_SOUTH_ALTITUDE, facing: Facing.NORTH })
    if (buildings) {
      this.addHighline({ x: x, y: y, z: HIGHLINE_ALTITUDE, facing: Facing.NORTH })
      this.addLonghouse({ x: x, y: y, z: 0, height: 11.25, facing: Facing.NORTH })
      this.addLonghouse({ x: x, y: y, z: 11.25, height: 11.25, facing: Facing.NORTH })
    }
    this._plato.goto({ x: x, y: y, z: NORTH_SOUTH_ALTITUDE, facing: Facing.NORTH })
    this.addRamps()

    this.addBoulevard({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: NORTH_SOUTH_ALTITUDE, facing: Facing.SOUTH })
    if (buildings) {
      this.addHighline({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: HIGHLINE_ALTITUDE, facing: Facing.SOUTH })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: 0, height: 11.25, facing: Facing.SOUTH })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: 11.25, height: 11.25, facing: Facing.SOUTH })
    }
    this._plato.goto({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: NORTH_SOUTH_ALTITUDE, facing: Facing.SOUTH })
    this.addRamps()

    this.addBoulevard({ x: x, y: y + BLOCK_LENGTH, z: EAST_WEST_ALTITUDE, facing: Facing.EAST })
    if (buildings) {
      this.addHighline({ x: x, y: y + BLOCK_LENGTH, z: HIGHLINE_ALTITUDE, facing: Facing.EAST })
      this.addLonghouse({ x: x, y: y + BLOCK_LENGTH, z: 0, height: 7.5, facing: Facing.EAST })
      this.addLonghouse({ x: x, y: y + BLOCK_LENGTH, z: NORTH_SOUTH_ALTITUDE, height: 15, facing: Facing.EAST })
    }
    this._plato.goto({ x: x, y: y, z: EAST_WEST_ALTITUDE, facing: Facing.EAST })

    this.addBoulevard({ x: x + BLOCK_LENGTH, y: y, z: EAST_WEST_ALTITUDE, facing: Facing.WEST })
    if (buildings) {
      this.addHighline({ x: x + BLOCK_LENGTH, y: y, z: HIGHLINE_ALTITUDE, facing: Facing.WEST })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y, z: 0, height: 7.5, facing: Facing.WEST })
      this.addLonghouse({ x: x + BLOCK_LENGTH, y: y, z: NORTH_SOUTH_ALTITUDE, height: 15, facing: Facing.WEST })
    }
    this._plato.goto({ x: x + BLOCK_LENGTH, y: y + BLOCK_LENGTH, z: EAST_WEST_ALTITUDE, facing: Facing.WEST })

    return this
  }

  addBikeways (num_rows = 0, num_cols = 0, { buildings = true } = {}) {
    this.bicycle = new Bicycle(this._plato)
    for (const row of countTo(num_rows)) {
      for (const col of countTo(num_cols)) {
        this.addBlock(row, col, buildings)
      }
    }
    return this
  }
}
