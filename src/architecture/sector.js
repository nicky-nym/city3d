// sector.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

export default class Sector {
  // Sector is a class for representing structure and metrics for a sector of a city.

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
