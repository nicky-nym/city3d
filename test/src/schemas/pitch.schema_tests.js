/** @file pitch.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../test/src/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.PITCH', function () {
    const ajv = new Ajv()
    const validator = ajv.compile(SCHEMA.PITCH)

    it('should accept a simple valid {rise:, run:} object', function () {
      const goodJSON = { rise: 4, run: 12 }
      validator(goodJSON).should.equal(true)
    })

    it('should accept floating point numbers', function () {
      const goodJSON = { rise: 4.4, run: 12.2 }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a flat pitch', function () {
      const goodJSON = { rise: 0, run: 12 }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a steep pitch', function () {
      const goodJSON = { rise: 144, run: 12 }
      validator(goodJSON).should.equal(true)
    })

    it('should reject any negative rise values', function () {
      const badJSON = { rise: -1, run: 12 }
      validator(badJSON).should.equal(false)
    })

    it('should reject any negative run values', function () {
      const badJSON = { rise: 1, run: -12 }
      validator(badJSON).should.equal(false)
    })

    it('should reject a zero run values', function () {
      const badJSON = { rise: 1, run: 0 }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-numeric pitch values', function () {
      const badJSON = { rise: false, run: 12 }
      validator(badJSON).should.equal(false)
    })

    it('should reject any string {rise:, run:} values', function () {
      const badJSON = { rise: 0, run: '33' }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for {rise:, run:}', function () {
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
