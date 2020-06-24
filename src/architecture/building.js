/** @file building.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyzAdd } from '../core/util.js'
import { FeatureGroup } from '../core/feature.js' // eslint-disable-line no-unused-vars
import { LAYER } from './layer.js'
import { Model } from './model.js'
import { Route } from '../routes/route.js'
import { Storey } from './storey.js'
import { Structure } from './structure.js'
import { Use } from '../architecture/use.js'
import { Pose } from '../core/pose.js'

/**
 * Building is a class for representing buildings in a city.
 * Buildings know how to have walls, floors, roofs, doors, etc.
 * Buildings can be multistorey, and can have sub-buildings as wings.
 * Buildings can be made from declarative specifications in JSON format.
 */
class Building extends Structure {
  /**
   * Create a new instance of a specified Building, and generate the Geometry objects for it.
   * @param {pose} [pose] - the location and orientation of this building
   */
  constructor (options = {}) {
    const { pose = Pose.DEFAULT, ...remainingOptions } = options
    super({ pose, ...remainingOptions, copyLayer: LAYER.COPIES })
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against building.schema.json.js
   * @param {pose} [pose] - the location and orientation of this parcel
   */
  makeModelFromSpec (spec, pose) {
    const { name, unit, /* anchorPoint, */ storeys, routes = [] } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    // TODO: get this working:
    // const anchor = Pose.copy(pose)
    // anchor.xyz = xyzSubtract(anchor.xyz, anchorPoint)

    const priors = {
      altitude: 0,
      height: 0
    }

    for (const storeySpec of storeys) {
      Model.mergeValueIfAbsent(storeySpec, priors)
      const storey = new Storey({ spec: storeySpec, pose })
      this.add(storey)
      priors.altitude = storey.altitude() + (storey.height() * storey.repeat())
      priors.height = storey.height()
    }

    // TODO: refactor to combine this with code in parcel.js
    for (const routeSpec of routes) {
      const poseOffset = xyzAdd(pose, this.offset)
      poseOffset.rotated = pose.rotated
      const waypoints = Pose.applyPose(poseOffset, routeSpec.waypoints)

      let use
      if (routeSpec.mode && routeSpec.mode === 'canal') {
        use = Use.CANAL
      } else {
        use = Use.BIKEPATH
      }
      this.add(new Route(waypoints, use))
    }
  }
}

export { Building }
