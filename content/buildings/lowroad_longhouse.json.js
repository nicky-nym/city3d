export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Lowroad Longhouse',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  def: {
    /* longhouse */
    A: { x: 0, y: 0 },
    B: { x: 590, y: 0 },
    C: { x: 590, y: 30 },
    D: { x: 0, y: 30 },
    LONGHOUSE_WINDOWS: {
      repeat: {
        spacing: 5,
        feature: {
          motion: 'awning',
          outline: { shape: 'rectangle', size: { x: 4, y: 7 } },
          at: { x: 0, y: 7, from: 'center'}
        }
      }
    },
    LONGHOUSE_END_OPENING: {
      motion: 'awning',
      outline: { shape: 'rectangle', size: { x: 29, y: 7.5 } },
      at: { x: 0, from: 'center'}
    },
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
    { waypoints: [ { y: 6, x: 0, z: 7.5 }, { y: 6, x: 590, z: 7.5 } ]},
    { waypoints: [ { y: 12, x: 0, z: 7.5 }, { y: 12, x: 590, z: 7.5 } ]},
    { waypoints: [ { y: 18, x: 0, z: 7.5 }, { y: 18, x: 590, z: 7.5 } ]},
    { waypoints: [ { y: 24, x: 0, z: 7.5 }, { y: 24, x: 590, z: 7.5 } ]},
  ],
  storeys: [{
    name: 'ground floor (east-west)',
    repeat: 1,
    height: 7.5,
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
        windows: [{ $ref: '#/def/LONGHOUSE_WINDOWS' }]
      }, {
        end: { $ref: '#/def/C' },
        doors: [{ $ref: '#/def/LONGHOUSE_END_OPENING' }]
      }, {
        end: { $ref: '#/def/D' },
        windows: [{ $ref: '#/def/LONGHOUSE_WINDOWS' }]
      }, {
        end: { $ref: '#/def/A' },
        doors: [{ $ref: '#/def/LONGHOUSE_END_OPENING' }]
      }
    ]}
  }, {
    name: 'boulevard',
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
    name: 'top floor (east-west)',
    repeat: 1,
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
        windows: [{ $ref: '#/def/LONGHOUSE_WINDOWS' }]
      }, {
        end: { $ref: '#/def/C' },
        doors: [{ $ref: '#/def/LONGHOUSE_END_OPENING' }]
      }, {
        end: { $ref: '#/def/D' },
        windows: [{ $ref: '#/def/LONGHOUSE_WINDOWS' }]
      }, {
        end: { $ref: '#/def/A' },
        doors: [{ $ref: '#/def/LONGHOUSE_END_OPENING' }]
      }
    ]},
    roof: {
      form: 'living',
      parapetHeight: 4
    }
  }, {
    name: 'roof parapet',
    altitude: 41.5,
    height: 4,
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
