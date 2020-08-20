export default /* eslint-disable */
{
  "$type": "copy",
  "examples": [
    {
      name: '1414 Ivy Street',
      copy: {
        $ref: 'CITY.buildings.cottage'
      },
      pose: { x: 1, y: 2, z: 0 }
    },
    {
      name: '1418 Ivy Street',
      copy: { $ref: 'CITY.buildings.cottage' },
      pose: {
        x: 1, y: 2, z: 0, rotated: 90, mirrored: true
      },
      settings: {
        storeys: [{
          height: 7,
          roof: { form: 'pitched', pitch: { rise: 12, run: 12 } }
        }]
      }
    },
    {
      name: 'telephone poles',
      copy: { $ref: 'CITY.structures.utility_pole' },
      pose: { x: 0, y: 0, z: 0 },
      repeat: { count: 5, offset: { y: 160 } }
    }
  ]
}
