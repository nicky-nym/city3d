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
  unit: 'feet',
  anchorPoint: { x: 153, y: 110, z: 0 },
  def: {
    comments: [
      '                                                              ',
      '           O----------N                                       ',
      '           |          |                                       ',
      '           |          |                       ++   +----+     ',
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
    ext: {
      /* endpoints for exterior walls */
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
    },

    LEVEL1: { // see alternative syntax ideas below...
      shape: 'polygon',
      corners: [
        { $ref: '#/def/ext/A' },
        { $ref: '#/def/ext/B' },
        { $ref: '#/def/ext/C' },
        { $ref: '#/def/ext/D' },
        { $ref: '#/def/ext/E' },
        { $ref: '#/def/ext/F' },
        { $ref: '#/def/ext/G' },
        { $ref: '#/def/ext/H' },
        { $ref: '#/def/ext/I' },
        { $ref: '#/def/ext/J' },
        { $ref: '#/def/ext/K' },
        { $ref: '#/def/ext/L' },
        { $ref: '#/def/ext/M' },
        { $ref: '#/def/ext/N' },
        { $ref: '#/def/ext/O' },
        { $ref: '#/def/ext/P' },
        { $ref: '#/def/ext/Q' },
        { $ref: '#/def/ext/R' },
        { $ref: '#/def/ext/S' },
        { $ref: '#/def/ext/T' },
        { $ref: '#/def/ext/U' }
      ]
    },
    // Concise syntax alternatives (brainstorming about options)
    /*
    LEVEL1_OPTION_A: {
      shape: 'polygon',
      corners: { '[$ref]': '#/def/ext/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_B: {
      shape: 'polygon',
      corners: { '$ref[]': '#/def/ext/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_C: {
      shape: 'polygon',
      corners: { $refs: '#/def/ext/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_D: {
      shape: 'polygon',
      corners: { $ref: '#/def/ext/[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]' }
    },
    LEVEL1_OPTION_E: {
      shape: 'polygon',
      corners: ['$A', '$B', '$C', '$D', '$E', '$F', '$G', '$H', '$I', '$J', '$K', '$L', '$M', '$N', '$O', '$P', '$Q', '$R', '$S', '$T', '$U']
    },
    LEVEL1_OPTION_F: {
      shape: 'polygon',
      corners: '$[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]'
    },
    */
    LEVELS2AND3: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/ext/A' },
        { $ref: '#/def/ext/D' },
        { $ref: '#/def/ext/E' },
        { $ref: '#/def/ext/F' },
        { $ref: '#/def/ext/G' },
        { $ref: '#/def/ext/H' },
        { $ref: '#/def/ext/I' },
        { $ref: '#/def/ext/J' },
        { $ref: '#/def/ext/K' },
        { $ref: '#/def/ext/L' },
        { $ref: '#/def/ext/M' },
        { $ref: '#/def/ext/N' },
        { $ref: '#/def/ext/O' },
        { $ref: '#/def/ext/P' },
        { $ref: '#/def/ext/Q' },
        { $ref: '#/def/ext/R' },
        { $ref: '#/def/ext/S' },
        { $ref: '#/def/ext/T' },
        { $ref: '#/def/ext/U' }
      ]
    },
    LEVEL4A: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/ext/E' },
        { $ref: '#/def/ext/F' },
        { $ref: '#/def/ext/G' },
        { $ref: '#/def/ext/H' },
        { $ref: '#/def/ext/I' }
      ]
    },
    LEVELS4TO9: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/ext/K' },
        { $ref: '#/def/ext/L' },
        { $ref: '#/def/ext/M' },
        { $ref: '#/def/ext/N' },
        { $ref: '#/def/ext/O' },
        { $ref: '#/def/ext/P' },
        { $ref: '#/def/ext/Q' },
        { $ref: '#/def/ext/U' },
        { $ref: '#/def/ext/V' },
        { $ref: '#/def/ext/W' },
        { $ref: '#/def/ext/X' },
        { $ref: '#/def/ext/Y' }
      ]
    },
    LEVEL10EAST: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/ext/M' },
        { $ref: '#/def/ext/N' },
        { $ref: '#/def/ext/O' },
        { $ref: '#/def/ext/P' }
      ]
    },
    LEVEL10WEST: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/ext/W' },
        { $ref: '#/def/ext/X' },
        { $ref: '#/def/ext/Y' },
        { $ref: '#/def/ext/V' }
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
    },
    comments: [
      '                                                              ',
      '           O----------N                                       ',
      '           f   g h    |                                       ',
      '           e   d i    |                       ++   +----+     ',
      '  R------Q-P- -c-j- - ML                    H-------p-q----G  ',
      '  |      |             |                    |              |  ',
      '  |      |             |                    |    n  o      |  ',
      '  |      |             |                    |    m  l      |  ',
      '  |      |             |                    |              |  ',
      '  |      |             |                    |              |  ',
      '  |      |             |                    |    j  k      |  ',
      '  |      |             |                    |    i  h      |  ',
      '  |      |   t-b       |                    |              |  ',
      '  |      V-W-s-a k -Z--K                    |              |  ',
      '  |        | | | l  u  J--------------------I  v w  g r s  |  ',
      '  |        r-q-p m  v                       |    x yf      |  ',
      '  |        X---o-n--Y                       a  b c de      |  ',
      '  |                                         u           t  |  ',
      '  |                    B----C               |              |  ',
      '  |                    A -- D---------------E--------------F  ',
      '  |                    |                                      ',
      '  |                    U                                      ',
      '  |                    |                                      ',
      '  S--------------------T                                      ',
      '                                                              ',
    ],
    p1: {
      /* endpoints for interior walls in the north tower */
      a: { x: 70, y: 110 },
      b: { x: 70, y: 118 },
      c: { x: 70, y: 220 },
      d: { x: 70, y: 230 },
      e: { x: 50, y: 230 },
      f: { x: 50, y: 236 },
      g: { x: 70, y: 236 },
      h: { x: 84, y: 236 },
      i: { x: 84, y: 230 },
      j: { x: 84, y: 220 },
      k: { x: 84, y: 110 },
      l: { x: 84, y: 102 },
      m: { x: 84, y: 94 },
      n: { x: 84, y: 80 },
      o: { x: 70, y: 80 },
      p: { x: 70, y: 90 },
      q: { x: 60, y: 90 },
      r: { x: 50, y: 90 },
      s: { x: 60, y: 110 },
      t: { x: 60, y: 118 },
      u: { x: 95, y: 102 },
      v: { x: 95, y: 94 }
    },
    p2: {
      /* endpoints for interior walls in the south wing */
      /* TODO: */
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
        { begin: { $ref: '#/def/ext/A' }, end: { $ref: '#/def/ext/B' } },
        { end: { $ref: '#/def/ext/C' } },
        { end: { $ref: '#/def/ext/D' } },
        { end: { $ref: '#/def/ext/E' } },
        { end: { $ref: '#/def/ext/F' } },
        { end: { $ref: '#/def/ext/G' } },
        { end: { $ref: '#/def/ext/H' } },
        { end: { $ref: '#/def/ext/I' } },
        { end: { $ref: '#/def/ext/J' } },
        { end: { $ref: '#/def/ext/K' } },
        { end: { $ref: '#/def/ext/L' } },
        { end: { $ref: '#/def/ext/M' } },
        { end: { $ref: '#/def/ext/N' } },
        { end: { $ref: '#/def/ext/O' } },
        { end: { $ref: '#/def/ext/P' } },
        { end: { $ref: '#/def/ext/Q' } },
        { end: { $ref: '#/def/ext/R' } },
        { end: { $ref: '#/def/ext/S' } },
        { end: { $ref: '#/def/ext/T' } },
        { end: { $ref: '#/def/ext/U' } },
        { end: { $ref: '#/def/ext/A' } }
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
        begin: { $ref: '#/def/ext/A' },
        end: { $ref: '#/def/ext/D' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/E' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/F' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/G' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/H' }
      }, {
        end: { $ref: '#/def/ext/I' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/J' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/K' }
      }, {
        end: { $ref: '#/def/ext/L' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/M' },
      }, {
        end: { $ref: '#/def/ext/N' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/ext/O' },
        windows: [ /* TODO: add large window */ ]
      }, {
        end: { $ref: '#/def/ext/P' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/ext/Q' }
      }, {
        end: { $ref: '#/def/ext/R' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/S' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/T' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/U' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/A' }
      }]
    }
  }, {
    name: 'floor 4, south wing',
    repeat: 1,
    altitude: 3 * 13,
    height: 13,
    floors: [
      { outline: { $ref: '#/def/LEVEL4A' } }
    ],
    walls: {
      exterior: [{
        begin: { $ref: '#/def/ext/E' },
        end: { $ref: '#/def/ext/F' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/G' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/H' }
      }, {
        end: { $ref: '#/def/ext/E' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }]
    }
  }, {
    name: 'floor 4, roof of center span',
    altitude: 3 * 13,
    height: 0,
    roof: {
      form: 'flat',
      parapetHeight: 4,
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/ext/A' },
          { $ref: '#/def/ext/E' },
          { $ref: '#/def/ext/I' },
          { $ref: '#/def/ext/J' }
        ]
      }
    }
  }, {
    name: 'floor 4, roof of north wing',
    altitude: 3 * 13,
    height: 0,
    roof: {
      form: 'flat',
      parapetHeight: 4,
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/ext/K' },
          { $ref: '#/def/ext/T' },
          { $ref: '#/def/ext/S' },
          { $ref: '#/def/ext/R' },
          { $ref: '#/def/ext/Q' },
          { $ref: '#/def/ext/V' },
          { $ref: '#/def/ext/W' },
          { $ref: '#/def/ext/X' },
          { $ref: '#/def/ext/Y' },
          { $ref: '#/def/ext/Z' }
        ]
      }
    }
  }, {
    name: 'tower floors, 4 to 9',
    repeat: { count: 6 },
    altitude: 3 * 13,
    height: 13,
    floors: [
      { outline: { $ref: '#/def/LEVELS4TO9' } }
    ],
    rooms: [{
      name: 'elevators',
      use: 'circulation',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/a' },
          { $ref: '#/def/p1/p' },
          { $ref: '#/def/p1/q' },
          { $ref: '#/def/p1/s' }
        ]
      }
    }, {
      name: 'west stairs',
      use: 'circulation',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/r' },
          { $ref: '#/def/p1/p' },
          { $ref: '#/def/p1/o' },
          { $ref: '#/def/ext/X' }
        ]
      }
    }, {
      name: 'bathroom',
      use: 'building service',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/s' },
          { $ref: '#/def/p1/q' },
          { $ref: '#/def/p1/r' },
          { $ref: '#/def/ext/W' }
        ]
      }
    }, {
      name: 'corridor',
      use: 'circulation',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/o' },
          { $ref: '#/def/p1/p' },
          { $ref: '#/def/p1/a' },
          { $ref: '#/def/p1/b' },
          { $ref: '#/def/p1/c' },
          { $ref: '#/def/p1/d' },
          { $ref: '#/def/p1/e' },
          { $ref: '#/def/p1/f' },
          { $ref: '#/def/p1/g' },
          { $ref: '#/def/p1/h' },
          { $ref: '#/def/p1/i' },
          { $ref: '#/def/p1/j' },
          { $ref: '#/def/p1/k' },
          { $ref: '#/def/p1/l' },
          { $ref: '#/def/p1/m' },
          { $ref: '#/def/p1/n' }
        ]
      }
    }, {
      name: 'vertical shaft',
      use: 'mechanical',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/u' },
          { $ref: '#/def/p1/l' },
          { $ref: '#/def/p1/k' },
          { $ref: '#/def/ext/Z' }
        ]
      }
    }, {
      name: 'janitor closet',
      use: 'building service',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/u' },
          { $ref: '#/def/p1/v' },
          { $ref: '#/def/p1/m' },
          { $ref: '#/def/p1/l' }
        ]
      }
    }, {
      name: 'electrical closet',
      use: 'mechanical',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/a' },
          { $ref: '#/def/p1/b' },
          { $ref: '#/def/p1/t' },
          { $ref: '#/def/p1/s' }
        ]
      }
    }, {
      name: 'east stairs',
      use: 'circulation',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/e' },
          { $ref: '#/def/p1/d' },
          { $ref: '#/def/p1/c' },
          { $ref: '#/def/ext/P' }
        ]
      }
    }, {
      name: 'north studio',
      use: 'assignable',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/b' },
          { $ref: '#/def/p1/t' },
          { $ref: '#/def/p1/s' },
          { $ref: '#/def/ext/V' },
          { $ref: '#/def/ext/Q' },
          { $ref: '#/def/p1/c' }
        ]
      }
    }, {
      name: 'south studio',
      use: 'assignable',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/j' },
          { $ref: '#/def/ext/L' },
          { $ref: '#/def/ext/K' },
          { $ref: '#/def/p1/k' }
        ]
      }
    }, {
      name: 'east room',
      use: 'assignable',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/ext/O' },
          { $ref: '#/def/ext/N' },
          { $ref: '#/def/ext/M' },
          { $ref: '#/def/p1/j' },
          { $ref: '#/def/p1/h' },
          { $ref: '#/def/p1/f' }
        ]
      }
    }, {
      name: 'west room',
      use: 'assignable',
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/p1/n' },
          { $ref: '#/def/p1/m' },
          { $ref: '#/def/p1/v' },
          { $ref: '#/def/ext/Y' }
        ]
      }
    }],
    walls: {
      exterior: [{
        begin: { $ref: '#/def/ext/K' },
        end: { $ref: '#/def/ext/L' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/M' }
      }, {
        end: { $ref: '#/def/ext/N' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/ext/O' },
        windows: [ /* TODO: add long row of windows */ ]
      }, {
        end: { $ref: '#/def/ext/P' },
        windows: [ /* TODO: add small centered window */ ]
      }, {
        end: { $ref: '#/def/ext/Q' }
      }, {
        end: { $ref: '#/def/ext/U' },
        windows: [{ $ref: '#/def/WINDOWS' }]
      }, {
        end: { $ref: '#/def/ext/V' }
      }, {
        end: { $ref: '#/def/ext/W' },
        windows: [
          /* TODO: add small bathroom window */
          /* TODO: add wide stairway window */
        ]
    }, {
        end: { $ref: '#/def/ext/X' },
        windows: [ /* TODO: add narrow stairway window */ ],
        doors: [ /* TODO: add sliding glass balony door */ ]
    }, {
        end: { $ref: '#/def/ext/Y' },
        windows: [ /* TODO: add office window */ ]
      }, {
        end: { $ref: '#/def/ext/K' },
        windows: [ /* TODO: add single window */ ]
      }],
      interior: [{
        begin: { $ref: '#/def/ext/p1/r' },
        end: { $ref: '#/def/p1/q' }
      }, {
        end: { $ref: '#/def/p1/p' }
      }, {
        end: { $ref: '#/def/p1/a' }
      }, {
        end: { $ref: '#/def/p1/b' }
      }, {
        end: { $ref: '#/def/p1/t' }
      }, {
        end: { $ref: '#/def/p1/s' }
      }, {
        end: { $ref: '#/def/ext/W' }
      }, {
        begin: { $ref: '#/def/ext/P' },
        end: { $ref: '#/def/p1/c' }
      }, {
        end: { $ref: '#/def/p1/d' }
      }, {
        end: { $ref: '#/def/p1/e' }
      }, {
        end: { $ref: '#/def/p1/f' }
      }, {
        end: { $ref: '#/def/p1/g' }
      }, {
        end: { $ref: '#/def/p1/h' }
      }, {
        end: { $ref: '#/def/p1/i' }
      }, {
        end: { $ref: '#/def/p1/j' }
      }, {
        end: { $ref: '#/def/ext/M' }
      }, {
        begin: { $ref: '#/def/ext/Z' },
        end: { $ref: '#/def/p1/k' }
      }, {
        end: { $ref: '#/def/p1/l' }
      }, {
        end: { $ref: '#/def/p1/m' }
      }, {
        end: { $ref: '#/def/p1/n' }
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
          { $ref: '#/def/ext/K' },
          { $ref: '#/def/ext/L' },
          { $ref: '#/def/ext/Q' },
          { $ref: '#/def/ext/U' }
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
        begin: { $ref: '#/def/ext/V' },
        end: { $ref: '#/def/ext/W' }
        /* TODO: add stairwell window */
      }, {
        end: { $ref: '#/def/ext/X' }
        /* TODO: add narrow stair window */
        /* TODO: add balcony door */
      }, {
        end: { $ref: '#/def/ext/Y' }
      }, {
        end: { $ref: '#/def/ext/V' }
      }, {
        begin: { $ref: '#/def/ext/M' },
        /* TODO: on the 10th floor, this wall should be a couple dozen feet further north */
        end: { $ref: '#/def/ext/N' }
      }, {
        end: { $ref: '#/def/ext/O' }
        /* TODO: add wide window door */
      }, { 
        end: { $ref: '#/def/ext/P' }
      }, { 
        end: { $ref: '#/def/ext/M' }
      }]
    }
  }]

}
