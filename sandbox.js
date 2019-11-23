// sandbox.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import { CITY } from './citylib.js'

function addBuildings () {
  plato.study('Cottage(s)', { x0: -100, y0: 100 })
  const cottage = new CITY.Cottage(plato, city)
  cottage.addStreet(1)
  plato.pontificate()

  const CITY_SIZE = 1
  plato.study('Manhattan New York', { x0: -800 * CITY_SIZE, y0: -600 * CITY_SIZE })
  const nyc = new CITY.Manhattan(plato)
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 1)
  plato.pontificate()

  plato.study('Merlon Buildings', { x0: 238, y0: 238 })
  const merlon = new CITY.Merlon(plato)
  merlon.addBuildings(8, 8, { buildings: true })
  plato.pontificate()

  plato.study('Bikeways', { x0: 100, y0: 100 })
  const bikeway = new CITY.Bikeway(plato, city)
  bikeway.addBikeways(3, 3, { buildings: true })
  plato.pontificate()

  plato.study('Wurster Hall(s)', { x0: 100, y0: -600 })
  const wurster = new CITY.Wurster(plato)
  wurster.addBuildings(1)
  plato.pontificate()
}

function addMovers () {
  const randomBikes = new CITY.Group('random bicycles')
  randomBikes.add(new CITY.Bicycle())
  randomBikes.add(new CITY.Bicycle())
  city.add(randomBikes)

  const randomVehicles = new CITY.Group('random vehicles')
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle([[-80, -80, 0], [0, 0, 0]], 0))
  city.add(randomVehicles)
}

const city = new CITY.City('Paracosm')
const plato = new CITY.Plato(city)
plato.deleteAllObjects()
addBuildings()
addMovers()
const threeOutput = new CITY.ThreeOutput(city)
threeOutput.envision()
const summaryOutput = new CITY.SummaryOutput(city)
summaryOutput.envision()
