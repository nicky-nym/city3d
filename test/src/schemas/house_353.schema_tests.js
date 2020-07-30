/** @file house_353.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../test/src/schemas/schema.js'
import HOUSE_SPEC from '../../../content/buildings/house_353.json.js'

/* global describe, it */

describe('house_353.json.js', function () {
  describe('house 353 schema validation', function () {
    const ajv = new Ajv()
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
    const validator = ajv.compile(SCHEMA.BUILDING)

    it('should accept the entire house spec', function () {
      const goodJSON = HOUSE_SPEC
      validator(goodJSON).should.equal(true)
    })
  })
})
