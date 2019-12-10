/** @file building.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { array, cornersFromShape, countTo, randomInt, xyzAdd } from '../core/util.js'
import { Group } from './group.js'
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
  constructor (plato, city, spec, { name, at } = {}) {
    super(plato, city, name || spec.name)
    this._makeBuildingFromSpec(spec, at)
  }

  _makeHighResBuildingFromSpec (spec, parentOffset = { x: 0, y: 0, z: 0 }) {
    let { storeyHeight, roof, children, numStoreys, shape, offset, walls } = spec
    roof = { parapetHeight: 0, ...roof }
    parentOffset = xyzAdd(parentOffset, offset)
    const point = { ...parentOffset }
    if (shape) {
      const corners = cornersFromShape(shape)
      const openings = _openingsFromWallsSpec(walls)
      let z = point.z || 0
      let ray
      for (const i in countTo(numStoreys)) {
        point.z = z
        const floorName = `Floor ${i}`
        ray = this._plato.goto(point)
        const storey = new Storey(ray, Use.ROOM, corners, { name: floorName, wall: storeyHeight, openings: openings })
        this.add(storey)
        z = z + storeyHeight
      }
      point.z = z
      ray = this._plato.goto(point)
      const roofPlace = new Storey(ray, Use.ROOF, corners, { wall: roof.parapetHeight })
      this.add(roofPlace)
    }
    for (const childSpec of array(children)) {
      if (!childSpec.roof) {
        childSpec.roof = roof
      }
      const child = new Building(this._plato, this._city, childSpec, { at: parentOffset })
      this.add(child)
    }
  }

  static _makeLowResGroupFromSpec (plato, spec, group, parentOffset = { x: 0, y: 0, z: 0 }) {
    const { storeyHeight, children, numStoreys, shape, offset } = spec
    parentOffset = xyzAdd(parentOffset, offset)
    const point = { ...parentOffset }
    if (shape) {
      const corners = cornersFromShape(shape)
      plato.goto(point)
      const depth = storeyHeight * numStoreys
      const box = plato.makePlaceholder(Use.WALL, corners, depth)
      group.add(box)
    }
    for (const childSpec of array(children)) {
      const subgroup = new Group(childSpec.name)
      group.add(subgroup)
      Building._makeLowResGroupFromSpec(plato, childSpec, subgroup, parentOffset)
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

  _makeBuildingFromSpec (buildingSpec, at = { x: 0, y: 0, z: 0 }) {
    const resolvedSpec = this._instantiateSpec(buildingSpec)
    this._makeHighResBuildingFromSpec(resolvedSpec, at)

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    const mediumGroup = new Group(this.name)
    Building._makeLowResGroupFromSpec(this._plato, resolvedSpec, mediumGroup, at)
    this.addLevelOfDetail(mediumGroup, 1000)

    const lowGroup = new Group(this.name)
    Building._makeLowResGroupFromSpec(this._plato, resolvedSpec, lowGroup, at)
    this.addLevelOfDetail(lowGroup, 2000)
  }
}

export { Building }
