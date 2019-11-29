/** @file city.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Group } from './group.js'
import { Sector } from './sector.js'
import { Vehicle } from '../movers/vehicle.js'

/**
 * City is a class for representing a hierarchical collection of 3D places.
 */
class City extends Group {
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
}

export { City }
