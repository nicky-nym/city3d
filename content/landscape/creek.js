/** @file creek.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyz, countTo } from '../../src/core/util.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { LAYER } from '../../src/architecture/layer.js'
import { Model } from '../../src/architecture/model.js'
import { Route } from '../../src/routes/route.js'
import { UNIT } from '../../src/core/unit.js'
import { Use } from '../../src/architecture/use.js'

const NUM_SECTIONS = 270
const SECTION_LENGTH = UNIT.feet(20)
const CREEK_WIDTH = UNIT.feet(20)
const LENGTH = NUM_SECTIONS * SECTION_LENGTH
const X_OFFSET = -LENGTH / 2
const CREEK_DEPTH = 0.1

class Creek extends Model {
  constructor (name = 'Creek') {
    super({ name })
  }

  static sinusoidalPath (numSections, sectionLength) {
    const path = []
    for (const i of countTo(NUM_SECTIONS)) {
      const y = SECTION_LENGTH * Math.sin(i * 4 / SECTION_LENGTH)
      const x = X_OFFSET + i * SECTION_LENGTH
      path.push({ x, y })
    }
    return path
  }

  /**
   * Returns a Route that follows this Creek.
   * @param {number} [lane=2] - Choose an integer between 1 and 5 for one of five equally spaced lanes. 0 or 6 will
   * follow an edge, and values outside that range will follow alongside the creek.
   * @returns {Route}
   */
  creekRoute (lane = 2, use = Use.CANAL) {
    const offset = lane * CREEK_WIDTH / 6
    const path = Creek.sinusoidalPath(NUM_SECTIONS, SECTION_LENGTH)
    const route = path.map(xy => xyz(xy.x, xy.y + offset, CREEK_DEPTH))
    return new Route(route.slice(NUM_SECTIONS / 2), use)
  }

  makeCreek () {
    const BLUE = 0x0000ff
    const xyPolygon = new Geometry.XYPolygon()
    const path = Creek.sinusoidalPath(NUM_SECTIONS, SECTION_LENGTH)
    path.forEach(xy => xyPolygon.push(xy))
    path.reverse()
    path.forEach(xy => xyPolygon.push({ x: xy.x, y: xy.y + CREEK_WIDTH }))

    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: CREEK_DEPTH })
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, xyz(X_OFFSET, 0, 0), BLUE,
      { name: this.name, layer: LAYER.WATER })
    return concreteThickPolygon
  }
}

export { Creek }
