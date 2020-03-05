export default /* eslint-disable */
{
  context: 'city3d',
  type: 'parcel.schema.json',
  name: 'Parcel 353',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  comments: [
    '                                   ',
    '                                   ',
    '              ______-------C       ',
    '      D-------             |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      | l--k               |       ',
    '      | |  |               |       ',
    '      | |  j-i             |       ',
    '      | |    |   Garage    |       ',
    '      | |  g-h             |       ',
    '      | |  |               |       ',
    '      | |  f------e        |       ',
    '      | |  c------d        |       ',
    '      | |  |               |       ',
    '      | |  |               |       ',
    '      | |  |    Cottage    |       ',
    '      | |  |               |       ',
    '      | |  |               |       ',
    '      | |  |               |       ',
    '      | |  |               |       ',
    '      | |  |               |       ',
    '      E |  |               |       ',
    '      | |  |               |       ',
    '      | |  |               |       ',
    '      | |  |   House_353   |       ',
    '      | |  |               |       ',
    '      | |  |    p-o        |       ',
    '      | |  |    | |        |       ',
    '      | |  |    | |        |       ',
    '      A-a--b----m-n--------B       ',
    '                                   ',
    '-y                               +y',
  ],
  anchorPoint: { x: 110, y: 25 },
  def: {
    A: { x: 0, y: 0 },
    B: { x: 0, y: 50 },
    C: { x: -232.72, y: 50 },
    D: { x: -224.15, y: 0 },
    E: { x: -52, y: 0 },
    a: { x: 0, y: 2 },
    b: { x: 0, y: 13 },
    c: { x: -155, y: 13 },
    d: { x: -155, y: 36 },
    e: { x: -160, y: 36 },
    f: { x: -160, y: 13 },
    g: { x: -165, y: 13 },
    h: { x: -165, y: 23 },
    i: { x: -181, y: 23 },
    j: { x: -181, y: 13 },
    k: { x: -194, y: 13 },
    l: { x: -194, y: 2 },
    m: { x: 0, y: 27 },
    n: { x: 0, y: 32 },
    o: { x: -15, y: 32 },
    p: { x: -15, y: 27 },
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
    copy: { $ref: 'Garage' },
    pose: { x: -185, y: 23, rotated: 0 }
  }, {
    copy: { $ref: 'Cottage' },
    pose: { x: -154, y: 23, rotated: 0 }
  }, {
    copy: { $ref: 'House 353' },
    pose: { x: 0, y: 0, rotated: 0 }
  }, {
    copy: { $ref: 'Swing set' },
    pose: { x: -210, y: 25, rotated: 0 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: -215, y: 40 }
  }, {
    copy: { $ref: 'Table' },
    pose: { x: -210, y: 10 }
  }, {
    copy: { $ref: 'Dog' },
    pose: { x: -10, y: 30 }
  }, {
    copy: { $ref: 'Person' },
    pose: { x: -2, y: 30 }
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
  pavement: [{
    name: 'doorpath',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/m' },
        { $ref: '#/def/n' },
        { $ref: '#/def/o' },
        { $ref: '#/def/p' }
      ]
    }
  }, {
    name: 'cottage path',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/c' },
        { $ref: '#/def/d' },
        { $ref: '#/def/e' },
        { $ref: '#/def/f' }
      ]
    }
  }, {
    name: 'driveway',
    surface: { material: 'gravel' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/a' },
        { $ref: '#/def/b' },
        { $ref: '#/def/g' },
        { $ref: '#/def/h' },
        { $ref: '#/def/i' },
        { $ref: '#/def/j' },
        { $ref: '#/def/k' },
        { $ref: '#/def/l' }
      ]
    }
  }]
}
