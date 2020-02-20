export default /* eslint-disable */
{
  context: 'city3d',
  type: 'structure.schema.json',
  name: 'Utility pole',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 5, y: 0, z: 0 },
  def: {
    height: 35
  },
  comments: [
    "A telephone pole on a sidewalk"
  ],
  lines: [{
    name: 'pole',
    material: 'wood',
    radius: 0.5,
    vertices: [
      { x: 0, y: 0, z: -6 },
      { x: 0, y: 0, z: 35 }
    ]
  }, {
    name: 'upper crossarm',
    material: 'wood',
    radius: 0.25,
    vertices: [
      { x: -4.5, y: 0, z: 33 },
      { x: +4.5, y: 0, z: 33 }
    ]
  }, {
    name: 'lower crossarm',
    material: 'wood',
    radius: 0.2,
    vertices: [
      { x: -4, y: 0, z: 30 },
      { x: +4, y: 0, z: 30 }
    ]
  }]
}
