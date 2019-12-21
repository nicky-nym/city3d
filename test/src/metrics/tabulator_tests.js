/** @file tabulator_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Tabulator } from '../../../src/metrics/tabulator.js'
// import { UNIT } from '../../../src/core/unit.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Tabulator', function () {
  const tabulator = new Tabulator()

  describe('#constructor', function () {
    it('should initialize the tabulator to have an empty Map', function () {
      tabulator._metricsByFeature.should.eql(new Map())
    })
  })

  // TODO: work in progress....
  describe('#getValueOfMetricForFeature', function () {
    it('should ???', function () {
      // TODO:
      'todo'.should.eql('todo')
    })
  })
})
