/** @file parcel.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Geometry } from '../core/geometry.js'
import { Group } from './group.js'
import { Use } from './use.js'

const MARTIAN_ORANGE = 0xdf4911

/**
* Parcel is a class for representing a parcel of land in a city.
*/
class Parcel extends Group {
  constructor (corners, ray, name) {
    super(name || 'Parcel')
    const adjustedCorners = ray.applyRay(corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const concreteOutlinePolygon = new Geometry.Instance(abstractOutlinePolygon, ray.xyz.z, MARTIAN_ORANGE)
    this.add(concreteOutlinePolygon)
    this.addMetric(`Floor area: ${Use.PARCEL}`, xyPolygon.area(), 'square feet')
  }
}

export { Parcel }
