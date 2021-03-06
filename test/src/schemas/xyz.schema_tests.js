/** @file xy.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schema } from '../../../src/schemas/schema.js'
import { xyz } from '../../../src/core/util.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.typeDefs.xyzOrRef', function () {
    const validator = Schema.getTypeValidator('xyzOrRef')

    it('should accept a simple valid {xyz} object', function () {
      const goodJSON = { x: 0, y: 0, z: 0 }
      validator(goodJSON).should.equal(true)
    })

    it('should treat x: y: and z: as all optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodJSON = { q: 0 }
      validator(goodJSON).should.equal(true)
    })

    it('should accept the output from xyz()', function () {
      const goodJSON = xyz(22, 33, -44)
      validator(goodJSON).should.equal(true)
    })

    it('should reject any non-numeric {xyz} values', function () {
      const badJSON = { x: false, y: 0, z: 0 }
      validator(badJSON).should.equal(false)
    })

    it('should reject any string {xy} values', function () {
      const badJSON = { x: 0, y: 0, z: '33' }
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
