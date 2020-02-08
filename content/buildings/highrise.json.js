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
  anchorPoint: { x: 50, y: 50, z: 0 },
  def: {
    SW: { x: 0, y: 0 },
    SE: { x: 100, y: 0 },
    NE: { x: 100, y: 100 },
    NW: { x: 0, y: 100 },
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
      leafCount: { cols: 24 },
      motion: 'picture',
      outline: { shape: 'rectangle', size: { x: 96, y: 6 } },
      at: { x: 0, y: 6, from: 'center'}
    }
  },
  storeys: [{
    comments: [
      'TODO: This building definition always has windows on three sides (front,',
      'left, right). If this building is in a row of identical buildings',
      'that are directly adjacent to each other, then the windows in front',
      'are fine, but the side windows will be abutting the neighboring',
      'windows. It would be good to have a way to only include the windows',
      'on the walls that are unobstructured, which may vary by floor,',
      'and by whether this building is on a corner parcel.'
    ],
    repeat: 16, /* { type: 'randomInt', min: 4, max: 60 }, */
    height: 12, /* { type: 'randomInt', min: 9, max: 14 }, */
    floors: [{
      outline: { "$ref": "#/def/RECTANGLE" },
      surface: { material: 'concrete' }
    }],
    ceiling: {},
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/SW' },
        end: { $ref: '#/def/SE' },
        doors: [],
        windows: [{ $ref: '#/def/WINDOWS' }],
        outside: {
          surface: {
            style: 'clapboard',
            material: 'fiber-cement'
          },
          fixtures: []
        }
      }, {
        name: 'right wall',
        end: { $ref: '#/def/NE' },
        doors: [],
        windows: [{ $ref: '#/def/WINDOWS' }],
        outside: {
          fixtures: []
        }
      }, {
        name: 'back wall',
        end: { $ref: '#/def/NW' },
        outside: {}
      }, {
        name: 'left wall',
        end: { $ref: '#/def/SW' },
        doors: [],
        windows: [{ $ref: '#/def/WINDOWS' }],
        outside: {
          fixtures: []
        }
      }]
    },
    rooms: [{
      comments: [
        'TODO: Right now the entire storey only has a single big empty room,',
        'which will get tallied as 2,400 square feet of 100% "Assignable area".',
        'We should instead be dividing the storey into a number of rooms,',
        'so that ab out two-thirds of the space is "Assignable area", and the rest is',
        'a mix of "Circulation area", "Building service area", and "Mechanical area".'
      ],
      outline: {
        shape: 'rectangle',
        size: { x: 99, y: 99 }
      },
      use: 'assignable',
      contents: [{
        copy: { $ref: 'CITY.fixtures.desk' },
        at: { x: 17, y: 10 }
      }]
    }]
  }, {
    name: 'attic',
    height: 0,
    roof: {
      form: 'flat',
      outline: { "$ref": "#/def/RECTANGLE" }
    }
  }]

}
