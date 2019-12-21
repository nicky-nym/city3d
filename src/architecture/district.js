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
import { Use } from './use.js'

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
    for (const i of countTo(3)) {
      const concreteOutlinePolygon = new Geometry.Instance(abstractOutlinePolygon, ray.xyz.z + (i * 3), MARTIAN_ORANGE)
      this.add(concreteOutlinePolygon)
    }

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())

    // TODO: delete this legacy metrics code once the new Metric code is finished
    this.addMetric(`${Use.DISTRICT} land area`, xyPolygon.area(), 'square feet')
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._ray.goto(facing, xyz(this._x0 + x, this._y0 + y, z))
    return this._ray
  }

  _aggregateMetric (metricName) {
    let sum = 0
    this.accept(node => { const m = node.metrics && node.metrics.get(metricName); if (m) sum += m.value })
    return sum
  }

  recordMetrics () {
    // Print a report of square footage of rooms, walkways, etc.
    const floorArea = {}
    for (const use of Object.keys(Use)) {
      const sum = this._aggregateMetric(`Floor area: ${use}`)
      if (sum > 0) {
        floorArea[use] = sum
      }
      this.addMetric(`${use} floor area`, sum, 'square feet')
    }
    this.addMetric('Floor area', floorArea, 'square feet')
    if (floorArea[Use.PARCEL]) {
      const parcelFar = floorArea[Use.ROOM] / floorArea[Use.PARCEL]
      const urbanFar = floorArea[Use.ROOM] / (floorArea[Use.PARCEL] + (floorArea[Use.STREET] || 0))
      this.addMetric('Parcel FAR', parcelFar.toFixed(1), 'floor area ratio')
      this.addMetric('Overall FAR', urbanFar.toFixed(1), 'floor area ratio')
    }
    for (const metric of ['Wall area', 'Wall opening area']) {
      const sum = this._aggregateMetric(metric)
      this.addMetric(metric, sum, 'square feet')
    }
    return this
  }
}

export { District }
