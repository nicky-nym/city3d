/** @file table_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Output } from './output.js'

/**
 * TableOutput can display values in an HTML table.
 */
class TableOutput extends Output {
  /**
   * Creates an output instance to view a given City.
   * @param {CITY.City} city - an instance of CITY.City
   * @param {string} title - a display title for this Output section
   */
  constructor (city, title) {
    super(city)
    this.title = title
  }

  static toStringWithCommas (numberValue) {
    return numberValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  setDisplayDiv (outputDivElement) {
    this._table = document.createElement('table')
    const h2 = document.createElement('h2')
    h2.innerHTML = this.title
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
}

export { TableOutput }
