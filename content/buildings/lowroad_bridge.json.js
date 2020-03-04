export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Lowroad Bridge',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  def: {
    /* bridge */
    A: { x: 0, y: 0 },
    B: { x: 60, y: 0 },
    C: { x: 60, y: 30 },
    D: { x: 0, y: 30 },
    BOULEVARD_WINDOWS: {
      repeat: {
        spacing: 29.5,
        feature: {
          motion: 'open',
          outline: { shape: 'rectangle', size: { x: 29, y: 11 } },
          at: { x: 0, y: 9, from: 'center'}
        }
      }
    },
    BOULEVARD_END_OPENING: {
      motion: 'awning',
      outline: { shape: 'rectangle', size: { x: 29, y: 15 } },
      at: { x: 0, from: 'center'}
    }
  },
  routes: [
    /* lowroad bridge */
    { waypoints: [ { y: 6, x: 0, z: 15 }, { y: 6, x: 60, z: 15 } ]},
    { waypoints: [ { y: 12, x: 0, z: 15 }, { y: 12, x: 60, z: 15 } ]},
    { waypoints: [ { y: 18, x: 0, z: 15 }, { y: 18, x: 60, z: 15 } ]},
    { waypoints: [ { y: 24, x: 0, z: 15 }, { y: 24, x: 60, z: 15 } ]},
    /* highroad u-turns */
    { waypoints: [
      { y: 0, x: 71, z: 30 },
      { y: 5, x: 65, z: 30 },
      { y: 12, x: 40, z: 30 },
      { y: 12, x: 20, z: 30 },
      { y: 5, x: -5, z: 30 },
      { y: 0, x: -11, z: 30 }
    ]},
    { waypoints: [
      { y: 30, x: -11, z: 30 },
      { y: 25, x: -5, z: 30 },
      { y: 18, x: 20, z: 30 },
      { y: 18, x: 40, z: 30 },
      { y: 25, x: 65, z: 30 },
      { y: 30, x: 71, z: 30 }
    ]}
  ],
  storeys: [{
    name: 'boulevard',
    altitude: 15,
    height: 15,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/A' }
        ]
      }
    }],
    walls: {
      exterior: [{
        name: 'front wall',
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' },
        windows: [{ $ref: '#/def/BOULEVARD_WINDOWS' }]
      }, {
        end: { $ref: '#/def/C' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/D' },
        windows: [{ $ref: '#/def/BOULEVARD_WINDOWS' }]
      }, {
        end: { $ref: '#/def/A' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }
    ]}
  }, {
    name: 'roof parapet',
    height: 4,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/A' }
        ]
      }
    }],
    walls: {
      exterior: [{
        begin: { $ref: '#/def/A' },
        end: { $ref: '#/def/B' }
      }, {
        begin: { $ref: '#/def/C' },
        end: { $ref: '#/def/D' }
      }]
    }
  }]
}
