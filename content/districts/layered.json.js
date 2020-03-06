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
    size: { x: 600, y: 1200 }
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
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 500 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 500, z: 10, rotated: 90 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 500, z: 20, rotated: 180 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 500, z: 30, rotated: 270 }
  }, {
    copy: { $ref: 'Midrise Parcel' },
    pose: { x: 500, y: 650 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 800 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 800, z: 10, rotated: 90 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 800, z: 20, rotated: 180 }
  }, {
    copy: { $ref: 'Midrise Spiral Ramp' },
    pose: { x: 500, y: 800, z: 30, rotated: 270 }
  }, {
    copy: { $ref: 'Midrise Parcel' },
    pose: { x: 500, y: 800 }
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
    pose: { x: 100, y: 500 }
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
