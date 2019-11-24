// creek.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { countTo } from '../city3d/util.js'
import { Geometry } from '../city3d/geometry.js'

const NUM_SECTIONS = 270
const SECTION_LENGTH = 20
const CREEK_WIDTH = 20
const LENGTH = NUM_SECTIONS * SECTION_LENGTH
const X_OFFSET = -LENGTH / 2

class Creek {
  creekPath () {
    const path = []
    // TODO: refactor this so that it's not a copy of the code in makeCreek()
    for (const i of countTo(NUM_SECTIONS)) {
      const y = SECTION_LENGTH * Math.sin(i * 4 / SECTION_LENGTH)
      const x = X_OFFSET + i * SECTION_LENGTH
      path.push([x, y + CREEK_WIDTH / 3, 0])
    }
    return path.slice(NUM_SECTIONS / 2)
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
