export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Garage',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 12, y: 10.5, z: 0 },
  def: {
    SW: { x: 0, y: 0 },
    S1: { x: 2, y: 0 },
    S2: { x: 22, y: 0 },
    SE: { x: 24, y: 0 },
    NE: { x: 24, y: 21 },
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
      surface: { material: 'concrete' }
    }],
    ceiling: {
      fixtures: [
        { at: { x: 0, y: -2, from: 'center' }, copy: { $ref: 'power outlet, duplex' } },
        { at: { x: -6, y: 3, from: 'center' }, copy: { $ref: 'light fixture' } }, // TODO: 6'x6" fluorescent
        { at: { x: 0, y: 3, from: 'center' }, copy: { $ref: 'light fixture' } }, // TODO: 6'x6" fluorescent
        { at: { x: +6, y: 3, from: 'center' }, copy: { $ref: 'light fixture' } } // TODO: 6'x6" fluorescent
      ]
    },
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/SW' },
        end: { $ref: '#/def/SE' },
        doors: [{
          name: 'garage door',
          leafCount: { rows: 5 },
          motion: 'overhead',
          outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
          casing: { width: 0.5 }
        }],
        outside: {
          surface: {
            style: 'clapboard',
            material: 'fiber-cement'
          },
          fixtures: [
            { at: { x: +2, y: 6, from: 'left' }, copy: { $ref: 'sconce' } },
            { at: { x: -2, y: 6, from: 'right' }, copy: { $ref: 'sconce' } }
          ],
          downspouts: [
            { at: { x: +0.25, from: 'left' } },
            { at: { x: -0.25, from: 'right' } }
          ]
        },
        inside: {
          surface: {
            style: 'flat',
            material: 'drywall'
          }
        }
      }, {
        name: 'right wall',
        end: { $ref: '#/def/NE' },
        doors: [{
          name: 'side door',
          motion: 'swinging',
          handleSide: 'left',
          outline: { shape: 'rectangle', size: { x: 3, y: 6 + 8 / 12 } },
          casing: { width: 0.5 }
        }],
        outside: {
          fixtures: [
            { at: { x: 8, y: 6, from: 'left' }, copy: { $ref: 'sconce' } }
          ]
        },
        inside: {
          fixtures: [
            { at: { x: +5, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: 13, y: 4, from: 'left' }, copy: { $ref: 'light switch', n: 2 } }, // TODO: controls what?
            { at: { x: -5, y: 4, from: 'right' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }, {
        name: 'back wall',
        end: { $ref: '#/def/NW' },
        outside: {
          downspouts: [
            { at: { x: +0.25, from: 'left' } },
            { at: { x: -0.25, from: 'right' } }
          ]
        },
        inside: {
          fixtures: [
            { at: { x: +6, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: -6, y: 4, from: 'right' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }, {
        name: 'left wall',
        end: { $ref: '#/def/SW' },
        inside: {
          fixtures: [
            { at: { x: +1, y: 4, from: 'left' }, copy: { $ref: 'light switch' } }, // TODO: controls what?
            { at: { x: +5, y: 4, from: 'left' }, copy: { $ref: 'power outlet, duplex' } },
            { at: { x: -5, y: 4, from: 'right' }, copy: { $ref: 'power outlet, duplex' } }
          ]
        }
      }]
    },
    rooms: [{
      outline: {
        shape: 'rectangle',
        size: { x: 23, y: 20 }
      },
      use: 'circulation',
      contents: [{
        copy: { $ref: 'CITY.vehicle.car' },
        at: { x: 17, y: 10, from: 'center' }
      }]
    }]
  }, {
    name: 'attic',
    height: 2 / 12,
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
        name: 'front wall (center)',
        end: { $ref: '#/def/S2' },
        roofline: 'gabled'
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
