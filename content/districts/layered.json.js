export default /* eslint-disable */
{
  context: 'city3d',
  type: 'district.schema.json',
  name: 'Layered buildings',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 360, y: 270, z: 0 },
  border: {
    shape: 'rectangle',
    size: { x: 540, y: 1200 }
  },
  parcels: [{
    copy: { $ref: 'Parcel 353' },
    pose: { x: 400, y: 50 }
  }, {
    copy: { $ref: 'Parcel 1127' },
    pose: { x: 50, y: 100 }
  }, {
    copy: { $ref: 'Parcel 353' },
    pose: { x: 400, y: 300 }
  }, {
    copy: { $ref: 'Parcel 353' },
    pose: { x: 400, y: 350 }
  }],
  contents: [{
    copy: { $ref: 'Carriage House' },
    pose: { x: 193, y: 323, rotated: 90 }
  }, {
    copy: { $ref: 'Carriage House' },
    pose: { x: 303, y: 380 }
  }, {
    copy: { $ref: 'House on Park Place' },
    pose: { x: 200, y: 500 }
  }, {
    copy: { $ref: 'House on Park Place' },
    pose: { x: 230, y: 500 }
  }, {
    copy: { $ref: 'House on Park Place' },
    pose: { x: 260, y: 500 }
  }, {
    copy: { $ref: 'House on Park Place' },
    pose: { x: 290, y: 500 }
  }, {
    copy: { $ref: 'Hotel on Boardwalk' },
    pose: { x: 340, y: 500 }
  }, {
    copy: { $ref: 'Midrise building' },
    pose: { x: 460, y: 500 }
  }, {
    copy: { $ref: 'Midrise building' },
    pose: { x: 508, y: 500, rotated: 270 }
  }, {
    copy: { $ref: 'Wurster Hall' },
    pose: { x: 40, y: 600 }
  }, {
    copy: { $ref: 'Highrise building' },
    pose: { x: 120, y: 1000 }
  }, {
    copy: { $ref: 'Highrise building' },
    pose: { x: 320, y: 1000 }
  }]
}
