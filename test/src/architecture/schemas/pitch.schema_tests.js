/** @file pitch.schema_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import pitchSchema from '../../../../src/architecture/schemas/pitch.schema.json.js'

/* global describe, it */

describe('schemas', function () {
  describe('pitch.schema', function () {
    const ajv = new Ajv()
    const pitchValidator = ajv.compile(pitchSchema)

    it('should accept a simple valid {rise:, run:} object', function () {
      const goodPitch = { rise: 4, run: 12 }
      pitchValidator(goodPitch).should.equal(true)
    })

    it('should accept floating point numbers', function () {
      const goodPitch = { rise: 4.4, run: 12.2 }
      pitchValidator(goodPitch).should.equal(true)
    })

    it('should accept a flat pitch', function () {
      const goodPitch = { rise: 0, run: 12 }
      pitchValidator(goodPitch).should.equal(true)
    })

    it('should accept a steep pitch', function () {
      const goodPitch = { rise: 144, run: 12 }
      pitchValidator(goodPitch).should.equal(true)
    })

    it('should reject any negative rise values', function () {
      const badPitch = { rise: -1, run: 12 }
      pitchValidator(badPitch).should.equal(false)
    })

    it('should reject any negative run values', function () {
      const badPitch = { rise: 1, run: -12 }
      pitchValidator(badPitch).should.equal(false)
    })

    it('should reject a zero run values', function () {
      const badPitch = { rise: 1, run: 0 }
      pitchValidator(badPitch).should.equal(false)
    })

    it('should reject any non-numeric pitch values', function () {
      const badPitch = { rise: false, run: 12 }
      pitchValidator(badPitch).should.equal(false)
    })

    it('should reject any string {rise:, run:} values', function () {
      const badPitch = { rise: 0, run: '33' }
      pitchValidator(badPitch).should.equal(false)
    })

    it('should reject any non-object substitute for {rise:, run:}', function () {
      const badPitch = true
      const alsoBad = 88
      const worse = []
      const omg = null

      pitchValidator(badPitch).should.equal(false)
      pitchValidator(alsoBad).should.equal(false)
      pitchValidator(worse).should.equal(false)
      pitchValidator(omg).should.equal(false)
      pitchValidator().should.equal(false)
    })
  })
})
