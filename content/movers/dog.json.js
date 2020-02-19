export default /* eslint-disable */
{
  context: 'city3d',
  type: 'structure.schema.json',
  name: 'Dog',
  layer: 'animals',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  comments: [
    "A stick-figure pet dog"
  ],
  lines: [{
    name: 'hind legs',
    material: 'wood',
    vertices: [
      { x: -1, y: -0.5, z: 0 },
      { x: -1, y: 0, z: 1.5 },
      { x: -1, y: +0.5, z: 0 }
    ]
  }, {
    name: 'tail, body, and head',
    material: 'wood',
    vertices: [
      { x: -1.8, y: 0.2, z: 1 },
      { x: -1, y: 0, z: 1.5 },
      { x: +1, y: 0, z: 1.5 },
      { x: +1.1, y: 0, z: 2 },
      { x: +1.8, y: 0, z: 1.8 }
    ]
  }, {
    name: 'front legs',
    material: 'wood',
    vertices: [
      { x: +1, y: -0.5, z: 0 },
      { x: +1, y: 0, z: 1.5 },
      { x: +1, y: +0.5, z: 0 }
    ]
  }]
}
