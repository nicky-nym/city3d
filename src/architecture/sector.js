/** @file sector.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

/**
 * Sector is a class for representing structure and metrics for a sector of a city.
 */
class Sector {
  constructor (name) {
    this.name = name
    this.metrics = new Map()
    this.children = []
  }

  addMetric (name, value, units) {
    this.metrics.set(name, { value, units })
  }

  add (thing) {
    this.children.push(thing)
  }
}

export { Sector }
