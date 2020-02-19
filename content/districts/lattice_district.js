/** @file lattice_district.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { District } from '../../src/architecture/district.js'
import { Facing } from '../../src/core/facing.js'
import { Lattice } from '../buildings/lattice.js'
import { METRIC } from '../../src/architecture/metric.js'
import { MidriseComplex } from '../buildings/midrise_complex.js'
import { Ray } from '../../src/core/ray.js'

/**
 * Class representing a city district composed of Lattice and MidriseComplex buildings.
 */
class LatticeDistrict extends District {
  makeFeatures () {
    const POPULATION = 1000
    this.add(new Lattice({ placement: new Ray(Facing.NORTH, { x: 300, y: 300, z: 0 }), numRows: 3, numCols: 3 }))
    this.add(new MidriseComplex({ placement: new Ray(Facing.NORTH, { x: 438, y: 438, z: 0 }), numRowPairs: 4, numColPairs: 4 }))
    this.setValueForMetric(METRIC.POPULATION, POPULATION)
  }
}

export { LatticeDistrict }
