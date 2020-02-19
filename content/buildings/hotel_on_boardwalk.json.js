export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Hotel on Boardwalk',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 18, y: 12, z: 0 },
  def: {
    /* hotel */
    A: { x: 0, y: 0 },
    B: { x: 36, y: 0 },
    C: { x: 36, y: 24 },
    D: { x: 0, y: 24 },
    /* chimney */
    a: { x: 15, y: 9 },
    b: { x: 21, y: 9 },
    c: { x: 21, y: 15 },
    d: { x: 15, y: 15 }
  },
  storeys: [{
    name: 'hotel',
    height: 18,
    roof: {
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingled',
        material: 'vinyl',
        color: 'red'
      }
    },
    walls: {
      exterior: [{
        name: 'front wall',
        surface: { material: 'vinyl', color: 'red' },
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/C' },
        roofline: 'gabled'
      }, {
        end: { $ref: '#/def/D' },
        roofline: 'pitched'
      }, {
        end: { $ref: '#/def/A' },
        roofline: 'gabled'
      }
    ]}
  }, {
    name: 'chimney',
    height: 12,
    walls: {
      exterior: [{
        begin: { $ref: '#/def/a' },
        end: { $ref: '#/def/b' },
      }, {
        end: { $ref: '#/def/c' },
      }, {
        end: { $ref: '#/def/d' },
      }, {
        end: { $ref: '#/def/a' },
      }
    ]}
  }]
}
