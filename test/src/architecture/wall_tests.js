/** @file wall_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance } from '../../../src/core/feature.js'
import { METRIC } from '../../../src/architecture/metric.js'
import { UNIT } from '../../../src/core/unit.js'
import { Wall } from '../../../src/architecture/wall.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Wall', function () {
  const FEET_PER_METER = 3.28084

  describe('#constructor', function () {
    it('should return a Wall with the right name if one was specified', function () {
      const wall = new Wall({ name: 'Hadrian\'s Wall', spec: { begin: xy(0, 0), end: xy(UNIT.km(117.5), 0), height: UNIT.meters(6) } })

      wall.name.should.equal('Hadrian\'s Wall')
    })
    it('should return a Wall named "Wall" if no name was specified', function () {
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(UNIT.km(117.5), 0), height: UNIT.meters(6) } })

      wall.name.should.equal('Wall')
    })
    it('should return a Wall containing exactly one Instance', function () {
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(UNIT.km(117.5), 0), height: UNIT.meters(6) } })

      let count = 0
      wall.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
      count.should.equal(1)
    })
    it('should return a Wall with the expected metrics for a wall with no openings', function () {
      const wall = new Wall({ spec: { begin: xy(UNIT.km(3), 0), end: xy(0, UNIT.km(4)), height: UNIT.meters(6) } })

      const expectedArea = 5 * FEET_PER_METER * 1000 * 6 * FEET_PER_METER
      wall._valuesByMetric.get(METRIC.WALL_AREA).should.be.closeTo(expectedArea, 0.1)
      wall._valuesByMetric.get(METRIC.WINDOW_AREA).should.equal(0)
    })
    it('should return a Wall with the expected metrics for a wall with one opening', function () {
      const windows = [{
        outline: { shape: 'rectangle', size: { x: 2, y: 2 } },
        at: { x: 4, y: 3, from: 'left' }
      }]
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(10, 0), height: 6, windows } })

      wall._valuesByMetric.get(METRIC.WALL_AREA).should.equal(60)
      wall._valuesByMetric.get(METRIC.WINDOW_AREA).should.equal(4)
    })
    it('should return a Wall with the expected metrics for a wall with three openings', function () {
      const square = { shape: 'rectangle', size: { x: 2, y: 2 } }
      const windows = [{
        outline: square, at: { x: 1, y: 3, from: 'left' }
      }, {
        outline: square, at: { x: 4, y: 3, from: 'left' }
      }, {
        outline: square, at: { x: 7, y: 3, from: 'left' }
      }]
      const wall = new Wall({ spec: { begin: xy(0, 6), end: xy(8, 0), height: 6, windows } })

      wall._valuesByMetric.get(METRIC.WALL_AREA).should.equal(60)
      wall._valuesByMetric.get(METRIC.WINDOW_AREA).should.equal(12)
    })
    it('should return a Wall with the expected metrics for a wall with a non-rectangular opening', function () {
      const windows = [{
        outline: {
          shape: 'polygon',
          corners: [
            { x: 4, y: 3 },
            { x: 6, y: 3 },
            { x: 6, y: 5 }
          ]
        }
      }]
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(10, 0), height: 6, windows } })

      wall._valuesByMetric.get(METRIC.WALL_AREA).should.equal(60)
      wall._valuesByMetric.get(METRIC.WINDOW_AREA).should.equal(2)
    })
  })
})
