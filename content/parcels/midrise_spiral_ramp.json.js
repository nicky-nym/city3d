export default /* eslint-disable */
{
  context: 'city3d',
  type: 'parcel.schema.json',
  name: 'Midrise Spiral Ramp',
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
    copy: { $ref: 'Midrise Landing' },
    pose: { x: 0, y: 0 }
  }, {
    copy: { $ref: 'Midrise Ramp' },
    pose: { x: 0, y: 24 }
  }, {
    copy: { $ref: 'Midrise Landing' },
    pose: { x: 0, y: 48, z: 2.5 }
  }, {
    copy: { $ref: 'Midrise Ramp' },
    pose: { x: 24, y: 48, z: 2.5, rotated: 270 }
  }, {
    copy: { $ref: 'Midrise Landing' },
    pose: { x: 48, y: 48, z: 5 }
  }, {
    copy: { $ref: 'Midrise Ramp' },
    pose: { x: 48, y: 24, z: 5, rotated: 180 }
  }, {
    copy: { $ref: 'Midrise Landing' },
    pose: { x: 48, y: 0, z: 7.5 }
  }, {
    copy: { $ref: 'Midrise Ramp' },
    pose: { x: 24, y: 0, z: 7.5, rotated: 90 }
  }],
  pavement: [
  ]
}
