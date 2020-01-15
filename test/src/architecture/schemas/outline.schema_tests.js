/** @file outline.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'

/* global describe, it */

describe('schemas', function () {
  describe('outline.schema', function () {
    const ajv = new Ajv()
    ajv.addSchema(SCHEMA.XY, SCHEMA.XY.$id)
    ajv.addSchema(SCHEMA.PITCH, SCHEMA.PITCH.$id)
    ajv.addSchema(SCHEMA.OUTLINE, SCHEMA.OUTLINE.$id)
    const outlineValidator = ajv.compile(SCHEMA.OUTLINE)

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

    it('should accept a simple valid rectangle spec', function () {
      const goodOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 }
      }
      outlineValidator(goodOutline).should.equal(true)
    })

    it('should accept a rectangle with a gabled top', function () {
      const goodOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'gabled', pitch: { rise: 4, run: 12 } }
      }
      outlineValidator(goodOutline).should.equal(true)
    })

    it('should reject a gabled top with an invalid pitch', function () {
      const badOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'gabled', pitch: { rise: 4, run: 0 } }
      }
      outlineValidator(badOutline).should.equal(false)
    })

    it('should accept a rectangle with a arched top', function () {
      const goodOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: 0.4 }
      }
      outlineValidator(goodOutline).should.equal(true)
    })

    it('should accept an arched top with no curvature', function () {
      const goodOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: 0 }
      }
      outlineValidator(goodOutline).should.equal(true)
    })

    it('should reject an arched top with negative curvature', function () {
      const badOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: -0.1 }
      }
      outlineValidator(badOutline).should.equal(false)
    })

    it('should reject an arched top with more than 100% curvature', function () {
      const badOutline = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: 1.01 }
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
