/** @file metric_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { METRIC } from '../../../src/architecture/metric.js'
import { UNIT } from '../../../src/core/unit.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('METRIC', function () {
  const POPULATION = METRIC.POPULATION

  describe('#POPULATION', function () {
    it('should have been correctly initialized', function () {
      POPULATION.displayName.should.eql('Population')
      POPULATION.unit.should.eql(UNIT.count);
      (POPULATION.formula === null).should.be.true
    })
  })
})
