/** @file wall.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schema } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.entityDefs.wall', function () {
    const validator = Schema.getEntityValidator('wall')

    it('should accept a simple valid wall spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'wall.schema.json',
        name: '2nd floor, south wall',
        unit: 'feet',
        roofline: 'gabled',
        doors: [{
          name: 'garage door',
          leafCount: { rows: 5 },
          motion: 'overhead',
          outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
          at: { x: 12, from: 'center' },
          casing: { width: 0.5 }
        }],
        windows: [],
        outside: {
          surface: {
            style: 'clapboard',
            material: 'fiber-cement'
          },
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

    it('should reject unrecognized additional optional properties', function () {
      const badJSON = { iggyPop: { no: 'fun' } }
      validator(badJSON).should.equal(false)
    })

    it('should allow for unrecognized properties in extras:', function () {
      const goodJSON = { extras: { iggyPop: { no: 'fun' } } }
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
        doors: [{
          leafCount: { rows: -5 }
        }]
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
