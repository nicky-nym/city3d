export default /* eslint-disable */
{
  "$type": "floor.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'floor.schema.json',
      name: 'Expansive hardwood floor',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 100, y: 100 }
      },
      surface: {
        style: 'parquet',
        material: 'wood'
      },
      extras: { budget: {}, authors: {} }
    }
  ]
}
