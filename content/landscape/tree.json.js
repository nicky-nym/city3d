export default /* eslint-disable */
{
  context: 'city3d',
  type: 'structure.schema.json',
  name: 'Tree',
  layer: 'trees & plants',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  def: {
    height: 10
  },
  comments: [
    "A simple tree"
  ],
  lines: [{
    name: 'trunk',
    material: 'wood',
    vertices: [
      { x: 0, y: 0, z: -2 },
      { x: 0, y: 2, z: 6 },
      { x: 2, y: 2, z: 10 },
      { x: 2, y: 0, z: 13 }
    ]
  }, {
    name: 'branch',
    material: 'wood',
    vertices: [
      { x: 0, y: 2, z: 6 },
      { x: -1, y: 6, z: 10 },
      { x: -1, y: 8, z: 14 }
    ]
  }, {
    name: 'branch',
    material: 'wood',
    vertices: [
      { x: -4, y: 6, z: 12 },
      { x: -1, y: 6, z: 10 },
      { x: 2, y: 8, z: 13 }
    ]
  }, {
    name: 'branch',
    material: 'wood',
    vertices: [
      { x: 2, y: 2, z: 10 },
      { x: 4, y: 3, z: 12 },
      { x: 4, y: 4, z: 14 }
    ]
  }, {
    name: 'branch',
    material: 'wood',
    vertices: [
      { x: 0, y: 2, z: 6 },
      { x: 1, y: -1, z: 9 }
    ]
  }]
}
