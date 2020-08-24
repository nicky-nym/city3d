/** @file house_353.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import HOUSE_SPEC from '../../../content/buildings/house_353.json.js'
import { Schema } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('house_353.json.js', function () {
  describe('house 353 schema validation', function () {
    const validator = Schema.getEntityValidator('building')

    it('should accept the entire house spec', function () {
      const goodJSON = HOUSE_SPEC
      validator(goodJSON).should.equal(true)
    })
  })
})
