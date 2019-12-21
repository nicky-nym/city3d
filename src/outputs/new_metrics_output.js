/** @file new_metrics_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { TableOutput } from './table_output.js'
import { METRIC } from '../architecture/metric.js'
import { Tabulator } from '../metrics/tabulator.js'

/**
 * NewMetricsOutput can display a summary of city metrics.
 */
class NewMetricsOutput extends TableOutput {
  render () {
    const tabulator = new Tabulator(this._city)
    const districts = this._city.getDistricts()
    const headers = ['District']
    const metrics = [
      METRIC.POPULATION,
      METRIC.LAND_AREA,
      METRIC.WATER_AREA,
      METRIC.PLANTED_AREA,
      METRIC.FLOOR_AREA,
      METRIC.GROSS_FLOOR_AREA,
      METRIC.CIRCULATION_AREA,
      METRIC.USABLE_FLOOR_AREA,
      METRIC.ROOF_AREA,
      METRIC.SKYLIGHT_AREA,
      METRIC.WINDOW_AREA,
      METRIC.DOOR_AREA,
      METRIC.WALL_AREA
    ]
    for (const metric of metrics) {
      const units = '?'
      const columnHeader = `${metric.displayName}  (${units}) &nbsp;`.replace(/ /g, '<br>')
      headers.push(columnHeader)
    }
    this.renderHeaderRow(headers)

    for (const district of districts) {
      const stringValues = [district.name]
      for (const metric of metrics) {
        const value = tabulator.aggregateValuesForMetric(metric, district)
        // const value = tabulator.getValueOfMetricForFeature(metric, district)
        stringValues.push(TableOutput.toStringWithCommas(value))
      }
      this.renderBodyRow(stringValues)
    }
  }
}

export { NewMetricsOutput }
