export default /* eslint-disable */
{
  context: 'city3d',
  type: 'parcel.schema.json',
  name: 'Parcel 1127',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0 },
  def: {
    /* parcel */
    A: { x: 0, y: 0 },
    B: { x: 350, y: 0 },
    C: { x: 350, y: 200 },
    D: { x: 0, y: 200 },
    /* driveway */
    a: { x: 100, y: 85 },
    b: { x: 350, y: 85 },
    c: { x: 350, y: 100 },
    d: { x: 100, y: 100 },
    /* east porch */
    e: { x: 185, y: 113 },
    f: { x: 194, y: 113 },
    g: { x: 194, y: 129 },
    h: { x: 185, y: 129 }
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
    copy: { $ref: 'House 1127' },
    pose: { x: 125, y: 112, rotated: 0 }
  }],
  pavement: [{
    name: 'driveway',
    surface: { material: 'gravel' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/a' },
        { $ref: '#/def/b' },
        { $ref: '#/def/c' },
        { $ref: '#/def/d' }
      ]
    }
  }, {
    name: 'east porch',
    surface: { material: 'concrete' }, /* TODO: 'brick' */
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/e' },
        { $ref: '#/def/f' },
        { $ref: '#/def/g' },
        { $ref: '#/def/h' }
      ]
    }
  }]
}
