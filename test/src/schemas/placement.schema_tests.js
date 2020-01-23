/** @file placement.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.PLACEMENT', function () {
    const ajv = new Ajv()
    const validator = ajv.compile(SCHEMA.PLACEMENT)

    it('should accept a simple valid placement object', function () {
      const goodJSON = {
        x: 1,
        y: 2,
        z: 0,
        from: 'center',
        rotated: 90,
        mirrored: true
      }

      validator(goodJSON).should.equal(true)
    })

    it('should treat all properties as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodJSON = { z: 0 }
      validator(goodJSON).should.equal(true)
    })

    it('should reject an invalid x: value', function () {
      const badJSON = { x: true }
      validator(badJSON).should.equal(false)
    })

    it('should reject an invalid y: value', function () {
      const badJSON = { y: '33' }
      validator(badJSON).should.equal(false)
    })

    it('should reject an invalid z: value', function () {
      const badJSON = { z: { } }
      validator(badJSON).should.equal(false)
    })

    it('should reject an invalid from: value', function () {
      const badJSON = { from: 'midpoint' }
      validator(badJSON).should.equal(false)
    })

    it('should reject an invalid rotated: value', function () {
      const badJSON = { rotated: -90 }
      validator(badJSON).should.equal(false)
    })

    it('should reject an invalid mirrored: value', function () {
      const badJSON = { mirrored: 'true' }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for a surface object', function () {
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
