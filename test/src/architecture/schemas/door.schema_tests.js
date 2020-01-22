/** @file door.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.DOOR', function () {
    const ajv = new Ajv()
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
    const validator = ajv.compile(SCHEMA.DOOR)

    it('should accept a simple valid door spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'door.schema.json',
        name: 'garage door',
        unit: 'feet',
        motion: 'overhead',
        outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
        leafCount: { rows: 5 },
        handleSide: 'left',
        at: { x: 12 },
        casing: { width: 0.5 }
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

    it('should reject door specs with invalid motion types', function () {
      const badJSON = {
        motion: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject door specs with nested invalid values', function () {
      const badJSON = {
        leafCount: { rows: -5 }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the outline', function () {
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
