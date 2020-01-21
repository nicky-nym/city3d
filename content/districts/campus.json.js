export default /* eslint-disable */
{
  context: 'city3d',
  type: 'district.schema.json',
  name: 'Campus',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 360, y: 270, z: 0 },
  border: {
    shape: 'rectangle',
    size: { x: 720, y: 540 }
  },
  contents: [ /* TODO: add benches, tables, etc. */ ],
  parcels: [{
    border: {
      shape: 'rectangle',
      size: { x: 720, y: 540 }
    },
    contents: [{
      copy: { $ref: 'CITY.buildings.wurster_hall' },
      at: { x: 180, y: 270 }
    }, {
      copy: { $ref: 'CITY.buildings.wurster_hall' },
      at: { x: 540, y: 270, rotated: 180, mirrored: false }
    }]
  }]
}
