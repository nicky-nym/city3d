/** @file copy.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.COPY', function () {
    const ajv = new Ajv()
    ajv.addSchema(SCHEMA.GRID, SCHEMA.GRID.$id)
    ajv.addSchema(SCHEMA.PLACEMENT, SCHEMA.PLACEMENT.$id)
    const validator = ajv.compile(SCHEMA.COPY)

    it('should accept a simple valid copy spec', function () {
      const goodJSON = {
        name: '1414 Ivy Street',
        copy: {
          $ref: 'CITY.buildings.cottage'
        },
        at: { x: 1, y: 2, z: 0 }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a copy spec with override settings', function () {
      const goodJSON = {
        name: '1418 Ivy Street',
        copy: { $ref: 'CITY.buildings.cottage' },
        at: {
          x: 1, y: 2, z: 0, rotated: 90, mirrored: true
        },
        settings: {
          storeys: [{
            height: 7,
            roof: { form: 'pitched', pitch: { rise: 12, run: 12 } }
          }]
        }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a copy spec with a repeat pattern', function () {
      const goodJSON = {
        name: 'telephone poles',
        copy: { $ref: 'CITY.structures.utility_pole' },
        at: { x: 0, y: 0, z: 0 },
        repeat: { rows: 28, cols: 1, dx: 88 }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a copy spec with only a copy: property', function () {
      const goodJSON = {
        copy: { $ref: 'CITY.buildings.cottage' }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should reject a copy spec with a bad copy: property', function () {
      const badJSON = {
        copy: { ref: 'CITY.buildings.cottage' }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject a copy spec with no copy: property', function () {
      const badJSON = {
        name: '1414 Ivy Street',
        at: { x: 1, y: 2, z: 0 }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the outline', function () {
      const badJSON = true
      const alsoBad = 88
      const worse = []
      const omg = null

      validator(badJSON).should.equal(false)
      validator(alsoBad).should.equal(false)
      validator(worse).should.equal(false)
      validator(omg).should.equal(false)
      validator().should.equal(false)
    })
  })
})
