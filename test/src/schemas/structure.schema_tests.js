/** @file structure.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../src/schemas/schema.js'

/* global describe, it */

describe('SCHEMA', function () {
  describe('SCHEMA.STRUCTURE', function () {
    const ajv = new Ajv()
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
    const validator = ajv.compile(SCHEMA.STRUCTURE)

    it('should accept a simple valid structure spec', function () {
      const goodJSON = {
        context: 'city3d',
        type: 'structure.schema.json',
        name: 'Swing set',
        metadata: {
          license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
          creator: 'Authored at <https://github.com/nicky-nym/city3d>',
          date: '2020'
        },
        unit: 'feet',
        anchorPoint: { x: 5, y: 0, z: 0 },
        def: {
          height: 8,
          span: 10,
          halfDepth: 4.5,
          splay: 1
        },
        comments: [
          "A children's playground swing set"
        ],
        lines: [{
          name: 'left truss',
          material: 'wood',
          vertices: [
            { x: -1, y: -4.5, z: 0 },
            { x: 0, y: 0, z: 8 },
            { x: -1, y: +4.5, z: 0 }
          ]
        }, {
          name: 'cross bar',
          material: 'wood',
          vertices: [
            { x: 0, y: 0, z: 8 },
            { x: 10, y: 0, z: 8 }
          ]
        }, {
          name: 'right truss',
          material: 'wood',
          vertices: [
            { x: 1 + 10, y: -4.5, z: 0 },
            { x: 0, y: 0, z: 8 },
            { x: 1 + 10, y: +4.5, z: 0 }
          ]
        }, {
          name: 'left swing',
          material: 'steel',
          vertices: [
            { x: 2, y: 0, z: 8 },
            { x: 2, y: -1, z: 1.5 },
            { x: 3.4, y: -1, z: 1.5 },
            { x: 3.4, y: 0, z: 8 }
          ]
        }, {
          name: 'right swing',
          material: 'steel',
          vertices: [
            { x: 6, y: 0, z: 8 },
            { x: 6, y: 1.8, z: 2 },
            { x: 7.4, y: 1.8, z: 2 },
            { x: 7.4, y: 0, z: 8 }
          ]
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

    it('should reject specs with invalid values', function () {
      const badJSON = {
        lines: 'polygon'
      }
      validator(badJSON).should.equal(false)
    })

    it('should reject specs with nested invalid values', function () {
      const badJSON = {
        lines: [{
          vertices: [{ outline: { shape: 'egg-and-dart' } }]
        }]
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
