export default /* eslint-disable */
{
  context: 'city3d',
  type: 'structure.schema.json',
  name: 'Table',
  layer: 'furniture',
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
    "A simple dining room table"
  ],
  lines: [{
    name: 'tabletop edge',
    material: 'wood',
    vertices: [
      { x: +1.5, y: -3.7, z: 2.5 },
      { x: -1.5, y: -3.7, z: 2.5 },
      { x: -3.7, y: -1.5, z: 2.5 },
      { x: -3.7, y: +1.5, z: 2.5 },
      { x: -1.5, y: +3.7, z: 2.5 },
      { x: +1.5, y: +3.7, z: 2.5 },
      { x: +3.7, y: +1.5, z: 2.5 },
      { x: +3.7, y: -1.5, z: 2.5 },
      { x: +1.5, y: -3.7, z: 2.5 }
    ]
  }, {
    name: 'leg',
    material: 'wood',
    vertices: [
      { x: -2, y: -0.1, z: 0 },
      { x: +2, y: -0.1, z: 2.5 }
    ]
  }, {
    name: 'leg',
    material: 'wood',
    vertices: [
      { x: +0.1, y: -2, z: 0 },
      { x: +0.1, y: +2, z: 2.5 }
    ]
  }, {
    name: 'leg',
    material: 'wood',
    vertices: [
      { x: +2, y: +0.1, z: 0 },
      { x: -2, y: +0.1, z: 2.5 }
    ]
  }, {
    name: 'leg',
    material: 'wood',
    vertices: [
      { x: -0.1, y: +2, z: 0 },
      { x: -0.1, y: -2, z: 2.5 }
    ]
  }]
}
