export default /* eslint-disable */
{
  context: 'city3d',
  type: 'district.schema.json',
  name: 'Suburbia',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 261, y: 275, z: 0 },
  comments: [
    '                               ',
    '        h-H---G-g              ',
    '        | |   | |              ',
    '        | |   | |              ',
    '  j-----i |   | f-----e        ',
    '  J-------I   F-------E        ',
    '  |                   |        ',
    '  K-------L   C-------D        ',
    '  k-----l |   | c-----d        ',
    '        | |   | |              ',
    '        | |   | |              ',
    '        a-A---B-b              ',
    '                               '
  ],
  def: {
    /* street */
    A: { x: 246, y: 0 },
    B: { x: 276, y: 0 },
    C: { x: 276, y: 256 },
    D: { x: 522, y: 256 },
    E: { x: 522, y: 294 },
    F: { x: 276, y: 294 },
    G: { x: 276, y: 550 },
    H: { x: 246, y: 550 },
    I: { x: 246, y: 294 },
    J: { x: 0, y: 294 },
    K: { x: 0, y: 256 },
    L: { x: 246, y: 256 },
    /* sidewalk */
    a: { x: 246 - 6, y: 0 + 0 },
    b: { x: 276 + 6, y: 0 + 0 },
    c: { x: 276 + 6, y: 256 - 6 },
    d: { x: 522 + 0, y: 256 - 6 },
    e: { x: 522 + 0, y: 294 + 6 },
    f: { x: 276 + 6, y: 294 + 6 },
    g: { x: 276 + 6, y: 550 + 0 },
    h: { x: 246 - 6, y: 550 + 0 },
    i: { x: 246 - 6, y: 294 + 6 },
    j: { x: 0 + 0, y: 294 + 6 },
    k: { x: 0 + 0, y: 256 - 6 },
    l: { x: 246 - 6, y: 256 - 6 },
  },
  border: {
    shape: 'rectangle',
    size: { x: 522, y: 550 }
  },
  parcels: [{
    copy: { $ref: 'Parcel 353' },
    pose: { x: 240, y: 0 }
  }, {
    copy: { $ref: 'Parcel 353' },
    pose: { x: 240, y: 50 }
  }],
  contents: [{
    copy: { $ref: 'Utility pole' },
    pose: { x: 245, y: 2 },
    repeat: { count: 5, offset: { y: 120 } }
  }],
  routes: [
    { mode: 'roadway', waypoints: [ { x: 266, y: 0 }, { x: 266, y: 550 } ]},
    { mode: 'roadway', waypoints: [ { x: 256, y: 550 }, { x: 256, y: 0 } ]},
    { mode: 'roadway', waypoints: [ { x: 0, y: 270 }, { x: 522, y: 270 } ]},
    { mode: 'roadway', waypoints: [ { x: 522, y: 280 }, { x: 0, y: 280 } ]}
  ],
  pavement: [{
    name: 'street',
    surface: { material: 'asphalt' },
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
        { $ref: '#/def/L' }
      ]
    }
  }, {
    name: 'sidewalk',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/b' },
        { $ref: '#/def/c' },
        { $ref: '#/def/d' },
        { $ref: '#/def/D' },
        { $ref: '#/def/C' },
        { $ref: '#/def/B' }
      ]
    }
  }, {
    name: 'sidewalk',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/e' },
        { $ref: '#/def/f' },
        { $ref: '#/def/g' },
        { $ref: '#/def/G' },
        { $ref: '#/def/F' },
        { $ref: '#/def/E' }
      ]
    }
  }, {
    name: 'sidewalk',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/h' },
        { $ref: '#/def/i' },
        { $ref: '#/def/j' },
        { $ref: '#/def/J' },
        { $ref: '#/def/I' },
        { $ref: '#/def/H' }
      ]
    }
  }, {
    name: 'sidewalk',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/k' },
        { $ref: '#/def/l' },
        { $ref: '#/def/a' },
        { $ref: '#/def/A' },
        { $ref: '#/def/L' },
        { $ref: '#/def/K' }
      ]
    }
  }]
}
