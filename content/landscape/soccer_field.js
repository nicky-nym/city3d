/** @file soccer_field.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyz, xywh2rect, xyzAdd } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { Model } from '../../src/architecture/model.js'
import { Ray } from '../../src/core/ray.js'
import { UNIT } from '../../src/core/unit.js'

const FEET_PER_YARD = 3
const yards = UNIT.define('yards', length => length * FEET_PER_YARD)

const FIELD = {
  x: yards(115),
  y: yards(75)
}
const GOAL_POSTS = {
  x: 0,
  y: yards(8),
  z: UNIT.feet(8)
}
const GOAL_BOX = {
  x: yards(6),
  y: yards(20)
}
const PENALTY_BOX = {
  x: yards(18),
  y: yards(44)
}

const TURF_MARGIN = UNIT.feet(5.5)
const TURF = {
  x: FIELD.x + 2 * TURF_MARGIN,
  y: FIELD.y + 2 * TURF_MARGIN,
  z: UNIT.feet(0.1)
}

/**
 * SoccerField represents a standard full professional-size U.S. soccer field or British football pitch.
 */
class SoccerField extends Model {
  constructor ({ at = xyz(0, 0, 0), name = 'Soccer field' } = {}) {
    super({ name })
    this.addTurf(at)
    this.addMarkings(at)
    this.addGoals(at)
  }

  addTurf (atXyz) {
    const GREEN = 0x003300
    const rect = xywh2rect(0, 0, TURF.x, TURF.y)
    const xyPolygon = new Geometry.XYPolygon(rect)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: TURF.z })
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, atXyz, GREEN)
    this.add(concreteThickPolygon)
  }

  addMarkings (atXyz) {
    const CHALK = 0xffffff
    const CHALK_RADIUS = 0.2
    const xyzSum = xyzAdd(atXyz, xyz(TURF_MARGIN, TURF_MARGIN, 0.3))
    const ray = new Ray(Facing.NORTH, xyzSum)

    const touchlinesAndGoallines = xywh2rect(0, 0, FIELD.x, FIELD.y)
    const halfLine = [
      xyz(FIELD.x / 2, 0, 0),
      xyz(FIELD.x / 2, FIELD.y, 0)
    ]
    const leftGoalBox = xywh2rect(0, (FIELD.y - GOAL_BOX.y) / 2, GOAL_BOX.x, GOAL_BOX.y)
    const leftPenaltyBox = xywh2rect(0, (FIELD.y - PENALTY_BOX.y) / 2, PENALTY_BOX.x, PENALTY_BOX.y)
    const rightGoalBox = xywh2rect(FIELD.x - GOAL_BOX.x, (FIELD.y - GOAL_BOX.y) / 2, GOAL_BOX.x, GOAL_BOX.y)
    const rightPenaltyBox = xywh2rect(FIELD.x - PENALTY_BOX.x, (FIELD.y - PENALTY_BOX.y) / 2, PENALTY_BOX.x, PENALTY_BOX.y)

    this.addLine(touchlinesAndGoallines, ray, CHALK_RADIUS, CHALK, true)
    this.addLine(halfLine, ray, CHALK_RADIUS, CHALK, true)
    this.addLine(leftGoalBox, ray, CHALK_RADIUS, CHALK, true)
    this.addLine(leftPenaltyBox, ray, CHALK_RADIUS, CHALK, true)
    this.addLine(rightGoalBox, ray, CHALK_RADIUS, CHALK, true)
    this.addLine(rightPenaltyBox, ray, CHALK_RADIUS, CHALK, true)
  }

  addGoals (atXyz) {
    const WHITE = 0xffffff
    const GOAL_RADIUS = 0.3
    const xyzSum = xyzAdd(atXyz, xyz(TURF_MARGIN, TURF_MARGIN, 0.3))
    const ray = new Ray(Facing.NORTH, xyzSum)
    const leftGoalPosts = [
      xyz(0, (FIELD.y - GOAL_POSTS.y) / 2, 0),
      xyz(0, (FIELD.y - GOAL_POSTS.y) / 2, GOAL_POSTS.z),
      xyz(0, (FIELD.y + GOAL_POSTS.y) / 2, GOAL_POSTS.z),
      xyz(0, (FIELD.y + GOAL_POSTS.y) / 2, 0)
    ]
    const rightGoalPosts = [
      xyz(FIELD.x, (FIELD.y - GOAL_POSTS.y) / 2, 0),
      xyz(FIELD.x, (FIELD.y - GOAL_POSTS.y) / 2, GOAL_POSTS.z),
      xyz(FIELD.x, (FIELD.y + GOAL_POSTS.y) / 2, GOAL_POSTS.z),
      xyz(FIELD.x, (FIELD.y + GOAL_POSTS.y) / 2, 0)
    ]
    this.addLine(leftGoalPosts, ray, GOAL_RADIUS, WHITE, true)
    this.addLine(rightGoalPosts, ray, GOAL_RADIUS, WHITE, true)
  }
}

export { SoccerField }
