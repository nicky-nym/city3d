/** @file xy.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { xy } from '../../../../src/core/util.js'
import xySchema from '../../../../src/architecture/schemas/xy.schema.json.js'

/* global describe, it */

describe('schemas', function () {
  describe('xy.schema', function () {
    const ajv = new Ajv()
    const xyValidator = ajv.compile(xySchema)

    it('should accept a simple valid {xy} object', function () {
      const goodXY = { x: 0, y: 0 }
      xyValidator(goodXY).should.equal(true)
    })

    it('should treat both x: and y: as optional', function () {
      const goodXY = { }
      xyValidator(goodXY).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodXY = { z: 0 }
      xyValidator(goodXY).should.equal(true)
    })

    it('should accept the output from xy()', function () {
      const goodXY = xy(22, 33)
      xyValidator(goodXY).should.equal(true)
    })

    it('should reject any non-numeric {xy} values', function () {
      const badXY = { x: false, y: 0 }
      xyValidator(badXY).should.equal(false)
    })

    it('should reject any string {xy} values', function () {
      const badXY = { x: 0, y: '33' }
      xyValidator(badXY).should.equal(false)
    })

    it('should reject any non-object substitute for {xy}', function () {
      const badXY = true
      const alsoBad = 88
      const worse = []
      const omg = null

      xyValidator(badXY).should.equal(false)
      xyValidator(alsoBad).should.equal(false)
      xyValidator(worse).should.equal(false)
      xyValidator(omg).should.equal(false)
      xyValidator().should.equal(false)
    })
  })
})
