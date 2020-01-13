/** @file pitch.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import vehicleSchema from '../../../../src/architecture/schemas/vehicle.schema.json.js'
import VEHICLE_SPECS from '../../../../content/movers/vehicles.json.js'

/* global describe, it */

describe('schemas', function () {
  describe('vehicle.schema', function () {
    const ajv = new Ajv()
    const vehicleValidator = ajv.compile(vehicleSchema)

    it('should accept a simple valid vehicle(s) object', function () {
      const goodVehicle = {
        unicycle: {
          color: 0xff6600,
          saddles: [{ up: 3.8, bottomOffset: 0 }],
          wheels: [{
            diameter: 2.25,
            spokes: 18
          }]
        }
      }
      vehicleValidator(goodVehicle).should.equal(true)
    })

    it('should accept all the vehicles we define in our /content directory', function () {
      const goodVehicle = VEHICLE_SPECS
      vehicleValidator(goodVehicle).should.equal(true)
    })

    it('should reject any non-object substitute for the vehicle(s) object', function () {
      const badVehicle = true
      const alsoBad = 88
      const worse = []
      const omg = null

      vehicleValidator(badVehicle).should.equal(false)
      vehicleValidator(alsoBad).should.equal(false)
      vehicleValidator(worse).should.equal(false)
      vehicleValidator(omg).should.equal(false)
      vehicleValidator().should.equal(false)
    })
  })
})
