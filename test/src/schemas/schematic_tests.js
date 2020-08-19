/** @file schematic_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'
import DICTIONARY from '../../../src/schemas/dictionary.json.js'

/* global describe, it, should */
/* eslint-disable no-unused-expressions */

describe('Schematic', function () {
  const numberSpec = { $ref: '~/typeDefinitions/numberOrRandom' }

  describe('#getAttribute', function () {
    it('should return a dictionary.json attribute entry', function () {
      Schematic.getPropertyDefinition('altitude').should.deep.equal(numberSpec)
      Schematic.getPropertyDefinition('height').should.deep.equal(numberSpec)
      Schematic.getPropertyDefinition('incline').should.deep.equal(numberSpec)
    })
  })

  describe('#getEntity', function () {
    it('should return dictionary.json entity entry', function () {
      Schematic.getEntityDefinition('building').description.should.equal(DICTIONARY.entityDefinitions.building.description)
      should.equal(Schematic.getEntityDefinition('building').properties.storeys, null)
    })
  })

  describe('#getSchema', function () {
    it('should return a JSON Schema object', function () {
      const schema = Schematic.getSchema('building')
      schema.$id.should.equal('building.schema.json')
      schema.$schema.should.equal('http://json-schema.org/draft-07/schema#')
      schema.title.should.equal('building')
      schema.description.should.equal(DICTIONARY.entityDefinitions.building.description)
    })
  })

  describe('#getEntityValidator', function () {
    it('should return a working validator function', function () {
      const validator = Schematic.getEntityValidator('building')
      const goodJSON = {
        context: 'city3d',
        type: 'building.schema.json',
        name: 'Empire State Building'
      }
      validator(goodJSON).should.equal(true)
    })
  })
})
