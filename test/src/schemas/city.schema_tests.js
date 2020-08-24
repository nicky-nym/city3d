/** @file city.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.entityDefs.city', function () {
    const validator = Schematic.getEntityValidator('city')

    it('should accept a simple valid city spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'city.schema.json',
        name: 'New York City',
        unit: 'miles',
        border: {
          shape: 'rectangle',
          size: { x: 18, y: 26 }
        },
        districts: [
          { copy: { $ref: 'CITY.districts.The_Bronx' } },
          { copy: { $ref: 'CITY.districts.Brooklyn' } },
          { copy: { $ref: 'CITY.districts.Manhattan' } },
          { copy: { $ref: 'CITY.districts.Queens' } },
          { copy: { $ref: 'CITY.districts.Staten_Island' } }
        ],
        contents: []
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
