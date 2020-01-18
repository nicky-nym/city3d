/** @file floor.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.FLOOR', function () {
    const ajv = new Ajv()
    ajv.addSchema(SCHEMA.XY, SCHEMA.XY.$id)
    ajv.addSchema(SCHEMA.PITCH, SCHEMA.PITCH.$id)
    ajv.addSchema(SCHEMA.SURFACE, SCHEMA.SURFACE.$id)
    ajv.addSchema(SCHEMA.OUTLINE, SCHEMA.OUTLINE.$id)
    ajv.addSchema(SCHEMA.DEFINITIONS, SCHEMA.DEFINITIONS.$id)
    const validator = ajv.compile(SCHEMA.FLOOR)

    it('should accept a simple valid floor spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'floor.schema.json',
        name: 'Expansive hardwood floor',
        unit: 'feet',
        outline: {
          shape: 'rectangle',
          size: { x: 100, y: 100 }
        },
        surface: {
          style: 'parquet',
          material: 'wood'
        }
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
        outline: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject specs with nested invalid values', function () {
      const badJSON = {
        surface: {
          style: [{
            leafCount: { rows: -5 }
          }]
        }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the roof spec', function () {
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
