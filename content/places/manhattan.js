/** @file manhattan.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../../src/core/unit.js'
import { xy, countTo } from '../../src/core/util.js'
import { Highrise } from '../buildings/highrise.js'
import { Byway } from '../../src/architecture/byway.js'
import { Place } from '../../src/architecture/place.js'
import { Use } from '../../src/architecture/use.js'

const BLOCK_DX = UNIT.feet(600)
const BLOCK_DY = UNIT.feet(200)

const BUILDINGS_PER_STREET = 2
const BUILDINGS_PER_AVENUE = 6

const BUILDING_DX = BLOCK_DX / BUILDINGS_PER_AVENUE
const BUILDING_DY = BLOCK_DY / BUILDINGS_PER_STREET

const SIDEWALK_WIDTH_STREETS = UNIT.feet(16)
const SIDEWALK_WIDTH_AVENUES = UNIT.feet(20)
const STREET_WIDTH = UNIT.feet(32)
const AVENUE_WIDTH = UNIT.feet(60)
const HALF_STREET = STREET_WIDTH / 2
const HALF_AVENUE = AVENUE_WIDTH / 2

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

/**
 * Manhattan objects know how to describe the city blocks in New York.
 */
class Manhattan extends Place {
  makeByway (use, area,
    {
      x = 0,
      y = 0,
      z = 0,
      dx = 0,
      dy = 0,
      wall = 0,
      openings = [] // Sequence[Tuple]
    } = {}) {
    const ray = this._plato.goto({ x: x + dx, y: y + dy, z: z })
    const storey = new Byway(ray, use, area, { wall: wall, openings: openings })
    this._plato.appendToSector(storey)
  }

  addBuildingAt (x = 0, y = 0) {
    const z = 0
    const offset = { x, y, z }
    const size = { x: BUILDING_DX, y: BUILDING_DY }
    const highrise = new Highrise(this._plato)
    const groupForBuilding = highrise.makeBuilding(size, offset)
    this._plato.goto({ x, y, z })
    this._plato.appendToSector(groupForBuilding)
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

    this.makeByway(Use.STREET, STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES })
    this.makeByway(Use.STREET, STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.makeByway(Use.STREET, AVENUE, { x: x, y: y, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.makeByway(Use.STREET, AVENUE, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y })
    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX })
    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })

    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET })
    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS + BLOCK_DY })
    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_AVENUE, { x: x, y: y, dx: HALF_AVENUE, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_AVENUE, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

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

export { Manhattan }
