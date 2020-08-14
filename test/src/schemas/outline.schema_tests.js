/** @file outline.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import DICTIONARY from '../../../src/schemas/dictionary.json.js'

/* global describe, it */

describe('DICTIONARY', function () {
  describe('DICTIONARY.typeDefinitions.outline', function () {
    const ajv = new Ajv()

    ajv.addSchema(DICTIONARY.typeDefinitions.xy, '~/typeDefinitions/xy')
    ajv.addSchema(DICTIONARY.typeDefinitions.pitch, '~/typeDefinitions/pitch')
    ajv.addSchema(DICTIONARY.typeDefinitions.xyOrRef, '~/typeDefinitions/xyOrRef')
    const validator = ajv.compile(DICTIONARY.typeDefinitions.outline)

    it('should accept a simple valid polygon spec', function () {
      const goodJSON = {
        shape: 'polygon',
        corners: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 }
        ]
      }
      validator(goodJSON).should.equal(true)
    })

    it('should reject polygons with only two corners', function () {
      const badJSON = {
        shape: 'polygon',
        corners: [
          { x: 1, y: 1 },
          { x: 2, y: 2 }
        ]
      }
      validator(badJSON).should.equal(false)
    })

    it('should accept a simple valid rectangle spec', function () {
      const goodJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a rectangle with a gabled top', function () {
      const goodJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'gabled', pitch: { rise: 4, run: 12 } }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should reject a gabled top with an invalid pitch', function () {
      const badJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'gabled', pitch: { rise: 4, run: 0 } }
      }
      validator(badJSON).should.equal(false)
    })

    it('should accept a rectangle with a arched top', function () {
      const goodJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: 0.4 }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept an arched top with no curvature', function () {
      const goodJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: 0 }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should reject an arched top with negative curvature', function () {
      const badJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: -0.1 }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject an arched top with more than 100% curvature', function () {
      const badJSON = {
        shape: 'rectangle',
        size: { x: 1, y: 2 },
        top: { style: 'arched', curvature: 1.01 }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject unrecognized shapes', function () {
      const badJSON = {
        shape: 'triangle'
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
