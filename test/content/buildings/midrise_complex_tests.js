/** @file midrise_complex_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Byway } from '../../../src/architecture/byway.js'
import { City } from '../../../src/architecture/city.js'
import { MidriseComplex } from '../../../content/buildings/midrise_complex.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Roof } from '../../../src/architecture/roof.js'
import { fullName } from '../../../src/core/util.js'

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

      fullName(complex).should.equal('Napoleon Complex of Testopia')
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
})
