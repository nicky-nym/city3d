export default /* eslint-disable */
{
  "$type": "room.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'room.schema.json',
      name: 'Lobby',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 12, y: 14 }
      },
      use: 'circulation',
      contents: [{
        copy: { $ref: 'CITY.furniture.sofa' },
        at: { x: 6, y: 0 }
      }],
      extras: { budget: {}, authors: {} }
    }
  ]
}
