/** @file house_tests.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance } from '../../../src/core/feature.js'
import { Geometry } from '../../../src/core/geometry.js'
import { METRIC } from '../../../src/architecture/metric.js'
import { SpecReader } from '../../../src/architecture/spec_reader.js'
import { length, xyzSubtract } from '../../../src/core/util.js'

/* global describe, it */

describe('House', function () {
  describe('#constructor', function () {
    const specReader = new SpecReader()

    it('should return a House named "House" if no name is specified', function () {
      const house = specReader.makeModelFromSpecName('House 353', { x: 0, y: 0, z: 0 })
      house.name.should.equal('House 353')
    })

    it('should not create any edges of length 0', function () {
      const house = specReader.makeModelFromSpecName('House 353', { x: 0, y: 0, z: 0 })
      house.accept(node => {
        if (node instanceof FeatureInstance) {
          if (node.geometry instanceof Geometry.ThickPolygon) {
            node.geometry.xyPolygon.forEach((v, i) => {
              // Skipping the last edge because it's OK if the first and last points are equal
              // (because Shape.closePath() takes care of it).
              if (i < node.geometry.xyPolygon.length - 1) {
                const edge = xyzSubtract(node.geometry.xyPolygon[i + 1], v)
                edge.z = 0
                length(edge).should.be.above(0)
              }
            })
          }
        }
      })
    })
  })

  describe('#getValueForMetric', function () {
    const specReader = new SpecReader()
    const house = specReader.makeModelFromSpecName('House 353', { x: 0, y: 0, z: 0 })

    it.skip('should have the correct GROSS_FLOOR_AREA', function () {
      house.getValueForMetric(METRIC.GROSS_FLOOR_AREA).should.be.closeTo(2602, 1)
    })

    it.skip('should have the correct ROOF_AREA', function () {
      house.getValueForMetric(METRIC.ROOF_AREA).should.be.closeTo(-1, 0.1)
    })

    it('should have the correct WALL_AREA', function () {
      house.getValueForMetric(METRIC.WALL_AREA).should.be.closeTo(3135, 1)
    })

    it('should have the correct WINDOW_AREA', function () {
      house.getValueForMetric(METRIC.WINDOW_AREA).should.be.closeTo(514, 1)
    })

    it.skip('should have the correct DAYLIGHT_FACTOR_ESTIMATE', function () {
      house.getValueForMetric(METRIC.DAYLIGHT_FACTOR_ESTIMATE).should.be.closeTo(3.2, 0.1)
    })
  })
})
