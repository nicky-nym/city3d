/** @file roof.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('DICTIONARY', function () {
  describe('DICTIONARY.entityDefs.roof', function () {
    const validator = Schematic.getEntityValidator('roof')

    it('should accept a simple valid roof spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'roof.schema.json',
        name: 'Cottage roof (gabled)',
        unit: 'feet',
        outline: {
          shape: 'rectangle',
          size: { x: 100, y: 100 }
        },
        form: 'pitched',
        pitch: { rise: 8, run: 12 },
        eaves: 1,
        surface: {
          style: 'shingled',
          material: 'asphalt composition'
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

    it('should reject specs with invalid roofline forms', function () {
      const badJSON = {
        form: 'polygon'
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
