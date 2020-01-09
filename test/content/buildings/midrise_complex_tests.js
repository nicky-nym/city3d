/** @file midrise_complex_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Byway } from '../../../src/architecture/byway.js'
import { City } from '../../../src/architecture/city.js'
import { METRIC } from '../../../src/architecture/metric.js'
import { MidriseComplex } from '../../../content/buildings/midrise_complex.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Roof } from '../../../src/architecture/roof.js'

/* global describe, it, beforeEach */

describe('MidriseComplex', function () {
  describe('#constructor', function () {
    let count

    beforeEach(function () {
      count = 0
    })

    it('should return a MidriseComplex named "Midrise Complex" if no name is specified', function () {
      const complex = new MidriseComplex()

      complex.name.should.equal('Midrise Complex')
    })
    it('should return a MidriseComplex with the right name if one was specified', function () {
      const complex = new MidriseComplex({ name: 'Napoleon Complex' })

      complex.name.should.equal('Napoleon Complex')
    })
    it('should return the correct full name when added to a city', function () {
      const city = new City('Testopia')
      const complex = new MidriseComplex({ name: 'Napoleon Complex' })
      city.add(complex)

      complex.fullName().should.equal('Napoleon Complex of Testopia')
    })
    it('should result in at least four Roofs for a 1 x 1 pattern', function () {
      const complex = new MidriseComplex({ numRowPairs: 1, numColPairs: 1 })

      complex.accept(node => { count += node instanceof Roof ? 1 : 0 })
      count.should.be.at.least(4)
    })
    it('should result in at least 64 Roofs for a 4 x 4 pattern', function () {
      const complex = new MidriseComplex({ numRowPairs: 4, numColPairs: 4 })

      complex.accept(node => { count += node instanceof Roof ? 1 : 0 })
      count.should.be.at.least(64)
    })
    it('should result in at least one Storey for a 1 x 1 pattern', function () {
      const complex = new MidriseComplex({ numRowPairs: 1, numColPairs: 1 })

      complex.accept(node => { count += node instanceof Storey ? 1 : 0 })
      count.should.be.at.least(1)
    })
    it('should result in at least one Byway for a 1 x 1 pattern', function () {
      const complex = new MidriseComplex({ numRowPairs: 1, numColPairs: 1 })

      complex.accept(node => { count += node instanceof Byway ? 1 : 0 })
      count.should.be.at.least(1)
    })
  })

  describe('#getValueForMetric', function () {
    const complex = new MidriseComplex({ numRowPairs: 1, numColPairs: 1 })

    it('should have the correct GROSS_FLOOR_AREA', function () {
      complex.getValueForMetric(METRIC.GROSS_FLOOR_AREA).should.equal(37134)
    })

    it('should have the correct WALL_AREA', function () {
      complex.getValueForMetric(METRIC.WALL_AREA).should.be.closeTo(21551, 1)
    })

    it('should have the correct WINDOW_AREA', function () {
      const windowsPerWall = 8
      const wallsPerStorey = 4
      const aveStoreysPerTower = 3.5
      const numTowers = 4
      const expectedWindowCount = windowsPerWall * wallsPerStorey * aveStoreysPerTower * numTowers
      const areaPerWindow = 2.5 * 5
      const expectedWindowArea = expectedWindowCount * areaPerWindow

      const doorsPerStorey = 2
      const expectedDoorCount = doorsPerStorey * aveStoreysPerTower * numTowers
      const areaPerDoor = 3 * (6 + 8 / 12)
      const expectedDoorArea = expectedDoorCount * areaPerDoor

      const expectedArea = expectedWindowArea + expectedDoorArea
      complex.getValueForMetric(METRIC.WINDOW_AREA).should.equal(expectedArea)
    })

    // Turn this on when we generate realistic numbers for DAYLIGHT_FACTOR_ESTIMATE
    it.skip('should have the correct DAYLIGHT_FACTOR_ESTIMATE', function () {
      complex.getValueForMetric(METRIC.DAYLIGHT_FACTOR_ESTIMATE).should.equal(-1)
    })
  })
})
