/** @file plato.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { xyz } from '../core/util.js'
// import { Facing } from '../core/facing.js'
// import { Ray } from '../core/ray.js'
import { Use } from './use.js'

/**
 * Plato can envision 3D architectural spaces, with walls, floors, etc.
 */
class Plato {
  /**
   * Sets plato's initial state.
   */
  constructor (city) {
    this._x0 = 0
    this._y0 = 0
    this._city = city
    this._routes = []
  }

  static aggregateMetric (group, metricName) {
    let sum = 0
    group.accept(node => { const m = node.metrics && node.metrics.get(metricName); if (m) sum += m.value })
    return sum
  }

  pontificate (district) {
    // Print a report of square footage of rooms, walkways, etc.
    const floorArea = {}
    for (const use of Object.keys(Use)) {
      const sum = Plato.aggregateMetric(district, `Floor area: ${use}`)
      if (sum > 0) {
        floorArea[use] = sum
      }
      district.addMetric(`${use} floor area`, sum, 'square feet')
    }
    district.addMetric('Floor area', floorArea, 'square feet')
    if (floorArea[Use.PARCEL]) {
      const parcelFar = floorArea[Use.ROOM] / floorArea[Use.PARCEL]
      const urbanFar = floorArea[Use.ROOM] / (floorArea[Use.PARCEL] + (floorArea[Use.STREET] || 0))
      district.addMetric('Parcel FAR', parcelFar.toFixed(1), 'floor area ratio')
      district.addMetric('Overall FAR', urbanFar.toFixed(1), 'floor area ratio')
    }
    for (const metric of ['Wall area', 'Wall opening area']) {
      const sum = Plato.aggregateMetric(district, metric)
      district.addMetric(metric, sum, 'square feet')
    }
    return this
  }
}

export { Plato }
