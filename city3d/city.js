// city.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import Sector from './sector.js'
import Vehicle from '../movers/vehicle.js'

class City {
  // City is a class for representing a hierarchical collection of 3D places.

  constructor (name) {
    this.name = name
    this.children = []
  }

  add (thing) {
    this.children.push(thing)
  }

  makeGroup (name) {
    return new Group(name)
  }

  extractRoutes (thing, routes) {
    // TODO: this should become Mover
    if (thing instanceof Vehicle) {
      routes.push(thing.getRoute())
    } else if (thing.children) {
      for (const child of thing.children) {
        this.extractRoutes(child, routes)
      }
    }
  }

  getRoutes () {
    const routes = []
    this.extractRoutes(this, routes)
    return routes
  }

  getSectors () {
    return this.children.filter(c => c instanceof Sector)
  }

  deleteAllObjects () {
    // TODO: Do we need this?
  }
}

class Group {
  constructor (name) {
    this.name = name
    this.children = []
  }

  add (thing) {
    this.children.push(thing)
  }
}

export { City, Group }
