/** @file schema.defs_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import SCHEMA from '../../../src/schemas/schema.defs.json.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('SCHEMA', function () {
  describe('SCHEMA.entityDefs', function () {
    const entityDefs = SCHEMA.entityDefs
    const entityKeys = Object.keys(entityDefs)

    it('should have an entry for the "building" entity definition', function () {
      entityDefs.building.should.exist
    })

    it('should have properties for the "building" entity definition', function () {
      entityDefs.building.properties.should.exist
    })

    it('should have entries for all the entity definitions', function () {
      entityKeys.length.should.equal(16)
    })
  })

  describe('SCHEMA.propertyDefs', function () {
    const propertyDefinitionKeys = Object.keys(SCHEMA.propertyDefs)

    it('should have entries for lots of property definitions', function () {
      propertyDefinitionKeys.length.should.equal(53)
    })
  })
})
