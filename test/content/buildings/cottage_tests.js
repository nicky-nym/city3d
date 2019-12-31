/** @file cottage_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Cottage } from '../../../content/buildings/cottage.js'
import { METRIC } from '../../../src/architecture/metric.js'
// import { xy, xyz, fullName } from '../../../src/core/util.js'

/* global describe, it */

describe('Cottage', function () {
  describe('#constructor', function () {
    it('should return a Cottage named "Cottage" if no name is specified', function () {
      const cottage = new Cottage()
      cottage.name.should.equal('Cottage')
    })
  })

  describe('#getValueForMetric', function () {
    const cottage = new Cottage()

    it('should have the correct GROSS_FLOOR_AREA', function () {
      cottage.getValueForMetric(METRIC.GROSS_FLOOR_AREA).should.equal(630)
    })

    // TODO: turn this on when we have a gable roof
    it.skip('should have the correct ROOF_AREA', function () {
      cottage.getValueForMetric(METRIC.ROOF_AREA).should.be.closeTo(-1, 0.1)
    })

    it('should have the correct WALL_AREA', function () {
      cottage.getValueForMetric(METRIC.WALL_AREA).should.equal(918)
    })

    // TODO: turn this on when we have added the windows
    it.skip('should have the correct WINDOW_AREA', function () {
      cottage.getValueForMetric(METRIC.WINDOW_AREA).should.equal(-1)
    })

    // TODO: turn this on when we have added the windows
    it.skip('should have the correct DAYLIGHT_FACTOR_ESTIMATE', function () {
      cottage.getValueForMetric(METRIC.DAYLIGHT_FACTOR_ESTIMATE).should.be.closeTo(-1, 0.1)
    })
  })
})
