export default /* eslint-disable */
{
  "$type": "structure.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'structure.schema.json',
      name: 'Swing set',
      unit: 'feet',
      anchorPoint: { x: 5, y: 0, z: 0 },
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
          { x: 0, y: 0, z: 8 },
          { x: 1 + 10, y: +4.5, z: 0 }
        ]
      }],
      extras: { permitInfo: {}, budget: {}, authors: {} }
    }
  ]
}
