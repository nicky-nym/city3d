export default /* eslint-disable */
{
  context: 'city3d',
  type: 'parcel.schema.json',
  name: 'Lattice Parcel',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  comments: [
    '                                   ',
    '                                   ',
    '    D-O---N----------------C       ',
    '    | |   |                |       ',
    '    | |   |                |       ',
    '    | |   |                |       ',
    '    | |   |                |       ',
    '    | |   |                |       ',
    '    | |   |                |       ',
    '    | |   |                |       ',
    '    E-P   M----------------L       ',
    '    |          canal       |       ',
    '    F-G   J----------------K       ',
    '    A-H---I----------------B       ',
    '                                   ',
    '                                   ',
  ],
  anchorPoint: { x: 110, y: 25 },
  def: {
    // parcel
    A: { x: 0, y: 0 },
    B: { x: 730, y: 0 },
    C: { x: 730, y: 730 },
    D: { x: 0, y: 730 },
    // canal
    E: { x: 0, y: 50 },
    F: { x: 0, y: 10 },
    G: { x: 10, y: 10 },
    H: { x: 10, y: 0 },
    I: { x: 50, y: 0 },
    J: { x: 50, y: 10 },
    K: { x: 730, y: 10 },
    L: { x: 730, y: 50 },
    M: { x: 50, y: 50 },
    N: { x: 50, y: 730 },
    O: { x: 10, y: 730 },
    P: { x: 10, y: 50 }
  },
  border: {
    shape: 'polygon',
    corners: [
      { $ref: '#/def/A' },
      { $ref: '#/def/B' },
      { $ref: '#/def/C' },
      { $ref: '#/def/D' },
    ]
  },
  contents: [{
    copy: { $ref: 'Highroad Bridge' },
    at: { x: 60, y: -5, rotated: 0 }
  }, {
    copy: { $ref: 'Highroad Longhouse' },
    at: { x: 60, y: 95, rotated: 0 }
  }, {
    copy: { $ref: 'Highroad Bridge' },
    at: { x: 690, y: -5, rotated: 0 }
  }, {
    copy: { $ref: 'Highroad Longhouse' },
    at: { x: 690, y: 95, rotated: 180 }
  }, {
    copy: { $ref: 'Lowroad Bridge' },
    at: { x: -5, y: 60, rotated: 0 }
  }, {
    copy: { $ref: 'Lowroad Longhouse' },
    at: { x: 95, y: 60, rotated: 0 }
  }, {
    copy: { $ref: 'Lowroad Bridge' },
    at: { x: -5, y: 690, rotated: 0 }
  }, {
    copy: { $ref: 'Lowroad Longhouse' },
    at: { x: 95, y: 690, rotated: 180 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    at: { x: 55, y: 55, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    at: { x: 685, y: 55, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    at: { x: 685, y: 685, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    at: { x: 55, y: 685, rotated: 0 }
  }, {
    copy: { $ref: 'Cottage' },
    at: { x: 154, y: 64, z: 41.5, rotated: 0 }
  }, {
    copy: { $ref: 'Swing set' },
    at: { x: 205, y: 75, z: 41.5 }
  }, {
    copy: { $ref: 'Tree' },
    at: { x: 140, y: 70, z: 41.5 }
  }, {
    copy: { $ref: 'Dog' },
    at: { x: 70, y: 100, z: 41.5 }
  }, {
    copy: { $ref: 'Person' },
    at: { x: 75, y: 100, z: 41.5 }
  }],
  // TODO: implement this!
  /*
  fencing: [{
    height: 6,
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/B' },
        { $ref: '#/def/C' },
        { $ref: '#/def/D' },
        { $ref: '#/def/E' }
      ]
    }
  }],
  */
  water: [{
    name: 'canal',
    outline: {
      shape: 'polygon',
      corners: [
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
        { $ref: '#/def/P' }
      ]
    }
  }]
}
