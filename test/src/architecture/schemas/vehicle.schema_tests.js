/** @file pitch.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { SCHEMA } from '../../../../src/architecture/schemas/schema.js'
import VEHICLE_SPECS from '../../../../content/movers/vehicles.json.js'

/* global describe, it */

describe('schemas', function () {
  describe('vehicle.schema', function () {
    const ajv = new Ajv()
    const validator = ajv.compile(SCHEMA.VEHICLE)

    it('should accept a simple valid vehicle(s) object', function () {
      const goodJSON = {
        unicycle: {
          color: 0xff6600,
          saddles: [{ up: 3.8, bottomOffset: 0 }],
          wheels: [{
            diameter: 2.25,
            spokes: 18
          }]
        }
      }
      validator(goodJSON).should.equal(true)
    })

    it('should accept all the vehicles we define in our /content directory', function () {
      const goodJSON = VEHICLE_SPECS
      validator(goodJSON).should.equal(true)
    })

    it('should reject any non-object substitute for the vehicle(s) object', function () {
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
