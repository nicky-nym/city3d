/** @file storey.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.STOREY', function () {
    const ajv = new Ajv()
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
    const validator = ajv.compile(SCHEMA.STOREY)

    it('should accept a simple valid storey spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'storey.schema.json',
        name: 'Third floor',
        unit: 'feet',
        height: 8,
        floor: {
          outline: {
            shape: 'rectangle',
            size: { x: 200, y: 200 }
          }
        },
        rooms: [],
        roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
        ceiling: {},
        walls: {
          exterior: []
        }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept a storey spec with walls', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'storey.schema.json',
        name: 'Third floor',
        unit: 'feet',
        height: 8,
        floor: {
          outline: {
            shape: 'rectangle',
            size: { x: 200, y: 200 }
          }
        },
        rooms: [],
        roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
        ceiling: {},
        walls: {
          exterior: [{
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
                center: { x: 12 },
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
          }]
        }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should treat all parameters as optional', function () {
      const goodJSON = { }
      validator(goodJSON).should.equal(true)
    })

    it('should reject unrecognized additional optional properties', function () {
      const badJSON = { iggyPop: { no: 'fun' } }
      validator(badJSON).should.equal(false)
    })

    it('should allow for unrecognized properties in extras:', function () {
      const goodJSON = { extras: { iggyPop: { no: 'fun' } } }
      validator(goodJSON).should.equal(true)
    })

    it('should reject specs with invalid data values', function () {
      const badJSON = {
        height: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject specs with nested invalid values', function () {
      const badJSON = {
        floor: {
          outline: [{
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
