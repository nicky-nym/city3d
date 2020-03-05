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
    '       |     | H-------- -------GH---------G  ',
    '       R-----S |        \       |          |  ',
    '               |              dc|          |  ',
    '               |              abZZ     EE  |  ',
    '          J----I        /       Z-------E--F  ',
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
    A: { x: 10, y: 5 },
    B: { x: 45, y: 5 },
    C: { x: 45, y: 0 },
    D: { x: 60, y: 0 },
    E: { x: 60, y: 17 },
    EE: { x: 60, y: 25 },
    F: { x: 69, y: 17 },
    G: { x: 69, y: 37 },
    GH: { x: 45, y: 37 },
    Z: { x: 45, y: 17 },
    ZZ: { x: 45, y: 25 },
    H: { x: 10, y: 37 },
    I: { x: 10, y: 16 },
    J: { x: 0, y: 16 },
    K: { x: 0, y: 12 },
    L: { x: 10, y: 12 },
    M: { x: 45, y: 12 },
    N: { x: -22, y: -12 },
    NO: { x: -8, y: -12 },
    O: { x: 7, y: -12 },
    P: { x: 7, y: 10 },
    Q: { x: -22, y: 10 },
    PQ: { x: -8, y: 10 },
    R: { x: -5, y: 32 },
    S: { x: 5, y: 32 },
    T: { x: 5, y: 44 },
    U: { x: -5, y: 44 },
    V: { x: -9, y: 56 },
    W: { x: -1, y: 56 },
    X: { x: -1, y: 65 },
    Y: { x: -9, y: 65 },
    /* chimney */
    a: { x: 43, y: 28 },
    b: { x: 44.5, y: 28 },
    c: { x: 44.5, y: 30 },
    d: { x: 43, y: 30 }
  },
  storeys: [{
    name: 'old house',
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
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/EE' },
          { $ref: '#/def/ZZ' }
        ]
      }
    }],
    walls: {
      exterior: [{
        begin: { $ref: '#/def/C' },
        end: { $ref: '#/def/D' },
        roofline: 'gabled',
        windows: [{
          name: 'bedroom window, south',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: 0, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/EE' },
        roofline: 'pitched',
        windows: [{
          name: 'bedroom window, east',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: 5, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }],
        doors: [{
          name: 'office door',
          motion: 'swinging',
          handleSide: 'left',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: -6.5, from: 'right' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/ZZ' },
        roofline: 'gabled',
        doors: [{
          name: 'living room door',
          motion: 'swinging',
          handleSide: 'left',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: 4, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/C' },
        roofline: 'pitched',
        windows: [{
          name: 'office window, porch',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: -11, y: 5, from: 'right' },
          casing: { width: 0.5 }
        }]
      }]
    }
  }, {
    name: 'living room',
    altitude: 0,
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
          { $ref: '#/def/Z' },
          { $ref: '#/def/F' },
          { $ref: '#/def/G' },
          { $ref: '#/def/GH' }
        ]
      }
    }],
    walls: {
      exterior: [{ 
        begin: { $ref: '#/def/Z' },
        end: { $ref: '#/def/F' },
        roofline: 'pitched',
        doors: [{
          name: 'living room door',
          motion: 'swinging',
          handleSide: 'left',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 7 } },
          at: { x: -6, from: 'right' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/G' },
        roofline: 'gabled',
        windows: [{
          name: 'living room windows, east',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: -3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          name: 'living room windows, east',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: +3, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/GH' },
        roofline: 'pitched',
        windows: [{
          name: 'living room windows, north',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: -4, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }, {
          name: 'living room windows, north',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 5 } },
          at: { x: +4, y: 5, from: 'center' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/Z' },
        roofline: 'gabled',
      }]
    }
  }, {
    name: '1960s addition',
    altitude: 0,
    height: 8,
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
          { $ref: '#/def/GH' },
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
        end: { $ref: '#/def/GH' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/H' },
        roofline: 'pitched',
        windows: [{
          name: 'back room window, north',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.8, y: 6 } },
          at: { x: 6, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'bathroom window',
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 2, y: 2 } },
          at: { x: 22, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }],
        doors: [{
          name: 'back door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 3, y: 7 } },
          at: { x: 16, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/L' },
        roofline: 'gabled',
        windows: [{
          name: 'bedroom window, west',
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 6, y: 2.5 } },
          at: { x: 0, y: 6, from: 'center' },
          casing: { width: 0.5 }
        }]
      }]
    }
  }, {
    name: 'chimney',
    height: 11,
    walls: {
      exterior: [{
        begin: { $ref: '#/def/a' },
        end: { $ref: '#/def/b' },
      }, {
        end: { $ref: '#/def/c' }
      }, {
        end: { $ref: '#/def/d' }
      }, {
        end: { $ref: '#/def/a' }
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
      pitch: { rise: 2, run: 12 },
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
          outline: { shape: 'rectangle', size: { x: 7.5, y: 7.333 } },
          at: { x: 4.5, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 7.5, y: 7.333 } },
          at: { x: 12.5, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 4.4, y: 7.333 } },
          at: { x: 18.9, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 6, y: 7.333 } },
          at: { x: 24.5, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 6, y: 7.333 } },
          at: { x: 31, from: 'left' }
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
    height: 8.5,
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
        windows: [{
          name: 'garage windows',
          motion: 'picture',
          outline: { shape: 'rectangle', size: { x: 2.5, y: 2 } },
          at: { x: 6, y: 5, from: 'left' },
          casing: { width: 0.5 }
        }],
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
    name: 'garage shed',
    altitude: 0,
    height: 6.5,
    floors: [{
      surface: { material: 'wood' }, /* TODO: 'soil' */
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/PQ' },
          { $ref: '#/def/Q' },
          { $ref: '#/def/N' },
          { $ref: '#/def/NO' }
        ]
      }
    }],
    roof: {
      form: 'shed',
      pitch: { rise: 2, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/PQ' },
        end: { $ref: '#/def/Q' },
        roofline: 'shed'
      }, {
        end: { $ref: '#/def/N' },
        roofline: 'pitched',
        windows: [{
          outline: { shape: 'rectangle', size: { x: 2.5, y: 2 } },
          at: { x: 0, y: 5, from: 'center' }
        }]
      }, {
        end: { $ref: '#/def/NO' },
        roofline: 'shed',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 10, y: 6 } },
          at: { x: 0, from: 'center' }
        }]
      }, {
        end: { $ref: '#/def/PQ' },
        height: 0,
        roofline: 'none'
      }]
    }
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
          at: { x: 0, from: 'center' }
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
        roofline: 'pitched',
        windows: [{
          outline: { shape: 'rectangle', size: { x: 2, y: 2.6 } },
          at: { x: 0, y: 5, from: 'center' }
        }]
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
