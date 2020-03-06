export default /* eslint-disable */
{
  context: 'city3d',
  type: 'parcel.schema.json',
  name: 'Midrise Parcel',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  comments: [
    '                                   ',
    '                                   ',
    '                                   '
  ],
  anchorPoint: { x: 0, y: 0 },
  def: {
    A: { x: -60, y: -60 },
    B: { x: 60, y: -60 },
    C: { x: 60, y: 60 },
    D: { x: -60, y: 60 }
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
    copy: { $ref: 'Midrise building' },
    pose: { x: -24, y: 24 }
  }, {
    copy: { $ref: 'Midrise building' },
    pose: { x: 24, y: 24, rotated: 270 }
  }, {
    copy: { $ref: 'Midrise building' },
    pose: { x: 24, y: -24, rotated: 180 }
  }, {
    copy: { $ref: 'Midrise building' },
    pose: { x: -24, y: -24, rotated: 90 }
  }, {
    copy: { $ref: 'Tree' },
    pose: { x: 18, y: 28, z: 54 }
  }, {
    copy: { $ref: 'Dog' },
    pose: { x: 22, y: 18, z: 54 }
  }, {
    copy: { $ref: 'Person' },
    pose: { x: 27, y: 18, z: 54 }
  }],
  pavement: [
  ]
}
