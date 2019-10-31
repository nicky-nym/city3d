// bikeway.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { xyz, countTo } from 'util.js'
import { Place } from 'place.js'
import { Facing } from 'facing.js'
import { rotate } from 'plato.js'

// in feet
const BLOCK_LENGTH = 660

const PARCEL = [
  xyz(0, 0, 0),
  xyz(BLOCK_LENGTH, 0, 0),
  xyz(BLOCK_LENGTH, BLOCK_LENGTH, 0),
  xyz(0, BLOCK_LENGTH, 0)]

const EXIT_DOWN = [
  xyz(25, 0, 0.1),
  xyz(25, 45, 0.1),
  xyz(30, 90, 0.1),
  xyz(40, 90, 0.1),
  xyz(30, 0, 0.1)]
const RAMP_DOWN_TO_LANDING = [
  xyz(30, 90, 0),
  xyz(30, 270, -7.5),
  xyz(40, 270, -7.5),
  xyz(40, 90, 0)]
const LANDING = [
  xyz(30, 270, -7.5),
  xyz(30, 390, -7.5),
  xyz(50, 390, -7.5),
  xyz(50, 270, -7.5)]
const LANDING_PARKING = [
  xyz(50, 270, -7.5),
  xyz(50, 390, -7.5),
  xyz(55, 390, -7.5),
  xyz(55, 270, -7.5)]
const LANDING_PLAZA = [
  xyz(55, 270, -7.5),
  xyz(55, 390, -7.5),
  xyz(70, 390, -7.5),
  xyz(70, 270, -7.5)]
const LANDING_NORTH_WALKWAY = [
  xyz(70, 381, -7.5),
  xyz(129, 381, -5),
  xyz(129, 375, -5),
  xyz(70, 375, -7.5)]
const LANDING_SOUTH_WALKWAY = [
  xyz(70, 285, -7.5),
  xyz(129, 285, -5),
  xyz(129, 279, -5),
  xyz(70, 279, -7.5)]

const RAMP_UP_FROM_LANDING = [
  xyz(30, 390, -7.5),
  xyz(30, 570, 0),
  xyz(40, 570, 0),
  xyz(40, 390, -7.5)]
const ENTRANCE_FROM_BELOW = [
  xyz(30, 570, 0.1),
  xyz(25, 615, 0.1),
  xyz(25, 660, 0.1),
  xyz(30, 660, 0.1),
  xyz(40, 570, 0.1)]
const RAMP_DOWN_FROM_LANDING = [
  xyz(40, 390, -7.5),
  xyz(40, 570, -15),
  xyz(50, 570, -15),
  xyz(50, 390, -7.5)]
const RIGHT_TURN_TO_ENTER = [
  xyz(40, 570, -15),
  xyz(55, 620, -14.9),
  xyz(100, 635, -14.9),
  xyz(100, 625, -14.9),
  xyz(64, 612, -15),
  xyz(50, 570, -15)]
const ENTRANCE_FROM_ABOVE = [
  xyz(100, 635, -14.9),
  xyz(170, 635, -14.9),
  xyz(100, 625, -14.9)]
const EXIT_UP = [
  xyz(170, 25, -14.9),
  xyz(100, 25, -14.9),
  xyz(100, 35, -14.9)]
const RIGHT_TURN_FROM_EXIT = [
  xyz(100, 25, -14.9),
  xyz(55, 40, -14.9),
  xyz(40, 90, -15),
  xyz(50, 90, -15),
  xyz(64, 48, -15),
  xyz(100, 35, -14.9)]
const RAMP_UP_TO_LANDING = [
  xyz(40, 90, -15),
  xyz(40, 270, -7.5),
  xyz(50, 270, -7.5),
  xyz(50, 90, -15)]
const LOWER_PLAZA = [
  xyz(170, 30, -14.9),
  xyz(170, 45, -14.9),
  xyz(490, 45, -14.9),
  xyz(490, 30, -14.9)]

const WALKWAY_SPACING = 96
const WALKWAY_WIDTH = 6
const WALKWAY_XA = 183
const LOWER_PLAZA_WALKWAY_A = [
  xyz(WALKWAY_XA, 45, -15),
  xyz(WALKWAY_XA, 129, -15),
  xyz(WALKWAY_XA + WALKWAY_WIDTH, 129, -15),
  xyz(WALKWAY_XA + WALKWAY_WIDTH, 45, -15)]
const WALKWAY_XB = WALKWAY_XA + WALKWAY_SPACING
const LOWER_PLAZA_WALKWAY_B = [
  xyz(WALKWAY_XB, 45, -15),
  xyz(WALKWAY_XB, 129, -15),
  xyz(WALKWAY_XB + WALKWAY_WIDTH, 129, -15),
  xyz(WALKWAY_XB + WALKWAY_WIDTH, 45, -15)]
const WALKWAY_XC = WALKWAY_XB + WALKWAY_SPACING
const LOWER_PLAZA_WALKWAY_C = [
  xyz(WALKWAY_XC, 45, -15),
  xyz(WALKWAY_XC, 129, -15),
  xyz(WALKWAY_XC + WALKWAY_WIDTH, 129, -15),
  xyz(WALKWAY_XC + WALKWAY_WIDTH, 45, -15)]
const WALKWAY_XD = WALKWAY_XC + WALKWAY_SPACING
const LOWER_PLAZA_WALKWAY_D = [
  xyz(WALKWAY_XD, 45, -15),
  xyz(WALKWAY_XD, 129, -15),
  xyz(WALKWAY_XD + WALKWAY_WIDTH, 129, -15),
  xyz(WALKWAY_XD + WALKWAY_WIDTH, 45, -15)]

