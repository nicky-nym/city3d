export default /* eslint-disable */
{
  context: 'city3d',
  type: 'parcel.schema.json',
  name: 'Parcel Lattice',
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
    B: { x: 720, y: 0 },
    C: { x: 720, y: 720 },
    D: { x: 0, y: 720 },
    // canal
    E: { x: 0, y: 50 },
    F: { x: 0, y: 10 },
    G: { x: 10, y: 10 },
    H: { x: 10, y: 0 },
    I: { x: 50, y: 0 },
    J: { x: 50, y: 10 },
    K: { x: 720, y: 10 },
    L: { x: 720, y: 50 },
    M: { x: 50, y: 50 },
    N: { x: 50, y: 720 },
    O: { x: 10, y: 720 },
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
    copy: { $ref: 'Lattice Building' },
    at: { x: 60, y: 95, rotated: 0 }
  }, {
    copy: { $ref: 'Lattice Building' },
    at: { x: 660, y: 95, rotated: 0 }
  }, {
    copy: { $ref: 'Cottage' },
    at: { x: 154, y: 120, rotated: 90 }
  }, {
    copy: { $ref: 'House 353' },
    at: { x: 200, y: 200, rotated: 90 }
  }, {
    copy: { $ref: 'Swing set' },
    at: { x: 70, y: 160, z: 41.5 }
  }, {
    copy: { $ref: 'Tree' },
    at: { x: 75, y: 180, z: 41.5 }
  }, {
    copy: { $ref: 'Dog' },
    at: { x: 70, y: 140, z: 41.5 }
  }, {
    copy: { $ref: 'Person' },
    at: { x: 75, y: 140, z: 41.5 }
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
