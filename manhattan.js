// manhattan.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { xyz, countTo, randomInt } from 'util.js'
import { Place } from 'place.js'
// import { Plato } from 'plato.js'

// in feet
const BLOCK_DX = 600
const BLOCK_DY = 200

const BUILDINGS_PER_STREET = 2
const BUILDINGS_PER_AVENUE = 6

const BUILDING_DX = BLOCK_DX / BUILDINGS_PER_AVENUE
const BUILDING_DY = BLOCK_DY / BUILDINGS_PER_STREET

const SIDEWALK_WIDTH_STREETS = 16
const SIDEWALK_WIDTH_AVENUES = 20
const STREET_WIDTH = 32
const AVENUE_WIDTH = 60
const HALF_STREET = 32 / 2
const HALF_AVENUE = 60 / 2

// const STORY_HEIGHT = 10
const BUILDING = [
  xyz(0, 0),
  xyz(BUILDING_DX, 0),
  xyz(BUILDING_DX, BUILDING_DY),
  xyz(0, BUILDING_DY)]
const INTERSECTION = [
  xyz(0, 0),
  xyz(HALF_AVENUE, 0),
  xyz(HALF_AVENUE, HALF_STREET),
  xyz(0, HALF_STREET)]
const STREET = [
  xyz(0, 0),
  xyz(BLOCK_DX, 0),
  xyz(BLOCK_DX, HALF_STREET),
  xyz(0, HALF_STREET)]
const AVENUE = [
  xyz(0, 0),
  xyz(HALF_AVENUE, 0),
  xyz(HALF_AVENUE, BLOCK_DY),
  xyz(0, BLOCK_DY)]
const SIDEWALK_FOR_STREET = [
  xyz(0, 0),
  xyz(BLOCK_DX, 0),
  xyz(BLOCK_DX, SIDEWALK_WIDTH_STREETS),
  xyz(0, SIDEWALK_WIDTH_STREETS)]
const SIDEWALK_FOR_AVENUE = [
  xyz(0, 0),
  xyz(0, BLOCK_DY),
  xyz(SIDEWALK_WIDTH_AVENUES, BLOCK_DY),
  xyz(SIDEWALK_WIDTH_AVENUES, 0)]
// const BLOCK = [
//   xyz(0, 0),
//   xyz(BLOCK_DX, 0),
//   xyz(BLOCK_DX, BLOCK_DY),
//   xyz(0, BLOCK_DY)]
const REPEAT_DX = BLOCK_DX + AVENUE_WIDTH + (SIDEWALK_WIDTH_AVENUES * 2)
const REPEAT_DY = BLOCK_DY + STREET_WIDTH + (SIDEWALK_WIDTH_STREETS * 2)

export default class Manhattan {
  // Manhattan objects know how to describe the city blocks in New York.

  constructor (plato) {
    this._plato = plato
  }

  addPlace (place,
    {
      shape, // Sequence[Xyz]
      x = 0,
      y = 0,
      z = 0,
      dx = 0,
      dy = 0,
      wall = 0,
      openings = [] // Sequence[Tuple]
    } = {}) {
    this._plato.goto({ x: x + dx, y: y + dy, z: z })
    this._plato.addPlace({ place: place, shape: shape, wall: wall, openings: openings })
  }

  addBuildingAt (x = 0, y = 0) {
    // print("  NYC building: {:,.0f}, {:,.0f}".format(x, y))
    this.add_place(Place.PARCEL, { shape: BUILDING, x: x, y: y, z: 0 })
    const numFloors = randomInt(4, 60)
    const storyHeight = randomInt(9, 12)
    for (const i of countTo(numFloors)) {
      const z = i * storyHeight
      this.addPlace(Place.ROOM, { shape: BUILDING, x: x, y: y, z: z, wall: storyHeight, openings: [] })
      this.addPlace(Place.ROOF, { shape: BUILDING, x: x, y: y, z: z + storyHeight })
    }
  }

  addBlock (row = 0, col = 0) {
    const x = row * REPEAT_DX
    const y = col * REPEAT_DY

    for (const bx of countTo(BUILDINGS_PER_AVENUE)) {
      for (const by of countTo(BUILDINGS_PER_STREET)) {
        const x0 = HALF_AVENUE + SIDEWALK_WIDTH_AVENUES + x
        const y0 = HALF_STREET + SIDEWALK_WIDTH_STREETS + y
        const dx = bx * BUILDING_DX
        const dy = by * BUILDING_DY
        this.addBuildingAt(dx + x0, dy + y0)
      }
    }

    this.addPlace(Place.STREET, { shape: STREET, x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES })
    this.addPlace(Place.STREET, { shape: STREET, x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.addPlace(Place.STREET, { shape: AVENUE, x: x, y: y, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.addPlace(Place.STREET, { shape: AVENUE, x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    this.addPlace(Place.STREET, { shape: INTERSECTION, x: x, y: y })
    this.addPlace(Place.STREET, { shape: INTERSECTION, x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX })
    this.addPlace(Place.STREET, { shape: INTERSECTION, x: x, y: y, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.addPlace(Place.STREET, { shape: INTERSECTION, x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })

    this.addPlace(Place.WALKWAY, { shape: SIDEWALK_FOR_STREET, x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET })
    this.addPlace(Place.WALKWAY, { shape: SIDEWALK_FOR_STREET, x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS + BLOCK_DY })
    this.addPlace(Place.WALKWAY, { shape: SIDEWALK_FOR_AVENUE, x: x, y: y, dx: HALF_AVENUE, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.addPlace(Place.WALKWAY, { shape: SIDEWALK_FOR_AVENUE, x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    return this
  }

  addBlocks (numRows = 2, numCols = 2) {
    for (const row of countTo(numRows)) {
      for (const col of countTo(numCols)) {
        this.addBlock(row, col)
      }
    }
    return this
  }
}
