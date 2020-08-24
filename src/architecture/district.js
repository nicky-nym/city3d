/** @file district.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { array, countTo } from '../core/util.js'
import { FeatureInstance, InstancedFeature } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { LAYER } from './layer.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Outline } from '../core/outline.js'
import { Pavement } from './pavement.js'
import { Pose } from '../core/pose.js'
import { Route } from '../routes/route.js'
import { Use } from '../architecture/use.js'

const MARTIAN_ORANGE = 0xdf4911

/**
 * District is a class for representing structure and metrics for a district of a city.
 * A district can have land, parcels, buildings, and structures.
 */
class District extends Model {
  /**
   * Create a new instance of a specified District, and generate the Geometry objects for it.
   * @param {string} [name] - a display name for this individual instance at a given placement
   * @param {pose} [pose] - the location and orientation of this parcel
   * @param {object} [spec] - a specification object that is valid against schema.defs.json.js
   * @param {SpecReader} [specReader] - an instance of a SpecReader, for adding content models in the district
   */
  constructor ({
    name,
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
    const { name, unit, /* anchorPoint, */ border, parcels, contents, pavement, routes } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }
    const outline = new Outline(border)
    const corners = outline.corners()
    this._makeDistrictFence(pose, corners)

    if (parcels) {
      for (const copySpec of parcels) {
        const specName = copySpec.copy.$ref
        if (copySpec.repeat) {
          const repeatSpecs = District._copySpecFragment(array(copySpec.repeat))
          this._applyRepeats(repeatSpecs, pose, specReader, specName, copySpec)
        } else {
          const offset = { x: 0, y: 0, z: 0 }
          this._makeModelOnce(1, offset, pose, specReader, specName, copySpec)
        }
      }
    }

    if (contents) {
      for (const copySpec of contents) {
        const specName = copySpec.copy.$ref
        if (copySpec.repeat) {
          const repeatSpecs = District._copySpecFragment(array(copySpec.repeat))
          this._applyRepeats(repeatSpecs, pose, specReader, specName, copySpec)
        } else {
          const offset = { x: 0, y: 0, z: 0 }
          this._makeModelOnce(1, offset, pose, specReader, specName, copySpec)
        }
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

    if (pavement) {
      for (const spec of pavement) {
        if (spec.repeat) {
          const repeatSpecs = District._copySpecFragment(array(spec.repeat))
          let allPoses = District._makePosesFromRepeatSpec(repeatSpecs)
          const surface = new Pavement({ spec, pose: Pose.DEFAULT })
          allPoses = allPoses.map(p => Pose.combine(p, pose))
          this.add(new InstancedFeature(surface, allPoses, { materialCost: 'high', useNormals: true }))
        } else {
          const surface = new Pavement({ spec, pose })
          this.add(surface)
        }
      }
    }
  }

  static _copySpecFragment (specFragment) {
    return JSON.parse(JSON.stringify(specFragment))
  }

  // Generalization of outer product: M[i][j] = f(A[i], B[j])
  static _outer (f, A, B) {
    return A.map(a => B.map(b => f(a, b)))
  }

  static _makePosesFromRepeatSpec (repeatSpecs) {
    let allPoses
    repeatSpecs.forEach(spec => {
      const { x, y, z, rotated } = { ...Pose.DEFAULT, ...spec.offset }
      const lineOfPoses = countTo(spec.count).map(i => ({ x: i * x, y: i * y, z: i * z, rotated: i * rotated }))
      if (allPoses) {
        allPoses = District._outer(Pose.combine, allPoses, lineOfPoses).flat()
      } else {
        allPoses = lineOfPoses
      }
    })
    return allPoses
  }

  _applyRepeats (repeatSpecs, pose, specReader, specName, copySpec) {
    if (repeatSpecs.length === 0) return

    let allPoses = District._makePosesFromRepeatSpec(repeatSpecs)
    const mergedPose = Pose.combine(pose, copySpec.pose)
    allPoses = allPoses.map(p => Pose.combine(p, mergedPose))
    const numPartitions = copySpec.numRandomPartitions || 1
    const partitions = countTo(numPartitions).map(_ => [])
    if (numPartitions > 1) {
      allPoses.forEach(p => {
        const i = Math.floor(Math.random() * numPartitions)
        partitions[i].push(p)
      })
    } else {
      partitions[0] = allPoses
    }
    partitions.forEach(p => {
      const modelObject = specReader.makeModelFromSpecName(specName, Pose.DEFAULT)
      this.add(new InstancedFeature(modelObject, p, { materialCost: 'high', useNormals: true }))
    })
  }

  _makeModelOnce (i, offset, pose, specReader, specName, copySpec) {
    const iOffset = {
      x: i * offset.x,
      y: i * offset.y,
      z: i * offset.z
    }
    const copyPose = Pose.combine(copySpec.pose, iOffset)
    const mergedPose = Pose.combine(pose, copyPose)
    const modelObject = specReader.makeModelFromSpecName(specName, mergedPose)
    this.add(modelObject)
  }

  _makeDistrictFence (pose, corners) {
    this._pose = pose
    const adjustedCorners = Pose.relocate(pose, corners)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const [{ x, y }, z] = [adjustedCorners[0], pose.z]
    for (const i of countTo(3)) {
      const concreteOutlinePolygon = new FeatureInstance(abstractOutlinePolygon, { x, y, z: z + (i * 3) }, MARTIAN_ORANGE, { layer: LAYER.DISTRICTS })
      this.add(concreteOutlinePolygon)
    }

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }
}

export { District }
