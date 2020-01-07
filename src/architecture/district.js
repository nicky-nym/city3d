/** @file district.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { countTo, xyz } from '../core/util.js'
import { Facing } from '../core/facing.js'
import { Geometry } from '../core/geometry.js'
import { Group } from './group.js'
import { METRIC } from './metric.js'
import { Ray } from '../core/ray.js'

const MARTIAN_ORANGE = 0xdf4911

/**
 * District is a class for representing structure and metrics for a district of a city.
 * A district can have land, parcels, buildings, and structures.
 */
class District extends Group {
  constructor (corners = [xyz(0, 0, 0)], ray = new Ray(), name) {
    super(name || 'District')
    this._ray = ray
    this._x0 = ray.xyz.x
    this._y0 = ray.xyz.y
    const adjustedCorners = ray.applyRay(corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const [{ x, y }, z] = [adjustedCorners[0], ray.xyz.z]
    for (const i of countTo(3)) {
      const concreteOutlinePolygon = new Geometry.Instance(abstractOutlinePolygon, { x, y, z: z + (i * 3) }, MARTIAN_ORANGE)
      this.add(concreteOutlinePolygon)
    }

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._ray.goto(facing, xyz(this._x0 + x, this._y0 + y, z))
    return this._ray
  }
}

export { District }
