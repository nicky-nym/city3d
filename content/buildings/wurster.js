/** @file wurster.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const STOREY_HEIGHT = UNIT.feet(13)

const SIZE = {
  south: xy(170, 85),
  center: xy(53, 116),
  tower: xy(110, 70),
  east: xy(29, 56),
  west: xy(29, 44),
  balcony: xy(10, 23),
  north: xy(227, 113),
  atrium: xy(22, 46),
  window: xy(8, 9)
}
const WEST_DELTA_Y = UNIT.feet(17)
const ATRIUM_DELTA_Y = UNIT.feet(-7)
const ORIGIN = {
  south: xy(0, 0),
  center: xy(0, SIZE.south.y),
  tower: xy(SIZE.center.x, SIZE.south.y + SIZE.center.y),
  east: xy(SIZE.center.x + SIZE.tower.x, SIZE.south.y + SIZE.center.y + 5),
  west: xy(SIZE.center.x - SIZE.west.x, SIZE.south.y + SIZE.center.y + WEST_DELTA_Y),
  balcony: xyz(SIZE.center.x - SIZE.west.x - SIZE.balcony.x, SIZE.south.y + SIZE.center.y + WEST_DELTA_Y, STOREY_HEIGHT * 10),
  north: xy(SIZE.center.x + SIZE.tower.x - SIZE.north.x, SIZE.south.y + SIZE.center.y)
}

const WURSTER_BUILDING_SPEC = Object.freeze({
  name: 'Wurster Hall',
  storeyHeight: STOREY_HEIGHT,
  offset: xyz(120, 140, 0),
  roof: {
    parapetHeight: UNIT.feet(4)
  },
  children: [{
    name: 'South wing',
    numStoreys: 4,
    offset: ORIGIN.south,
    shape: { type: 'rectangle', data: SIZE.south },
    walls: [{
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(109, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(118, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(127, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(136, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(145, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(154, 3) }
      ]
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) }
      ]
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(109, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(118, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(127, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(136, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(145, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(154, 3) }
      ]
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) }
      ]
    }]
  }, {
    name: 'Center wing',
    numStoreys: 3,
    offset: ORIGIN.center,
    shape: { type: 'rectangle', data: SIZE.center },
    walls: [{
      windows: []
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(109, 3) }
      ]
    }, {
      windows: []
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(109, 3) }
      ]
    }]
  }, {
    name: 'Tower',
    numStoreys: 10,
    offset: ORIGIN.tower,
    shape: { type: 'rectangle', data: SIZE.tower },
    walls: [{
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) }
      ]
    }, {
      windows: [
        // { type: 'rectangle', data: SIZE.window, at: xy(4, 3) }
      ]
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) }
      ]
    }, {
      windows: [
        // { type: 'rectangle', data: SIZE.window, at: xy(4, 3) }
      ]
    }]
  }, {
    name: 'Tower east',
    numStoreys: 10,
    offset: ORIGIN.east,
    shape: { type: 'rectangle', data: SIZE.east }
  }, {
    name: 'Tower west',
    numStoreys: 11,
    offset: ORIGIN.west,
    shape: { type: 'rectangle', data: SIZE.west }
  }, {
    name: 'Tower west balcony',
    numStoreys: 0,
    offset: ORIGIN.balcony,
    shape: { type: 'rectangle', data: SIZE.balcony }
  }, {
    name: 'North wing',
    numStoreys: 3,
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
    },
    walls: [{
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) }
      ]
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: [ // atrium
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) }
      ]
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: []
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) }
      ]
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(109, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(118, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(127, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(136, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(145, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(154, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(163, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(172, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(181, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(190, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(199, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(208, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(217, 3) }
      ]
    }, {
      windows: [
        { type: 'rectangle', data: SIZE.window, at: xy(1, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(10, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(19, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(28, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(37, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(46, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(55, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(64, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(73, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(82, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(91, 3) },
        { type: 'rectangle', data: SIZE.window, at: xy(100, 3) }
      ]
    }]
  }]
})

// TODO: use all this information to add surface details to the building:
const CRENEL_SPACING = UNIT.feet(9.333) // eslint-disable-line no-unused-vars
const NUM_NORTH_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars
const NUM_CENTER_WING_CRENELS_Y = 12 // eslint-disable-line no-unused-vars
const NUM_TOWER_CRENELS_X = 12 // eslint-disable-line no-unused-vars
const AWNING_SEPERATOR_DEPTH = UNIT.feet(2.5) // eslint-disable-line no-unused-vars
const AWNING_DEPTH = UNIT.feet(5) // eslint-disable-line no-unused-vars
const AWNING_LENGTH = UNIT.feet(9) // eslint-disable-line no-unused-vars
const NUM_SOUTH_WING_CRENELS_X = 18 // eslint-disable-line no-unused-vars
const NUM_SOUTH_WING_CRENELS_Y = 9 // eslint-disable-line no-unused-vars

/**
 * Class representing UC Berkeley's Wurster Hall.
 * @see [Wikipedia photo]{@link https://en.wikipedia.org/wiki/UC_Berkeley_College_of_Environmental_Design#/media/File:UC_Berkeley_Wurster_Hall.jpg}
 */
class Wurster extends Building {
  makeBuilding (at = { x: 0, y: 0 }) {
    return super.makeBuildingFromSpec(WURSTER_BUILDING_SPEC, at)
  }
}

export { Wurster }
