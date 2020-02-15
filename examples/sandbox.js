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
  const CITY_SIZE = 1
  const nyc = new CITY.Manhattan({
    name: 'Old Manhattan',
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

function addTrees (district) {
  const specReader = new SpecReader()
  addObjectFromSpec(district, specReader, 'Tree', { x: 5, y: 10, z: 0 })
  addObjectFromSpec(district, specReader, 'Tree', { x: -5, y: 50, z: 0 })

  district.add(new CITY.Tree({ placement: new Ray(Facing.NORTH, { x: 28, y: 52, z: 0 }), trunkHeight: 10, name: 'Topiary Tree' }))
  district.add(new CITY.InstancedFeature(new CITY.Tree({ trunkHeight: 12, name: 'Tree (MeshPhongMaterial, with normals)' }), [
    new Ray(Facing.NORTH, { x: 51, y: 45, z: 0 }),
    new Ray(Facing.EAST, { x: 75, y: 40, z: 0 }),
    new Ray(Facing.SOUTH, { x: 60, y: 10, z: 0 }, { mirror: true })
  ], { materialCost: 'high', useNormals: true }))
  district.add(new CITY.InstancedFeature(new CITY.Tree({ trunkHeight: 15, name: 'Tree (MeshBasicMaterial, no normals)' }), [
    new Ray(Facing.NORTH, { x: -30, y: 50, z: 0 }),
    new Ray(Facing.SOUTH, { x: -30, y: 11, z: 0 }, { mirror: true })
  ], { materialCost: 'lowest', useNormals: false })) // these are the defaults
  district.add(new CITY.InstancedFeature(new CITY.Tree({ trunkHeight: 15, name: 'Tree (MeshLambertMaterial, with normals)' }), [
    new Ray(Facing.NORTH, { x: -60, y: 50, z: 0 }),
    new Ray(Facing.SOUTH, { x: -60, y: 11, z: 0 }, { mirror: true })
  ], { materialCost: 'medium', useNormals: true })) // these are the defaults
}

function addEiffelTower (district) {
  district.add(new CITY.EiffelTower({ placement: new Ray(Facing.NORTH, { x: 1090, y: 1090, z: 0 }) }))
}

function addPyramid (district) {
  district.add(new CITY.PyramidOfKhufu({ placement: new Ray(Facing.NORTH, { x: -600, y: -600, z: 0 }) }))
}

function addInstancedBuildings (district) {
  const specReader = new SpecReader()

  const cottage1 = specReader.makeModelFromSpecName('Cottage', { x: 0, y: 0, z: 0 })
  district.add(new CITY.InstancedFeature(cottage1, [
    new Ray(Facing.NORTH, { x: -440, y: 450, z: 0 }),
    new Ray(Facing.NORTH, { x: -360, y: 450, z: 0 }, { mirror: true }),
    new Ray(Facing.EAST, { x: -350, y: 420, z: 0 }),
    new Ray(Facing.WEST, { x: -450, y: 400, z: 0 }),
    new Ray(Facing.SOUTHWEST, { x: -410, y: 350, z: 0 }),
    new Ray(Facing.SOUTHEAST, { x: -390, y: 350, z: 0 }, { mirror: true })
  ], { materialCost: 'high', useNormals: true }))

  const cottage2 = specReader.makeModelFromSpecName('Cottage', { x: 0, y: 0, z: 0 })
  district.add(new CITY.InstancedFeature(cottage2, [
    new Ray(Facing.NORTH, { x: -220, y: 450, z: 0 }),
    new Ray(Facing.NORTH, { x: -140, y: 450, z: 0 }, { mirror: true }),
    new Ray(Facing.EAST, { x: -130, y: 420, z: 0 }),
    new Ray(Facing.WEST, { x: -230, y: 400, z: 0 }),
    new Ray(Facing.SOUTHWEST, { x: -190, y: 350, z: 0 }),
    new Ray(Facing.SOUTHEAST, { x: -170, y: 350, z: 0 }, { mirror: true })
  ], { materialCost: 'lowest', useNormals: false }))

  const wursterHall = specReader.makeModelFromSpecName('Wurster Hall', { x: 0, y: 0, z: 0 })
  district.add(new CITY.InstancedFeature(wursterHall, [
    new Ray(Facing.NORTH, { x: 80, y: -650, z: 0 }),
    new Ray(Facing.NORTH, { x: 780, y: -650, z: 0 }, { mirror: true }),
    new Ray(Facing.SOUTH, { x: 380, y: -700, z: 0 }),
    new Ray(Facing.SOUTH, { x: 480, y: -700, z: 0 }, { mirror: true })
  ], { materialCost: 'high', useNormals: true }))
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
  addTrees(tethys)

  const city = new CITY.City({ name: 'Paracosm' })
  city.add(tethys)
  const specReader = new SpecReader()
  addObjectFromSpec(city, specReader, 'Suburbia', { x: -550, y: 100, z: 0 })
  addObjectFromSpec(city, specReader, 'Campus', { x: 50, y: -400, z: 0 })
  addObjectFromSpec(city, specReader, 'Manhattan', { x: -1200, y: 800, z: 0 })
  addBuildings(city)

  const extras = new CITY.Model({ name: 'extras' })
  addEiffelTower(extras)
  addPyramid(extras)
  addKalpanaOrbital(extras)
  addMovers(extras)
  addInstancedBuildings(extras)
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
