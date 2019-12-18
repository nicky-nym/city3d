/** @file lattice_district.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { District } from '../../src/architecture/district.js'
import { Lattice } from '../buildings/lattice.js'
import { MidriseComplex } from '../buildings/midrise_complex.js'

/**
 * Class representing a college campus.
 */
class LatticeDistrict extends District {
  makeFeatures () {
    this.add(new Lattice({ x0: 100, y0: 100, numRows: 3, numCols: 3, hideBuildings: false }))
    this.add(new MidriseComplex({ x0: 238, y0: 238, numRowPairs: 4, numColPairs: 4, hideBuildings: false }))
  }
}

export { LatticeDistrict }
