export default /* eslint-disable */
{
  context: 'city3d',
  type: 'structure.schema.json',
  name: 'Swing set',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 5, y: 0, z: 0 },
  def: {
    height: 8,
    span: 10,
    halfDepth: 4.5,
    splay: 1
  },
  comments: [
    "A children's playground swing set"
  ],
  lines: [{
    name: 'left truss',
    material: 'wood',
    vertices: [
      { x: -1, y: -4.5, z: 0 },
      { x: 0, y: 0, z: 8 },
      { x: -1, y: +4.5, z: 0 }
    ]
  }, {
    name: 'cross bar',
    material: 'wood',
    vertices: [
      { x: 0, y: 0, z: 8 },
      { x: 10, y: 0, z: 8 }
    ]
  }, {
    name: 'right truss',
    material: 'wood',
    vertices: [
      { x: 1 + 10, y: -4.5, z: 0 },
      { x: 10, y: 0, z: 8 },
      { x: 1 + 10, y: +4.5, z: 0 }
    ]
  }, {
    name: 'left swing',
    material: 'steel',
    vertices: [
      { x: 2, y: 0, z: 8 },
      { x: 2, y: -1, z: 1.5 },
      { x: 3.4, y: -1, z: 1.5 },
      { x: 3.4, y: 0, z: 8 }
    ]
  }, {
    name: 'right swing',
    material: 'steel',
    vertices: [
      { x: 6, y: 0, z: 8 },
      { x: 6, y: 1.8, z: 2 },
      { x: 7.4, y: 1.8, z: 2 },
      { x: 7.4, y: 0, z: 8 }
    ]
  }]
}
