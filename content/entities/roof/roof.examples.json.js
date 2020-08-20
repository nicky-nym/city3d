export default /* eslint-disable */
{
  "$type": "roof.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'roof.schema.json',
      name: 'Cottage roof (gabled)',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 100, y: 100 }  
      },
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'asphalt composition'
      },
      extras: { budget: {}, authors: {} }
    }
  ]
}
