/** @file vehicle_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Route } from '../../../src/routes/route.js'
import { Vehicle } from '../../../content/movers/vehicle.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

// TODO: test case of multiple Vehicles on the same Route

describe('Vehicle', function () {
  describe('#constructor', function () {
    it('should create a Vehicle of the specified type', function () {
      const v = new Vehicle(new Route([[0, 0, 0], [500, 0, 0]]), 0.5, 'unicycle')

      v.threeComponent.name.should.equal('unicycle')
      v.threeComponent.userData.spinningWheels.should.have.length(1)
    })
  })
  describe('#update()', function () {
    it('should not change the position if speed = 0', function () {
      const v = new Vehicle(new Route([[100, 0, 0], [100, 100, 0]]), 0)

      v.update.bind(v).should.not.change(v, 'position')
    })
    it('should change the position if speed > 0', function () {
      const v = new Vehicle(new Route([[100, 0, 0], [100, 100, 0]]), 0.5)

      v.update.bind(v).should.change(v, 'position')
    })
  })
})
