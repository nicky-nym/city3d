/** @file cottage.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import COTTAGE_SPEC from '../../../content/buildings/cottage.json.js'
import { Schema } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('cottage.json.js', function () {
  describe('cottage schema validation', function () {
    const validator = Schema.getEntityValidator('building')

    it('should accept all the entire cottage spec', function () {
      const goodJSON = COTTAGE_SPEC
      validator(goodJSON).should.equal(true)
      // ajv.validate('building.schema.json', goodJSON)
      // Object.keys(goodJSON.storeys[0].walls.exterior[0]).toString().should.equal("nope!")
      // ajv.errorsText().should.equal(3)
    })
  })
})
