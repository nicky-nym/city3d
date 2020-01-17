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

  populateRoutes (callback) {
    const MAX_MSEC_FOR_CHUNK = 100
    const routes = this.getRoutes()
    const movers = new FeatureGroup()
    if (window.DEBUG) {
      var t0 = Date.now()
      var selfTime = 0
      var numChunks = 0
    }

    const doChunk = () => {
      const t1 = Date.now()
      do {
        const route = routes.pop()
        if (!route) break

        // TODO: use route.speedLimit(), maybe by having a maxSpeed option for Movers.
        if (route.use === Use.CANAL) {
          movers.add(new Kayak(route))
        } else {
          movers.add(new Vehicle(route, randomInt(3, 10) * 0.04))
        }
      } while (Date.now() - t1 < MAX_MSEC_FOR_CHUNK)

      if (window.DEBUG) {
        selfTime += Date.now() - t1
        numChunks++
        if (routes.length === 0) {
          console.log(`elapsed time to create Movers = ${Date.now() - t0} msec, self time = ${selfTime}, num chunks = ${numChunks}`)
        }
      }
      if (routes.length === 0) {
        this.add(movers)
        callback(movers)
      } else {
        setTimeout(doChunk, 0)
      }
    }

    setTimeout(doChunk, 0)
  }
}

export { Model }
