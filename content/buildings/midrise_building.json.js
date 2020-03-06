export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Midrise building',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  comments: [
    '                                     ',
    '                                     ',
    '          F---------E                ',
    '         /           \               ',
    '        G             D              ',
    '        |             |              ',
    '        |             |              ',
    '        |             |              ',
    '        H             C              ',
    '         \           /               ',
    '          A---------B                ',
    '                                     ',
    '                                     '
  ],
  anchorPoint: { x: 0, y: 0, z: 0 },
  def: {
    A: { x: -15, y: -21 },
    B: { x: +15, y: -21 },
    C: { x: +21, y: -15 },
    D: { x: +21, y: +15 },
    E: { x: +15, y: +21 },
    F: { x: -15, y: +21 },
    G: { x: -21, y: +15 },
    H: { x: -21, y: -15 },
    /* cupola */
    a: { x: -2, y: -2 },
    b: { x: +2, y: -2 },
    c: { x: +2, y: +2 },
    d: { x: -2, y: +2 },
    OCTAGON: {
      shape: 'polygon',
      corners: [
        { "$ref": "#/def/A" },
        { "$ref": "#/def/B" },
        { "$ref": "#/def/C" },
        { "$ref": "#/def/D" },
        { "$ref": "#/def/E" },
        { "$ref": "#/def/F" },
        { "$ref": "#/def/G" },
        { "$ref": "#/def/H" }
      ]
    },
    WINDOWS: {
      repeat: {
        spacing: 3,
        feature: {
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: 0, y: 5.5, from: 'center'}
        }
      }
    },
  },
  storeys: [{
    name: 'bottom five storeys',
    repeat: 5,
    height: 10,
    floors: [{
      outline: { "$ref": "#/def/OCTAGON" },
      surface: { material: 'concrete' }
    }],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/C' },
        doors: [{
          name: 'left door',
          motion: 'swinging',
          outline: { shape: 'rectangle', size: { x: 3, y: 6 + 8 / 12 } },
          at: { x: -1.75, from: 'center' },
          casing: { width: 0.5 }
        }, {
          name: 'right door',
          motion: 'swinging',
          outline: { shape: 'rectangle', size: { x: 3, y: 6 + 8 / 12 } },
          at: { x: +1.75, from: 'center' },
          casing: { width: 0.5 }
        }],
      }, {
        end: { $ref: '#/def/D' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/E' }
      }, {
        end: { $ref: '#/def/F' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/G' },
      }, {
        end: { $ref: '#/def/H' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/A' },
      }]
    }
  }, {
    name: 'living roof',
    height: 0,
    // height: 1,
    // floors: [{
    //   outline: { "$ref": "#/def/OCTAGON" },
    //   surface: { material: 'concrete' }
    // }],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' }
      }, {
        end: { $ref: '#/def/C' }
      }, {
        end: { $ref: '#/def/D' }
      }, {
        end: { $ref: '#/def/E' }
      }, {
        end: { $ref: '#/def/F' }
      }, {
        end: { $ref: '#/def/G' }
      }, {
        end: { $ref: '#/def/H' }
      }, {
        end: { $ref: '#/def/A' }
      }]
    },
    roof: {
      form: 'living',
      parapetHeight: 4
    }
  }, {
    name: 'roof parapet',
    altitude: 54,
    height: 4,
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' }
      }, {
        end: { $ref: '#/def/C' }
      }, {
        end: { $ref: '#/def/D' }
      }, {
        end: { $ref: '#/def/E' }
      }, {
        end: { $ref: '#/def/F' }
      }, {
        end: { $ref: '#/def/G' }
      }, {
        end: { $ref: '#/def/H' }
      }, {
        end: { $ref: '#/def/A' }
      }]
    }
  }]
}
