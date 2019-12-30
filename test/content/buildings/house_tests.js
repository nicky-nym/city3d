/** @file house_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { House } from '../../../content/buildings/house.js'
import { METRIC } from '../../../src/architecture/metric.js'
// import { xy, xyz, fullName } from '../../../src/core/util.js'

/* global describe, it */

describe('House', function () {
  describe('#constructor', function () {
    it('should return a House named "House" if no name is specified', function () {
      const house = new House()
      house.name.should.equal('House')
    })

    it('should return a House with the right name if one was specified', function () {
      const house = new House({ name: '4222 Clinton Way' })
      house.name.should.equal('4222 Clinton Way')
    })
  })

  describe('#getValueForMetric', function () {
    it('should have the correct GROSS_FLOOR_AREA', function () {
      const house = new House()
      house.getValueForMetric(METRIC.GROSS_FLOOR_AREA).should.be.closeTo(1247.5, 0.1)
    })

    it.skip('should have the correct ROOF_AREA', function () {
      const house = new House()
      house.getValueForMetric(METRIC.ROOF_AREA).should.be.closeTo(0, 0.1)
    })

    it('should have the correct WALL_AREA', function () {
      const house = new House()
      house.getValueForMetric(METRIC.WALL_AREA).should.be.closeTo(5909, 1)
    })

    it('should have the correct WINDOW_AREA', function () {
      const house = new House()
      house.getValueForMetric(METRIC.WINDOW_AREA).should.be.closeTo(262.3, 0.1)
    })

    it('should have the correct DAYLIGHT_FACTOR_ESTIMATE', function () {
      const house = new House()
      house.getValueForMetric(METRIC.DAYLIGHT_FACTOR_ESTIMATE).should.be.closeTo(4.2, 0.1)
    })
  })
})
