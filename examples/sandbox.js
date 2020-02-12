/** @file sandbox.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { CITY } from '../src/citylib.js'
import { Facing } from '../src/core/facing.js'
import { METRIC } from '../src/architecture/metric.js'
import { Ray } from '../src/core/ray.js'
import { SpecReader } from '../src/architecture/spec_reader.js'
import { xy, xyz, rectangleOfSize } from '../src/core/util.js'

window.DEBUG = true

function addBuildings (city) {
  // const suburbia = new CITY.Suburbia({
  //   name: 'Old Suburbia',
  //   placement: new Ray(Facing.NORTH, xyz(-100, 300, 0)),
  //   deprecatedSpec: {
  //     outline: rectangleOfSize(xy(-250, 120))
  //   }
  // })
  // suburbia.addStreet(2)
  // city.add(suburbia)

  const CITY_SIZE = 1
  const nyc = new CITY.Manhattan({
    name: 'Manhattan',
    placement: new Ray(Facing.NORTH, xyz(-13200, -5280, 0)),
    deprecatedSpec: {
      outline: CITY.Manhattan.BOUNDARY
    }
  })
  nyc.addBlocks(CITY_SIZE, CITY_SIZE * 2)
  city.add(nyc)

  const latticeburg = new CITY.LatticeDistrict({
    name: 'Latticeburg',
    placement: new Ray(Facing.NORTH, xyz(238, 238, 0)),
    deprecatedSpec: {
      outline: rectangleOfSize(xy(2000, 2000))
    }
  })
  latticeburg.makeFeatures()
  latticeburg.add(new CITY.SoccerField({ at: { x: 920, y: 315, z: 0 } }))
  city.add(latticeburg)

  const campus = new CITY.Campus({
    name: 'Campus',
    placement: new Ray(Facing.NORTH, xyz(330, -600, 0)),
    deprecatedSpec: {
      outline: rectangleOfSize(xy(1200, 550))
    }
  })
  campus.makeCampus(3)
  city.add(campus)
}

function addCreek (district) {
  const creek = new CITY.Creek('River Tethys')
  const creekObject = creek.makeCreek()
  district.add(creekObject)

  // There are several possibilities here:
  // 1) Explicitly construct a Kayak and add it to the city. The Route will not be added to the city.
  const kayaks = new CITY.FeatureGroup('kayaks')
  kayaks.add(new CITY.Kayak(creek.creekRoute(), 0.13))
  district.add(kayaks)

  // 2) Add a Route to the city. creekRoute() creates a Route with use = CANAL by default, so
  // city.populateRoutes() will construct a Kayak and add it.
  district.add(creek.creekRoute(4))

  // 3) Create a Route (in this case with use = BIKEPATH). Add it to the city, so that city.populateRoutes()
  // will construct a Vehicle and add it. Then explicitly add additional Vehicles, using the same Route.
  const creekBikePath = creek.creekRoute(7, CITY.Use.BIKEPATH)
  district.add(creekBikePath)
  district.add(new CITY.Vehicle(creekBikePath, 0.18, 'bicycle'))
  district.add(new CITY.Vehicle(creekBikePath, 0.15, 'pedicab'))
}

function addTree (district) {
  district.add(new CITY.Tree({ placement: new Ray(Facing.NORTH, { x: 28, y: 52, z: 0 }), crownHeight: 8, name: 'Topiary Tree' }))
}

function addSwingset (district) {
  district.add(new CITY.Swingset({ placement: new Ray(Facing.NORTH, { x: 60, y: 52, z: 0 }) }))
}

function addUtilityPoles (district) {
  for (let y = 100; y < 600; y += 120) {
    district.add(new CITY.UtilityPole({ placement: new Ray(Facing.NORTH, { x: -304, y: y, z: 0 }) }))
  }
}

function addEiffelTower (district) {
  district.add(new CITY.EiffelTower({ placement: new Ray(Facing.NORTH, { x: 1090, y: 1090, z: 0 }) }))
}

function addPyramid (district) {
  district.add(new CITY.PyramidOfKhufu({ placement: new Ray(Facing.NORTH, { x: -600, y: -600, z: 0 }) }))
}

function addKalpanaOrbital (district) {
  district.add(new CITY.Kalpana())
}

function addMovers (district) {
  const parkedVehicles = new CITY.FeatureGroup('parked vehicles')
  for (let i = -50; i > -200; i -= 10) {
    parkedVehicles.add(new CITY.Vehicle(new CITY.Route([xyz(-50, i, 0), xyz(0, 0, 0)]), 0))
  }
  district.add(parkedVehicles)

  district.add(new CITY.Route([xyz(-150, -10, 0), xyz(-200, -120, 0), xyz(-80, -50, 0), xyz(-150, -10, 0)]))
  district.add(new CITY.Route([xyz(-150, -100, 0), xyz(-100, -200, 0), xyz(-80, -150, 0), xyz(-150, -100, 0)]))
}

function addObjectFromSpec (district, specReader, specName, at) {
  const modelObject = specReader.makeModelFromSpecName(specName, at)
  district.add(modelObject)
}

function main () {
  const tethys = new CITY.Model({ name: 'River Tethys' })
  addCreek(tethys)
  addTree(tethys)
  addSwingset(tethys)

  const city = new CITY.City({ name: 'Paracosm' })
  city.add(tethys)
  const specReader = new SpecReader()
  addObjectFromSpec(city, specReader, 'Suburbia', { x: -550, y: 100, z: 0 })
  addBuildings(city)

  const extras = new CITY.Model({ name: 'extras' })
  addUtilityPoles(extras)
  addEiffelTower(extras)
  addPyramid(extras)
  addKalpanaOrbital(extras)
  addMovers(extras)
  addObjectFromSpec(extras, specReader, 'Wurster Hall', { x: 50, y: -400, z: 0 })
  addObjectFromSpec(extras, specReader, 'Highrise building', { x: -800, y: 100, z: 0 })
  city.add(extras)

  // display the city on the web page
  const districts = []
  districts.push(tethys)
  districts.push(...city.getDistricts())
  districts.push(extras)

  CITY.Output.addOutput(new CITY.ThreeOutput(districts))
  CITY.Output.addOutput(new CITY.MetricsOutput(
    [city],
    'City size information',
    [
      METRIC.POPULATION,
      METRIC.LAND_AREA,
      METRIC.WATER_AREA,
      METRIC.PLANTED_AREA,
      METRIC.TRANSPORTATION_AREA
    ]
  ))
  CITY.Output.addOutput(new CITY.SummaryOutput(districts))
  CITY.Output.addOutput(new CITY.MetricsOutput(
    districts,
    'Building floor area information',
    [
      METRIC.GROSS_FLOOR_AREA,
      METRIC.STRUCTURAL_AREA,
      METRIC.NET_FLOOR_AREA,
      METRIC.NET_ASSIGNABLE_AREA,
      METRIC.NET_NON_ASSIGNABLE_AREA,
      METRIC.CIRCULATION_AREA,
      METRIC.BUILDING_SERVICE_AREA,
      METRIC.MECHANICAL_AREA
    ]
  ))
  CITY.Output.addOutput(new CITY.MetricsOutput(
    districts,
    'Wall and roof surface area information',
    [
      METRIC.ROOF_AREA,
      METRIC.SKYLIGHT_AREA,
      METRIC.WALL_AREA,
      METRIC.WINDOW_AREA,
      METRIC.DOOR_AREA
    ]
  ))
  CITY.Output.addOutput(new CITY.MetricsOutput(
    districts,
    'City metrics',
    [
      METRIC.POPULATION_DENSITY,
      METRIC.GROSS_FLOOR_AREA_RATIO,
      METRIC.NET_ASSIGNABLE_FLOOR_AREA_RATIO,
      METRIC.KINEMATIC_RANGE_30,
      METRIC.DAYLIGHT_FACTOR_ESTIMATE
    ]
  ))
}

main()
