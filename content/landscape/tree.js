/** @file tree.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xy, xyzAdd } from '../../src/core/util.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { LAYER } from '../../src/architecture/layer.js'
import { Model } from '../../src/architecture/model.js'
import { UNIT } from '../../src/core/unit.js'
import { Pose } from '../../src/core/pose.js'

const TRUNK_HEIGHT = UNIT.feet(8)
const CROWN_HEIGHT = UNIT.feet(9)

class Tree extends Model {
  constructor ({ pose = Pose.DEFAULT, trunkHeight = TRUNK_HEIGHT, name = 'Tree' } = {}) {
    super({ name, layer: LAYER.PLANTS })
    this.add(this.makeTrunk(pose, trunkHeight))
    const crownPose = Pose.collapse(Pose.combine({ z: pose.z + trunkHeight }, pose))
    this.add(this.makeCrown(crownPose))
  }

  makeTrunk (atXy, trunkHeight) {
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
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: trunkHeight })
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, xyVertices[0], BROWN)
    return concreteThickPolygon
  }

  makeCrown (atXyz) {
    const GREEN = 0x00cc00
    let xyVertices = [
      xy(0, -10),
      xy(-1, -4),
      xy(-10, 2),
      xy(-4, 9),
      xy(4, 9),
      xy(10, 2),
      xy(8, -6)
    ]
    xyVertices = xyVertices.map(xy => xyzAdd(xy, atXyz))
    const xyPolygon = new Geometry.XYPolygon(xyVertices)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: CROWN_HEIGHT })
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, { ...xyVertices[0], z: atXyz.z }, GREEN)
    return concreteThickPolygon
  }
}

export { Tree }
