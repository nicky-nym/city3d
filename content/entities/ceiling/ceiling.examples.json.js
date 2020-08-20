export default /* eslint-disable */
{
  "$type": "ceiling.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'ceiling.schema.json',
      name: 'Living room ceiling',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 14, y: 16 }
      },
      surface: {
        style: 'flat',
        material: 'stucco'
      },
      fixtures: [{
        copy: { $ref: 'CITY.fixtures.ceiling_fan' },
        at: { x: 0, y: 0 }
      }],
      extras: { budget: {}, authors: {} }
    }
  ]
}
