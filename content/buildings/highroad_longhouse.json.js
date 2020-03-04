export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Highroad Longhouse',
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
    B: { x: 30, y: 0 },
    C: { x: 30, y: 590 },
    D: { x: 0, y: 590 },
    LONGHOUSE_WINDOWS: {
      repeat: {
        spacing: 5,
        feature: {
          motion: 'awning',
          outline: { shape: 'rectangle', size: { x: 4, y: 6 } },
          at: { x: 0, y: 6, from: 'center'}
        }
      }
    },
    LONGHOUSE_END_WINDOW: {
      motion: 'awning',
      outline: { shape: 'rectangle', size: { x: 29, y: 3 } },
      at: { x: 0, y: 7.5, from: 'center'}
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
    { waypoints: [ { x: 6, y: 0, z: 30 }, { x: 6, y: 590, z: 30 } ]},
    { waypoints: [ { x: 12, y: 0, z: 30 }, { x: 12, y: 590, z: 30 } ]},
    { waypoints: [ { x: 18, y: 0, z: 30 }, { x: 18, y: 590, z: 30 } ]},
    { waypoints: [ { x: 24, y: 0, z: 30 }, { x: 24, y: 590, z: 30 } ]},
  ],
  storeys: [{
    name: 'lower floors (north-south)',
    repeat: 3,
    height: 10,
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
        windows: [{ $ref: '#/def/LONGHOUSE_END_WINDOW' }]
      }, {
        end: { $ref: '#/def/C' },
        windows: [{ $ref: '#/def/LONGHOUSE_WINDOWS' }]
      }, {
        end: { $ref: '#/def/D' },
        windows: [{ $ref: '#/def/LONGHOUSE_END_WINDOW' }]
      }, {
        end: { $ref: '#/def/A' },
        windows: [{ $ref: '#/def/LONGHOUSE_WINDOWS' }]
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
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/C' },
        windows: [{ $ref: '#/def/BOULEVARD_WINDOWS' }]
      }, {
        end: { $ref: '#/def/D' },
        doors: [{ $ref: '#/def/BOULEVARD_END_OPENING' }]
      }, {
        end: { $ref: '#/def/A' },
        windows: [{ $ref: '#/def/BOULEVARD_WINDOWS' }]
      }
    ]},
    roof: {
      form: 'living',
      parapetHeight: 4
    }
  }, {
    name: 'roof parapet',
    altitude: 49,
    height: 4,
    walls: {
      exterior: [{
        begin: { $ref: '#/def/B' },
        end: { $ref: '#/def/C' }
      }, {
        begin: { $ref: '#/def/D' },
        end: { $ref: '#/def/A' }
      }]
    }
  }]
}
