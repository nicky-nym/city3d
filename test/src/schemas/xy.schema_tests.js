/** @file xy.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it */

describe('DICTIONARY', function () {
  describe('DICTIONARY.typeDefinitions.xy', function () {
    const validator = Schematic.getTypeValidator('xy')

    it('should accept a simple valid {xy} object', function () {
      const goodJSON = { x: 0, y: 0 }
      validator(goodJSON).should.equal(true)
    })

    it('should treat both x: and y: as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodJSON = { z: 0 }
      validator(goodJSON).should.equal(true)
    })

    it('should accept the output from xy()', function () {
      const goodJSON = xy(22, 33)
      validator(goodJSON).should.equal(true)
    })

    it('should reject any non-numeric {xy} values', function () {
      const badJSON = { x: false, y: 0 }
      validator(badJSON).should.equal(false)
    })

    it('should reject any string {xy} values', function () {
      const badJSON = { x: 0, y: '33' }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for {xy}', function () {
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
