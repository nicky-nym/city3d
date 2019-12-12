/** @file district.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { countTo } from '../core/util.js'
import { Geometry } from '../core/geometry.js'
import { Group } from './group.js'
import { Use } from './use.js'

const MARTIAN_ORANGE = 0xdf4911

/**
 * District is a class for representing structure and metrics for a district of a city.
 * A district can have land, parcels, buildings, and structures.
 * It is a thing that Plato can "study" and "pontificate".
 */
class District extends Group {
  constructor (corners, ray, name) {
    super(name || 'Parcel')
    const adjustedCorners = ray.applyRay(corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    for (const i of countTo(3)) {
      const concreteOutlinePolygon = new Geometry.Instance(abstractOutlinePolygon, ray.xyz.z + (i * 3), MARTIAN_ORANGE)
      this.add(concreteOutlinePolygon)
    }
    this.addMetric(`${Use.DISTRICT} land area`, xyPolygon.area(), 'square feet')
  }
}

export { District }
