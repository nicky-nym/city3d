/** @file building.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { countTo, xy, xyzAdd, array } from '../core/util.js'
import { Group, LODGroup } from './group.js'
import { Structure } from './structure.js'
import { Use } from '../architecture/use.js'

function rectangleOfSize (sizeXY) {
  return [
    xy(0, 0),
    xy(sizeXY.x, 0),
    xy(sizeXY.x, sizeXY.y),
    xy(0, sizeXY.y)
  ]
}

/**
 * Building is a class for representing buildings in a city.
 * Buildings know how to have walls, floors, roofs, doors, etc.
 * Buildings can be multistory, and can have sub-buildings as wings.
 */
class Building extends Structure {
  static cornersFromShape (shape) {
    let corners
    const shapeType = shape.type
    if (shapeType === 'rectangle') {
      corners = rectangleOfSize(shape.data)
    } else if (shapeType === 'xyPolygon') {
      corners = shape.data
    }
    return corners
  }

  static makeBuildingFromSpec (plato, spec, mainGroup, defaults, parentOffset = { x: 0, y: 0, z: 0 }) {
    let { name, storyHeight, roof, children, numStories, shape, offset } = spec
    storyHeight = storyHeight || defaults.storyHeight
    roof = roof || defaults.roof
    parentOffset = xyzAdd(parentOffset, offset)
    const point = { ...parentOffset }
    if (shape) {
      const corners = Building.cornersFromShape(shape)
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
      Building.makeBuildingFromSpec(plato, childSpec, mainGroup, defaultsForChildren, parentOffset)
    }
  }

  static makeLowResGroupFromSpec (plato, spec, defaults) {
    const group = new Group()
    const { storyHeight, children, offset } = spec
    const parentOffset = offset
    for (const childSpec of array(children)) {
      const { name, numStories, shape, offset } = childSpec
      const point = xyzAdd(parentOffset, offset)
      point.z = offset.z || 0
      plato.goto(point)
      const depth = storyHeight * numStories
      const corners = Building.cornersFromShape(shape)
      const box = plato.makePlaceholder(Use.WALL, corners, depth, { name })
      group.add(box)
    }
    return group
  }

  makeBuildingFromSpec (buildingSpec) {
    const mainGroup = new LODGroup(buildingSpec.name)
    this._plato.appendToSector(mainGroup)
    Building.makeBuildingFromSpec(this._plato, buildingSpec, mainGroup, {})

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    const medResInstance = Building.makeLowResGroupFromSpec(this._plato, buildingSpec)
    mainGroup.addLevelOfDetail(medResInstance, 1000)
    const lowResInstance = Building.makeLowResGroupFromSpec(this._plato, buildingSpec)
    mainGroup.addLevelOfDetail(lowResInstance, 2000)
  }
}

export { Building }
