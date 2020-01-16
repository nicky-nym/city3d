/** @file parcel.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.PARCEL', function () {
    const ajv = new Ajv()
    ajv.addSchema(SCHEMA.XY, SCHEMA.XY.$id)
    ajv.addSchema(SCHEMA.COPY, SCHEMA.COPY.$id)
    ajv.addSchema(SCHEMA.GRID, SCHEMA.GRID.$id)
    ajv.addSchema(SCHEMA.PITCH, SCHEMA.PITCH.$id)
    ajv.addSchema(SCHEMA.OUTLINE, SCHEMA.OUTLINE.$id)
    ajv.addSchema(SCHEMA.PLACEMENT, SCHEMA.PLACEMENT.$id)
    const validator = ajv.compile(SCHEMA.PARCEL)

    it('should accept a simple valid parcel spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'parcel.schema.json',
        name: '#032-203-060',
        unit: 'feet',
        border: {
          shape: 'rectangle',
          size: { x: 50, y: 211 }
        },
        contents: [{
          copy: { $ref: 'CITY.buildings.garage' },
          at: { x: 34, y: 152 }
        }, {
          copy: { $ref: 'CITY.buildings.cottage' },
          at: { x: 34, y: 120 }
        }, {
          copy: { $ref: 'CITY.buildings.house' },
          at: { x: 30, y: 40 }
        }]
      }
      validator(goodJSON).should.equal(true)
    })

    it('should treat all parameters as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodJSON = { iggyPop: { no: 'fun' } }
      validator(goodJSON).should.equal(true)
    })

    it('should reject specs with invalid values', function () {
      const badJSON = {
        contents: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject door specs with nested invalid values', function () {
      const badJSON = {
        border: { shape: -5 }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the spec', function () {
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
