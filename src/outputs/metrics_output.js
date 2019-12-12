/** @file metrics_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Output } from './output.js'

function _toStringWithCommas (numberValue) {
  return numberValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * MetricsOutput can display a summary of city metrics.
 */
class MetricsOutput extends Output {
  setDisplayDiv (outputDivElement) {
    this._table = document.createElement('table')
    const h2 = document.createElement('h2')
    h2.innerHTML = 'City Metrics'
    outputDivElement.appendChild(h2)
    outputDivElement.appendChild(this._table)
    outputDivElement.style.fontFamily = 'monospace'
    outputDivElement.style.color = 'green'
    outputDivElement.style.backgroundColor = 'black'
    outputDivElement.style.padding = '10px'
    outputDivElement.style.borderTop = '3px solid green'
  }

  renderHeaderRow (strings) {
    let cells = ''
    for (const str of strings) {
      cells += `<th style="padding-left: 30px">${str}</th>`
    }
    this._table.innerHTML += `<tr>${cells}</tr>`
  }

  renderBodyRow (strings) {
    let cells = ''
    for (const str of strings) {
      cells += `<td align="right">${str}</td>`
    }
    this._table.innerHTML += `<tr>${cells}</tr>`
  }

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
          values.push(_toStringWithCommas(value))
        } else {
          values.push(value)
        }
      }
      this.renderBodyRow(values)
    }
  }
}

export { MetricsOutput }
