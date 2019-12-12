/** @file summary_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Kayak } from '../../content/movers/kayak.js'
import { TextOutput } from './text_output.js'
import { Vehicle } from '../../content/movers/vehicle.js'

/**
 * SummaryOutput can display a summary of city metrics.
 */
class SummaryOutput extends TextOutput {
  render () {
    this.print(`There are ${this.count(this._city, Vehicle)} vehicles in the city.`)
    this.print(`There are ${this.count(this._city, Kayak)} kayaks in the city.`)
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

export { SummaryOutput }
