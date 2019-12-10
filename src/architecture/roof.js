/** @file roof.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Geometry } from '../core/geometry.js'
import { Group } from './group.js'

const LIGHT_GRAY = 0x808080

/**
* Roof is a class for representing the roof of a building.
*/
class Roof extends Group {
  constructor (spec, ray) {
    super('Roof')
    if (spec.custom) {
      let { vertices, indices } = spec.custom
      vertices = ray.applyRay(vertices)
      const abstractRoof = new Geometry.TriangularPolyhedron(vertices, indices)
      const concreteRoof = new Geometry.Instance(abstractRoof, 0, LIGHT_GRAY)
      this.add(concreteRoof)
    } else if (spec.flat) {
      const adjustedCorners = ray.applyRay(spec.flat)
      const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
      const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: 0.5 })
      const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, ray.xyz.z, LIGHT_GRAY)
      this.add(concreteThickPolygon)
    } else {
      throw new Error('bad roof type in spec for new Roof()')
    }
  }
}

export { Roof }