/** @file building.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { array, cornersFromShape, countTo, randomInt, xyzAdd } from '../core/util.js'
import { FeatureGroup } from '../core/feature.js'
import { LAYER } from './layer.js'
import { Model } from './model.js'
import { Ray } from '../core/ray.js'
import { Roof } from './roof.js'
import { Route } from '../routes/route.js'
import { Storey } from './storey.js'
import { Structure } from './structure.js'
import { Use } from '../architecture/use.js'
import { Pose } from '../core/pose.js'

const FUTURE = false

function _intFromSpec (specValue) {
  window.alert('DEAD CODE?')
  if (isNaN(specValue)) {
    if (specValue.type === 'randomInt') {
      return randomInt(specValue.min, specValue.max)
    } else {
      throw new Error('bad integer specification in Building: ' + specValue)
    }
  } else {
    return specValue
  }
}

function _openingsFromWallsSpec (wallsSpec) {
  const openings = []
  let i = 0
  for (const wallSpec of array(wallsSpec)) {
    const windowsSpec = wallSpec.windows
    const windows = []
    for (const windowSpec of array(windowsSpec)) {
      const windowCorners = cornersFromShape(windowSpec)
      windows.push(windowCorners)
    }
    openings.push([i, windows])
    i++
  }
  return openings
}

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
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   */
  constructor (options = {}) {
    const { pose = Pose.origin(), deprecatedSpec, ...remainingOptions } = options
    super({ pose, deprecatedSpec, ...remainingOptions, copyLayer: LAYER.COPIES })

    if (deprecatedSpec) {
      const placement = Ray.fromPose(pose)
      this._makeModelFromDeprecatedSpec(deprecatedSpec, placement)
    }
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
    // const anchor = placement.copy()
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
      const at = new Ray(pose.rotated, xyzAdd(pose, this.offset))
      const waypoints = at.applyRay(routeSpec.waypoints)

      let use
      if (routeSpec.mode && routeSpec.mode === 'canal') {
        use = Use.CANAL
      } else {
        use = Use.BIKEPATH
      }
      this.add(new Route(waypoints, use))
    }
  }

  _makeHighResBuildingFromSpec (spec, parentOffset = { x: 0, y: 0, z: 0 }) {
    let { storeyHeight, roof, children, numStoreys, shape, offset, walls } = spec
    roof = { parapetHeight: 0, ...roof }
    parentOffset = xyzAdd(parentOffset, offset)
    let point = { ...parentOffset }

    let facing
    if (FUTURE) {
      const pose = Pose.origin()
      pose.rotated = this.pose().rotated
      point = Pose.relocate(pose, point)
      facing = this.pose().rotated
    } else {
      const ray = new Ray(Ray.fromPose(this._pose).az)
      point = ray.applyRay(point)
      facing = this.placement().az
    }

    if (shape) {
      const corners = cornersFromShape(shape)
      const openings = _openingsFromWallsSpec(walls)
      let z = point.z || 0
      for (const i in countTo(numStoreys)) {
        point.z = z
        const floorName = `Floor ${i}`

        let dxyzPose
        if (FUTURE) {
          dxyzPose = xyzAdd(point, this.pose())
        } else {
          const placement = new Ray(0, xyzAdd(point, this.pose()))
          dxyzPose = placement.asPose()
        }

        const storey = new Storey({
          name: floorName,
          pose: dxyzPose,
          outline: corners,
          deprecatedSpec: { use: Use.ROOM, wall: storeyHeight, openings: openings }
        })
        this.add(storey)
        z = z + storeyHeight
      }
      point.z = z

      let deltaPose
      if (FUTURE) {
        deltaPose = xyzAdd(point, this.pose())
        deltaPose.rotated = facing
      } else {
        const placement = new Ray(facing, xyzAdd(point, this.pose()))
        deltaPose = placement.asPose()
      }

      if (roof.custom) {
        this.add(new Roof({ pose: deltaPose, deprecatedSpec: roof }))
      } else {
        const roofPlace = new Storey({
          pose: deltaPose,
          outline: corners,
          deprecatedSpec: { use: Use.ROOF, wall: roof.parapetHeight }
        })

        // TODO: This is a hack.  Should probably use Roof class here.
        roofPlace._layer = Roof.layer

        this.add(roofPlace)
      }
    }
    for (const childSpec of array(children)) {
      if (!childSpec.roof) {
        childSpec.roof = roof
      }

      let child
      if (FUTURE) {
        const deltaPose = Pose.combine(Pose.copy(this.pose()), parentOffset)
        child = new Building({ pose: deltaPose, deprecatedSpec: childSpec })
      } else {
        const placement = new Ray(0, xyzAdd(parentOffset, this.pose()))
        child = new Building({ placement, deprecatedSpec: childSpec })
      }

      this.add(child)
    }
  }

  _makeLowResGroupFromSpec (spec, group, parentOffset = { x: 0, y: 0, z: 0 }) {
    const { storeyHeight, children, numStoreys, shape, offset } = spec
    parentOffset = xyzAdd(parentOffset, offset)
    let point = { ...parentOffset }
    if (FUTURE) {
      const pose = Pose.origin()
      pose.rotated = this.pose().rotated
      point = Pose.relocate(pose, point)
      if (shape) {
        const corners = cornersFromShape(shape)
        const depth = storeyHeight * numStoreys
        const deltaPose = Pose.combine(this.pose(), point)
        const box = this.makePlaceholder(deltaPose, Use.WALL, corners, depth)
        group.add(box)
      }
    } else {
      const ray = new Ray(this.placement().az)
      point = ray.applyRay(point)
      const facing = this.placement().az
      if (shape) {
        const corners = cornersFromShape(shape)
        const placement = new Ray(facing, xyzAdd(point, this.pose()))
        const depth = storeyHeight * numStoreys
        const box = this.makePlaceholder(placement, Use.WALL, corners, depth, placement)
        group.add(box)
      }
    }
    for (const childSpec of array(children)) {
      const subgroup = new FeatureGroup(childSpec.name)
      group.add(subgroup)
      this._makeLowResGroupFromSpec(childSpec, subgroup, parentOffset)
    }
  }

  // Random values in the spec need to be chosen once per building, so they will be
  // the same for all levels of detail.

  _instantiateSpec (template, defaults = {}) {
    window.alert('DEAD CODE?')
    const spec = { ...template }
    if (template.shape) {
      if (template.numStoreys === undefined) {
        spec.numStoreys = 1
      } else {
        spec.numStoreys = _intFromSpec(template.numStoreys)
      }
      if (template.storeyHeight === undefined) {
        if (defaults.storeyHeight === undefined) {
          spec.storeyHeight = 8
        } else {
          spec.storeyHeight = _intFromSpec(defaults.storeyHeight)
        }
      } else {
        spec.storeyHeight = _intFromSpec(template.storeyHeight)
      }
    }
    if (template.children) {
      spec.children = template.children.map(child => this._instantiateSpec(child, spec))
    }
    return spec
  }

  // TODO: delete this code when it is no longer used by any content model classes
  _makeModelFromDeprecatedSpec (buildingSpec, at) {
    // const placement = Ray.fromPose(pose || Pose.origin())
    // const at = (placement && placement.xyz) || { x: 0, y: 0, z: 0 }
    const resolvedSpec = this._instantiateSpec(buildingSpec)
    this._makeHighResBuildingFromSpec(resolvedSpec, at)

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    const mediumGroup = new FeatureGroup(this.name)
    this._makeLowResGroupFromSpec(resolvedSpec, mediumGroup, at)
    this.addLevelOfDetail(mediumGroup, 1000)

    const lowGroup = new FeatureGroup(this.name)
    this._makeLowResGroupFromSpec(resolvedSpec, lowGroup, at)
    this.addLevelOfDetail(lowGroup, 2000)
  }
}

export { Building }
