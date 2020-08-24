/** @file highrise.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import HIGHRISE_SPEC from '../../../content/buildings/highrise.json.js'
import { Schema } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('highrise.json.js', function () {
  describe('highrise schema validation', function () {
    const validator = Schema.getEntityValidator('building')

    it('should accept all the entire highrise spec', function () {
      const goodJSON = HIGHRISE_SPEC
      validator(goodJSON).should.equal(true)
    })
  })
})
