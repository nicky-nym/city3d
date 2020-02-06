export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'House 353',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  comments: [
    '                                   ',
    '     N------------------M          ',
    '     |                  |          ',
    '    PO------------------LK         ',
    '    |                    |         ',
    '    V--------W-X         |         ',
    '    |        | |   d-c   |         ',
    '    |        Y-Z---a-b---J-I       ',
    '  R-Q                      |       ',
    '  |                        |       ',
    '  |                        |       ',
    '  |      e h               |       ',
    '  |      f-g               |       ',
    '  AS-------------B         |       ',
    '   |             |         |       ',
    '   T-------------C         H       ',
    '                  \       /        ',
    '                 D E-----F G       ',
    '-y                               +y',
  ],
  anchorPoint: { x: 39.875, y: 30.875, z: 0 },
  def: {
    A: { x: -25.792, y: 14.75 },
    B: { x: -25.792, y: 32.75 },
    C: { x: -19.375, y: 32.75 },
    D: { x: -16, y: 32.75 },
    E: { x: -16, y: 36.1 },
    F: { x: -16, y: 43.65 },
    G: { x: -16, y: 47 },
    H: { x: -19.375, y: 47 },
    I: { x: -44.333, y: 47 },
    J: { x: -44.333, y: 44.542 },
    K: { x: -57.792, y: 44.542 },
    L: { x: -57.792, y: 43.625 },
    M: { x: -63.75, y: 43.625 },
    N: { x: -63.75, y: 17.833 },
    O: { x: -57.792, y: 17.833 },
    P: { x: -57.792, y: 16.75 },
    Q: { x: -41.167, y: 16.75 },
    R: { x: -41.167, y: 14.75 },
    S: { x: -25.792, y: 32.75 - 17.083 },
    T: { x: -25.792 + 5.333, y: 32.75 - 17.083 },
    U: { x: -25.792 + 5.333, y: 32.75 },
    V: { x: -51.792, y: 16.75 },
    W: { x: -51.792, y: 28 },
    X: { x: -51.792, y: 31 },
    Y: { x: -44.333, y: 28 },
    Z: { x: -44.333, y: 31 },
    a: { x: -44.333, y: 35 },
    b: { x: -44.333, y: 35 + 2.95 },
    c: { x: -44.333 - 2.1, y: 35 + 2.95 },
    d: { x: -44.333 - 2.1, y: 35 },
    /* TODO: determine accurate locations for dormer */
    e: { x: -33, y: 23 },
    f: { x: -27, y: 23 },
    g: { x: -27, y: 27 },
    h: { x: -33, y: 27 }
  },
  storeys: [{
    name: 'crawl space',
    height: 4,
    walls: {
      exterior: [
        {
          begin: { $ref: '#/def/A' },
          end: { $ref: '#/def/B' },
          outside: {
            surface: {
              style: 'clapboard',
              material: 'wood'
            }
          }
        },
        { end: { $ref: '#/def/C' } },
        { end: { $ref: '#/def/E' } },
        { end: { $ref: '#/def/F' } },
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
        { end: { $ref: '#/def/A' } }
    ]
    }
  }, {
    name: 'back addition',
    altitude: 4,
    height: 8,
    roof: {
      form: 'pitched',
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
        end: { $ref: '#/def/M' },
        roofline: 'shed'
      }, {
        end: { $ref: '#/def/N' },
        roofline: 'pitched',
        outside: {
          fixtures: [
            { at: { x: 9.5, y: 6, from: 'left' }, copy: { $ref: 'sconce' } }
          ]
        },
        doors: [{
          name: 'back door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 2.666, y: 6.666 } },
          at: { x: 13.105, from: 'left' },
          casing: { width: 0.5 }
        }],
        windows: [{
          name: 'kitchen sink window',
          leafCount: { cols: 2 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 3.750, y: 2.083 } },
          at: { x: 5.042, y: 5.3745, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'laundry room windows',
          leafCount: { cols: 3 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 5.750, y: 4.083 } },
          at: { x: 17.813, y: 4.6245, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'half-bath window',
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 1.750, y: 2.083 } },
          at: { x: 23.417, y: 5.5415, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/O' },
        roofline: 'shed'
      }]
    }
  }, {
    name: 'front porch skirt',
    altitude: 0,
    height: 4,
    walls: {
      exterior: [{
        begin: { $ref: '#/def/S' },
        end: { $ref: '#/def/T' }
      }, {
        end: { $ref: '#/def/U' }
      }]
    }
  }, {
    name: 'front porch',
    height: 8,
    floors: [{
      surface: { material: 'wood' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/S' },
          { $ref: '#/def/T' },
          { $ref: '#/def/U' },
          { $ref: '#/def/B' },
          { $ref: '#/def/S' }
        ]
      }
    }],
    roof: {
      form: 'pitched',
      pitch: { rise: 4, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      }
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/S' },
        end: { $ref: '#/def/T' },
        roofline: 'pitched',
        windows: [{
          outline: { shape: 'rectangle', size: { x: 4.6, y: 4.833 } },
          at: { x: 0, y: 4.9165, from: 'center' }
        }]
      }, {
        end: { $ref: '#/def/U' },
        roofline: 'pitched',
        doors: [{
          outline: { shape: 'rectangle', size: { x: 4.6, y: 7.333 } },
          at: { x: 13.9, from: 'left' }
        }],
        windows: [{
          outline: { shape: 'rectangle', size: { x: 4.6, y: 4.833 } },
          at: { x: 3.3, y: 4.9165, from: 'left' }
        }, {
          outline: { shape: 'rectangle', size: { x: 4.6, y: 4.833 } },
          at: { x: 8.6, y: 4.9165, from: 'left' }
        }]
      }]
    }
  }, {
    name: 'main house',
    altitude: 4,
    height: 10,
    floors: [{
      surface: { material: 'wood' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/E' },
          { $ref: '#/def/F' },
          { $ref: '#/def/H' },
          { $ref: '#/def/I' },
          { $ref: '#/def/J' },
          { $ref: '#/def/Z' },
          { $ref: '#/def/Y' },
          { $ref: '#/def/W' },
          { $ref: '#/def/V' },
          { $ref: '#/def/Q' },
          { $ref: '#/def/R' },
          { $ref: '#/def/A' }
        ]
      }
    }, {
      surface: { material: 'ceramic tile' },
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/Z' },
          { $ref: '#/def/J' },
          { $ref: '#/def/K' },
          { $ref: '#/def/L' },
          { $ref: '#/def/M' },
          { $ref: '#/def/N' },
          { $ref: '#/def/O' },
          { $ref: '#/def/P' },
          { $ref: '#/def/V' },
          { $ref: '#/def/W' },
          { $ref: '#/def/X' },
          { $ref: '#/def/Z' }
        ]
      }
    }],
    ceiling: {
      fixtures: []
    },
    walls: {
      exterior: [{ 
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        outside: {
          surface: {
            style: 'clapboard',
            material: 'wood'
          },
          downspouts: [
            { at: { x: +0.25, from: 'left' } }
          ]
        },
        inside: {
          surface: {
            style: 'flat',
            material: 'drywall'
          }
        },
        windows: [{
          name: 'office porch window, left',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 6.375, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'office porch window, right',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 9.292, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }],
        doors: [{
          name: 'front door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 3, y: 7 } },
          at: { x: 15.625, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/C' },
        outside: {
          fixtures: [
            { at: { x: 0.5, y: 3, from: 'left' }, copy: { $ref: 'doorbell' } },
            { at: { x: 2.5, y: 3, from: 'left' }, copy: { $ref: 'mailbox' } }
          ]
        }
      }, {
        end: { $ref: '#/def/E' },
        windows: [{
          name: 'bay window, southeast',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.750, y: 6.400 } },
          at: { x: 2.375, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/F' },
        windows: [{
          name: 'bay window, front',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 4.333, y: 6.400 } },
          at: { x: 3.7745, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/H' },
        windows: [{
          name: 'bay window, northeast',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.750, y: 6.400 } },
          at: { x: 2.375, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/I' },
        windows: [{
          name: 'dining room window, left',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 16.75, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'dining room window, right',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 19.667, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/J' },
      }, {
        end: { $ref: '#/def/K' },
        windows: [{
          name: 'kitchen windows, north',
          leafCount: { cols: 3 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 5.750, y: 4.083 } },
          at: { x: 6.626, y: 4.6245, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/L' }
      }, {
        end: { $ref: '#/def/O' },
        doors: [{
          outline: { shape: 'rectangle', size: { x: 11, y: 8 } },
          at: { x: 6, from: 'left' },
        }, {
          outline: { shape: 'rectangle', size: { x: 2.333, y: 6.666 } },
          at: { x: 13.3325, from: 'left' },
        }]
      }, {
        end: { $ref: '#/def/P' },
      }, {
        end: { $ref: '#/def/Q' },
        windows: [{
          name: 'bathroom window',
          leafCount: { cols: 2 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 2.375, y: 3.083 } },
          at: { x: 2.7295, y: 5.7075, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'bedroom window',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 3.666, y: 6.250 } },
          at: { x: 10.917, y: 5.291, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/R' },
      }, {
        end: { $ref: '#/def/A' },
        windows: [{
          name: 'office window',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 7.334, y: 5.2, from: 'left' },
          casing: { width: 0.5 }
        }]
      }]
    },
    rooms: []
  }, {
    name: 'attic',
    height: 1.5,
    floors: [{
      surface: { material: 'wood' },
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
          { $ref: '#/def/I' },
          { $ref: '#/def/J' },
          { $ref: '#/def/K' },
          { $ref: '#/def/L' },
          { $ref: '#/def/O' },
          { $ref: '#/def/P' },
          { $ref: '#/def/V' },
          { $ref: '#/def/Q' },
          { $ref: '#/def/R' },
          { $ref: '#/def/A' }
        ]
      }
    }],
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
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/D' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/G' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/I' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/J' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/K' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/P' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/Q' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/R' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/A' },
        roofline: 'pitched'
      }]
    }
   }, {
    name: 'TWEAK: attic hipped rectangle 1',
    height: 0,
    roof: {
      form: 'hipped',
      pitch: { rise: 12, run: 12 },
      eaves: 1
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/D' },
        end: { $ref: '#/def/G' }
      }, {
        end: { $ref: '#/def/I' }
      }, {
        end: { x: -44.333, y: 32.75 }
      }, {
        end: { $ref: '#/def/D' }
      }]
    }
   }, {
    name: 'TWEAK: attic hipped rectangle 2',
    height: 0,
    roof: {
      form: 'hipped',
      pitch: { rise: 12, run: 12 },
      eaves: 1
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/I' },
        end: { x: -44.333, y: 16.75 }
      }, {
        end: { x: -25.792, y: 16.75 }
      }, {
        end: { x: -25.792, y: 47 }
      }, {
        end: { $ref: '#/def/I' }
      }]
    }
   }, {
    name: 'TWEAK: attic hipped rectangle 3',
    height: 0,
    roof: {
      form: 'hipped',
      pitch: { rise: 12, run: 12 },
      eaves: 1
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/A' },
        end: { x: -25.792, y: 47 }
      }, {
        end: { x: -41.167, y: 47 }
      }, {
        end: { $ref: '#/def/R' }
      }, {
        end: { $ref: '#/def/A' }
      }]
    }
   }, {
    name: 'TWEAK: attic hipped rectangle 4',
    height: 0,
    roof: {
      form: 'hipped',
      pitch: { rise: 12, run: 12 },
      eaves: 1
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/K' },
        end: { $ref: '#/def/P' }
      }, {
        end: { x: -25.792, y: 16.75 }
      }, {
        end: { x: -25.792, y: 44.542 }
      }, {
        end: { $ref: '#/def/K' }
      }]
    }
   }, {
    name: 'dormer',
    height: 4,
    roof: {
      form: 'pitched',
      pitch: { rise: 12, run: 12 },
      eaves: 0.5
    },
    walls: {
      exterior: [{
        begin: { $ref: '#/def/e' },
        end: { $ref: '#/def/f' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/g' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/h' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/e' }
      }]
    }
  }, {
    name: 'chimney',
    height: 16,
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
  }]
}
