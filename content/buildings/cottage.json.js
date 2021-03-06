export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Cottage',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 15 + 2 / 12, y: 10.5, z: 0 },
  def: {
    SW: { x: 0, y: 0 },
    S1: { x: 1, y: 0 },
    S1_tweak: { x: 1, y: -0.1 },
    S2_tweak: { x: 18 + 4 / 12, y: -0.1 },
    S2: { x: 18 + 4 / 12, y: 0 },
    SE: { x: 30 + 4 / 12, y: 0 },
    NE: { x: 30 + 4 / 12, y: 21 },
    NW: { x: 0, y: 21 },
    RECTANGLE: {
      shape: 'polygon',
      corners: [
        { "$ref": "#/def/SW" },
        { "$ref": "#/def/SE" },
        { "$ref": "#/def/NE" },
        { "$ref": "#/def/NW" }
      ]
    }
  },
  storeys: [{
    name: 'ground storey',
    height: 8,
    floors: [{
      outline: { "$ref": "#/def/RECTANGLE" },
      surface: { material: 'carpet' }
    }],
    ceiling: {},
    comments: [
      '  NW----N2---------N1----------NE  ',
      '  |      |          |           |  ',
      '  |      |          |           |  ',
      '  |      |          C---D------E1  ',
      '  |      |          |   |       |  ',
      '  W1-----A--B       |   F------E2  ',
      '  |                 |           |  ',
      '  |                 |           |  ',
      '  SW-S1---------S2-S3----------SE  ',
      '                                   ',
      'TODO: add half-wall behind kitchen sink',
      'TODO: add kitchen cupboards, countertops, sink, stove, fridge',
      'TODO: add bathroom cupboard, countertop, sink, toilet, shower',
      'TODO: add laundry room washer & dryer',
      'TODO: add laundry room coat closet walls & door',
      'TODO: add overhead light fixtures'
    ],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/SW' },
        end: { $ref: '#/def/SE' },
        doors: [{
          name: 'patio doors',
          leafCount: { cols: 3 },
          motion: 'sliding',
          outline: { shape: 'rectangle', size: { x: 9, y: 6 + 8 / 12 } },
          /* lites: { cols: 2, rows: 5 }, */
          at: { x: 9 + 8 / 12, from: 'left' },
          casing: { width: 0.5 }
        }],
        windows: [{
          name: 'bedroom windows',
          leafCount: { cols: 2 },
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 5, y: 4 } },
          lites: { cols: 2, rows: 4 },
          at: { x: -6, y: 5, from: 'right' },
          casing: { width: 0.5 }
        }],
        outside: {
          surface: {
            style: 'clapboard',
            material: 'fiber-cement'
          },
          fixtures: [
            { at: { x: +3 + 2 / 12, y: 6, from: 'left' }, copy: { $ref: 'sconce' } },
            { at: { x: 16 + 2 / 12, y: 6, from: 'left' }, copy: { $ref: 'sconce' } }
          ],
          downspouts: [
            { at: { x: +0.25, from: 'left' } },
            { at: { x: -0.25, from: 'right' } }
          ]
        },
        inside: {
          fixtures: [
            { at: { x: 6, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 12, y: 1, from: 'left' }, copy: { $ref: 'light switch' }, n: 2 },
            { at: { x: 14, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 27, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }, {
        name: 'right wall',
        end: { $ref: '#/def/NE' },
        windows: [{
          name: 'bedroom window',
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          lites: { rows:4, cols: 2 },
          at: { x: 2 + 4 / 12, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }],
        inside: {
          fixtures: [
            { at: { x: 11, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 18, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }, {
        name: 'back wall',
        end: { $ref: '#/def/NW' },
        windows: [{
          name: 'bathroom window',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2, y: 3 } },
          lites: { cols: 1, rows: 2 },
          at: { x: 4 + 6 / 12, y: 5 + 6 / 12, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'laundry room window',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2, y: 3 } },
          lites: { cols: 1, rows: 2 },
          at: { x: -2, y: 5 + 6 / 12, from: 'right' },
          casing: { width: 0.5 }
        }],
        outside: {
          downspouts: [
            { at: { x: +0.25, from: 'left' } },
            { at: { x: -0.25, from: 'right' } }
          ]
        },
        inside: {
          fixtures: [
            { at: { x: 10, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 15, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 22, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 23, y: 7, from: 'left' }, copy: { $ref: 'sconce' } }
          ]
        }
      }, {
        name: 'left wall',
        end: { $ref: '#/def/SW' },
        doors: [{
          name: 'side door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 3, y: 6 + 8 / 12 } },
          casing: { width: 0.5 }
        }],
        outside: {
          fixtures: [
            { at: { x: 13 + 6 / 12, y: 6, from: 'left' }, copy: { $ref: 'sconce' } }
          ],
        },
        inside: {
          fixtures: [
            { at: { x: 6, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 8, y: 4, from: 'left' }, copy: { $ref: 'light switch' }, n: 5 },
            { at: { x: 16, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }],
      interior: [{
        name: 'bedroom wall',
        begin: { x: 18 + 10 / 12, y: 21 },
        end: { x: 18 + 10 / 12, y: 0 },
        doors: [{
          name: 'bedroom door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 2 + 8 / 12, y: 6 + 8 / 12 } },
          at: { x: 10 + 10 / 12, from: 'left' },
          casing: { width: 0.5 }
        }],
        outside: {
          fixtures: [
            { at: { x: 3, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 6, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 12, y: 4, from: 'left' }, copy: { $ref: 'light switch' }, n: 3 },
            { at: { x: 15, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        },
        inside: {
          fixtures: [
            { at: { x: 5, y: 1, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 9, y: 4, from: 'left' }, copy: { $ref: 'light switch' } }
          ]
        }
      }, {
        name: 'bathroom wall',
        begin: { x: (19 + 4 / 12), y: (15 + 4 / 12) },
        end: { x: (30 + 4 / 12), y: (15 + 4 / 12) },
        doors: [{
          name: 'bathroom door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 2 + 6 / 12, y: 6 + 8 / 12 } },
          at: { x: 1.5, from: 'left' },
          casing: { width: 0.5 }
        }],
        inside: {
          fixtures: [
            { at: { x: 7.5, y: 4 }, copy: { $ref: 'light switch' }, n: 3 }
          ]
        }
      }, {
        name: 'closet wall',
        begin: { x: (22 + 4 / 12), y: 13 },
        end: { x: (30 + 4 / 12), y: 13 },
        doors: [{
          name: 'closet doors',
          motion: 'sliding',
          leafCount: { cols: 2 },
          outline: { shape: 'rectangle', size: { x: 6, y: 6 + 8 / 12 } },
          casing: { width: 0.5 }
        }]
      }, {
        name: 'wall toward bathroom',
        begin: { x: (22 + 4 / 12), y: (15 + 4 / 12) },
        end: { x: (22 + 4 / 12), y: 13 }
      }, {
        name: 'laundry room wall',
        begin: { x: 0, y: (13 + 4 / 12) },
        end: { x: 10 + 6 / 12, y: (13 + 4 / 12) },
        doors: [{
          name: 'laundry room door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 2 + 6 / 12, y: 6 + 8 / 12 } },
          at: { x: 3, from: 'left' },
          casing: { width: 0.5 }
        }],
        inside: {
          fixtures: [
            { at: { x: 5, y: 4 }, copy: { $ref: 'light switch' } },
            { at: { x: 6, y: 1 }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }, {
        name: 'kitchen/laundry wall',
        begin: { x: 7, y: 21 },
        end: { x: 7, y: (13 + 10 / 12) },
        outside: {
          fixtures: [
            { at: { x: 1, y: 1 }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 2, y: 1 }, copy: { $ref: 'gas outlet' } }
          ]
        }
      }]
    },
    rooms: [{}]
  }, {
    name: 'attic',
    height: 0,
    floors: [{
      outline: { "$ref": "#/def/RECTANGLE" },
      surface: { material: 'wood' }
    }],
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        name: 'front wall (left)',
        begin: { $ref: '#/def/SW' },
        end: { $ref: '#/def/S1' },
        roofline: 'pitched'
      }, {
        name: 'TODO: this is a hack until the roof code is better',
        end: { $ref: '#/def/S1_tweak' },
        roofline: 'pitched'
      }, {
        name: 'front wall (center)',
        end: { $ref: '#/def/S2_tweak' },
        roofline: 'gabled'
      }, {
        name: 'TODO: this is a hack until the roof code is better',
        end: { $ref: '#/def/S2' },
        roofline: 'pitched'
      }, {
        name: 'front wall (right)',
        end: { $ref: '#/def/SE' },
        roofline: 'pitched'
      }, {
        name: 'right wall',
        end: { $ref: '#/def/NE' },
        roofline: 'gabled'
      }, {
        name: 'back wall',
        end: { $ref: '#/def/NW' },
        roofline: 'pitched'
      }, {
        name: 'left wall',
        end: { $ref: '#/def/SW' },
        roofline: 'gabled'
      }]
    }
  }]
}
