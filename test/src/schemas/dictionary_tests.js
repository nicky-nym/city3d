/** @file dictionary_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import DICTIONARY from '../../../src/schemas/dictionary.json.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('dictionary', function () {
  describe('dictionary.entities', function () {
    const entities = DICTIONARY.entities
    const entityKeys = Object.keys(DICTIONARY.entities)

    it('should have an entry for the "building" entity', function () {
      entities.building.should.exist
    })

    it('should have properties for the "building" entity', function () {
      entities.building.properties.should.exist
    })

    it('should have entries for all the entities', function () {
      entityKeys.length.should.equal(16)
    })
  })

  describe('dictionary.attributes', function () {
    const attributeKeys = Object.keys(DICTIONARY.attributes)

    it('should have entries for lots of attributes', function () {
      attributeKeys.length.should.equal(51)
    })
  })
})
