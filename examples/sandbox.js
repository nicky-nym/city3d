/** @file sandbox.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { CITY } from '../src/citylib.js'
import { Facing } from '../src/core/facing.js'
import { Ray } from '../src/core/ray.js'
import { xy, xyz, rectangleOfSize } from '../src/core/util.js'

function addBuildings (plato, city) {
  let ray
  let corners

  ray = new Ray(Facing.NORTH, xyz(-100, 100, 0))
  corners = rectangleOfSize(xy(-250, 200))
  const suburbia = new CITY.Suburbia(corners, ray, 'Suburbia')
  suburbia.addStreet(2)
  city.add(suburbia)
  plato.pontificate(suburbia)

  const CITY_SIZE = 1
  ray = new Ray(Facing.NORTH, xyz(-800 * CITY_SIZE, 900 * CITY_SIZE, 0))
  corners = rectangleOfSize(xy(750, 600))
  const nyc = new CITY.Manhattan(corners, ray, 'Manhattan')
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  city.add(nyc)
  plato.pontificate(nyc)

  ray = new Ray(Facing.NORTH, xyz(238, 238, 0))
  corners = rectangleOfSize(xy(2000, 2000))
  const kineborough = new CITY.District(corners, ray, 'Kineborough')
  city.add(kineborough)
  kineborough.add(new CITY.Bikeway({ city, x0: 100, y0: 100, numRows: 3, numCols: 3, hideBuildings: false }))
  kineborough.add(new CITY.Merlon({ x0: 238, y0: 238, numRows: 8, numCols: 8, hideBuildings: false }))
  plato.pontificate(kineborough)

  ray = new Ray(Facing.NORTH, xyz(100, -600, 0))
  corners = rectangleOfSize(xy(1200, 550))
  const campus = new CITY.Campus(corners, ray, 'Campus')
  campus.makeCampus(3)
  city.add(campus)
  plato.pontificate(campus)
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
