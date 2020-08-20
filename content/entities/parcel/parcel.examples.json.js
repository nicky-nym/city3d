export default /* eslint-disable */
{
  "$type": "parcel.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'parcel.schema.json',
      name: '#032-203-060',
      unit: 'feet',
      border: {
        shape: 'rectangle',
        size: { x: 50, y: 211 }
      },
      contents: [{
        copy: { $ref: 'Garage' },
        pose: { x: 34, y: 152 }
      }, {
        copy: { $ref: 'Cottage' },
        pose: { x: 34, y: 120 }
      }, {
        copy: { $ref: 'House 353' },
        pose: { x: 30, y: 40 }
      }],
      extras: { budget: {}, authors: {} }
    }
  ]
}
