/** @file metrics_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { TableOutput } from './table_output.js'

/**
 * OldMetricsOutput can display a summary of city metrics.
 */
class OldMetricsOutput extends TableOutput {
  render () {
    const districts = this._city.getDistricts()
    const headers = ['District']
    const keys = []
    for (const district of districts) {
      for (const [name, { value, units }] of district.metrics) {
        const columnHeader = `${name}  (${units}) &nbsp;`.replace(/ /g, '<br>')
        if (!headers.includes(columnHeader) && !(typeof value === 'object')) {
          headers.push(columnHeader)
          keys.push(name)
        }
      }
    }
    this.renderHeaderRow(headers)

    for (const district of districts) {
      const values = [district.name]
      for (const key of keys) {
        const { value, units } = district.metrics.get(key) || { value: 0, units: '' } // eslint-disable-line no-unused-vars
        if (typeof value === 'number') {
          values.push(TableOutput.toStringWithCommas(value))
        } else {
          values.push(value)
        }
      }
      this.renderBodyRow(values)
    }
  }
}

export { OldMetricsOutput }
