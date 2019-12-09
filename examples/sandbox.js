/** @file sandbox.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { CITY } from '../src/citylib.js'
import { xyz } from '../src/core/util.js'

function addBuildings () {
  plato.study('Suburbia', { x0: -100, y0: 100 })
  const suburbia = new CITY.Suburbia(plato)
  suburbia.addStreet(2)
  plato.pontificate()

  const CITY_SIZE = 1
  plato.study('Manhattan New York', { x0: -800 * CITY_SIZE, y0: -900 * CITY_SIZE })
  const nyc = new CITY.Manhattan(plato)
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  plato.pontificate()

  plato.study('Merlon Buildings', { x0: 238, y0: 238 })
  const merlon = new CITY.Merlon(plato)
  merlon.addBuildings(8, 8, { buildings: true })
  plato.pontificate()

  plato.study('Bikeways', { x0: 100, y0: 100 })
  const bikeway = new CITY.Bikeway(plato, city)
  bikeway.addBikeways(3, 3, { buildings: true })
  plato.pontificate()

  plato.study('Campus', { x0: 100, y0: -600 })
  const campus = new CITY.Campus(plato)
  campus.makeCampus(3)
  plato.pontificate()
}

function addCreek () {
  const creek = new CITY.Creek()
  const creekObject = creek.makeCreek()
  city.add(creekObject)

  const kayaks = new CITY.Group('kayaks')
  kayaks.add(new CITY.Kayak(creek.creekRoute()))
  kayaks.add(new CITY.Kayak(creek.creekRoute(4), 0.13))
  city.add(kayaks)

  city.add(new CITY.Vehicle(creek.creekRoute(7), 0.18, 'bicycle'))
}

function addTree () {
  const tree = new CITY.Tree()
  const trunkObject = tree.makeTrunk({ x: 28, y: 52, z: 0 })
  const crownObject = tree.makeCrown({ x: 28, y: 52, z: 8 })
  city.add(trunkObject)
  city.add(crownObject)
}

function addKalpanaOrbital () {
  city.add(new CITY.Kalpana())
}

function addMovers () {
  const randomVehicles = new CITY.Group('random vehicles')
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  randomVehicles.add(new CITY.Vehicle())
  for (let i = -50; i > -200; i -= 10) {
    randomVehicles.add(new CITY.Vehicle([xyz(-50, i, 0), xyz(0, 0, 0)], 0))
  }

  city.add(randomVehicles)
}

const city = new CITY.City('Paracosm')
const plato = new CITY.Plato(city)
addBuildings()
addCreek()
addTree()
addKalpanaOrbital()
addMovers()
const threeOutput = new CITY.ThreeOutput(city)
threeOutput.envision()
const summaryOutput = new CITY.SummaryOutput(city)
summaryOutput.envision()
