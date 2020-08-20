export default /* eslint-disable */
{
  "$type": "storey.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'storey.schema.json',
      name: 'Third floor',
      unit: 'feet',
      floors: [{
        outline: {
          shape: 'rectangle',
          size: { x: 200, y: 200 }
        }
      }],
      extras: { budget: {}, authors: {} }
    },
    {
      height: 8,
      altitude: 40,
      floors: [],
      rooms: [],
      roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
      ceiling: {},
      walls: {
        exterior: [],
        interior: []
      }
    }
  ]
}
