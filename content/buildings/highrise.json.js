export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Highrise building',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 25, y: 25, z: 0 },
  def: {
    SW: { x: 0, y: 0 },
    SE: { x: 50, y: 0 },
    NE: { x: 50, y: 50 },
    NW: { x: 0, y: 50 },
    RECTANGLE: {
      shape: 'polygon',
      corners: [
        { "$ref": "#/def/SW" },
        { "$ref": "#/def/SE" },
        { "$ref": "#/def/NE" },
        { "$ref": "#/def/NW" }
      ]
    },
    WINDOWS: {
      leafCount: { cols: 9 },
      motion: 'picture',
      outline: { shape: 'rectangle', size: { x: 45, y: 6 } },
      center: { x: 0, y: 6 }
    }
  },
  storeys: [{
    height: { type: 'randomInt', min: 9, max: 14 },
    floor: {
      outline: { "$ref": "#/def/RECTANGLE" },
      surface: { material: 'concrete' }
    },
    ceiling: {},
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/SW' },
        end: { $ref: '#/def/SE' },
        outside: {
          surface: {
            style: 'clapboard',
            material: 'fiber-cement'
          },
          fixtures: [],
          doors: [],
          windows: [{ $ref: '#/def/WINDOWS' }]
        }
      }, {
        name: 'right wall',
        end: { $ref: '#/def/NE' },
        outside: {
          doors: [],
          fixtures: [],
          windows: [{ $ref: '#/def/WINDOWS' }]
        }
      }, {
        name: 'back wall',
        end: { $ref: '#/def/NW' },
        outside: {}
      }, {
        name: 'left wall',
        end: { $ref: '#/def/SW' },
        outside: {
          doors: [],
          fixtures: [],
          windows: [{ $ref: '#/def/WINDOWS' }]
        }
      }]
    },
    rooms: [{
      outline: {
        shape: 'rectangle',
        size: { x: 49, y: 49 }
      },
      use: 'assignable',
      contents: [{
        copy: { $ref: 'CITY.fixtures.desk' },
        at: { x: 17, y: 10 }
      }]
    }]
  }, {
    repeat: { type: 'randomInt', min: 4, max: 60 }
  }, {
    name: 'attic',
    height: 0,
    roof: {
      form: 'flat'
    }
  }]

}
