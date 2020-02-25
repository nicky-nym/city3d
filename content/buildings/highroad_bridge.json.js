export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Highroad Bridge',
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
    B: { x: 30, y: 0 },
    C: { x: 30, y: 60 },
    D: { x: 0, y: 60 },
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
  storeys: [{
    name: 'boulevard',
    altitude: 22.5,
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
    altitude: 41.5,
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
