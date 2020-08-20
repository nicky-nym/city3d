export default /* eslint-disable */
{
  "$type": "city.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'city.schema.json',
      name: 'New York City',
      unit: 'miles',
      border: {
        shape: 'rectangle',
        size: { x: 18, y: 26 }
      },
      districts: [
        { copy: { $ref: 'CITY.districts.The_Bronx' } },
        { copy: { $ref: 'CITY.districts.Brooklyn' } },
        { copy: { $ref: 'CITY.districts.Manhattan' } },
        { copy: { $ref: 'CITY.districts.Queens' } },
        { copy: { $ref: 'CITY.districts.Staten_Island' } }
      ],
      contents: [],
      extras: { budget: {}, authors: {} }
    },
    {
      context: 'city3d',
      type: 'city.schema.json',
      name: 'London'
    }
  ]
}
