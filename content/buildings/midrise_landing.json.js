export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Midrise Landing',
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
    A: { x: -3, y: -9 },
    B: { x: +3, y: -9 },
    AB: { x: 0, y: -9 },
    C: { x: +9, y: -3 },
    D: { x: +9, y: +3 },
    CD: { x: 9, y: 0 },
    E: { x: +3, y: +9 },
    F: { x: -3, y: +9 },
    EF: { x: 0, y: +9 },
    G: { x: -9, y: +3 },
    H: { x: -9, y: -3 },
    GH: { x: -9, y: 0 },
    OCTAGON: {
      shape: 'polygon',
      corners: [
        { "$ref": "#/def/A" },
        { "$ref": "#/def/B" },
        { "$ref": "#/def/C" },
        { "$ref": "#/def/D" },
        { "$ref": "#/def/E" },
        { "$ref": "#/def/F" },
        { "$ref": "#/def/G" },
        { "$ref": "#/def/H" }
      ]
    },
  },
  routes: [{
    name: 'route across landing',
    waypoints: [
      { $ref: '#/def/AB' },
      { $ref: '#/def/EF' }
    ]
  }, {
    name: 'route across landing',
    waypoints: [
      { $ref: '#/def/CD' },
      { $ref: '#/def/GH' }
    ]
  }],
  storeys: [{
    name: 'exit from highroad (toward landing)',
    altitude: 0,
    floors: [{
      outline: { "$ref": "#/def/OCTAGON" },
      surface: { material: 'concrete' }
    }]
  }]
}