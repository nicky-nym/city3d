/** @file all_examples.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../src/schemas/schema.js'

/* global describe, it, before, after */

describe('SCHEMA', function () {
  const ajv = new Ajv()
  const schemas = Object.keys(SCHEMA).filter(item => item !== 'DEFINITIONS').map(item => SCHEMA[item])

  before(function () {
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
  })

  after(function () {
    Object.keys(SCHEMA).forEach(item => ajv.removeSchema(SCHEMA[item]))
  })

  schemas.forEach(schema => {
    describe(schema.$id, function () {
      it('should have examples.', function () {
        schema.should.have.property('examples')
        schema.examples.should.have.length.at.least(1)
      })

      it('should have only valid examples.', function () {
        const validator = ajv.compile(schema)

        schema.examples.forEach(example => {
          const msg = `example.name = ${example.name}`
          validator(example).should.equal(true, msg)
          if (example.type) {
            example.type.should.equal(schema.$id, msg)
          }
        })
      })
    })
  })
})
