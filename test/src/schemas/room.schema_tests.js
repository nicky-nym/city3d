/** @file room.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schema } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.entityDefs.room', function () {
    const validator = Schema.getEntityValidator('room')

    it('should accept a simple valid room spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'room.schema.json',
        name: 'Lobby',
        unit: 'feet',
        outline: {
          shape: 'rectangle',
          size: { x: 12, y: 14 }
        },
        use: 'circulation',
        contents: [{
          copy: { $ref: 'CITY.furniture.sofa' },
          at: { x: 6, y: 0 }
        }]
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

    it('should reject specs with invalid use types', function () {
      const badJSON = {
        use: 'Disco!'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject specs with nested invalid values', function () {
      const badJSON = {
        outline: {
          shape: [{
            leafCount: { rows: -5 }
          }]
        }
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject any non-object substitute for the room spec', function () {
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
