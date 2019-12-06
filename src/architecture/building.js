/** @file building.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { array, cornersFromShape, countTo, xyzAdd } from '../core/util.js'
import { Group, LODGroup } from './group.js'
import { Structure } from './structure.js'
import { Use } from '../architecture/use.js'

/**
 * Building is a class for representing buildings in a city.
 * Buildings know how to have walls, floors, roofs, doors, etc.
 * Buildings can be multistory, and can have sub-buildings as wings.
 * Buildings can be made from declarative specifications in JSON format.
 */
class Building extends Structure {
  static makeHighResBuildingFromSpec (plato, spec, mainGroup, defaults, parentOffset = { x: 0, y: 0, z: 0 }) {
    let { name, storyHeight, roof, children, numStories, shape, offset } = spec
    storyHeight = storyHeight || defaults.storyHeight
    roof = roof || defaults.roof
    parentOffset = xyzAdd(parentOffset, offset)
    const point = { ...parentOffset }
    if (shape) {
      const corners = cornersFromShape(shape)
      let z = point.z || 0
      for (const i in countTo(numStories)) {
        point.z = z
        const floorName = 'Floor ' + i + 'of ' + name
        plato.goto(point)
        const story = plato.makePlace2(Use.ROOM, corners, { name: floorName, wall: storyHeight })
        mainGroup.add(story)
        z = z + storyHeight
      }
      point.z = z
      plato.goto(point)
      const roofPlace = plato.makePlace2(Use.ROOF, corners, { wall: roof.parapetHeight })
      mainGroup.add(roofPlace)
    }
    const defaultsForChildren = { storyHeight, roof }
    for (const childSpec of array(children)) {
      Building.makeHighResBuildingFromSpec(plato, childSpec, mainGroup, defaultsForChildren, parentOffset)
    }
  }

  static makeLowResGroupFromSpec (plato, spec, defaults, parentOffset = { x: 0, y: 0, z: 0 }) {
    const group = new Group()
    const { storyHeight, children, offset } = spec
    parentOffset = xyzAdd(parentOffset, offset)
    for (const childSpec of array(children)) {
      const { name, numStories, shape, offset } = childSpec
      const point = xyzAdd(parentOffset, offset)
      point.z = offset.z || 0
      plato.goto(point)
      const depth = storyHeight * numStories
      const corners = cornersFromShape(shape)
      const box = plato.makePlaceholder(Use.WALL, corners, depth, { name })
      group.add(box)
    }
    return group
  }

  makeBuildingFromSpec (buildingSpec, at = { x: 0, y: 0, z: 0 }) {
    const mainGroup = new LODGroup(buildingSpec.name)
    Building.makeHighResBuildingFromSpec(this._plato, buildingSpec, mainGroup, {}, at)

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    const medResInstance = Building.makeLowResGroupFromSpec(this._plato, buildingSpec, {}, at)
    mainGroup.addLevelOfDetail(medResInstance, 1000)
    const lowResInstance = Building.makeLowResGroupFromSpec(this._plato, buildingSpec, {}, at)
    mainGroup.addLevelOfDetail(lowResInstance, 2000)
    return mainGroup
  }
}

export { Building }
