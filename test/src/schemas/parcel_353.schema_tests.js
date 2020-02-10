/** @file parcel_353.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../src/schemas/schema.js'
import PARCEL_353_SPEC from '../../../content/parcels/parcel_353.json.js'

/* global describe, it */

describe('parcel_353.json.js', function () {
  describe('parcel 353 schema validation', function () {
    const ajv = new Ajv()
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
    const validator = ajv.compile(SCHEMA.PARCEL)

    it('should accept the entire parcel spec', function () {
      const goodJSON = PARCEL_353_SPEC
      validator(goodJSON).should.equal(true)
    })
  })
})
