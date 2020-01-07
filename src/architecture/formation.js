/** @file formation.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { LODGroup } from './group.js'
import { Geometry } from '../core/geometry.js'

/**
 * Formation is an abstract superclass for things that aren't buildings or structures.
 * Examples include: trees, soccer fields, stars in the sky, etc.
 * TODO: try to come up with a better name than "Formation" :-(
 */
class Formation extends LODGroup {
  addLine (waypoints, ray, color) {
    const adjustedWaypoints = ray.applyRay(waypoints)
    const line = new Geometry.Line(adjustedWaypoints)
    const instance = new Geometry.Instance(line, adjustedWaypoints[0], color)
    this.add(instance)
  }
}

export { Formation }
