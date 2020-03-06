export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Midrise Ramp',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  comments: [
    '                                                      ',
    '                                                      '
  ],
  def: {
    A: { x: +3, y: -15 },
    B: { x: +3, y: +15 },
    C: { x: -3, y: +15 },
    BC: { x: 0, y: +15, z: 2.5 },
    D: { x: -3, y: -15 },
    DA: { x: 0, y: -15, z: 0 },
    RECTANGLE: {
      shape: 'polygon',
      corners: [
        { "$ref": "#/def/A" },
        { "$ref": "#/def/B" },
        { "$ref": "#/def/C" },
        { "$ref": "#/def/D" }
      ]
    },
  },
  routes: [{
    name: 'route along ramp',
    waypoints: [
      { $ref: '#/def/DA' },
      { $ref: '#/def/BC' }
    ]
  }],
  storeys: [{
    name: 'ramp',
    altitude: 0,
    incline: 2.5,
    floors: [{
      outline: { "$ref": "#/def/RECTANGLE" },
      surface: { material: 'concrete' }
    }]
  }]
}