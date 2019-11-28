/** @file wurster.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../city3d/unit.js'
import { countTo, xy, xyz, array } from '../city3d/util.js'
import Place from '../city3d/place.js'
import Structure from '../city3d/structure.js'

function rectangleOfSize (sizeXY) {
  return [
    xy(0, 0),
    xy(sizeXY.x, 0),
    xy(sizeXY.x, sizeXY.y),
    xy(0, sizeXY.y)
  ]
}

const STORY_HEIGHT = UNIT.feet(13)

const SOUTH_WING = {
  name: 'South wing',
  numStories: 4,
  offset: xy(100, 140),
  size: xy(170, 85)
}
SOUTH_WING.corners = rectangleOfSize(SOUTH_WING.size)

const CENTER_WING = {
  name: 'Center wing',
  numStories: 3,
  offset: xy(SOUTH_WING.offset.x, SOUTH_WING.offset.y + SOUTH_WING.size.y),
  size: xy(53, 116)
}
CENTER_WING.corners = rectangleOfSize(CENTER_WING.size)

const TOWER = {
  name: 'Tower',
  numStories: 10,
  offset: xy(CENTER_WING.offset.x + CENTER_WING.size.x, CENTER_WING.offset.y + CENTER_WING.size.y),
  size: xy(110, 70)
}
TOWER.corners = rectangleOfSize(TOWER.size)

const TOWER_EAST = {
  name: 'Tower east',
  numStories: 10,
  offset: xy(TOWER.offset.x + TOWER.size.x, TOWER.offset.y + 5),
  size: xy(29, 56)
}
TOWER_EAST.corners = rectangleOfSize(TOWER_EAST.size)

const TOWER_WEST_OFFSET_Y = 17
const TOWER_WEST = {
  name: 'Tower west',
  numStories: 11,
  offset: xy(TOWER.offset.x - TOWER_EAST.size.x, TOWER.offset.y + TOWER_WEST_OFFSET_Y),
  size: xy(29, 44)
}
TOWER_WEST.corners = rectangleOfSize(TOWER_WEST.size)

const FLOOR_TEN_BALCONY = {
  name: 'Tower west balcony',
  numStories: 0,
  offset: xyz(TOWER_WEST.offset.x - 10, TOWER_WEST.offset.y, 10 * STORY_HEIGHT),
  size: xy(10, 23)
}
FLOOR_TEN_BALCONY.corners = rectangleOfSize(FLOOR_TEN_BALCONY.size)

const ATRIUM_OFFSET_Y = -7
const ATRIUM = {
  offset: xy(TOWER_WEST.offset.x - 22, TOWER_WEST.offset.y + ATRIUM_OFFSET_Y),
  size: xy(22, 46)
}
const NORTH_WING = {
  name: 'North wing',
  numStories: 3,
  offset: xy(SOUTH_WING.offset.x - (227 - TOWER.size.x - CENTER_WING.size.x), TOWER.offset.y),
  size: xy(227, 113)
}
NORTH_WING.corners = [
  xy(0, 0),
  xy(NORTH_WING.size.x - TOWER.size.x, 0),
  xy(NORTH_WING.size.x - TOWER.size.x, TOWER_WEST_OFFSET_Y),
  xy(NORTH_WING.size.x - TOWER.size.x - TOWER_WEST.size.x, TOWER_WEST_OFFSET_Y),
  xy(NORTH_WING.size.x - TOWER.size.x - TOWER_WEST.size.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xy(NORTH_WING.size.x - TOWER.size.x - TOWER_WEST.size.x - ATRIUM.size.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xy(NORTH_WING.size.x - TOWER.size.x - TOWER_WEST.size.x - ATRIUM.size.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM.size.y),
  xy(NORTH_WING.size.x - TOWER.size.x - TOWER_WEST.size.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM.size.y),
  xy(NORTH_WING.size.x - TOWER.size.x - TOWER_WEST.size.x, TOWER_WEST_OFFSET_Y + TOWER_WEST.size.y),
  xy(NORTH_WING.size.x - TOWER.size.x, TOWER_WEST_OFFSET_Y + TOWER_WEST.size.y),
  xy(NORTH_WING.size.x - TOWER.size.x, TOWER.size.y),
  xy(NORTH_WING.size.x, TOWER.size.y),
  xy(NORTH_WING.size.x, NORTH_WING.size.y),
  xy(0, NORTH_WING.size.y)
]

const BUILDING_SPEC = Object.freeze({
  name: 'Wurster Hall',
  storyHeight: STORY_HEIGHT,
  roof: {
    parapetHeight: UNIT.feet(4)
  },
  children: [
    SOUTH_WING,
    CENTER_WING,
    NORTH_WING,
    TOWER,
    TOWER_EAST,
    TOWER_WEST,
    FLOOR_TEN_BALCONY
  ]
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

// TODO: place the building on a parcel of land
const PARCEL = {
  size: xy(360, 540)
}
PARCEL.corners = rectangleOfSize(PARCEL.size)

/**
 * Class representing UC Berkeley's Wurster Hall.
 * @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
 */
class Wurster extends Structure {
  static makeBuildingFromSpec (plato, spec, defaults) {
    let { name, storyHeight, roof, children, numStories, corners, offset } = spec
    storyHeight = storyHeight || defaults.storyHeight
    roof = roof || defaults.roof
    const point = { ...offset }
    if (corners) {
      let z = point.z || 0
      for (const i in countTo(numStories)) {
        point.z = z
        const floorName = 'Floor ' + i + 'of ' + name
        plato.goto(point)
        plato.makePlace(Place.ROOM, corners, { name: floorName, wall: storyHeight })
        z = z + storyHeight
      }
      point.z = z
      plato.goto(point)
      plato.makePlace(Place.ROOF, corners, { wall: roof.parapetHeight })
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
