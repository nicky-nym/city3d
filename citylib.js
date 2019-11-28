// citylib.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import Bikeway from './structures/bikeway.js'
import { City, Group } from './city3d/city.js'
import Cottage from './structures/cottage.js'
import { Creek } from './land/creek.js'
import { Kalpana } from './movers/kalpana.js'
import Kayak from './movers/kayak.js'
import Manhattan from './structures/manhattan.js'
import Merlon from './structures/merlon.js'
import { Plato } from './city3d/plato.js'
import SummaryOutput from './outputs/summary_output.js'
import ThreeOutput from './outputs/three_output.js'
import Vehicle from './movers/vehicle.js'
import { Wurster } from './structures/wurster.js'

export const CITY = {
  Bikeway,
  City,
  Cottage,
  Creek,
  Kalpana,
  Kayak,
  Group,
  Manhattan,
  Merlon,
  Plato,
  SummaryOutput,
  ThreeOutput,
  Vehicle,
  Wurster
}
