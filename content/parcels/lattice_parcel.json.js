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
    // canal
    /*
    HHI: { x: 20, y: 0 },
    HII: { x: 40, y: 0 },
    OON: { x: 20, y: 730 },
    ONN: { x: 40, y: 730 },
    EEF: { x: 0, y: 40 },
    EFF: { x: 0, y: 20 },
    LLK: { x: 730, y: 40 },
    LKK: { x: 730, y: 20 },
    */
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
    pose: { x: 60, y: -5, rotated: 0 }
  }, {
    copy: { $ref: 'Highroad Longhouse' },
    pose: { x: 60, y: 95, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Ramps' },
    pose: { x: 55, y: 55, rotated: 0 }
  }, {
    copy: { $ref: 'Highroad Bridge' },
    pose: { x: 690, y: -5, rotated: 0 }
  }, {
    copy: { $ref: 'Highroad Longhouse' },
    pose: { x: 720, y: 730 - 45, rotated: 180 }
  }, {
    copy: { $ref: 'Longhouse Ramps' },
    pose: { x: 730 - 5, y: 730 - 5, rotated: 180 }
  }, {
    copy: { $ref: 'Lowroad Bridge' },
    pose: { x: 55, y: 90, rotated: 180 }
  }, {
    copy: { $ref: 'Lowroad Longhouse' },
    pose: { x: 730 - 45, y: 90, rotated: 180 }
  }, {
    copy: { $ref: 'Lowroad Bridge' },
    pose: { x: -5, y: 690, rotated: 0 }
  }, {
    copy: { $ref: 'Lowroad Longhouse' },
    pose: { x: 95, y: 690, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    pose: { x: 55, y: 55, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    pose: { x: 685, y: 55, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    pose: { x: 685, y: 685, rotated: 0 }
  }, {
    copy: { $ref: 'Longhouse Junction' },
    pose: { x: 55, y: 685, rotated: 0 }
  }, {
    copy: { $ref: 'Dog' },
    pose: { x: 70, y: 55, z: 49 }
  }, {
    copy: { $ref: 'Person' },
    pose: { x: 75, y: 55, z: 49 }
  }, {
    copy: { $ref: 'Cottage' },
    pose: { x: 60, y: 64, z: 49, rotated: 0 }
  }, {
    copy: { $ref: 'Swing set' },
    pose: { x: 105, y: 80, z: 49 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: 140, y: 70, z: 49 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: 230, y: 80, z: 49 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: 460, y: 75, z: 49 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: 70, y: 180, z: 49 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: 80, y: 350, z: 49 }
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
  }],
  routes: [
    /* TODO:
    { waypoints: [ { $ref: '#/def/OON' }, { $ref: '#/def/HHI' } ]},
    { waypoints: [ { $ref: '#/def/HII' }, { $ref: '#/def/ONN' } ]},
    { waypoints: [ { $ref: '#/def/LLK' }, { $ref: '#/def/EEF' } ]},
    { waypoints: [ { $ref: '#/def/EFF' }, { $ref: '#/def/LKK' } ]},
    */
    { mode: 'canal', waypoints: [ { x: 20, y: 730 },  { x: 20, y: 0 } ]},
    { mode: 'canal', waypoints: [ { x: 40, y: 0 }, { x: 40, y: 730 } ]},
    { mode: 'canal', waypoints: [ { x: 0, y: 20 }, { x: 730, y: 20 } ]},
    { mode: 'canal', waypoints: [ { x: 730, y: 40 }, { x: 0, y: 40 } ]}
  ]
}
