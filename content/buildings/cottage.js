/** @file cottage.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { x, xy, xyz } from '../../src/core/util.js'
import { Building } from '../../src/architecture/building.js'

const COTTAGE_BUILDING_SPEC = { // eslint-disable-line no-unused-vars
  name: 'Cottage',
  unit: 'feet',
  storeyHeight: 8,
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(30 + 4 / 12, 21) },
  roof: {
    type: 'pitched',
    pitch: { rise: 8, run: 12 },
    eaves: x(1),
    surface: {
      style: 'shingles',
      material: 'asphalt composition'
    }
  },
  walls: [{
    name: 'front wall',
    exterior: {
      surface: {
        style: 'clapboard',
        material: 'fiber-cement'
      },
      doors: [{
        name: 'patio doors',
        xLeafCount: 3,
        motion: 'sliding',
        shape: { type: 'rectangle', data: xy(9, 6 + 8 / 12) },
        lites: xy(2, 5),
        center: x(9 + 8 / 12),
        casing: { width: x(0.5) }
      }],
      windows: [{
        name: 'bedroom windows',
        xLeafCount: 2,
        motion: 'hung',
        shape: { type: 'rectangle', data: xy(5, 4) },
        lites: xy(2, 4),
        center: xy(-6, 5),
        casing: { width: x(0.5) }
      }],
      fixtures: [
        { at: xy(+3 + 2 / 12, 6), type: 'sconce' },
        { at: xy(16 + 2 / 12, 6), type: 'sconce' }
      ],
      downspouts: [
        { at: x(+0.25) },
        { at: x(-0.25) }
      ],
      roofline: {
        type: 'mixed',
        mix: [{
          type: 'pitched',
          distance: x(2)
        }, {
          type: 'gabled',
          distance: x(17 + 4 / 12)
        }, {
          type: 'pitched',
          distance: x(13)
        }]
      }
    },
    interior: {
      fixtures: [
        { at: xy(6, 1), type: 'power outlet, duplex' },
        { at: xy(12, 1), type: 'light switch', n: 2 },
        { at: xy(14, 1), type: 'power outlet, duplex' },
        { at: xy(27, 1), type: 'power outlet, duplex' }
      ]
    }
  }, {
    name: 'right wall',
    exterior: {
      windows: [{
        name: 'bedroom window',
        motion: 'casement',
        shape: { type: 'rectangle', data: xy(2.5, 4) },
        lites: xy(2, 4),
        center: xy(2 + 4 / 12, 5),
        casing: { width: x(0.5) }
      }],
      roofline: { type: 'gabled' }
    },
    interior: {
      fixtures: [
        { at: xy(11, 1), type: 'power outlet, duplex' },
        { at: xy(18, 1), type: 'power outlet, duplex' }
      ]
    }
  }, {
    name: 'back wall',
    exterior: {
      roofline: { type: 'pitched' },
      downspouts: [
        { at: x(+0.25) },
        { at: x(-0.25) }
      ],
      windows: [{
        name: 'bathroom window',
        motion: 'hung',
        shape: { type: 'rectangle', data: xy(2, 3) },
        lites: xy(1, 2),
        center: xy(4 + 6 / 12, 5 + 6 / 12),
        casing: { width: x(0.5) }
      }, {
        name: 'laundry room window',
        motion: 'hung',
        shape: { type: 'rectangle', data: xy(2, 3) },
        lites: xy(1, 2),
        center: xy(-2, 5 + 6 / 12),
        casing: { width: x(0.5) }
      }]
    },
    interior: {
      fixtures: [
        { at: xy(10, 4), type: 'power outlet, duplex' },
        { at: xy(15, 4), type: 'power outlet, duplex' },
        { at: xy(22, 4), type: 'power outlet, duplex' },
        { at: xy(23, 7), type: 'sconce' }
      ]
    }
  }, {
    name: 'left wall',
    exterior: {
      doors: [{
        name: 'side door',
        motion: 'swinging',
        knobSide: 'right',
        shape: { type: 'rectangle', data: xy(3, 6 + 8 / 12) },
        center: x(10.5),
        casing: { width: x(0.5) }
      }],
      fixtures: [
        { at: xy(13 + 6 / 12, 6), type: 'sconce' }
      ],
      roofline: { type: 'gabled' }
    },
    interior: {
      fixtures: [
        { at: xy(6, 1), type: 'power outlet, duplex' },
        { at: xy(8, 4), type: 'light switch', n: 5 },
        { at: xy(16, 1), type: 'power outlet, duplex' }
      ]
    }
  }],
  partitions: [{
    name: 'bedroom wall',
    ends: [
      xy(-11 + 6 / 12, 21),
      xy(-11 + 6 / 12, 0)
    ],
    exterior: {
      doors: [{
        name: 'bedroom door',
        motion: 'swinging',
        knobSide: 'right',
        shape: { type: 'rectangle', data: xy(2 + 8 / 12, 6 + 8 / 12) },
        center: x(10 + 10 / 12),
        casing: { width: x(0.5) }
      }],
      fixtures: [
        { at: xy(3, 4), type: 'power outlet, duplex' },
        { at: xy(6, 4), type: 'power outlet, duplex' },
        { at: xy(12, 4), type: 'light switch', n: 3 },
        { at: xy(15, 1), type: 'power outlet, duplex' }
      ]
    },
    interior: {
      fixtures: [
        { at: xy(5, 1), type: 'power outlet, duplex' },
        { at: xy(9, 4), type: 'light switch' }
      ]
    }
  }, {
    name: 'bathroom wall',
    ends: [
      xy(-11, -(5 + 8 / 12)),
      xy(0, -(5 + 8 / 12))
    ],
    exterior: {
      doors: [{
        name: 'bathroom door',
        motion: 'swinging',
        knobSide: 'right',
        shape: { type: 'rectangle', data: xy(2 + 6 / 12, 6 + 8 / 12) },
        center: x(3),
        casing: { width: x(0.5) }
      }]
    },
    interior: {
      fixtures: [
        { at: xy(7.5, 4), type: 'light switch', n: 3 }
      ]
    }
  }, {
    name: 'closet wall',
    ends: [
      xy(-8, -8),
      xy(0, -8)
    ],
    exterior: {
      doors: [{
        name: 'closet doors',
        motion: 'sliding',
        xLeafCount: 2,
        shape: { type: 'rectangle', data: xy(6, 6 + 8 / 12) },
        center: x(4),
        casing: { width: x(0.5) }
      }]
    }
  }, {
    name: 'wall toward bathroom',
    ends: [
      xy(-8, -(5 + 8 / 12)),
      xy(-8, -8)
    ]
  }, {
    name: 'laundry room wall',
    ends: [
      xy(0, -(7 + 8 / 12)),
      xy(10 + 6 / 12, -(7 + 8 / 12))
    ],
    exterior: {
      doors: [{
        name: 'laundry room door',
        motion: 'swinging',
        knobSide: 'right',
        shape: { type: 'rectangle', data: xy(2 + 6 / 12, 6 + 8 / 12) },
        center: x(3),
        casing: { width: x(0.5) }
      }]
    },
    interior: {
      fixtures: [
        { at: xy(5, 4), type: 'light switch' },
        { at: xy(6, 1), type: 'power outlet, duplex' }
      ]
    }
  }, {
    name: 'kitchen/laundry wall',
    ends: [
      xy(7, 0),
      xy(7, -(7 + 2 / 12))
    ],
    exterior: {
      fixtures: [
        { at: xy(1, 1), type: 'power outlet, duplex' },
        { at: xy(2, 1), type: 'gas outlet' }
      ]
    }
  }]
  // TODO: add half-wall behind kitchen sink
  // TODO: add kitchen cupboards, countertops, sink, stove, fridge
  // TODO: add bathroom cupboard, countertop, sink, toilet, shower
  // TODO: add laundry room washer & dryer
  // TODO: add laundry room coat closet walls & door
  // TODO: add overhead light fixtures
}

const OLD_COTTAGE_BUILDING_SPEC = {
  name: 'Cottage',
  storeyHeight: 8,
  offset: xyz(0, 0, 0),
  numStoreys: 1,
  shape: { type: 'rectangle', data: xy(30, 21) },
  roof: {
    // TODO: make this a peaked roof instead
    parapetHeight: 1
  }
}

/**
 * Class representing a back yard Accessory Dwelling Unit.
 */
class Cottage extends Building {
  constructor ({ city, ray, x0, y0, at = xyz(0, 0, 0), name } = {}) {
    super(OLD_COTTAGE_BUILDING_SPEC, { city, ray, x0, y0, name, at })
  }
}

export { Cottage }
