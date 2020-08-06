/** @file schematic_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'

import { Schematic } from '../../../src/schemas/schematic.js'
import DICTIONARY from '../../../src/schemas/dictionary.json.js'
import { SCHEMA } from '../../../test/src/schemas/schema.js'

/* global describe, it, should */
/* eslint-disable no-unused-expressions */

describe('Schematic', function () {
  const numberSpec = { $ref: 'definitions.json#/def/number' }

  describe('#getAttribute', function () {
    it('should return a dictionary.json attribute entry', function () {
      Schematic.getAttribute('altitude').should.deep.equal(numberSpec)
      Schematic.getAttribute('height').should.deep.equal(numberSpec)
      Schematic.getAttribute('incline').should.deep.equal(numberSpec)
    })
  })

  describe('#getEntity', function () {
    it('should return dictionary.json entity entry', function () {
      Schematic.getEntity('building').description.should.equal(DICTIONARY.entities.building.description)
      should.equal(Schematic.getEntity('building').properties.storeys, null)
    })
  })

  describe('#getSchema', function () {
    it('should return a JSON Schema object', function () {
      const schema = Schematic.getSchema('building')
      schema.$id.should.equal('building.schema.json')
      schema.$schema.should.equal('http://json-schema.org/draft-07/schema#')
      schema.title.should.equal('building')
      schema.description.should.equal(DICTIONARY.entities.building.description)
    })

    it('should return a valid JSON Schema object', function () {
      const ajv = new Ajv()
      Object.keys(SCHEMA).forEach(item => SCHEMA[item].$id !== 'building.schema.json' ? ajv.addSchema(SCHEMA[item], SCHEMA[item].$id) : null)
      const schema = Schematic.getSchema('building')
      ajv.addSchema(schema, schema.$id)
      const validator = ajv.compile(schema)
      // console.log(schema)
      // 'foo'.should.equal(schema)
      const goodJSON = {
        context: 'city3d',
        type: 'building.schema.json',
        name: 'Empire State Building'
      }
      validator(goodJSON).should.equal(true)
    })

    it.skip('should return the expected JSON Schema object', function () {
      const schema = Schematic.getSchema('building')
      schema.should.deep.equal(SCHEMA.BUILDING)
    })
  })
})
