/** @file surface.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('DICTIONARY', function () {
  describe('DICTIONARY.typeDefinitions.surface', function () {
    const validator = Schematic.getTypeValidator('surface')

    it('should accept a simple valid surface object', function () {
      const goodJSON = {
        style: 'flat',
        material: 'drywall'
      }

      validator(goodJSON).should.equal(true)
    })

    it('should treat both style: and material: as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodJSON = { z: 0 }
      validator(goodJSON).should.equal(true)
    })

    it('should reject an invalid style: value', function () {
      const badJSON = { style: false }
      validator(badJSON).should.equal(false)
    })

    it('should reject an string material: value', function () {
      const badJSON = { material: '33' }
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
