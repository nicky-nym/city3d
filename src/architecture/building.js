/** @file building.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { array, cornersFromShape, countTo, randomInt, xyzAdd } from '../core/util.js'
import { FeatureGroup } from '../core/feature.js'
import { Model } from './model.js'
import { Ray } from '../core/ray.js'
import { Roof } from './roof.js'
import { Storey } from './storey.js'
import { Structure } from './structure.js'
import { Use } from '../architecture/use.js'

function _intFromSpec (specValue) {
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
   * @param {string} [name] - a display name for this individual instance at a given placement
   * @param {Ray} [placement] - the location and orientation of this part
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   * @param {object} [spec] - a specification object that is valid against building.schema.json.js
   */
  constructor ({
    name,
    placement,
    deprecatedSpec,
    spec
  } = {}) {
    name = name || (spec && spec.name) || (deprecatedSpec && deprecatedSpec.name)
    super({ name, placement })
    if (deprecatedSpec) {
      this._makeModelFromDeprecatedSpec(deprecatedSpec, placement)
    }
    if (spec) {
      this.makeModelFromSpec(spec, placement)
    }
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against building.schema.json.js
   * @param {Ray} [placement] - the location and orientation of this part
   */
  makeModelFromSpec (spec, placement) {
    const { name, unit, /* anchorPoint, */ storeys } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    const anchor = placement.copy()
    // TODO: get this working:
    // anchor.xyz = xyzSubtract(anchor.xyz, anchorPoint)
    const priors = {
      altitude: 0,
      height: 0
    }
    for (const storeySpec of storeys) {
      Model.mergeValueIfAbsent(storeySpec, priors)
      const storey = new Storey({ spec: storeySpec, placement: anchor })
      this.add(storey)
      priors.altitude = storey.altitude() + (storey.height() * storey.repeat())
      priors.height = storey.height()
    }
  }

  _makeHighResBuildingFromSpec (spec, parentOffset = { x: 0, y: 0, z: 0 }) {
    let { storeyHeight, roof, children, numStoreys, shape, offset, walls } = spec
    roof = { parapetHeight: 0, ...roof }
    parentOffset = xyzAdd(parentOffset, offset)
    let point = { ...parentOffset }
    const ray = new Ray(this.placement().az)
    point = ray.applyRay(point)
    const facing = this.placement().az
    if (shape) {
      const corners = cornersFromShape(shape)
      const openings = _openingsFromWallsSpec(walls)
      let z = point.z || 0
      for (const i in countTo(numStoreys)) {
        point.z = z
        const floorName = `Floor ${i}`
        const placement = this.goto(point)
        const storey = new Storey({
          name: floorName,
          placement,
          outline: corners,
          deprecatedSpec: { use: Use.ROOM, wall: storeyHeight, openings: openings }
        })
        this.add(storey)
        z = z + storeyHeight
      }
      point.z = z
      const placement = this.goto(point, facing)
      if (roof.custom) {
        this.add(new Roof({ placement, deprecatedSpec: roof }))
      } else {
        const roofPlace = new Storey({
          placement,
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
      const placement = this.goto(parentOffset)
      const child = new Building({ placement, deprecatedSpec: childSpec })
      this.add(child)
    }
  }

  _makeLowResGroupFromSpec (spec, group, parentOffset = { x: 0, y: 0, z: 0 }) {
    const { storeyHeight, children, numStoreys, shape, offset } = spec
    parentOffset = xyzAdd(parentOffset, offset)
    let point = { ...parentOffset }
    const ray = new Ray(this.placement().az)
    point = ray.applyRay(point)
    const facing = this.placement().az
    if (shape) {
      const corners = cornersFromShape(shape)
      const placement = this.goto(point, facing)
      const depth = storeyHeight * numStoreys
      const box = this.makePlaceholder(placement, Use.WALL, corners, depth, placement)
      group.add(box)
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
  _makeModelFromDeprecatedSpec (buildingSpec, placement) {
    const at = (placement && placement.xyz) || { x: 0, y: 0, z: 0 }
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
