/** @file garage.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { x, xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const GARAGE_BUILDING_SPEC = { // eslint-disable-line no-unused-vars
  name: 'Garage',
  unit: 'feet',
  storeyHeight: 8,
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(24, 21) },
  roof: {
    type: 'pitched',
    pitch: { rise: 8, run: 12 },
    eaves: x(1),
    surface: {
      style: 'shingles',
      material: 'asphalt composition'
    }
  },
  ceiling: {
    fixtures: [
      { at: xy(12, 9), type: 'power outlet, duplex' },
      { at: xy(6, 14), type: 'light fixture' }, // TODO: 6'x6" fluorescent
      { at: xy(12, 14), type: 'light fixture' }, // TODO: 6'x6" fluorescent
      { at: xy(18, 14), type: 'light fixture' } // TODO: 6'x6" fluorescent
    ]
  },
  walls: [{
    name: 'front wall',
    exterior: {
      surface: {
        style: 'clapboard',
        material: 'fiber-cement'
      },
      fixtures: [
        { at: xy(+2, 6), type: 'sconce' },
        { at: xy(-2, 6), type: 'sconce' }
      ],
      downspouts: [
        { at: x(+0.25) },
        { at: x(-0.25) }
      ],
      doors: [{
        name: 'garage door',
        yLeafCount: 5,
        motion: 'overhead',
        shape: { type: 'rectangle', data: xy(16, 7) },
        center: x(12),
        casing: { width: x(0.5) }
      }]
    },
    interior: {
      surface: {
        style: 'flat', // default
        material: 'drywall' // default
      },
      fixtures: [

      ]
    },
    roofline: {
      type: 'mixed',
      mix: [{
        type: 'pitched',
        distance: x(2)
      }, {
        type: 'gabled',
        distance: x(22)
      }, {
        type: 'pitched',
        distance: x(2)
      }]
    }
  }, {
    name: 'right wall',
    exterior: {
      roofline: { type: 'gabled' },
      doors: [{
        name: 'side door',
        motion: 'swinging',
        knobSide: 'left',
        shape: { type: 'rectangle', data: xy(3, 6 + 8 / 12) },
        center: x(10.5),
        casing: { width: x(0.5) }
      }],
      fixtures: [
        { at: xy(8, 6), type: 'sconce' }
      ]
    },
    interior: {
      fixtures: [
        { at: xy(+5, 4), type: 'power outlet, duplex' },
        { at: xy(13, 4), type: 'light switch', n: 2 }, // TODO: controls what?
        { at: xy(-5, 4), type: 'power outlet, duplex' }
      ]
    }
  }, {
    name: 'back wall',
    exterior: {
      roofline: { type: 'pitched' },
      downspouts: [
        { at: x(+0.25) },
        { at: x(-0.25) }
      ]
    },
    interior: {
      fixtures: [
        { at: xy(+6, 4), type: 'power outlet, duplex' },
        { at: xy(-6, 4), type: 'power outlet, duplex' }
      ]
    }
  }, {
    name: 'left wall',
    exterior: {
      roofline: { type: 'gabled' }
    },
    interior: {
      fixtures: [
        { at: xy(+1, 4), type: 'light switch' }, // TODO: controls what?
        { at: xy(+5, 4), type: 'power outlet, duplex' },
        { at: xy(-5, 4), type: 'power outlet, duplex' }
      ]
    }
  }]
}

const OLD_GARAGE_BUILDING_SPEC = {
  name: 'Garage',
  storeyHeight: 8,
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(24, 21) },
  roof: {
    // TODO: make this a peaked roof instead
    parapetHeight: 1
  }
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
