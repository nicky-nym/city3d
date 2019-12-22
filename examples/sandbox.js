/** @file sandbox.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { CITY } from '../src/citylib.js'
import { Facing } from '../src/core/facing.js'
import { METRIC } from '../src/architecture/metric.js'
import { Ray } from '../src/core/ray.js'
import { xy, xyz, rectangleOfSize } from '../src/core/util.js'

function addBuildings (city) {
  let ray
  let corners

  ray = new Ray(Facing.NORTH, xyz(-100, 100, 0))
  corners = rectangleOfSize(xy(-250, 200))
  const suburbia = new CITY.Suburbia(corners, ray, 'Suburbia')
  suburbia.addStreet(2)
  city.add(suburbia)
  suburbia.recordMetrics()

  const CITY_SIZE = 1
  ray = new Ray(Facing.NORTH, xyz(-13200, -5280, 0))
  const nyc = new CITY.Manhattan(CITY.Manhattan.BOUNDARY, ray, 'Manhattan')
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  city.add(nyc)
  nyc.recordMetrics(nyc)

  ray = new Ray(Facing.NORTH, xyz(238, 238, 0))
  corners = rectangleOfSize(xy(2000, 2000))
  const latticeburg = new CITY.LatticeDistrict(corners, ray, 'Latticeburg')
  latticeburg.makeFeatures()
  city.add(latticeburg)
  latticeburg.recordMetrics(latticeburg)

  ray = new Ray(Facing.NORTH, xyz(100, -600, 0))
  corners = rectangleOfSize(xy(1200, 550))
  const campus = new CITY.Campus(corners, ray, 'Campus')
  campus.makeCampus(3)
  city.add(campus)
  campus.recordMetrics(campus)
}

function addCreek (city) {
  const creek = new CITY.Creek()
  const creekObject = creek.makeCreek()
  city.add(creekObject)

  // There are several possibilities here:
  // 1) Explicitly construct a Kayak and add it to the city. The Route will not be added to the city.
  const kayaks = new CITY.Group('kayaks')
  kayaks.add(new CITY.Kayak(creek.creekRoute(), 0.13))
  city.add(kayaks)

  // 2) Add a Route to the city. creekRoute() creates a Route with use = CANAL by default, so
  // city.populateRoutes() will construct a Kayak and add it.
  city.add(creek.creekRoute(4))

  // 3) Create a Route (in this case with use = BIKEPATH). Add it to the city, so that city.populateRoutes()
  // will construct a Vehicle and add it. Then explicitly add additional Vehicles, using the same Route.
  const creekBikePath = creek.creekRoute(7, CITY.Use.BIKEPATH)
  city.add(creekBikePath)
  city.add(new CITY.Vehicle(creekBikePath, 0.18, 'bicycle'))
  city.add(new CITY.Vehicle(creekBikePath, 0.15, 'pedicab'))
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
  const parkedVehicles = new CITY.Group('parked vehicles')
  for (let i = -50; i > -200; i -= 10) {
    parkedVehicles.add(new CITY.Vehicle(new CITY.Route([xyz(-50, i, 0), xyz(0, 0, 0)]), 0))
  }
  city.add(parkedVehicles)

  city.add(new CITY.Route([xyz(-150, -10, 0), xyz(-200, -120, 0), xyz(-80, -50, 0), xyz(-150, -10, 0)]))
  city.add(new CITY.Route([xyz(-150, -100, 0), xyz(-100, -200, 0), xyz(-80, -150, 0), xyz(-150, -100, 0)]))

  // Populates all Routes that have been added to the city, including those in the Lattice.
  city.populateRoutes()
}

function main () {
  const city = new CITY.City('Paracosm')
  addCreek(city)
  addTree(city)
  addSwingset(city)
  addUtilityPoles(city)
  addEiffelTower(city)
  addBuildings(city)
  addKalpanaOrbital(city)
  addMovers(city)

  // display the city on the web page
  CITY.Output.addOutput(new CITY.ThreeOutput(city))
  CITY.Output.addOutput(new CITY.OldMetricsOutput(city, 'City Metrics (original version)'))
  CITY.Output.addOutput(new CITY.SummaryOutput(city))
  CITY.Output.addOutput(new CITY.NewMetricsOutput(
    city,
    'City size information',
    [
      METRIC.POPULATION,
      METRIC.LAND_AREA,
      METRIC.WATER_AREA,
      METRIC.PLANTED_AREA,
      METRIC.FLOOR_AREA,
      METRIC.GROSS_FLOOR_AREA,
      METRIC.CIRCULATION_AREA,
      METRIC.USABLE_FLOOR_AREA,
      METRIC.ROOF_AREA,
      METRIC.SKYLIGHT_AREA,
      METRIC.WINDOW_AREA,
      METRIC.DOOR_AREA,
      METRIC.WALL_AREA
    ]
  ))
  CITY.Output.addOutput(new CITY.NewMetricsOutput(
    city,
    'City metrics',
    [
      METRIC.POPULATION_DENSITY,
      METRIC.FLOOR_AREA_RATIO,
      METRIC.CIRCULATION_AREA_RATIO,
      METRIC.KINEMATIC_RANGE_30,
      METRIC.DAYLIGHT_FACTOR_ESTIMATE
    ]
  ))
}

main()
