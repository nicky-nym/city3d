/** @file highrise.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../test/src/schemas/schema.js'
import HIGHRISE_SPEC from '../../../content/buildings/highrise.json.js'

/* global describe, it */

describe('highrise.json.js', function () {
  describe('highrise schema validation', function () {
    const ajv = new Ajv()
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
    const validator = ajv.compile(SCHEMA.BUILDING)

    it('should accept all the entire highrise spec', function () {
      const goodJSON = HIGHRISE_SPEC
      validator(goodJSON).should.equal(true)
    })
  })
})
