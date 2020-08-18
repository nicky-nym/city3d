/** @file building.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('DICTIONARY', function () {
  describe('DICTIONARY.entityDefinitions.building', function () {
    const validator = Schematic.getEntityValidator('building')

    it('should accept a simple valid building spec', function () {
      const goodJSON = {
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
        }, {
          height: 8,
          floors: [{
            outline: {
              shape: 'rectangle',
              size: { x: 24, y: 21 }
            }
          }],
          rooms: [],
          roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
          ceiling: {},
          walls: {
            exterior: [],
            interior: []
          }
        }]
      }
      validator(goodJSON).should.equal(true)
    })

    it('should treat all parameters as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should reject unrecognized additional optional properties', function () {
      const badJSON = { iggyPop: { no: 'fun' } }
      validator(badJSON).should.equal(false)
    })

    it('should allow for unrecognized properties in extras:', function () {
      const goodJSON = { extras: { iggyPop: { no: 'fun' } } }
      validator(goodJSON).should.equal(true)
    })

    it('should reject specs with invalid values', function () {
      const badJSON = {
        storeys: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject specs with nested invalid values', function () {
      const badJSON = {
        storeys: [{
          floors: [{ outline: { shape: 'egg-and-dart' } }]
        }]
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the spec', function () {
      const badJSON = true
      const alsoBad = 88
      const worse = []
      const omg = null

      validator(badJSON).should.equal(false)
      validator(alsoBad).should.equal(false)
      validator(worse).should.equal(false)
      validator(omg).should.equal(false)
      validator().should.equal(false)
    })
  })
})
