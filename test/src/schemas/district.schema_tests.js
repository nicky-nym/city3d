/** @file district.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.entityDefs.district', function () {
    const validator = Schematic.getEntityValidator('district')

    it('should accept a simple valid district spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'district.schema.json',
        name: 'Manhattan',
        unit: 'miles',
        border: {
          shape: 'rectangle',
          size: { x: 2.3, y: 13.4 }
        },
        parcels: [],
        contents: [{
          copy: { $ref: 'CITY.structures.eiffel_tower' },
          pose: { x: 0.2, y: 0.4 }
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
