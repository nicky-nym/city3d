/** @file model.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureGroup, FeatureInstance, FeatureLODGroup } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { Kayak } from '../../content/movers/kayak.js'
import { Route } from '../routes/route.js'
import { Use } from './use.js'
import { Vehicle } from '../../content/movers/vehicle.js'
import { randomInt } from '../../src/core/util.js'

/**
 * Model is an abstract superclass for models that aren't buildings or structures.
 * Examples include: trees, soccer fields, stars in the sky, etc.
 */
class Model extends FeatureLODGroup {
  /**
   * Creates a Model instance.
   * @param {object} [args] - an object with key-value arguments
   * @param {string} [args.name] - optional name for this model instance
   * @param {Layer} [args.layer] - optional instance of Layer
   */
  constructor ({ name, layer } = {}) {
    super(name, { layer })
  }

  static mergeValueIfAbsent (obj, values) {
    const keys = Object.keys(values)
    for (const key of keys) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = values[key]
      }
    }
  }

  addLine (waypoints, ray, color) {
    const adjustedWaypoints = ray.applyRay(waypoints)
    const line = new Geometry.Line(adjustedWaypoints)
    const instance = new FeatureInstance(line, adjustedWaypoints[0], color)
    this.add(instance)
  }

  getRoutes () {
    const routes = []
    this.accept(node => { if (node instanceof Route) routes.push(node) })
    return routes
  }

  * populateRoutes (callback) {
    const routes = this.getRoutes()
    const movers = new FeatureGroup('Movers')

    for (const route of routes) {
      // TODO: use route.speedLimit(), maybe by having a maxSpeed option for Movers.
      if (route.use === Use.CANAL) {
        movers.add(new Kayak(route))
      } else {
        movers.add(new Vehicle(route, randomInt(3, 10) * 0.04))
      }
      yield
    }
    this.add(movers)
    callback(movers)
  }
}

export { Model }
