export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'House 1127',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  comments: [
    '                                              ',
    '     Y--X                                     ',
    '     |  |                                     ',
    '     V--W                                     ',
    '                                              ',
    '                                              ',
    '       U-----T                                ',
    '       |    /                                 ',
    '       |     | H-------- ------------------G  ',
    '       R-----S |        \                  |  ',
    '               |                           |  ',
    '               |                           |  ',
    '          J----I        /               E--F  ',
    '          K----L - - - - - - - -M       |     ',
    '  Q----PQ-----P|                |      /      ',
    '  |    |     / A----------------B       |     ',
    '  |    |      |                 C-------D     ',
    '  |    |      |                               ',
    '  N----NO-----O                               ',
    '                                              ',
    '                                              '
  ],
  anchorPoint: { x: 0, y: 0, z: 0 },
  def: {
    A: { x: 8, y: 5 },
    B: { x: 40, y: 5 },
    C: { x: 40, y: 0 },
    D: { x: 52, y: 0 },
    E: { x: 52, y: 17 },
    F: { x: 57, y: 17 },
    G: { x: 57, y: 37 },
    H: { x: 8, y: 37 },
    I: { x: 8, y: 16 },
    J: { x: 0, y: 16 },
    K: { x: 0, y: 12 },
    L: { x: 8, y: 12 },
    M: { x: 40, y: 12 },
    N: { x: -22, y: -12 },
    NO: { x: -8, y: -12 },
    O: { x: 7, y: -12 },
    P: { x: 7, y: 8 },
    Q: { x: -22, y: 8 },
    PQ: { x: -8, y: 8 },
    R: { x: -4, y: 32 },
    S: { x: 5, y: 32 },
    T: { x: 5, y: 43 },
    U: { x: -4, y: 43 },
    V: { x: -8, y: 53 },
    W: { x: -2, y: 53 },
    X: { x: -2, y: 62 },
    Y: { x: -8, y: 62 }
  },
  storeys: [{
    name: 'house',
    height: 10,
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    floors: [{
      surface: { material: 'wood' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/L' },
          { $ref: '#/def/M' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/E' },
          { $ref: '#/def/F' },
          { $ref: '#/def/G' },
          { $ref: '#/def/H' }
        ]
      }
    }],
    walls: {
      exterior: [{
        begin: { $ref: '#/def/L' },
        end: { $ref: '#/def/M' },
        roofline: 'pitched',
        outside: {
          surface: {
            style: 'rusticated',
            material: 'stone'
          }
        },
        windows: [{
          name: 'west room window, front',
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 6, y: 3 } },
          at: { x: 9, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'kitchen window',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 4, y: 3 } },
          at: { x: 24, y: 6, from: 'left' },
          casing: { width: 0.5 }
        }],
        doors: [{
          name: 'front door',
          motion: 'swinging',
          handleSide: 'left',
          outline: { shape: 'rectangle', size: { x: 3, y: 7 } },
          at: { x: 17.5, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, { 
        end: { $ref: '#/def/C' },
        roofline: 'pitched',
        windows: [{
          name: 'bedroom window, porch',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: 3, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }],
      }, { 
        end: { $ref: '#/def/D' },
        roofline: 'gabled'
      }, { 
        end: { $ref: '#/def/E' },
        roofline: 'pitched'
      }, { 
        end: { $ref: '#/def/F' },
        roofline: 'pitched'
      }, { 
        end: { $ref: '#/def/G' },
        roofline: 'gabled'
      }, { 
        end: { $ref: '#/def/H' },
        roofline: 'pitched'
      }, { 
        end: { $ref: '#/def/L' },
        roofline: 'gabled'
      }]
    }
  }, {
    name: 'front porch',
    altitude: 0,
    height: 8,
    floors: [{
      surface: { material: 'brick' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/L' },
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/M' },
          { $ref: '#/def/L' }
        ]
      }
    }],
    roof: {
      form: 'shed',
      pitch: { rise: 4, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/L' },
        end: { $ref: '#/def/A' },
        roofline: 'shed',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 6, y: 7.333 } },
          at: { x: 0, from: 'center' }
        }]
      }, {
        end: { $ref: '#/def/B' },
        roofline: 'pitched',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 7, y: 7.333 } },
          at: { x: 4, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 7, y: 7.333 } },
          at: { x: 11.5, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 4, y: 7.333 } },
          at: { x: 17.5, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 5, y: 7.333 } },
          at: { x: 22.5, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 5, y: 7.333 } },
          at: { x: 28, from: 'left' }
        }]
      }, {
        end: { $ref: '#/def/M' },
        height: 0,
        roofline: 'shed'
      }, {
        end: { $ref: '#/def/L' },
        height: 0,
        roofline: 'none'
      }]
    }
  }, {
    name: 'stairway',
    altitude: 0,
    height: 7,
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    floors: [{
      surface: { material: 'concrete' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/I' },
          { $ref: '#/def/J' },
          { $ref: '#/def/K' },
          { $ref: '#/def/L' }
        ]
      }
    }],
    walls: {
      exterior: [{
        surface: {
          style: 'clapboard',
          material: 'wood'
        },
        begin: { $ref: '#/def/I' },
        end: { $ref: '#/def/J' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/K' },
        roofline: 'gabled',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: 0, from: 'center' }
        }]      }, {
        end: { $ref: '#/def/L' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/I' },
        roofline: 'gabled'

      }
    ]}
  }, {
    name: 'garage',
    altitude: 0,
    height: 7,
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    floors: [{
      surface: { material: 'concrete' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/NO' },
          { $ref: '#/def/O' },
          { $ref: '#/def/P' },
          { $ref: '#/def/PQ' }
        ]
      }
    }],
    walls: {
      exterior: [{
        surface: {
          style: 'clapboard',
          material: 'wood'
        },
        begin: { $ref: '#/def/NO' },
        end: { $ref: '#/def/O' },
        roofline: 'gabled',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 13, y: 7 } },
          at: { x: 0, from: 'center' }
        }]
      }, {
        end: { $ref: '#/def/P' },
        roofline: 'pitched',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: -1.5, from: 'right' }
        }]      }, {
        end: { $ref: '#/def/PQ' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/NO' },
        roofline: 'pitched'

      }
    ]}
  }, {
    name: 'barn',
    altitude: 0,
    height: 7,
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    floors: [{
      surface: { material: 'stone' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/R' },
          { $ref: '#/def/S' },
          { $ref: '#/def/T' },
          { $ref: '#/def/U' }
        ]
      }
    }],
    walls: {
      exterior: [{
        surface: {
          style: 'rusticated',
          material: 'stone'
        },
        begin: { $ref: '#/def/R' },
        end: { $ref: '#/def/S' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/T' },
        roofline: 'pitched',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: -2, from: 'right' }
        }]
      }, {
        end: { $ref: '#/def/U' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/R' },
        roofline: 'pitched'
      }
    ]}
  }, {
    name: 'outhouse',
    altitude: 0,
    height: 7,
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    floors: [{
      surface: { material: 'wood' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/V' },
          { $ref: '#/def/W' },
          { $ref: '#/def/X' },
          { $ref: '#/def/Y' }
        ]
      }
    }],
    walls: {
      exterior: [{
        surface: {
          style: 'clapboard',
          material: 'wood'
        },
        begin: { $ref: '#/def/V' },
        end: { $ref: '#/def/W' },
        roofline: 'gabled',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: 0, from: 'center' }
        }]
      }, {
        end: { $ref: '#/def/X' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/Y' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/V' },
        roofline: 'pitched',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: 1.5, from: 'left' }
        }]
      }
    ]}
  }]
}
