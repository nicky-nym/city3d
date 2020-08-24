/** @file grid.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.typeDefs.grid', function () {
    const validator = Schematic.getTypeValidator('grid')

    it('should accept a simple valid grid object', function () {
      const goodJSON = { rows: 3, cols: 8 }

      validator(goodJSON).should.equal(true)
    })

    it('should accept a grid of size zero', function () {
      const goodJSON = { rows: 0, cols: 0 }

      validator(goodJSON).should.equal(true)
    })

    it('should treat both rows: and cols: as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodJSON = { iggyPop: { no: 'fun' } }
      validator(goodJSON).should.equal(true)
    })

    it('should reject a non-integer rows: value', function () {
      const badJSON = { rows: 3.3 }
      validator(badJSON).should.equal(false)
    })

    it('should reject a non-integer cols: value', function () {
      const badJSON = { cols: 2 / 3 }
      validator(badJSON).should.equal(false)
    })

    it('should reject a negative rows: value', function () {
      const badJSON = { rows: -3 }
      validator(badJSON).should.equal(false)
    })

    it('should reject a negative cols: value', function () {
      const badJSON = { cols: -2 }
      validator(badJSON).should.equal(false)
    })

    it('should reject an string cols: value', function () {
      const badJSON = { cols: '33' }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for a grid object', function () {
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
