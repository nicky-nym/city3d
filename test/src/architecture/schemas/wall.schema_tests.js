/** @file wall.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.WALL', function () {
    const ajv = new Ajv()
    ajv.addSchema(SCHEMA.COPY, SCHEMA.COPY.$id)
    ajv.addSchema(SCHEMA.DOOR, SCHEMA.DOOR.$id)
    ajv.addSchema(SCHEMA.GRID, SCHEMA.GRID.$id)
    ajv.addSchema(SCHEMA.OUTLINE, SCHEMA.OUTLINE.$id)
    ajv.addSchema(SCHEMA.PITCH, SCHEMA.PITCH.$id)
    ajv.addSchema(SCHEMA.PLACEMENT, SCHEMA.PLACEMENT.$id)
    ajv.addSchema(SCHEMA.SURFACE, SCHEMA.SURFACE.$id)
    ajv.addSchema(SCHEMA.WINDOW, SCHEMA.WINDOW.$id)
    ajv.addSchema(SCHEMA.XY, SCHEMA.XY.$id)
    const validator = ajv.compile(SCHEMA.WALL)

    it('should accept a simple valid wall spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'wall.schema.json',
        name: '2nd floor, south wall',
        unit: 'feet',
        roofline: 'gabled',
        outside: {
          surface: {
            style: 'clapboard',
            material: 'fiber-cement'
          },
          doors: [{
            name: 'garage door',
            leafCount: { rows: 5 },
            motion: 'overhead',
            outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
            center: 12,
            casing: { width: 0.5 }
          }],
          windows: [],
          fixtures: [{
            at: { x: +2, y: 6 },
            copy: { $ref: 'CITY.fixtures.sconce' }
          }, {
            at: { x: -2, y: 6 },
            copy: { $ref: 'CITY.fixtures.sconce' }
          }],
          downspouts: [
            { at: { x: +0.25 } },
            { at: { x: -0.25 } }
          ]
        },
        inside: {
          surface: {
            style: 'flat',
            material: 'drywall'
          },
          fixtures: []
        }
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

    it('should reject wall specs with invalid roofline types', function () {
      const badJSON = {
        roofline: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject door specs with nested invalid values', function () {
      const badJSON = {
        outside: {
          doors: [{
            leafCount: { rows: -5 }
          }]
        }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the wall spec', function () {
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
