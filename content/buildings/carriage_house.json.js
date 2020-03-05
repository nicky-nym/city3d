export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Carriage House',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  comments: [
    '                                     ',
    '                                     ',
    '          H------G                   ',
    '      J---I      F---E               ',
    '      |      dc      |               ',
    '      |      ab      |               ',
    '      K---L      C---D               ',
    '          A------B                   ',
    '                                     ',
    ' 960 square feet ground floor        ',
    ' 840 square feet upperstairs (about) ',
    '                                     '
  ],
  anchorPoint: { x: 0, y: 0, z: 0 },
  def: {
    A: { x: -12, y: -14 },
    B: { x: +12, y: -14 },
    C: { x: +12, y: -12 },
    D: { x: +18, y: -12 },
    E: { x: +18, y: +12 },
    F: { x: +12, y: +12 },
    G: { x: +12, y: +14 },
    H: { x: -12, y: +14 },
    I: { x: -12, y: +12 },
    J: { x: -18, y: +12 },
    K: { x: -18, y: -12 },
    L: { x: -12, y: -12 },
    /* cupola */
    a: { x: -2, y: -2 },
    b: { x: +2, y: -2 },
    c: { x: +2, y: +2 },
    d: { x: -2, y: +2 },
    DODECAGON: {
      shape: 'polygon',
      corners: [
        { "$ref": "#/def/A" },
        { "$ref": "#/def/B" },
        { "$ref": "#/def/C" },
        { "$ref": "#/def/D" },
        { "$ref": "#/def/E" },
        { "$ref": "#/def/F" },
        { "$ref": "#/def/G" },
        { "$ref": "#/def/H" },
        { "$ref": "#/def/I" },
        { "$ref": "#/def/J" },
        { "$ref": "#/def/K" },
        { "$ref": "#/def/L" }
      ]
    }
  },
  storeys: [{
    name: 'ground storey',
    height: 7,
    floors: [{
      outline: { "$ref": "#/def/DODECAGON" },
      surface: { material: 'wood' }
    }],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        doors: [{
          name: 'garage door, left',
          motion: 'sliding',
          outline: { shape: 'rectangle', size: { x: 9, y: 6 + 8 / 12 } },
          at: { x: -5.5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          name: 'garage door, right',
          motion: 'sliding',
          outline: { shape: 'rectangle', size: { x: 9, y: 6 + 8 / 12 } },
          at: { x: +5.5, from: 'center' },
          casing: { width: 0.5 }
        }],
      }, {
        end: { $ref: '#/def/C' },
      }, {
        end: { $ref: '#/def/D' },
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2, y: 4 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/E' },
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -6, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +6, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/F' },
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2, y: 4 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/G' },
      }, {
        end: { $ref: '#/def/H' },
        doors: [{
          name: 'back door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 6 + 8 / 12 } },
          at: { x: 0, from: 'center' },
          casing: { width: 0.5 }
        }],
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -6.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -3.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +3.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +6.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/I' },
      }, {
        end: { $ref: '#/def/J' },
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2, y: 4 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/K' },
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -6, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +6, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/L' },
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2, y: 4 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/A' },
      }]
    }
  }, {
    name: 'upper floor',
    height: 1,
    floors: [{
      outline: { "$ref": "#/def/DODECAGON" },
      surface: { material: 'wood' }
    }],
  }, {
    name: 'upper north/south',
    altitude: 7,
    height: 1,
    roof: {
      form: 'pitched',
      pitch: { rise: 12, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        roofline: 'gabled',
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -3.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +3.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/G' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/H' },
        roofline: 'gabled',
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: -3.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 4 } },
          at: { x: +3.5, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/A' },
        roofline: 'pitched'
      }]
    }
  }, {
    name: 'upper east/west',
    altitude: 7,
    height: 1,
    roof: {
      form: 'pitched',
      pitch: { rise: 12, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/D' },
        end: { $ref: '#/def/E' },
        roofline: 'gabled',
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: -3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: +3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/J' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/K' },
        roofline: 'gabled',
        windows: [{
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: -3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: +3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/D' },
        roofline: 'pitched'
      }]
    }
  }, {
    name: 'cupola',
    altitude: 16,
    height: 6,
    roof: {
      form: 'pitched',
      pitch: { rise: 12, run: 12 },
      eaves: 0.5,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/a' },
        end: { $ref: '#/def/b' },
        roofline: 'gabled',
        windows: [{
          name: 'cupola windows',
          leafCount: { cols: 2 },
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 0.8, y: 2 } },
          at: { x: -0.7, y: 5.4, from: 'center' },
          casing: { width: 0.5 }
        }, {
          name: 'cupola windows',
          leafCount: { cols: 2 },
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 0.8, y: 2 } },
          at: { x: +0.7, y: 5.4, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/c' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/d' },
        roofline: 'gabled',
        windows: [{
          name: 'cupola windows',
          leafCount: { cols: 2 },
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 0.8, y: 2 } },
          at: { x: -0.7, y: 5.4, from: 'center' },
          casing: { width: 0.5 }
        }, {
          name: 'cupola windows',
          leafCount: { cols: 2 },
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 0.8, y: 2 } },
          at: { x: +0.7, y: 5.4, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/a' },
        roofline: 'pitched'
      }]
    }
  }]
}
