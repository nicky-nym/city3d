export default /* eslint-disable */
{
  "$type": "building.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'building.schema.json',
      name: 'Empire State Building',
      unit: 'feet',
      anchorPoint: { x: 0, y: 0, z: 0 },
      storeys: [{
        floors: [{
          outline: {
            shape: 'rectangle',
            size: { x: 200, y: 200 }
          }
        }]
      }],
      extras: { permitInfo: {}, budget: {}, authors: {} }
    },
    {
      context: 'city3d',
      type: 'building.schema.json',
      name: 'Garage',
      unit: 'feet',
      storeys: [{
        height: 8,
        floors: [{ 
          outline: { shape: 'rectangle', size: { x: 24, y: 21 } },
        }],
        rooms: [],
        roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
        ceiling: {},
        walls: {}
      }],
      extras: { permitInfo: {}, budget: {}, authors: {} }
    }
  ]
}
