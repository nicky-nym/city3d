/** @file sandbox.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { CITY } from '../src/citylib.js'
import { xy, xyz } from '../src/core/util.js'

function addBuildings (plato, city) {
  plato.study('Suburbia', { x0: -100, y0: 100 }, xy(-250, 200))
  const suburbia = new CITY.Suburbia(plato, city)
  suburbia.addStreet(2)
  plato.pontificate()

  const CITY_SIZE = 1
  plato.study('Manhattan New York', { x0: -800 * CITY_SIZE, y0: -900 * CITY_SIZE }, xy(750, 600))
  const nyc = new CITY.Manhattan(plato, city)
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  plato.pontificate()

  plato.study('Kinematic City', { x0: 238, y0: 238 }, xy(2000, 2000))
  const bikeway = new CITY.Place(plato, city)
  bikeway.add(new CITY.Bikeway({ city, x0: 100, y0: 100, numRows: 3, numCols: 3, hideBuildings: false }))
  const quad = new CITY.Place(plato, city)
  quad.add(new CITY.Merlon({ x0: 238, y0: 238, numRows: 8, numCols: 8, hideBuildings: false }))
  // plato.study('Northeast Quadrant Layer 2', { x0: 100, y0: 100 }, xy(2000, 2000))
  plato.pontificate()

  plato.study('Campus', { x0: 100, y0: -600 }, xy(1200, 550))
  const campus = new CITY.Campus(plato, city)
  campus.makeCampus(3)
  plato.pontificate()
}

function addCreek (city) {
  const creek = new CITY.Creek()
  const creekObject = creek.makeCreek()
  city.add(creekObject)

  const kayaks = new CITY.Group('kayaks')
  kayaks.add(new CITY.Kayak(creek.creekRoute()))
  kayaks.add(new CITY.Kayak(creek.creekRoute(4), 0.13))
  city.add(kayaks)

  city.add(new CITY.Vehicle(creek.creekRoute(7), 0.18, 'bicycle'))
}

function addTree (city) {
  city.add(new CITY.Tree({ at: { x: 28, y: 52, z: 0 }, crownHeight: 8, name: 'Topiary Tree' }))
}

function addSwingset (city) {
  city.add(new CITY.Swingset({ at: { x: 60, y: 52, z: 0 } }))
}

function addUtilityPoles (city) {
  for (let y = -40; y < 800; y += 120) {
    city.add(new CITY.UtilityPole({ at: { x: -96, y: y, z: 0 } }))
  }
}

function addEiffelTower (city) {
  city.add(new CITY.EiffelTower({ at: { x: 1090, y: 1090, z: 0 } }))
}

function addKalpanaOrbital (city) {
  city.add(new CITY.Kalpana())
}

function addMovers (city) {
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

function main () {
  const city = new CITY.City('Paracosm')
  const plato = new CITY.Plato(city)
  addCreek(city)
  addTree(city)
  addSwingset(city)
  addUtilityPoles(city)
  addEiffelTower(city)
  addBuildings(plato, city)
  addKalpanaOrbital(city)
  addMovers(city)

  // display the city on the web page
  CITY.Output.addOutput(new CITY.ThreeOutput(city))
  CITY.Output.addOutput(new CITY.MetricsOutput(city))
  CITY.Output.addOutput(new CITY.SummaryOutput(city))
}

main()
