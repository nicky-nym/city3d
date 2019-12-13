/** @file bikeway_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Bikeway } from '../../../content/buildings/bikeway.js'
import { City } from '../../../src/architecture/city.js'
import { fullName } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Bikeway', function () {
  describe('#constructor', function () {
    it('should return a Bikeway named "Lattice" if no name is specified', function () {
      const bikeway = new Bikeway()

      bikeway.name.should.equal('Lattice')
    })
    it('should return a Bikeway with the right name if one was specified', function () {
      const bikeway = new Bikeway({ name: 'Veloplex' })

      bikeway.name.should.equal('Veloplex')
    })

    describe('when added to a City', function () {
      let city

      beforeEach(function () {
        city = new City('Velotopia')
      })

      it('should return the correct full name', function () {
        const bikeway = new Bikeway({ name: 'Veloplex' })
        city.add(bikeway)

        fullName(bikeway).should.equal('Veloplex of Velotopia')
      })
      it('should result in the expected number of Routes for a 1 x 1 pattern', function () {
        city.add(new Bikeway({ numRows: 1, numCols: 1 }))

        city.getRoutes().should.have.length(20)
      })
      it('should result in the expected number of Routes for a 2 x 3 pattern', function () {
        city.add(new Bikeway({ numRows: 2, numCols: 3 }))

        city.getRoutes().should.have.length(120)
      })
    })
  })
})
