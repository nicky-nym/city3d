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
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      |                    |       ',
    '      A--------------------B       ',
    '                                   ',
    '-x                               +x',
  ],
  anchorPoint: { x: 25, y: 116.36, z: 0 },
  def: {
    A: { x: 0, y: 0 },
    B: { x: 50, y: 0 },
    C: { x: 50, y: 232.72 },
    D: { x: 0, y: 224.15 }
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
    at: { x: 16, y: 152, rotated: 90 }
  }, {
    copy: { $ref: 'Cottage' },
    at: { x: 16, y: 120, rotated: 90 }
  }, {
    copy: { $ref: 'House 353' },
    at: { x: 66, y: 20, rotated: 90 }
  }]
}
