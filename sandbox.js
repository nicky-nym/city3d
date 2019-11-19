// sandbox.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import Bicycle from './movers/bicycle.js'
import Bikeway from './structures/bikeway.js'
import City from './city3d/city.js'
import Cottage from './structures/cottage.js'
import Manhattan from './structures/manhattan.js'
import Merlon from './structures/merlon.js'
import Plato from './city3d/plato.js'
import SummaryOutput from './outputs/summary_output.js'
import ThreeOutput from './outputs/three_output.js'
import Wurster from './structures/wurster.js'

function addBuildings () {
  plato.study('Cottage(s)', { x0: -100, y0: 100 })
  const cottage = new Cottage(plato, city)
  cottage.addStreet(1)
  plato.pontificate()

  const CITY_SIZE = 1
  plato.study('Manhattan New York', { x0: -800 * CITY_SIZE, y0: -600 * CITY_SIZE })
  const nyc = new Manhattan(plato)
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 1)
  plato.pontificate()

  plato.study('Merlon Buildings', { x0: 238, y0: 238 })
  const merlon = new Merlon(plato)
  merlon.addBuildings(8, 8, { buildings: true })
  plato.pontificate()

  plato.study('Bikeways', { x0: 100, y0: 100 })
  const bikeway = new Bikeway(plato, city)
  bikeway.addBikeways(3, 3, { buildings: true })
  plato.pontificate()

  plato.study('Wurster Hall(s)', { x0: 100, y0: -600 })
  const wurster = new Wurster(plato)
  wurster.addBuildings(1)
  plato.pontificate()
}

function addMovers () {
  // TODO: Would like to do this:
  /*
  const randomBikes = new city.Group('random bicycles')
  randomBikes.add(new Bicycle())
  */

  const randomBikes = city.makeGroup('random bicycles')
  randomBikes.children.push(new Bicycle())
  randomBikes.children.push(new Bicycle())
  randomBikes.children.push(new Bicycle())
  city.add(randomBikes)
}

const city = new City('Paracosm')
const plato = new Plato(city)
plato.deleteAllObjects()
addBuildings()
addMovers()
const threeOutput = new ThreeOutput(city)
threeOutput.envision()
const summaryOutput = new SummaryOutput(city)
summaryOutput.envision()
