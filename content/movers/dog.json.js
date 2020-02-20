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
    radius: 0.1,
    vertices: [
      { x: -1, y: -0.5, z: 0 },
      { x: -1, y: 0, z: 1.5 },
      { x: -1, y: +0.5, z: 0 }
    ]
  }, {
    name: 'tail',
    material: 'wood',
    radius: 0.05,
    vertices: [
      { x: -2.2, y: 0.2, z: 1 },
      { x: -1, y: 0, z: 1.9 }
    ]
  }, {
    name: 'body',
    material: 'wood',
    radius: 0.5,
    vertices: [
      { x: -1, y: 0, z: 1.5 },
      { x: +1, y: 0, z: 1.5 }
    ]
  }, {
    name: 'head',
    material: 'wood',
    radius: 0.25,
    vertices: [
      { x: +1, y: 0, z: 1.9 },
      { x: +1.2, y: 0, z: 2.4 },
      { x: +1.9, y: 0, z: 2.1 }
    ]
  }, {
    name: 'front legs',
    material: 'wood',
    radius: 0.1,
    vertices: [
      { x: +1, y: -0.5, z: 0 },
      { x: +1, y: 0, z: 1.5 },
      { x: +1, y: +0.5, z: 0 }
    ]
  }]
}