export default class Bikeway {
  // Bikeway objects know how to describe the Kinematic city bikeways.

  constructor (plato) {
    this._plato = plato
  }

  addBoulevard ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    const NUM_LANES = 4
    const LANE_WIDTH = 5
    const LANE = [
      xyz(0, 0, 0),
      xyz(LANE_WIDTH, 0, 0),
      xyz(LANE_WIDTH, BLOCK_LENGTH, 0),
      xyz(0, BLOCK_LENGTH, 0)]
    this._plato.goto({ x: x, y: y, z: z, facing: facing })
    this._plato.addPlace(Place.BARE, { shape: LANE }) // median strip
    let delta = 0
    for (const i of countTo(NUM_LANES)) { // eslint-disable-line no-unused-vars
      delta += LANE_WIDTH
      const [dx, dy, dz] = rotate((delta, 0, 0), facing)
      this._plato.goto({ x: x + dx, y: y + dy, z: z + dz, facing: facing })
      this._plato.addPlace(Place.BIKEPATH, { shape: LANE })
    }
    delta += LANE_WIDTH
    const [dx, dy, dz] = rotate((delta, 0, 0), facing)
    this._plato.goto({ x: x + dx, y: y + dy, z: z + dz, facing: facing })
    this._plato.addPlace(Place.BARE, { shape: LANE }) // shoulder
    return this
  }

  addRamps (self) {
    this._plato.addPlace(Place.BIKEPATH, { shape: EXIT_DOWN })
    this._plato.addPlace(Place.BIKEPATH, { shape: RAMP_DOWN_TO_LANDING })
    this._plato.addPlace(Place.BIKEPATH, { shape: LANDING })

    this._plato.addPlace(Place.BARE, { shape: LANDING_PARKING })
    this._plato.addPlace(Place.WALKWAY, { shape: LANDING_PLAZA })
    this._plato.addPlace(Place.WALKWAY, { shape: LANDING_NORTH_WALKWAY })
    this._plato.addPlace(Place.WALKWAY, { shape: LANDING_SOUTH_WALKWAY })

    this._plato.addPlace(Place.BIKEPATH, { shape: RAMP_UP_FROM_LANDING })
    this._plato.addPlace(Place.BIKEPATH, { shape: ENTRANCE_FROM_BELOW })
    this._plato.addPlace(Place.BIKEPATH, { shape: RAMP_DOWN_FROM_LANDING })
    this._plato.addPlace(Place.BIKEPATH, { shape: RIGHT_TURN_TO_ENTER })
    this._plato.addPlace(Place.BIKEPATH, { shape: ENTRANCE_FROM_ABOVE })
    this._plato.addPlace(Place.BIKEPATH, { shape: EXIT_UP })
    this._plato.addPlace(Place.BIKEPATH, { shape: RIGHT_TURN_FROM_EXIT })
    this._plato.addPlace(Place.BIKEPATH, { shape: RAMP_UP_TO_LANDING })

    this._plato.addPlace(Place.WALKWAY, { shape: LOWER_PLAZA })
    this._plato.addPlace(Place.WALKWAY, { shape: LOWER_PLAZA_WALKWAY_A })
    this._plato.addPlace(Place.WALKWAY, { shape: LOWER_PLAZA_WALKWAY_B })
    this._plato.addPlace(Place.WALKWAY, { shape: LOWER_PLAZA_WALKWAY_C })
    this._plato.addPlace(Place.WALKWAY, { shape: LOWER_PLAZA_WALKWAY_D })
    return this
  }

  addHighline ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    const HIGHLINE = [
      xyz(0, 0, 0),
      xyz(0, 630, 0),
      xyz(30, 630, 0),
      xyz(30, 0, 0)]
    this._plato.goto({ x: x, y: y, z: z, facing: facing })
    this._plato.addPlace(Place.PARCEL, { shape: HIGHLINE })
    this._plato.addWall({ shape: [xyz(30, 630, 0), xyz(30, 30, 0)], height: 3, cap: false })
    return this
  }

  addLonghouse ({ x = 0, y = 0, z = 0, height = 10, facing = Facing.NORTH } = {}) {
    const LONGHOUSE = [
      xyz(0, 35, 0),
      xyz(0, 625, 0),
      xyz(30, 625, 0),
      xyz(30, 35, 0)]
    // TODO: fix me!
    const WINDOWS = [] // [(2, [yzwh2rect(y, 3, 4, height-2) for y in range(5, 585, 5)])]
    this._plato.goto({ x: x, y: y, z: z, facing: facing })
    this._plato.addPlace(Place.ROOM, { shape: LONGHOUSE, wall: height, openings: WINDOWS })
    return this
  }

  addBlock (row = 0, col = 0, buildings = true) {
    const x = row * BLOCK_LENGTH
    const y = col * BLOCK_LENGTH
    const EAST_WEST_ALTITUDE = 7.5
    const NORTH_SOUTH_ALTITUDE = 22.5
    const HIGHLINE_ALTITUDE = 37.5

    this._plato.goto({ x: x, y: y, z: -0.1, facing: Facing.NORTH })
    this._plato.addPlace(Place.PARCEL, { shape: PARCEL })

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
    for (const row of countTo(num_rows)) {
      for (const col of countTo(num_cols)) {
        this.addBlock(row, col, buildings)
      }
    }
    return this
  }
}
