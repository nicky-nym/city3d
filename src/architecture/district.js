/** @file district.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { countTo, xyz } from '../core/util.js'
import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Ray } from '../core/ray.js'

const MARTIAN_ORANGE = 0xdf4911

/**
 * District is a class for representing structure and metrics for a district of a city.
 * A district can have land, parcels, buildings, and structures.
 */
class District extends Model {
  constructor ({
    name = 'District',
    outline = [xyz(0, 0, 0)],
    placement = new Ray()
  } = {}) {
    super({ name })
    this._placement = Object.freeze(placement || new Ray())
    const adjustedCorners = placement.applyRay(outline)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const [{ x, y }, z] = [adjustedCorners[0], placement.xyz.z]
    for (const i of countTo(3)) {
      const concreteOutlinePolygon = new FeatureInstance(abstractOutlinePolygon, { x, y, z: z + (i * 3) }, MARTIAN_ORANGE, { layer: DistrictBoundary.layer })
      this.add(concreteOutlinePolygon)
    }

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }

  placement () {
    return this._placement
  }

  goto ({ x = 0, y = 0, z = 0 } = {}, facing) {
    return this._placement.add(xyz(x, y, z), facing)
  }
}

class DistrictBoundary {}
DistrictBoundary.layer = Feature.registerLayer(DistrictBoundary, 'district boundary', { category: 'Abstract' })

export { District }
