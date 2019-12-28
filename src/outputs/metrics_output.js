/** @file metrics_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { TableOutput } from './table_output.js'

/**
 * MetricsOutput can display a summary of city metrics.
 */
class MetricsOutput extends TableOutput {
  constructor (city, title, metrics) {
    super(city, title)
    this._metrics = metrics
  }

  render () {
    const districts = this._city.getDistricts()
    const headers = ['District']
    for (const metric of this._metrics) {
      const units = metric.unit.displayName || metric.unit.name // TODO: replace this camelCase unit name with a proper display name
      const columnHeader = `${metric.displayName}  (${units}) &nbsp;`.replace(/ /g, '<br>')
      headers.push(columnHeader)
    }
    this.renderHeaderRow(headers)

    for (const district of districts) {
      const stringValues = [district.name]
      for (const metric of this._metrics) {
        const value = district.getValueForMetric(metric)
        if (value > 10 || value === 0) { // TODO: this is a hack, figure out a better way to determine number format based on metric
          stringValues.push(TableOutput.toStringWithCommas(value))
        } else {
          stringValues.push(value.toFixed(2))
        }
      }
      this.renderBodyRow(stringValues)
    }
  }
}

export { MetricsOutput }
