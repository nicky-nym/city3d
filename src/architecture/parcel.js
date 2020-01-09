/** @file parcel.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { Model } from './model.js'
import { METRIC } from './metric.js'

const MARTIAN_ORANGE = 0xdf4911

/**
* Parcel is a class for representing a parcel of land in a city.
*/
class Parcel extends Model {
  constructor (corners, ray, name) {
    super(name || 'Parcel')
    const adjustedCorners = ray.applyRay(corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const p0 = { ...adjustedCorners[0], z: ray.xyz.z }
    const concreteOutlinePolygon = new FeatureInstance(abstractOutlinePolygon, p0, MARTIAN_ORANGE)
    this.add(concreteOutlinePolygon)

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }
}

export { Parcel }
