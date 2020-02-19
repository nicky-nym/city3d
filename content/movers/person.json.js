export default /* eslint-disable */
{
  context: 'city3d',
  type: 'structure.schema.json',
  name: 'Person',
  layer: 'people',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 5, y: 0, z: 0 },
  comments: [
    "A stick-figure person"
  ],
  lines: [{
    name: 'legs',
    material: 'wood',
    vertices: [
      { x: -0.5, y: 0, z: 0 },
      { x: 0, y: 0, z: 2.5 },
      { x: +0.5, y: 0, z: 0 }
    ]
  }, {
    name: 'torso and head',
    material: 'wood',
    vertices: [
      { x: 0, y: 0, z: 2.5 },
      { x: 0, y: 0, z: 4.5 },
      { x: -0.4, y: 0, z: 4.8 },
      { x: -0.2, y: 0, z: 5.3 },
      { x: +0.2, y: 0, z: 5.3 },
      { x: +0.4, y: 0, z: 4.8 },
      { x: 0, y: 0, z: 4.5 }
    ]
  }, {
    name: 'arms',
    material: 'wood',
    vertices: [
      { x: -1.2, y: -0.5, z: 3.3 },
      { x: -0.5, y: -0.5, z: 3.7 },
      { x: 0, y: 0, z: 4.5 },
      { x: +1, y: +0.5, z: 4 },
      { x: +1.6, y: +0.5, z: 4.6 }
    ]
  }]
}
