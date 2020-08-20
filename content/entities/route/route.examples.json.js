export default /* eslint-disable */
{
  "$type": "route.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'route.schema.json',
      name: 'driveway to house',
      waypoints: [
        { x: 1, y: 2 },
        { x: 11, y: 22 },
        { x: 110, y: 22 }
      ]
    },
    {
      context: 'city3d',
      type: 'route.schema.json',
      name: 'historic canal',
      mode: 'canal',
      waypoints: [
        { $ref: '#/def/A' },
        { $ref: '#/def/B' },
        { $ref: '#/def/C' },
        { $ref: '#/def/D' },
      ]
    }
  ]
}
