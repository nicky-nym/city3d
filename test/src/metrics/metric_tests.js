/** @file metric_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Metric } from '../../../src/metrics/metric.js'
import { UNIT } from '../../../src/core/unit.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Metric', function () {
  const metric = new Metric('Surface area', UNIT.squareFeet)

  describe('#constructor', function () {
    it('should initialize the metric', function () {
      metric.displayName.should.eql('Surface area')
      metric.unit.should.eql(UNIT.squareFeet);
      (metric.formula === null).should.be.true
    })
  })
})
