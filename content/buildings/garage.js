/** @file garage.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const GARAGE_BUILDING_SPEC = { // eslint-disable-line no-unused-vars
  name: 'Garage',
  storeyHeight: UNIT.feet(8),
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(24, 21) },
  roof: {
    pitched: { rise: 8, run: 12 },
    eaves: UNIT.feet(1)
  },
  walls: [{
    name: 'front wall',
    doors: [{
      name: 'garage door',
      yLeafCount: 5,
      motion: 'overhead',
      shape: { type: 'rectangle', data: xy(16, 7) },
      center: x(12),
      casing: { width: x(0.5) }
    }],
    fixtures: [
      { at: xy(+2, 6), type: 'sconce' },
      { at: xy(-2, 6), type: 'sconce' }
    ],
    downspouts: [
      { at: x(+0.25) },
      { at: x(-0.25) }
    ],
    roof: {
      edges: [{
        type: 'mixed',
        mix: [{
          type: 'pitched',
          distance: UNIT.feet(2)
        }, {
          type: 'gabled',
          distance: UNIT.feet(22)
        }, {
          type: 'pitched',
          distance: UNIT.feet(2)
        }]
      }]
    }
  }, {
    name: 'right wall',
    doors: [{
      name: 'side door',
      motion: 'swinging',
      knobSide: 'left',
      shape: { type: 'rectangle', data: xy(3, 6 + 8 / 12) },
      center: x(10.5),
      casing: { width: x(0.5) }
    }],
    roof: 'gabled'
  }, {
    name: 'back wall',
    roof: 'pitched',
    downspouts: [
      { at: x(+0.25) },
      { at: x(-0.25) }
    ]
  }, {
    name: 'left wall',
    roof: 'gabled'
  }]
  // TODO: add overhead light fixtures
  // TODO: add light switches and power outlets
}

const OLD_GARAGE_BUILDING_SPEC = {
  name: 'Garage',
  storeyHeight: 8,
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(24, 21) },
  roof: {
    // TODO: make this a peaked roof instead
    parapetHeight: UNIT.feet(1)
  }
}

// TODO: move this to util.js ???
function x (length) {
  return length
}

/**
* Class representing a suburban 2-car garage.
*/
class Garage extends Building {
  constructor ({ city, ray, x0, y0, at = xyz(0, 0, 0), name } = {}) {
    super(OLD_GARAGE_BUILDING_SPEC, { city, ray, x0, y0, name, at })
  }
}

export { Garage }
