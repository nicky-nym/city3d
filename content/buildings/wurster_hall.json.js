export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Wurster Hall',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  comments: [
    '                                                              ',
    '           O----------N                                       ',
    '           |          |                                       ',
    '           |          |                                       ',
    '  R------Q-P- - - - - ML                    H--------------G  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      |             |                    |              |  ',
    '  |      V-W - - - -Z--K                    |              |  ',
    '  |        |        |  J--------------------I              |  ',
    '  |        |        |                       |              |  ',
    '  |        X--------Y                       |              |  ',
    '  |                                         |              |  ',
    '  |                    B----C               |              |  ',
    '  |                    A -- D---------------E--------------F  ',
    '  |                    |                                      ',
    '  |                    U                                      ',
    '  |                    |                                      ',
    '  S--------------------T                                      ',
    '                                                              ',
  ],
  unit: 'feet',
  anchorPoint: { x: 153, y: 110, z: 0 },
  def: {
    A: { x: 110, y: 55 },
    B: { x: 110, y: 65 },
    C: { x: 140, y: 65 },
    D: { x: 140, y: 55 },
    E: { x: 223, y: 55 },
    F: { x: 306, y: 55 },
    G: { x: 306, y: 220 },
    H: { x: 223, y: 220 },
    I: { x: 223, y: 108 },
    J: { x: 110, y: 108 },
    K: { x: 110, y: 110 },
    L: { x: 110, y: 220 },
    M: { x: 105, y: 220 },
    N: { x: 105, y: 250 },
    O: { x: 50, y: 250 },
    P: { x: 50, y: 220 },
    Q: { x: 40, y: 220 },
    R: { x: 0, y: 220 },
    S: { x: 0, y: 0 },
    T: { x: 110, y: 0 },
    U: { x: 110, y: 27.5 },
    V: { x: 40, y: 110 },
    W: { x: 50, y: 110 },
    X: { x: 50, y: 80 },
    Y: { x: 95, y: 80 },
    Z: { x: 95, y: 110 },

    LEVEL1: { // see alternative syntax ideas below...
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
        { $ref: '#/def/I' },
        { $ref: '#/def/J' },
        { $ref: '#/def/K' },
        { $ref: '#/def/L' },
        { $ref: '#/def/M' },
        { $ref: '#/def/N' },
        { $ref: '#/def/O' },
        { $ref: '#/def/P' },
        { $ref: '#/def/Q' },
        { $ref: '#/def/R' },
        { $ref: '#/def/S' },
        { $ref: '#/def/T' },
        { $ref: '#/def/U' }
      ]
    },
    // Concise syntax (brainstorming about alternatives)
    LEVEL1_OPTION_A: {
      shape: 'polygon',
      corners: { '[$ref]': '#/def/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_B: {
      shape: 'polygon',
      corners: { '$ref[]': '#/def/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_C: {
      shape: 'polygon',
      corners: { $refs: '#/def/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_D: {
      shape: 'polygon',
      corners: { $ref: '#/def/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVELS2AND3: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/A' },
        { $ref: '#/def/D' },
        { $ref: '#/def/E' },
        { $ref: '#/def/F' },
        { $ref: '#/def/G' },
        { $ref: '#/def/H' },
        { $ref: '#/def/I' },
        { $ref: '#/def/J' },
        { $ref: '#/def/K' },
        { $ref: '#/def/L' },
        { $ref: '#/def/M' },
        { $ref: '#/def/N' },
        { $ref: '#/def/O' },
        { $ref: '#/def/P' },
        { $ref: '#/def/Q' },
        { $ref: '#/def/R' },
        { $ref: '#/def/S' },
        { $ref: '#/def/T' },
        { $ref: '#/def/U' }
      ]
    },
    LEVEL4A: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/E' },
        { $ref: '#/def/F' },
        { $ref: '#/def/G' },
        { $ref: '#/def/H' },
        { $ref: '#/def/I' }
      ]
    },
    LEVELS4TO9: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/K' },
        { $ref: '#/def/L' },
        { $ref: '#/def/M' },
        { $ref: '#/def/N' },
        { $ref: '#/def/O' },
        { $ref: '#/def/P' },
        { $ref: '#/def/Q' },
        { $ref: '#/def/U' },
        { $ref: '#/def/V' },
        { $ref: '#/def/W' },
        { $ref: '#/def/X' },
        { $ref: '#/def/Y' }
      ]
    },
    LEVEL10EAST: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/M' },
        { $ref: '#/def/N' },
        { $ref: '#/def/O' },
        { $ref: '#/def/P' }
      ]
    },
    LEVEL10WEST: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/W' },
        { $ref: '#/def/X' },
        { $ref: '#/def/Y' },
        { $ref: '#/def/V' }
      ]
    },
    WINDOWS: {
      repeat: {
        spacing: 9 + 2 / 12,
        feature: {
          motion: 'awning',
          outline: { shape: 'rectangle', size: { x: 8, y: 9 } },
          awning: { size: { x: 8, y: 5, z: 0 } }
        }
      }
    }
  },
  storeys: [{
    name: 'ground floor',
    repeat: 1,
    height: 13,
    floors: [{ outline: { $ref: '#/def/LEVEL1' } }],
    walls: {
      exterior: [
        /* TODO: add doors on most of these walls */
        /* TODO: add windows on many of these walls */
        { begin: { $ref: '#/def/A' }, end: { $ref: '#/def/B' } },
        { end: { $ref: '#/def/C' } },
        { end: { $ref: '#/def/D' } },
        { end: { $ref: '#/def/E' } },
        { end: { $ref: '#/def/F' } },
        { end: { $ref: '#/def/G' } },
        { end: { $ref: '#/def/H' } },
        { end: { $ref: '#/def/I' } },
        { end: { $ref: '#/def/J' } },
        { end: { $ref: '#/def/K' } },
        { end: { $ref: '#/def/L' } },
        { end: { $ref: '#/def/M' } },
        { end: { $ref: '#/def/N' } },
        { end: { $ref: '#/def/O' } },
        { end: { $ref: '#/def/P' } },
        { end: { $ref: '#/def/Q' } },
        { end: { $ref: '#/def/R' } },
        { end: { $ref: '#/def/S' } },
        { end: { $ref: '#/def/T' } },
        { end: { $ref: '#/def/U' } },
        { end: { $ref: '#/def/A' } }
      ]
    }
  }, {
    name: 'floors 2 and 3',
    repeat: 2,
    height: 13,
    floors: [{ outline: { $ref: '#/def/LEVELS2AND3' } }],
    walls: {
      /* TODO: add windows on almost all of these walls */
      exterior: [{
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/D' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/E' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/F' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/G' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/H' }
      }, {
        end: { $ref: '#/def/I' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/J' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/K' }
      }, {
        end: { $ref: '#/def/L' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/M' },
      }, {
        end: { $ref: '#/def/N' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/O' },
        windows: [ /* TODO: add large window */ ]
      }, {
        end: { $ref: '#/def/P' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/Q' }
      }, {
        end: { $ref: '#/def/R' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/S' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/T' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/U' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/A' }
      }]
    }
  }, {
    name: 'floor 4',
    repeat: 1,
    height: 13,
    floors: [
      { outline: { $ref: '#/def/LEVEL4A' } },
      { outline: { $ref: '#/def/LEVELS4TO9' } }
    ],
    walls: {
      exterior: [{
          begin: { $ref: '#/def/E' },
          end: { $ref: '#/def/F' },
          windows: [{ $ref: '#/def/WINDOWS' }]
        }, {
          end: { $ref: '#/def/G' },
          windows: [{ $ref: '#/def/WINDOWS' }]
        }, {
          end: { $ref: '#/def/H' }
        }, {
          end: { $ref: '#/def/E' },
          windows: [{ $ref: '#/def/WINDOWS' }]
        },

        /* TODO: this has all the same windows as the tower 
         * floors, 5 to 9. Need to figure out how to avoid 
         * repeating the same info here.
         */
        { begin: { $ref: '#/def/K' }, end: { $ref: '#/def/L' } },
        { end: { $ref: '#/def/M' } },
        { end: { $ref: '#/def/N' } },
        { end: { $ref: '#/def/O' } },
        { end: { $ref: '#/def/P' } },
        { end: { $ref: '#/def/Q' } },
        { end: { $ref: '#/def/U' } },
        { end: { $ref: '#/def/V' } },
        { end: { $ref: '#/def/W' } },
        { end: { $ref: '#/def/X' } },
        { end: { $ref: '#/def/Y' } },
        { end: { $ref: '#/def/K' } }
      ]
    }
  }, {
    name: 'tower floors, 5 to 9',
    repeat: { count: 5 },
    height: 13,
    floors: [
      { outline: { $ref: '#/def/LEVELS4TO9' } }
    ],
    walls: {
      exterior: [{
        begin: { $ref: '#/def/K' },
        end: { $ref: '#/def/L' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/M' }
      }, {
        end: { $ref: '#/def/N' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/O' },
        windows: [ /* TODO: add long row of windows */ ]
      }, {
        end: { $ref: '#/def/P' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/Q' }
      }, {
        end: { $ref: '#/def/U' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/V' }
      }, {
        end: { $ref: '#/def/W' },
        windows: [
          /* TODO: add small bathroom window */
          /* TODO: add wide stairway window */
        ]
    }, {
        end: { $ref: '#/def/X' },
        windows: [ /* TODO: add narrow stairway window */ ],
        doors: [ /* TODO: add sliding glass balony door */ ]
    }, {
        end: { $ref: '#/def/Y' },
        windows: [ /* TODO: add office window */ ]
      }, {
        end: { $ref: '#/def/K' },
        windows: [ /* TODO: add single window */ ]
      }]
    }
  }, {
    name: 'floor 10',
    comments: [
      'TODO: ... '
    ],
    height: 13,
    roof: {
      form: 'flat',
      parapetHeight: 4,
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/K' },
          { $ref: '#/def/L' },
          { $ref: '#/def/Q' },
          { $ref: '#/def/U' }
        ]
      }
    },
    floors: [
      { outline: { $ref: '#/def/LEVEL10EAST' } },
      /* TODO: add west balcony */
      { outline: { $ref: '#/def/LEVEL10WEST' } }
    ],
    walls: {
      exterior: [{ 
        begin: { $ref: '#/def/V' },
        end: { $ref: '#/def/W' }
        /* TODO: add stairwell window */
      }, {
        end: { $ref: '#/def/X' }
        /* TODO: add narrow stair window */
        /* TODO: add balcony door */
      }, {
        end: { $ref: '#/def/Y' }
      }, {
        end: { $ref: '#/def/V' }
      }, {
        begin: { $ref: '#/def/M' },
        /* TODO: on the 10th floor, this wall should be a couple dozen feet further north */
        end: { $ref: '#/def/N' }
      }, {
        end: { $ref: '#/def/O' }
        /* TODO: add wide window door */
      }, { 
        end: { $ref: '#/def/P' }
      }, { 
        end: { $ref: '#/def/M' }
      }]
    }
  }]

}
