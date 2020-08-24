/** @file schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schema } from '../../../src/schemas/schema.js'
import SCHEMA from '../../../src/schemas/schema.defs.json.js'

/* global describe, it, should */
/* eslint-disable no-unused-expressions */

describe('Schema', function () {
  const numberSpec = { $ref: '~/typeDefs/numberOrRandom' }

  describe('#getAttribute', function () {
    it('should return a schema.defs.json attribute entry', function () {
      Schema.getPropertyDefinition('altitude').should.deep.equal(numberSpec)
      Schema.getPropertyDefinition('height').should.deep.equal(numberSpec)
      Schema.getPropertyDefinition('incline').should.deep.equal(numberSpec)
    })
  })

  describe('#getEntity', function () {
    it('should return schema.defs.json entity entry', function () {
      Schema.getEntityDefinition('building').description.should.equal(SCHEMA.entityDefs.building.description)
      should.equal(Schema.getEntityDefinition('building').properties.storeys, null)
    })
  })

  describe('#getSchema', function () {
    it('should return a JSON Schema object', function () {
      const schema = Schema.getSchema('building')
      schema.$id.should.equal('building.schema.json')
      schema.$schema.should.equal('http://json-schema.org/draft-07/schema#')
      schema.title.should.equal('building')
      schema.description.should.equal(SCHEMA.entityDefs.building.description)
    })
  })

  describe('#getEntityValidator', function () {
    it('should return a working validator function', function () {
      const validator = Schema.getEntityValidator('building')
      const goodJSON = {
        context: 'city3d',
        type: 'building.schema.json',
        name: 'Empire State Building'
      }
      validator(goodJSON).should.equal(true)
    })
  })
})
