export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Longhouse Junction',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  comments: [
    '                                   ',
    '     F-------------------E         ',
    '    /                     \        ',
    '   G                       D       ',
    '   |                       |       ',
    '   |                       |       ',
    '   |                       |       ',
    '   |                       |       ',
    '   |                       |       ',
    '   H                       C       ',
    '    \                     /        ',
    '     A-------------------B         ',
    '                                   '
  ],
  def: {
    /* junction */
    A: { x: 5, y: 0 },
    B: { x: 35, y: 0 },
    C: { x: 40, y: 5 },
    D: { x: 40, y: 35 },
    E: { x: 35, y: 40 },
    F: { x: 5, y: 40 },
    G: { x: 0, y: 35 },
    H: { x: 0, y: 5 },
    LONGHOUSE_WINDOWS: {
      repeat: {
        spacing: 5,
        feature: {
          motion: 'awning',
          outline: { shape: 'rectangle', size: { x: 4, y: 7 } },
          at: { x: 0, y: 7, from: 'center'}
        }
      }
    },
    LONGHOUSE_END_OPENING: {
      motion: 'awning',
      outline: { shape: 'rectangle', size: { x: 29, y: 11.25 } },
      at: { x: 0, from: 'center'}
    },
    CORNER_WINDOW: {
      motion: 'open',
      outline: { shape: 'rectangle', size: { x: 5, y: 8 } },
      at: { x: 0, y: 8, from: 'center'}
    },
    BOULEVARD_END_OPENING: {
      motion: 'awning',
      outline: { shape: 'rectangle', size: { x: 29, y: 15 } },
      at: { x: 0, from: 'center'}
    }
  },
  storeys: [{
    name: 'ground floor (east-west)',
    repeat: 1,
    height: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/E' },
          { $ref: '#/def/F' },
          { $ref: '#/def/G' },
          { $ref: '#/def/H' },
          { $ref: '#/def/A' }
        ]
      }
    }],
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
      }
    ]}
  }, {
    name: 'lower boulevard',
    height: 15,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/E' },
          { $ref: '#/def/F' },
          { $ref: '#/def/G' },
          { $ref: '#/def/H' },
          { $ref: '#/def/A' }
        ]
      }
    }],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/C' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }, {
        end: { $ref: '#/def/D' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/E' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }, {
        end: { $ref: '#/def/F' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/G' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }, {
        end: { $ref: '#/def/H' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/A' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }
    ]}
  }, {
    name: 'upper boulevard',
    height: 15,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/E' },
          { $ref: '#/def/F' },
          { $ref: '#/def/G' },
          { $ref: '#/def/H' },
          { $ref: '#/def/A' }
        ]
      }
    }],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/C' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }, {
        end: { $ref: '#/def/D' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/E' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }, {
        end: { $ref: '#/def/F' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/G' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }, {
        end: { $ref: '#/def/H' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/A' },
        windows: [{ $ref: '#/def/CORNER_WINDOW' }]
      }
    ]},
    roof: {
      form: 'living',
      parapetHeight: 4
    }
  }, {
    name: 'roof parapet',
    altitude: 41.5,
    height: 4,
    walls: {
      exterior: [{
        begin: { $ref: '#/def/B' },
        end: { $ref: '#/def/C' }
      }, {
        begin: { $ref: '#/def/D' },
        end: { $ref: '#/def/E' }
      }, {
        begin: { $ref: '#/def/F' },
        end: { $ref: '#/def/G' }
      }, {
        begin: { $ref: '#/def/H' },
        end: { $ref: '#/def/A' }
      }]
    }
  }]
}