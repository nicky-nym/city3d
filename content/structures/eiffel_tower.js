/** @file eiffel_tower.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xyz } from '../../src/core/util.js'
import { Facing } from '../../src/core/facing.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { Structure } from '../../src/architecture/structure.js'

function _makeLine (waypoints, placement, radius, color) {
  const adjustedWaypoints = placement.applyRay(waypoints)
  const line = new Geometry.Line(adjustedWaypoints, radius)
  return new FeatureInstance(line, adjustedWaypoints[0], color, { layer: Structure.layer })
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
 * TODO: replace this with a declarative eiffel_tower.json.js file
 */
class EiffelTower extends Structure {
  constructor ({ name = 'Eiffel tower', placement } = {}) {
    super({ name, placement })

    for (const direction of [Facing.NORTH, Facing.SOUTH, Facing.EAST, Facing.WEST]) {
      this._drawQuadrant(direction)
    }
    const mastPoints = [
      xyz(0, 0, platforms[3].height),
      xyz(0, 0, mastHeight)
    ]
    this._line(mastPoints, this.placement())
  }

  _drawQuadrant (direction) {
    const ray = this.placement().copy()
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
    const radius = 2
    const IRON = 0x333333
    this.add(_makeLine(points, ray, radius, IRON))
  }
}

export { EiffelTower }
