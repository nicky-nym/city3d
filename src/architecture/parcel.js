/** @file parcel.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { LAYER } from './layer.js'
import { Model } from './model.js'
import { METRIC } from './metric.js'
import { Outline } from '../core/outline.js'
import { Pavement } from './pavement.js'
import { Pose } from '../core/pose.js'
import { Route } from '../routes/route.js'
import { Use } from '../architecture/use.js'
import { Water } from './water.js'

const MARTIAN_ORANGE = 0xdf4911

/**
* Parcel is a class for representing a parcel of land in a city.
*/
class Parcel extends Model {
  /**
   * Create a new instance of a specified Parcel, and generate the Geometry objects for it.
   * @param {string} [name] - a display name for this individual instance at a given placement
   * @param {pose} [pose] - the location and orientation of this parcel
   * @param {object} [spec] - a specification object that is valid against schema.defs.json.js
   * @param {SpecReader} [specReader] - an instance of a SpecReader, for adding content models in the parcel
   */
  constructor ({
    name = 'Parcel',
    pose,
    spec,
    specReader
  } = {}) {
    name = name || (spec && spec.name)
    super({ name })
    if (spec) {
      this.makeModelFromSpec(spec, pose, specReader)
    }
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against schema.defs.json.js
   * @param {pose} [pose] - the location and orientation of this part
   */
  makeModelFromSpec (spec, pose, specReader) {
    const { name, unit, /* anchorPoint, */ border, contents, pavement, water, routes } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    if (border) {
      const outline = new Outline(border)
      const corners = outline.corners()
      this._makeBorder(pose, corners)
    }

    if (contents) {
      for (const copySpec of contents) {
        const mergedPose = Pose.combine(pose, copySpec.pose)
        const specName = copySpec.copy.$ref
        const modelObject = specReader.makeModelFromSpecName(specName, mergedPose)
        this.add(modelObject)
      }
    }

    if (pavement) {
      for (const spec of pavement) {
        const surface = new Pavement({ spec, pose })
        this.add(surface)
      }
    }

    if (water) {
      for (const spec of water) {
        const surface = new Water({ spec, pose })
        this.add(surface)
      }
    }

    // TODO: refactor to combine code in building.js, parcel.js, district.js
    if (routes) {
      for (const routeSpec of routes) {
        const waypoints = Pose.relocate(pose, routeSpec.waypoints)
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

  _makeBorder (pose, corners) {
    const adjustedCorners = Pose.relocate(pose, corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const p0 = { ...adjustedCorners[0], z: pose.z }
    const concreteOutlinePolygon = new FeatureInstance(abstractOutlinePolygon, p0, MARTIAN_ORANGE, { layer: LAYER.PARCELS })
    this.add(concreteOutlinePolygon)

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }
}

export { Parcel }
