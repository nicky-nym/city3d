/** @file garage.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import GARAGE_SPEC from '../../../content/buildings/garage.json.js'
import { Schema } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('garage.json.js', function () {
  describe('garage schema validation', function () {
    const validator = Schema.getEntityValidator('building')

    it('should accept all the entire garage spec', function () {
      const goodJSON = GARAGE_SPEC
      validator(goodJSON).should.equal(true)
      // validator(goodJSON)
      // console.log(validator.errors)
    })
  })
})
