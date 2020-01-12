/** @file outline.schema_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import xySchema from '../../../../src/architecture/schemas/xy.schema.json.js'
import outlineSchema from '../../../../src/architecture/schemas/outline.schema.json.js'

/* global describe, it */

describe('schemas', function () {
  describe('outline.schema', function () {
    const ajv = new Ajv()
    ajv.addSchema(xySchema, 'xy.schema.json')
    ajv.addSchema(outlineSchema, 'outline.schema.json')
    const outlineValidator = ajv.compile(outlineSchema)

    it('should accept a simple valid rectangle spec', function () {
      const goodOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 }
      }
      outlineValidator(goodOutline).should.equal(true)
    })

    it('should accept a simple valid polygon spec', function () {
      const goodOutline = {
        shape: 'polygon',
        corners: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 }
        ]
      }
      outlineValidator(goodOutline).should.equal(true)
    })

    it('should reject polygons with only two corners', function () {
      const badOutline = {
        shape: 'polygon',
        corners: [
          { x: 1, y: 1 },
          { x: 2, y: 2 }
        ]
      }
      outlineValidator(badOutline).should.equal(false)
    })

    it('should reject unrecognized shapes', function () {
      const badOutline = {
        shape: 'triangle'
      }
      outlineValidator(badOutline).should.equal(false)
    })

    it('should reject any non-object substitute for the outline', function () {
      const badOutline = true
      const alsoBad = 88
      const worse = []
      const omg = null

      outlineValidator(badOutline).should.equal(false)
      outlineValidator(alsoBad).should.equal(false)
      outlineValidator(worse).should.equal(false)
      outlineValidator(omg).should.equal(false)
      outlineValidator().should.equal(false)
    })
  })
})
