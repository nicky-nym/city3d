/** @file manhattan.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xy, countTo, randomInt } from '../core/util.js'
import Place from '../architecture/place.js'
import Structure from '../architecture/structure.js'

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

const BUILDING = [
  xy(0, 0),
  xy(BUILDING_DX, 0),
  xy(BUILDING_DX, BUILDING_DY),
  xy(0, BUILDING_DY)]
const INTERSECTION = [
  xy(0, 0),
  xy(HALF_AVENUE, 0),
  xy(HALF_AVENUE, HALF_STREET),
  xy(0, HALF_STREET)]
const STREET = [
  xy(0, 0),
  xy(BLOCK_DX, 0),
  xy(BLOCK_DX, HALF_STREET),
  xy(0, HALF_STREET)]
const AVENUE = [
  xy(0, 0),
  xy(HALF_AVENUE, 0),
  xy(HALF_AVENUE, BLOCK_DY),
  xy(0, BLOCK_DY)]
const SIDEWALK_FOR_STREET = [
  xy(0, 0),
  xy(BLOCK_DX, 0),
  xy(BLOCK_DX, SIDEWALK_WIDTH_STREETS),
  xy(0, SIDEWALK_WIDTH_STREETS)]
const SIDEWALK_FOR_AVENUE = [
  xy(0, 0),
  xy(0, BLOCK_DY),
  xy(SIDEWALK_WIDTH_AVENUES, BLOCK_DY),
  xy(SIDEWALK_WIDTH_AVENUES, 0)]
const REPEAT_DX = BLOCK_DX + AVENUE_WIDTH + (SIDEWALK_WIDTH_AVENUES * 2)
const REPEAT_DY = BLOCK_DY + STREET_WIDTH + (SIDEWALK_WIDTH_STREETS * 2)

export default class Manhattan extends Structure {
  // Manhattan objects know how to describe the city blocks in New York.

  makePlace (place, area,
    {
      x = 0,
      y = 0,
      z = 0,
      dx = 0,
      dy = 0,
      wall = 0,
      openings = [] // Sequence[Tuple]
    } = {}) {
    this._plato.goto({ x: x + dx, y: y + dy, z: z })
    this._plato.makePlace(place, area, { wall: wall, openings: openings })
  }

  addBuildingAt (x = 0, y = 0) {
    // print(`NYC: addBuildingAt(${x}, ${y})`)
    let z = 0
    this.makePlace(Place.PARCEL, BUILDING, { x: x, y: y, z: z })
    const numFloors = randomInt(4, 60)
    const storyHeight = randomInt(9, 12)
    for (const i of countTo(numFloors)) {
      z = i * storyHeight
      this.makePlace(Place.ROOM, BUILDING, { x: x, y: y, z: z, wall: storyHeight, openings: [] })
    }
    this.makePlace(Place.ROOF, BUILDING, { x: x, y: y, z: z + storyHeight })
  }

  addBlock (row = 0, col = 0) {
    // print(`NYC: addBlock(${row}, ${col})`)
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

    this.makePlace(Place.STREET, STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES })
    this.makePlace(Place.STREET, STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.makePlace(Place.STREET, AVENUE, { x: x, y: y, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.makePlace(Place.STREET, AVENUE, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    this.makePlace(Place.STREET, INTERSECTION, { x: x, y: y })
    this.makePlace(Place.STREET, INTERSECTION, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX })
    this.makePlace(Place.STREET, INTERSECTION, { x: x, y: y, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.makePlace(Place.STREET, INTERSECTION, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })

    this.makePlace(Place.WALKWAY, SIDEWALK_FOR_STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET })
    this.makePlace(Place.WALKWAY, SIDEWALK_FOR_STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS + BLOCK_DY })
    this.makePlace(Place.WALKWAY, SIDEWALK_FOR_AVENUE, { x: x, y: y, dx: HALF_AVENUE, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.makePlace(Place.WALKWAY, SIDEWALK_FOR_AVENUE, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    return this
  }

  addBlocks (numRows = 2, numCols = 2) {
    // print(`NYC: addBlocks(${numRows} by ${numCols})`)
    for (const row of countTo(numRows)) {
      for (const col of countTo(numCols)) {
        this.addBlock(row, col)
      }
    }
    return this
  }
}
