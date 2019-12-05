/** @file wurster.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../core/unit.js'
import { countTo, xy, xyz, xyzAdd, array } from '../core/util.js'
import { Use } from '../architecture/use.js'
import { Structure } from '../architecture/structure.js'
import { Group, LODGroup } from '../architecture/group.js'

const STORY_HEIGHT = UNIT.feet(13)

const SIZE = {
  south: xy(170, 85),
  center: xy(53, 116),
  tower: xy(110, 70),
  east: xy(29, 56),
  west: xy(29, 44),
  balcony: xy(10, 23),
  north: xy(227, 113),
  atrium: xy(22, 46)
}
const WEST_DELTA_Y = 17
const ATRIUM_DELTA_Y = -7
const ORIGIN = {
  south: xy(0, 0),
  center: xy(0, SIZE.south.y),
  tower: xy(SIZE.center.x, SIZE.south.y + SIZE.center.y),
  east: xy(SIZE.center.x + SIZE.tower.x, SIZE.south.y + SIZE.center.y + 5),
  west: xy(SIZE.center.x - SIZE.west.x, SIZE.south.y + SIZE.center.y + WEST_DELTA_Y),
  balcony: xyz(SIZE.center.x - SIZE.west.x - SIZE.balcony.x, SIZE.south.y + SIZE.center.y + WEST_DELTA_Y, STORY_HEIGHT * 10),
  north: xy(SIZE.center.x + SIZE.tower.x - SIZE.north.x, SIZE.south.y + SIZE.center.y)
}

const BUILDING_SPEC = Object.freeze({
  name: 'Wurster Hall',
  storyHeight: STORY_HEIGHT,
  offset: xyz(120, 140, 0),
  roof: {
    parapetHeight: UNIT.feet(4)
  },
  children: [{
    name: 'South wing',
    numStories: 4,
    offset: ORIGIN.south,
    shape: { type: 'rectangle', data: SIZE.south }
  }, {
    name: 'Center wing',
    numStories: 3,
    offset: ORIGIN.center,
    shape: { type: 'rectangle', data: SIZE.center }
  }, {
    name: 'Tower',
    numStories: 10,
    offset: ORIGIN.tower,
    shape: { type: 'rectangle', data: SIZE.tower }
  }, {
    name: 'Tower east',
    numStories: 10,
    offset: ORIGIN.east,
    shape: { type: 'rectangle', data: SIZE.east }
  }, {
    name: 'Tower west',
    numStories: 11,
    offset: ORIGIN.west,
    shape: { type: 'rectangle', data: SIZE.west }
  }, {
    name: 'Tower west balcony',
    numStories: 0,
    offset: ORIGIN.balcony,
    shape: { type: 'rectangle', data: SIZE.balcony }
  }, {
    name: 'North wing',
    numStories: 3,
    offset: ORIGIN.north,
    shape: {
      type: 'xyPolygon',
      data: [
        xy(0, 0),
        xy(SIZE.north.x - SIZE.tower.x, 0),
        xy(SIZE.north.x - SIZE.tower.x, WEST_DELTA_Y),
        xy(SIZE.north.x - SIZE.tower.x - SIZE.west.x, WEST_DELTA_Y),
        xy(SIZE.north.x - SIZE.tower.x - SIZE.west.x, WEST_DELTA_Y + ATRIUM_DELTA_Y),
        xy(SIZE.north.x - SIZE.tower.x - SIZE.west.x - SIZE.atrium.x, WEST_DELTA_Y + ATRIUM_DELTA_Y),
        xy(SIZE.north.x - SIZE.tower.x - SIZE.west.x - SIZE.atrium.x, WEST_DELTA_Y + ATRIUM_DELTA_Y + SIZE.atrium.y),
        xy(SIZE.north.x - SIZE.tower.x - SIZE.west.x, WEST_DELTA_Y + ATRIUM_DELTA_Y + SIZE.atrium.y),
        xy(SIZE.north.x - SIZE.tower.x - SIZE.west.x, WEST_DELTA_Y + SIZE.west.y),
        xy(SIZE.north.x - SIZE.tower.x, WEST_DELTA_Y + SIZE.west.y),
        xy(SIZE.north.x - SIZE.tower.x, SIZE.tower.y),
        xy(SIZE.north.x, SIZE.tower.y),
        xy(SIZE.north.x, SIZE.north.y),
        xy(0, SIZE.north.y)
      ]
    }
  }]
})

const CRENEL_SPACING = UNIT.feet(9.333) // eslint-disable-line no-unused-vars
const NUM_NORTH_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars
const NUM_CENTER_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars
const NUM_TOWER_CRENELS_X = 12 // eslint-disable-line no-unused-vars
const AWNING_SEPERATOR_DEPTH = UNIT.feet(2.5) // eslint-disable-line no-unused-vars
const AWNING_DEPTH = UNIT.feet(5) // eslint-disable-line no-unused-vars
const AWNING_LENGTH = UNIT.feet(9) // eslint-disable-line no-unused-vars
const NUM_SOUTH_WING_CRENELS_X = 18 // eslint-disable-line no-unused-vars
const NUM_SOUTH_WING_CRENELS_Y = 9 // eslint-disable-line no-unused-vars

const PARCEL = {
  offset: xy(0, 0),
  shape: {
    type: 'rectangle',
    data: xy(360, 540)
  }
}

function rectangleOfSize (sizeXY) {
  return [
    xy(0, 0),
    xy(sizeXY.x, 0),
    xy(sizeXY.x, sizeXY.y),
    xy(0, sizeXY.y)
  ]
}

function cornersFromShape (shape) {
  let corners
  const shapeType = shape.type
  if (shapeType === 'rectangle') {
    corners = rectangleOfSize(shape.data)
  } else if (shapeType === 'xyPolygon') {
    corners = shape.data
  }
  return corners
}

/**
 * Class representing UC Berkeley's Wurster Hall.
 * @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
 */
class Wurster extends Structure {
  static makeBuildingFromSpec (plato, spec, mainGroup, defaults, parentOffset = { x: 0, y: 0, z: 0 }) {
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
      Wurster.makeBuildingFromSpec(plato, childSpec, mainGroup, defaultsForChildren, parentOffset)
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
      const corners = cornersFromShape(shape)
      const box = plato.makePlaceholder(Use.WALL, corners, depth, { name })
      group.add(box)
    }
    return group
  }

  makeBuilding () {
    this._plato.goto(PARCEL.offset)
    this._plato.makeParcel(cornersFromShape(PARCEL.shape))
    const mainGroup = new LODGroup(BUILDING_SPEC.name)
    this._plato.appendToSector(mainGroup)
    Wurster.makeBuildingFromSpec(this._plato, BUILDING_SPEC, mainGroup, {})

    // TODO: The medium and low resolution instances constructed here are currently
    // identical, so the only difference will be in the material.
    const medResInstance = Wurster.makeLowResGroupFromSpec(this._plato, BUILDING_SPEC)
    mainGroup.addLevelOfDetail(medResInstance, 1000)
    const lowResInstance = Wurster.makeLowResGroupFromSpec(this._plato, BUILDING_SPEC)
    mainGroup.addLevelOfDetail(lowResInstance, 2000)
  }
}

export { Wurster }
