/** @file eiffel_tower.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xyz } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { Ray } from '../../src/core/ray.js'
import { Structure } from '../../src/architecture/structure.js'

// TODO: refactor to merge this with _makeLine() in Swingset & UtilityPole
function _makeLine (waypoints, ray, color) {
  const adjustedWaypoints = ray.applyRay(waypoints)
  const line = new Geometry.Line(adjustedWaypoints)
  return new FeatureInstance(line, adjustedWaypoints[0], color)
}

const mastHeight = UNIT.feet(1063)
const halfBaseSpan = UNIT.feet(410) / 2
const footingWidth = UNIT.feet(83)
const platforms = [
  { height: 189, width: 214 }, // about 213 or 217 ?
  { height: 380, width: 129 }, // about 133 or 124 ?
  { height: 643, width: 70 },
  { height: 906, width: 57 }, // about 61 or 52 ?
  { height: 990, width: 18 }
]

/**
 * Class representing the Eiffel tower in Paris.
 */
class EiffelTower extends Structure {
  constructor ({ name, at = xyz(0, 0, 0) } = {}) {
    super({ name: name || 'Eiffel tower', at })
    this._ray = new Ray(Facing.NORTH)

    for (const direction of [Facing.NORTH, Facing.SOUTH, Facing.EAST, Facing.WEST]) {
      this._drawQuadrant(direction)
    }
    const mastPoints = [
      xyz(0, 0, platforms[3].height),
      xyz(0, 0, mastHeight)
    ]
    this._line(mastPoints, this._ray)
  }

  _drawQuadrant (direction) {
    const ray = this._ray
    ray.az = direction
    const cornerPoints = []
    const xInsetPoints = []
    const yInsetPoints = []
    const xyInsetPoints = []
    let insetDistance = footingWidth
    cornerPoints.push(xyz(halfBaseSpan, halfBaseSpan, 0))
    xInsetPoints.push(xyz(halfBaseSpan - insetDistance, halfBaseSpan, 0))
    yInsetPoints.push(xyz(halfBaseSpan, halfBaseSpan - insetDistance, 0))
    xyInsetPoints.push(xyz(halfBaseSpan - insetDistance, halfBaseSpan - insetDistance, 0))
    const footingPoints = [
      cornerPoints[0],
      xInsetPoints[0],
      xyInsetPoints[0],
      yInsetPoints[0],
      cornerPoints[0]
    ]
    this._line(footingPoints, ray)
    for (const platform of platforms) {
      const { height, width } = platform
      const edge = width / 2
      insetDistance = insetDistance * 0.65
      cornerPoints.push(xyz(edge, edge, height))
      xInsetPoints.push(xyz(edge - insetDistance, edge, height))
      yInsetPoints.push(xyz(edge, edge - insetDistance, height))
      xyInsetPoints.push(xyz(edge - insetDistance, edge - insetDistance, height))
      const platformPoints = [
        xyz(edge, edge, height),
        xyz(edge, -edge, height)
      ]
      this._line(platformPoints, ray)
      const platformThickness = insetDistance / 2
      platformPoints[0].z += platformThickness
      platformPoints[1].z += platformThickness
      this._line(platformPoints, ray)
    }
    this._line(cornerPoints, ray)
    this._line(xInsetPoints, ray)
    this._line(yInsetPoints, ray)
    this._line(xyInsetPoints, ray)
  }

  _line (points, ray) {
    const IRON = 0x333333
    this.add(_makeLine(points, ray, IRON))
  }
}

export { EiffelTower }
