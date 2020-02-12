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
  anchorPoint: { x: 261, y: 250, z: 0 },
  def: {
    /* sidewalk */
    A: { x: 240, y: 500 },
    B: { x: 240, y: 0 },
    C: { x: 246, y: 0 },
    D: { x: 246, y: 500 },
    /* street */
    E: { x: 276, y: 0 },
    F: { x: 276, y: 500 },
    /* sidewalk */
    G: { x: 282, y: 0 },
    H: { x: 282, y: 500 },
  },
  border: {
    shape: 'rectangle',
    size: { x: 522, y: 500 }
  },
  parcels: [{
    copy: { $ref: 'Parcel 353' },
    at: { x: 240, y: 0 }
  }, {
    copy: { $ref: 'Parcel 353' },
    at: { x: 240, y: 50 }
  }],
  contents: [ /* TODO: add benches, tables, etc. */ ],
  pavement: [{
    name: 'sidewalk',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/A' },
        { $ref: '#/def/B' },
        { $ref: '#/def/C' },
        { $ref: '#/def/D' }
      ]
    }
  }, {
    name: 'street',
    surface: { material: 'asphalt' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/D' },
        { $ref: '#/def/C' },
        { $ref: '#/def/E' },
        { $ref: '#/def/F' }
      ]
    }
  }, {
    name: 'sidewalk',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/F' },
        { $ref: '#/def/E' },
        { $ref: '#/def/G' },
        { $ref: '#/def/H' }
      ]
    }
  }]
}
