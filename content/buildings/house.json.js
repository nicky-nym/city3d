export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'House',
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
    '  |                        |       ',
    '  |                        |       ',
    '  AS-------------B         |       ',
    '   |             |         |       ',
    '   T-------------C         H       ',
    '                  \       /        ',
    '                 D E-----F G       ',
    '                                   ',
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
    d: { x: -44.333 - 2.1, y: 35 }
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
    name: 'main house',
    height: 10,
    floors: [{
      surface: { material: 'wood' },
      outline: {
        shape: 'polygon',
        corners: [
          { begin: { $ref: '#/def/A' }, end: { $ref: '#/def/B' } },
          { end: { $ref: '#/def/C' } },
          { end: { $ref: '#/def/E' } },
          { end: { $ref: '#/def/F' } },
          { end: { $ref: '#/def/H' } },
          { end: { $ref: '#/def/I' } },
          { end: { $ref: '#/def/J' } },
          { end: { $ref: '#/def/Z' } },
          { end: { $ref: '#/def/Y' } },
          { end: { $ref: '#/def/W' } },
          { end: { $ref: '#/def/V' } },
          { end: { $ref: '#/def/Q' } },
          { end: { $ref: '#/def/R' } },
          { end: { $ref: '#/def/A' } }
        ]
      }
    }, {
      surface: { material: 'ceramic tile' },
      outline: {
        shape: 'polygon',
        corners: [
          { begin: { $ref: '#/def/Z' }, end: { $ref: '#/def/J' } },
          { end: { $ref: '#/def/K' } },
          { end: { $ref: '#/def/L' } },
          { end: { $ref: '#/def/M' } },
          { end: { $ref: '#/def/N' } },
          { end: { $ref: '#/def/O' } },
          { end: { $ref: '#/def/P' } },
          { end: { $ref: '#/def/V' } },
          { end: { $ref: '#/def/W' } },
          { end: { $ref: '#/def/X' } },
          { end: { $ref: '#/def/Z' } }
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
          at: { x: 5.25, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'office porch window, right',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 8.167, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }],
        doors: [{
          name: 'front door',
          motion: 'swinging',
          handleSide: 'right',
          outline: { shape: 'rectangle', size: { x: 3, y: 7 } },
          at: { x: 14.125, from: 'left' },
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
          at: { x: 1, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/F' },
        windows: [{
          name: 'bay window, front',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 4.333, y: 6.400 } },
          at: { x: 1.608, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/H' },
        windows: [{
          name: 'bay window, northeast',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.750, y: 6.400 } },
          at: { x: 1, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/I' },
        windows: [{
          name: 'dining room window, left',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 15.625, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'dining room window, right',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 2.250, y: 6.400 } },
          at: { x: 18.542, y: 2.0, from: 'left' },
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
          at: { x: 3.751, y: 2.583, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/L' },
      }, {
        end: { $ref: '#/def/O' },
      }, {
        end: { $ref: '#/def/P' },
      }, {
        end: { $ref: '#/def/Q' },
        windows: [{
          name: 'bathroom window',
          leafCount: { cols: 2 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 2.375, y: 3.083 } },
          at: { x: 1.542, y: 4.166, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'bedroom window',
          motion: 'hung',
          outline: { shape: 'rectangle', size: { x: 3.666, y: 6.250 } },
          at: { x: 9.084, y: 2.166, from: 'left' },
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
          at: { x: 6.209, y: 2.0, from: 'left' },
          casing: { width: 0.5 }
        }]
      }]
    },
    rooms: []
  }, {
    name: 'back addition',
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
          at: { x: 11.772, from: 'left' },
          casing: { width: 0.5 }
        }],
        windows: [{
          name: 'kitchen sink window',
          leafCount: { cols: 2 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 3.750, y: 2.083 } },
          at: { x: 3.167, y: 4.333, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'laundry room windows',
          leafCount: { cols: 3 },
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 5.750, y: 4.083 } },
          at: { x: 14.938, y: 2.583, from: 'left' },
          casing: { width: 0.5 }
        }, {
          name: 'half-bath window',
          motion: 'casement',
          outline: { shape: 'rectangle', size: { x: 1.750, y: 2.083 } },
          at: { x: 22.542, y: 4.500, from: 'left' },
          casing: { width: 0.5 }
        }]
      }, {
        end: { $ref: '#/def/O' },
        roofline: 'shed'
      }]
    }
  }, {
    name: 'front porch',
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
        begin: { $ref: '#/def/S' },
        end: { $ref: '#/def/T' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/U' },
        roofline: 'pitched'
      }]
    }
  }, {
    name: 'attic',
    height: 1.5,
    floors: [{
      surface: { material: 'wood' },
      outline: {
        shape: 'polygon',
        corners: [
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
          { end: { $ref: '#/def/O' } },
          { end: { $ref: '#/def/P' } },
          { end: { $ref: '#/def/V' } },
          { end: { $ref: '#/def/Q' } },
          { end: { $ref: '#/def/R' } },
          { end: { $ref: '#/def/A' } }
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
