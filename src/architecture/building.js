/** @file building.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { array, cornersFromShape, countTo, randomInt, xyzAdd } from '../core/util.js'
import { Group, LODGroup } from './group.js'
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

/**
 * Building is a class for representing buildings in a city.
 * Buildings know how to have walls, floors, roofs, doors, etc.
 * Buildings can be multistory, and can have sub-buildings as wings.
 * Buildings can be made from declarative specifications in JSON format.
 */
class Building extends Structure {
  static makeHighResBuildingFromSpec (plato, spec, mainGroup, defaults, parentOffset = { x: 0, y: 0, z: 0 }) {
    let { storyHeight, roof, children, numStories, shape, offset } = spec
    roof = roof || defaults.roof
    roof = { parapetHeight: 0, ...roof }
    parentOffset = xyzAdd(parentOffset, offset)
    const point = { ...parentOffset }
    if (shape) {
      const corners = cornersFromShape(shape)
      let z = point.z || 0
      let ray
      for (const i in countTo(numStories)) {
        point.z = z
        const floorName = `Floor ${i}`
        ray = plato.goto(point)
        const story = new Storey(ray, Use.ROOM, corners, { name: floorName, wall: storyHeight })
        mainGroup.add(story)
        z = z + storyHeight
      }
      point.z = z
      ray = plato.goto(point)
      const roofPlace = new Storey(ray, Use.ROOF, corners, { wall: roof.parapetHeight })
      mainGroup.add(roofPlace)
    }
    const defaultsForChildren = { roof }
    for (const childSpec of array(children)) {
      const subgroup = new Group(childSpec.name)
      mainGroup.add(subgroup)
      Building.makeHighResBuildingFromSpec(plato, childSpec, subgroup, defaultsForChildren, parentOffset)
    }
  }

  static makeLowResGroupFromSpec (plato, spec, group, defaults, parentOffset = { x: 0, y: 0, z: 0 }) {
    const { storyHeight, children, numStories, shape, offset } = spec
    parentOffset = xyzAdd(parentOffset, offset)
    const point = { ...parentOffset }
    if (shape) {
      const corners = cornersFromShape(shape)
      plato.goto(point)
      const depth = storyHeight * numStories
      const box = plato.makePlaceholder(Use.WALL, corners, depth)
      group.add(box)
    }
    const defaultsForChildren = {}
    for (const childSpec of array(children)) {
      const subgroup = new Group(childSpec.name)
      group.add(subgroup)
      Building.makeLowResGroupFromSpec(plato, childSpec, subgroup, defaultsForChildren, parentOffset)
    }
  }

  // Random values in the spec need to be chosen once per building, so they will be
  // the same for all levels of detail.
  _instantiateSpec (template, defaults = {}) {
    const spec = { ...template }
    if (template.shape) {
      if (template.numStories === undefined) {
        spec.numStories = 1
      } else {
        spec.numStories = _intFromSpec(template.numStories)
      }
      if (template.storyHeight === undefined) {
        if (defaults.storyHeight === undefined) {
          spec.storyHeight = 8
        } else {
          spec.storyHeight = _intFromSpec(defaults.storyHeight)
        }
      } else {
        spec.storyHeight = _intFromSpec(template.storyHeight)
      }
    }
    if (template.children) {
      spec.children = template.children.map(child => this._instantiateSpec(child, spec))
    }
    return spec
  }

  makeBuildingFromSpec (buildingSpec, at = { x: 0, y: 0, z: 0 }) {
    const resolvedSpec = this._instantiateSpec(buildingSpec)

    const mainGroup = new LODGroup(resolvedSpec.name)
    Building.makeHighResBuildingFromSpec(this._plato, resolvedSpec, mainGroup, {}, at)

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    const mediumGroup = new Group(resolvedSpec.name)
    Building.makeLowResGroupFromSpec(this._plato, resolvedSpec, mediumGroup, {}, at)
    mainGroup.addLevelOfDetail(mediumGroup, 1000)

    const lowGroup = new Group(resolvedSpec.name)
    Building.makeLowResGroupFromSpec(this._plato, resolvedSpec, lowGroup, {}, at)
    mainGroup.addLevelOfDetail(lowGroup, 2000)
    return mainGroup
  }
}

export { Building }
