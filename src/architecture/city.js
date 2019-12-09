/** @file city.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Group } from './group.js'
import { Mover } from './mover.js'
import { District } from './district.js'

function extractRoutes (group, routes) {
  if (group instanceof Mover) {
    routes.push(group.getRoute())
  } else if (group.children) {
    for (const child of group.children) {
      extractRoutes(child, routes)
    }
  }
}

/**
 * City is a class for representing a hierarchical collection of 3D places.
 */
class City extends Group {
  getRoutes () {
    const routes = []
    extractRoutes(this, routes)
    return routes
  }

  getDistricts () {
    return this.children.filter(c => c instanceof District)
  }
}

export { City }
