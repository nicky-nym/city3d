/** @file wurster.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../city3d/unit.js'
import { countTo, xyz, array } from '../city3d/util.js'
import Place from '../city3d/place.js'
import { xyArray } from '../city3d/plato.js'
import Structure from '../city3d/structure.js'

const NUM_TOWER_CRENELS_X = 12 // eslint-disable-line no-unused-vars
const CRENEL_SPACING = UNIT.feet(9.333) // eslint-disable-line no-unused-vars

const AWNING_SEPERATOR_DEPTH = UNIT.feet(2.5) // eslint-disable-line no-unused-vars
const AWNING_DEPTH = UNIT.feet(5) // eslint-disable-line no-unused-vars
const AWNING_LENGTH = UNIT.feet(9) // eslint-disable-line no-unused-vars

const SOUTH_WING_DX = 170
const SOUTH_WING_DY = 85
const SOUTH_WING_X0 = 100
const SOUTH_WING_Y0 = 140

const SOUTH_WING = [
  xyArray(0, 0),
  xyArray(SOUTH_WING_DX, 0),
  xyArray(SOUTH_WING_DX, SOUTH_WING_DY),
  xyArray(0, SOUTH_WING_DY)
]

const CENTER_WING_DX = 53
const CENTER_WING_DY = 116
const CENTER_WING_X0 = SOUTH_WING_X0
const CENTER_WING_Y0 = SOUTH_WING_Y0 + SOUTH_WING_DY

const CENTER_WING = [
  xyArray(0, 0),
  xyArray(CENTER_WING_DX, 0),
  xyArray(CENTER_WING_DX, CENTER_WING_DY),
  xyArray(0, CENTER_WING_DY)
]

const NUM_SOUTH_WING_CRENELS_X = 18 // eslint-disable-line no-unused-vars
const NUM_SOUTH_WING_CRENELS_Y = 9 // eslint-disable-line no-unused-vars

const TOWER_DX = 110
const TOWER_DY = 70
const TOWER_X0 = CENTER_WING_X0 + CENTER_WING_DX
const TOWER_Y0 = CENTER_WING_Y0 + CENTER_WING_DY

const TOWER = [
  xyArray(0, 0),
  xyArray(TOWER_DX, 0),
  xyArray(TOWER_DX, TOWER_DY),
  xyArray(0, TOWER_DY)
]

const TOWER_EAST_DX = 29
const TOWER_EAST_DY = 56
const TOWER_EAST_X0 = TOWER_X0 + TOWER_DX
const TOWER_EAST_Y0 = TOWER_Y0 + 5

const TOWER_EAST = [
  xyArray(0, 0),
  xyArray(TOWER_EAST_DX, 0),
  xyArray(TOWER_EAST_DX, TOWER_EAST_DY),
  xyArray(0, TOWER_EAST_DY)
]

const TOWER_WEST_DX = 29
const TOWER_WEST_DY = 44
const TOWER_WEST_OFFSET_Y = 17
const TOWER_WEST_X0 = TOWER_X0 - TOWER_EAST_DX
const TOWER_WEST_Y0 = TOWER_Y0 + TOWER_WEST_OFFSET_Y

const TOWER_WEST = [
  xyArray(0, 0),
  xyArray(TOWER_WEST_DX, 0),
  xyArray(TOWER_WEST_DX, TOWER_WEST_DY),
  xyArray(0, TOWER_WEST_DY)
]

const ATRIUM_DX = 22
const ATRIUM_DY = 46
const ATRIUM_OFFSET_Y = -7
// const ATRIUM_X0 = TOWER_WEST_X0 - ATRIUM_DX
// const ATRIUM_Y0 = TOWER_WEST_Y0 + ATRIUM_OFFSET_Y

const NORTH_WING_DX = 227
const NORTH_WING_DY = 113
const NORTH_WING_X0 = SOUTH_WING_X0 - (NORTH_WING_DX - TOWER_DX - CENTER_WING_DX)
const NORTH_WING_Y0 = TOWER_Y0

const NORTH_WING = [
  xyArray(0, 0),
  xyArray(NORTH_WING_DX - TOWER_DX, 0),
  xyArray(NORTH_WING_DX - TOWER_DX, TOWER_WEST_OFFSET_Y),
  xyArray(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y),
  xyArray(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xyArray(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX - ATRIUM_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xyArray(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX - ATRIUM_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM_DY),
  xyArray(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM_DY),
  xyArray(NORTH_WING_DX - TOWER_DX - TOWER_WEST_DX, TOWER_WEST_OFFSET_Y + TOWER_WEST_DY),
  xyArray(NORTH_WING_DX - TOWER_DX, TOWER_WEST_OFFSET_Y + TOWER_WEST_DY),
  xyArray(NORTH_WING_DX - TOWER_DX, TOWER_DY),
  xyArray(NORTH_WING_DX, TOWER_DY),
  xyArray(NORTH_WING_DX, NORTH_WING_DY),
  xyArray(0, NORTH_WING_DY)
]

const NUM_NORTH_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars
const NUM_CENTER_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars

const FLOOR_TEN_BALCONY_DX = 10
const FLOOR_TEN_BALCONY_DY = 23
const FLOOR_TEN_BALCONY_X0 = TOWER_WEST_X0 - FLOOR_TEN_BALCONY_DX
const FLOOR_TEN_BALCONY_Y0 = TOWER_WEST_Y0

const FLOOR_TEN_BALCONY = [
  xyArray(0, 0),
  xyArray(FLOOR_TEN_BALCONY_DX, 0),
  xyArray(FLOOR_TEN_BALCONY_DX, FLOOR_TEN_BALCONY_DY),
  xyArray(0, FLOOR_TEN_BALCONY_DY)
]

const BUILDING_SPEC = Object.freeze({
  name: 'Wurster Hall',
  storyHeight: UNIT.feet(13),
  roof: {
    parapetHeight: UNIT.feet(4)
  },
  children: [{
    name: 'South wing',
    offset: xyz(100, SOUTH_WING_Y0),
    numStories: 4,
    shape: SOUTH_WING
  }, {
    name: 'Center wing',
    offset: xyz(100, SOUTH_WING_Y0 + SOUTH_WING_DY),
    numStories: 3,
    shape: CENTER_WING
  }, {
    name: 'North wing',
    offset: xyz(NORTH_WING_X0, NORTH_WING_Y0),
    numStories: 3,
    shape: NORTH_WING
  }, {
    name: 'Tower',
    offset: xyz(TOWER_X0, TOWER_Y0),
    numStories: 10,
    shape: TOWER
  }, {
    name: 'Tower east',
    offset: xyz(TOWER_EAST_X0, TOWER_EAST_Y0),
    numStories: 10,
    shape: TOWER_EAST
  }, {
    name: 'Tower west',
    offset: xyz(TOWER_WEST_X0, TOWER_WEST_Y0),
    numStories: 11,
    shape: TOWER_WEST
  }, {
    // TODO: figure out why this isn't showing up in the rendering
    name: 'Tower west balcony',
    offset: xyz(FLOOR_TEN_BALCONY_X0, FLOOR_TEN_BALCONY_Y0, 11 * 13),
    numStories: 0,
    shape: FLOOR_TEN_BALCONY
  }]
})

// TODO: place the building on a parcel of land
const PARCEL_DX = 360
const PARCEL_DY = 540
const PARCEL = [ // eslint-disable-line no-unused-vars
  xyArray(0, 0),
  xyArray(PARCEL_DX, 0),
  xyArray(PARCEL_DX, PARCEL_DY),
  xyArray(0, PARCEL_DY)
]

/**
* Class representing UC Berkeley's Wurster Hall.
* @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
*/
class Wurster extends Structure {
  static makeBuildingFromSpec (plato, spec, defaults) {
    let { storyHeight, roof, children, numStories, shape, offset } = spec
    storyHeight = storyHeight || defaults.storyHeight
    roof = roof || defaults.roof
    const point = { ...offset }
    if (shape) {
      let z = 0
      for (const i in countTo(numStories)) {
        z = i * storyHeight
        point.z = z
        plato.goto(point)
        plato.addPlace(Place.ROOM, shape, { wall: storyHeight })
      }
      point.z = z + storyHeight
      plato.goto(point)
      plato.addPlace(Place.ROOF, shape, { wall: roof.parapetHeight })
    }
    const defaultsForChildren = { storyHeight, roof }
    for (const childSpec of array(children)) {
      Wurster.makeBuildingFromSpec(plato, childSpec, defaultsForChildren)
    }
  }

  makeBuilding () {
    return Wurster.makeBuildingFromSpec(this._plato, BUILDING_SPEC)
  }
}

export { Wurster }
