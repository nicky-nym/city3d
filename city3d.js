// city3d.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import Plato from './plato.js'
import Manhattan from './manhattan.js'
// import { Merlon } from 'merlon.js'
// import { Bikeway } from 'bikeway.js'
// import { Cottage } from 'cottage.js'

// declarations for the "standard" linter:

function addBuildings () {
  const plato = new Plato()

  plato.deleteAllObjects()

  // plato.study('Cottage(s)', { x0: -100, y0: 100 })
  // const cottage = new Cottage(plato)
  // cottage.addStreet(12)
  // plato.pontificate()

  const CITY_SIZE = 2
  plato.study('Manhattan New York', { x0: -800 * CITY_SIZE, y0: -600 * CITY_SIZE })
  const nyc = new Manhattan(plato)
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  plato.pontificate()
  plato.envision()

  // plato.study('Merlon Buildings', { x0: 238, y0: 238 })
  // const merlon = new Merlon(plato)
  // merlon.addBuildings(8, 8, { buildings: true })
  // plato.pontificate()

  // plato.study('Bikeways', { x0: 100, y0: 100 })
  // const bikeway = new Bikeway(plato)
  // bikeway.addBikeways(3, 3, { buildings: true })
  // plato.pontificate()

  // plato.study('Wurster Hall(s)', { x0: 100, y0: -600 })
  // const wurster = new Wurster(plato)
  // wurster.addBuildings(1)
  // plato.pontificate()
}

addBuildings()
