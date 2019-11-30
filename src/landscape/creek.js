/** @file creek.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xyz, countTo } from '../core/util.js'
import { Geometry } from '../core/geometry.js'
import { UNIT } from '../core/unit.js'

const NUM_SECTIONS = 270
const SECTION_LENGTH = UNIT.feet(20)
const CREEK_WIDTH = UNIT.feet(20)
const LENGTH = NUM_SECTIONS * SECTION_LENGTH
const X_OFFSET = -LENGTH / 2

class Creek {
  /**
   * Returns a route that follows this Creek.
   * @param {number} [lane=2] - Choose an integer between 1 and 5 for one of five equally spaced lanes. 0 or 6 will
   * follow an edge, and values outside that range will follow alongside the creek.
   */
  creekRoute (lane = 2) {
    const route = []
    const offset = lane * CREEK_WIDTH / 6
    // TODO: refactor this so that it's not a copy of the code in makeCreek()
    for (const i of countTo(NUM_SECTIONS)) {
      const y = SECTION_LENGTH * Math.sin(i * 4 / SECTION_LENGTH)
      const x = X_OFFSET + i * SECTION_LENGTH
      route.push(xyz(x, y + offset, 0))
    }
    return route.slice(NUM_SECTIONS / 2)
  }

  makeCreek () {
    const BLUE = 0x0000ff
    const xyPolygon = new Geometry.XYPolygon()
    for (const i of countTo(NUM_SECTIONS)) {
      const y = SECTION_LENGTH * Math.sin(i * 4 / SECTION_LENGTH)
      const x = X_OFFSET + i * SECTION_LENGTH
      xyPolygon.push({ x, y })
    }
    for (const i of countTo(NUM_SECTIONS)) {
      const y = CREEK_WIDTH + SECTION_LENGTH * Math.sin((NUM_SECTIONS - i) * 4 / SECTION_LENGTH)
      const x = X_OFFSET + LENGTH - (i * SECTION_LENGTH)
      xyPolygon.push({ x, y })
    }

    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: 0.1 })
    const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, 0, BLUE)
    return concreteThickPolygon
  }
}

export { Creek }