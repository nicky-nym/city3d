/** @file garage_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Garage } from '../../../content/buildings/garage.js'
import { METRIC } from '../../../src/architecture/metric.js'
// import { xy, xyz, fullName } from '../../../src/core/util.js'

/* global describe, it */

describe('Garage', function () {
  describe('#constructor', function () {
    it('should return a Garage named "Garage" if no name is specified', function () {
      const garage = new Garage()
      garage.name.should.equal('Garage')
    })
  })

  describe('#getValueForMetric', function () {
    const garage = new Garage()

    it('should have the correct GROSS_FLOOR_AREA', function () {
      garage.getValueForMetric(METRIC.GROSS_FLOOR_AREA).should.equal(504)
    })

    // TODO: turn this on when we have a gable roof
    it.skip('should have the correct ROOF_AREA', function () {
      garage.getValueForMetric(METRIC.ROOF_AREA).should.be.closeTo(-1, 0.1)
    })

    // TODO: turn this on when we have a gable roof
    it.skip('should have the correct WALL_AREA', function () {
      garage.getValueForMetric(METRIC.WALL_AREA).should.equal(720)
    })

    it('should have the correct WALL_AREA', function () {
      garage.getValueForMetric(METRIC.WALL_AREA).should.equal(810)
    })

    it('should have the correct WINDOW_AREA', function () {
      garage.getValueForMetric(METRIC.WINDOW_AREA).should.equal(0)
    })

    it('should have the correct DAYLIGHT_FACTOR_ESTIMATE', function () {
      garage.getValueForMetric(METRIC.DAYLIGHT_FACTOR_ESTIMATE).should.equal(0)
    })
  })
})
