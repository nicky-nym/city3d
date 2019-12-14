/** @file lattice_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Lattice } from '../../../content/buildings/lattice.js'
import { City } from '../../../src/architecture/city.js'
import { fullName } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Lattice', function () {
  describe('#constructor', function () {
    it('should return a Lattice named "Lattice" if no name is specified', function () {
      const lattice = new Lattice()

      lattice.name.should.equal('Lattice')
    })
    it('should return a Lattice with the right name if one was specified', function () {
      const lattice = new Lattice({ name: 'Veloplex' })

      lattice.name.should.equal('Veloplex')
    })

    describe('when added to a City', function () {
      let city

      beforeEach(function () {
        city = new City('Velotopia')
      })

      it('should return the correct full name', function () {
        const lattice = new Lattice({ name: 'Veloplex' })
        city.add(lattice)

        fullName(lattice).should.equal('Veloplex of Velotopia')
      })
      it('should result in the expected number of Routes for a 1 x 1 pattern', function () {
        city.add(new Lattice({ numRows: 1, numCols: 1 }))

        city.getRoutes().should.have.length(20)
      })
      it('should result in the expected number of Routes for a 2 x 3 pattern', function () {
        city.add(new Lattice({ numRows: 2, numCols: 3 }))

        city.getRoutes().should.have.length(120)
      })
    })
  })
})
