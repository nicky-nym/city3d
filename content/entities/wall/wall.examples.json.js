export default /* eslint-disable */
{
  "$type": "wall.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'wall.schema.json',
      name: '2nd floor, south wall',
      unit: 'feet',
      roofline: 'gabled',
      doors: [{
        name: 'garage door',
        leafCount: { rows: 5 },
        motion: 'overhead',
        outline: { shape: 'rectangle', data: { x: 16, y: 7 } },
        casing: { width: 0.5 }
      }],
      windows: [],
      outside: {
        surface: {
          style: 'clapboard',
          material: 'fiber-cement'
        },
        fixtures: [{
          at: { x: +2, y: 6 },
          copy: { $ref: 'CITY.fixtures.sconce' }
        }, {
          at: { x: -2, y: 6 },
          copy: { $ref: 'CITY.fixtures.sconce' }
        }],
        downspouts: [
          { at: { x: +0.25 } },
          { at: { x: -0.25 } }
        ]
      },
      inside: {
        surface: {
          style: 'flat',
          material: 'drywall'
        },
        fixtures: []
      },
      extras: { budget: {}, authors: {} }
    }
  ]
}
