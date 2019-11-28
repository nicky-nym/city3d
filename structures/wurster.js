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
  AT: xy(100, 140),
  SIZE: xy(170, 85)
}

const CENTER_WING = {
  AT: xy(SOUTH_WING.AT.x, SOUTH_WING.AT.y + SOUTH_WING.SIZE.y),
  SIZE: xy(53, 116)
}

const TOWER = {
  AT: xy(CENTER_WING.AT.x + CENTER_WING.SIZE.x, CENTER_WING.AT.y + CENTER_WING.SIZE.y),
  SIZE: xy(110, 70)
}

const TOWER_EAST = {
  AT: xy(TOWER.AT.x + TOWER.SIZE.x, TOWER.AT.y + 5),
  SIZE: xy(29, 56)
}

const TOWER_WEST_OFFSET_Y = 17
const TOWER_WEST = {
  AT: xy(TOWER.AT.x - TOWER_EAST.SIZE.x, TOWER.AT.y + TOWER_WEST_OFFSET_Y),
  SIZE: xy(29, 44)
}

const FLOOR_TEN_BALCONY = {
  AT: xyz(TOWER_WEST.AT.x - 10, TOWER_WEST.AT.y, 10 * STORY_HEIGHT),
  SIZE: xy(10, 23)
}

const ATRIUM_OFFSET_Y = -7
const ATRIUM = {
  AT: xy(TOWER_WEST.AT.x - 22, TOWER_WEST.AT.y + ATRIUM_OFFSET_Y),
  SIZE: xy(22, 46)
}
const NORTH_WING = {
  AT: xy(SOUTH_WING.AT.x - (227 - TOWER.SIZE.x - CENTER_WING.SIZE.x), TOWER.AT.y),
  SIZE: xy(227, 113)
}
NORTH_WING.CORNERS = [
  xy(0, 0),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x, 0),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x, TOWER_WEST_OFFSET_Y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x - TOWER_WEST.SIZE.x, TOWER_WEST_OFFSET_Y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x - TOWER_WEST.SIZE.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x - TOWER_WEST.SIZE.x - ATRIUM.SIZE.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x - TOWER_WEST.SIZE.x - ATRIUM.SIZE.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM.SIZE.y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x - TOWER_WEST.SIZE.x, TOWER_WEST_OFFSET_Y + ATRIUM_OFFSET_Y + ATRIUM.SIZE.y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x - TOWER_WEST.SIZE.x, TOWER_WEST_OFFSET_Y + TOWER_WEST.SIZE.y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x, TOWER_WEST_OFFSET_Y + TOWER_WEST.SIZE.y),
  xy(NORTH_WING.SIZE.x - TOWER.SIZE.x, TOWER.SIZE.y),
  xy(NORTH_WING.SIZE.x, TOWER.SIZE.y),
  xy(NORTH_WING.SIZE.x, NORTH_WING.SIZE.y),
  xy(0, NORTH_WING.SIZE.y)
]

const BUILDING_SPEC = Object.freeze({
  name: 'Wurster Hall',
  storyHeight: STORY_HEIGHT,
  roof: {
    parapetHeight: UNIT.feet(4)
  },
  children: [{
    name: 'South wing',
    offset: SOUTH_WING.AT,
    numStories: 4,
    corners: rectangleOfSize(SOUTH_WING.SIZE)
  }, {
    name: 'Center wing',
    offset: CENTER_WING.AT,
    numStories: 3,
    corners: rectangleOfSize(CENTER_WING.SIZE)
  }, {
    name: 'North wing',
    offset: NORTH_WING.AT,
    numStories: 3,
    corners: NORTH_WING.CORNERS
  }, {
    name: 'Tower',
    offset: TOWER.AT,
    numStories: 10,
    corners: rectangleOfSize(TOWER.SIZE)
  }, {
    name: 'Tower east',
    offset: TOWER_EAST.AT,
    numStories: 10,
    corners: rectangleOfSize(TOWER_EAST.SIZE)
  }, {
    name: 'Tower west',
    offset: TOWER_WEST.AT,
    numStories: 11,
    corners: rectangleOfSize(TOWER_WEST.SIZE)
  }, {
    name: 'Tower west balcony',
    offset: FLOOR_TEN_BALCONY.AT,
    numStories: 0,
    corners: rectangleOfSize(FLOOR_TEN_BALCONY.SIZE)
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

// TODO: place the building on a parcel of land
const PARCEL = {
  SIZE: xy(360, 540)
}
PARCEL.CORNERS = rectangleOfSize(PARCEL.SIZE) // eslint-disable-line no-unused-vars

/**
 * Class representing UC Berkeley's Wurster Hall.
 * @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
 */
class Wurster extends Structure {
  static makeBuildingFromSpec (plato, spec, defaults) {
    let { storyHeight, roof, children, numStories, corners, offset } = spec
    storyHeight = storyHeight || defaults.storyHeight
    roof = roof || defaults.roof
    const point = { ...offset }
    if (corners) {
      let z = point.z || 0
      for (const i in countTo(numStories)) { // eslint-disable-line no-unused-vars
        point.z = z
        plato.goto(point)
        plato.makePlace(Place.ROOM, corners, { wall: storyHeight })
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
