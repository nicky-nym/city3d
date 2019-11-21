// summary_output.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import Bicycle from '../movers/bicycle.js'
import Output from './output.js'
import Vehicle from '../movers/vehicle.js'

export default class SummaryOutput extends Output {
  // SummaryOutput can render a summary of city metrics.

  render () {
    const sectors = this._city.getSectors()
    for (const sector of sectors) {
      this.print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      this.print(`Sector ${sector.name}:`)
      for (const [name, { value, units }] of sector.metrics) {
        if (typeof value === 'object') {
          this.print(`  ${name}:`)
          for (const key of Object.keys(value)) {
            this.print(`    ${key}: ${value[key]} ${units}`)
          }
        } else {
          this.print(`  ${name}: ${value} ${units}`)
        }
      }
      this.print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    }

    this.print(`There are ${this.count(this._city, Bicycle)} bicycles in the city.`)
    this.print(`There are ${this.count(this._city, Vehicle)} vehicles in the city.`)
  }

  count (node, _class) {
    if (node instanceof _class) {
      return 1
    } else if (node.children) {
      let sum = 0
      for (const child of node.children) {
        sum += this.count(child, _class)
      }
      return sum
    } else {
      return 0
    }
  }
}
