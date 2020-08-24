/** @file parcel.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('DICTIONARY', function () {
  describe('DICTIONARY.entityDefs.parcel', function () {
    const validator = Schematic.getEntityValidator('parcel')

    it('should accept a simple valid parcel spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'parcel.schema.json',
        name: '#032-203-060',
        unit: 'feet',
        border: {
          shape: 'rectangle',
          size: { x: 50, y: 211 }
        },
        contents: [{
          copy: { $ref: 'CITY.buildings.garage' },
          pose: { x: 34, y: 152 }
        }, {
          copy: { $ref: 'CITY.buildings.cottage' },
          pose: { x: 34, y: 120 }
        }, {
          copy: { $ref: 'CITY.buildings.house' },
          pose: { x: 30, y: 40 }
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
        contents: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject door specs with nested invalid values', function () {
      const badJSON = {
        border: { shape: -5 }
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
