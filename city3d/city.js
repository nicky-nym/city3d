// city.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import Sector from './sector.js'

export default class City {
  // City is a class for representing a hierarchical collection of 3D places.

  constructor (name) {
    this.name = name
    this.children = []
  }

  add (thing) {
    this.children.push(thing)
  }

  makeGroup (name) {
    const group = { name, children: [] }
    return group
  }

  getSectors () {
    return this.children.filter(c => c instanceof Sector)
  }

  deleteAllObjects () {
    // TODO: Do we need this?
  }
}
