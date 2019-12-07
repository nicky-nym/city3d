/** @file tree.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xy, xyzAdd } from '../../src/core/util.js'
import { Geometry } from '../../src/core/geometry.js'
import { UNIT } from '../../src/core/unit.js'

const TRUNK_HEIGHT = UNIT.feet(8)
const CROWN_HEIGHT = UNIT.feet(9)

class Tree {
  makeTrunk (atXy) {
    const BROWN = 0x663300
    let xyVertices = [
      xy(0, -1),
      xy(-0.95, -0.31),
      xy(-0.59, 0.81),
      xy(0.59, 0.81),
      xy(0.95, -0.31)
    ]
    xyVertices = xyVertices.map(xy => xyzAdd(xy, atXy))
    const xyPolygon = new Geometry.XYPolygon(xyVertices)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: TRUNK_HEIGHT })
    const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, 0, BROWN)
    return concreteThickPolygon
  }

  makeCrown (atXy) {
    const GREEN = 0x00cc00
    let xyVertices = [
      xy(0, -10),
      xy(-8, -6),
      xy(-10, 2),
      xy(-4, 9),
      xy(4, 9),
      xy(10, 2),
      xy(8, -6)
    ]
    xyVertices = xyVertices.map(xy => xyzAdd(xy, atXy))
    const xyPolygon = new Geometry.XYPolygon(xyVertices)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: CROWN_HEIGHT })
    const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, TRUNK_HEIGHT, GREEN)
    return concreteThickPolygon
  }
}

export { Tree }
