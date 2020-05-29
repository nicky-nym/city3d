/** @file sandbox.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { CITY } from '../src/citylib.js'
import { Facing } from '../src/core/facing.js'
import { METRIC } from '../src/architecture/metric.js'
import { MidriseComplex } from '../content/buildings/midrise_complex.js'
import { SpecReader } from '../src/architecture/spec_reader.js'
import { xyz } from '../src/core/util.js'

window.DEBUG = true

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
  const tree = specReader.makeModelFromSpecName('Tree', { x: 0, y: 0, z: 0 })
  district.add(new CITY.InstancedFeature(tree, [
    { x: 12, y: 10, z: 0, rotated: Facing.NORTH },
    { x: 25, y: 12, z: 0, rotated: Facing.WEST },
    { x: 35, y: 10, z: 0, rotated: Facing.SOUTH, mirrored: true },
    { x: -8, y: 51, z: 0, rotated: Facing.EAST },
    { x: 5, y: 50, z: 0, rotated: Facing.SOUTH, mirrored: true }
  ]))

  district.add(new CITY.Tree({ pose: { x: 28, y: 52, z: 0 }, trunkHeight: 10, name: 'Topiary Tree' }))
  district.add(new CITY.InstancedFeature(new CITY.Tree({ trunkHeight: 12, name: 'Tree (MeshPhongMaterial, with normals)' }), [
    { x: 51, y: 45, z: 0, rotated: Facing.NORTH },
    { x: 75, y: 40, z: 0, rotated: Facing.EAST },
    { x: 60, y: 10, z: 0, rotated: Facing.SOUTH, mirrored: true }
  ], { materialCost: 'high', useNormals: true }))
  district.add(new CITY.InstancedFeature(new CITY.Tree({ trunkHeight: 15, name: 'Tree (MeshBasicMaterial, no normals)' }), [
    { x: -30, y: 50, z: 0, rotated: Facing.NORTH },
    { x: -30, y: 11, z: 0, rotated: Facing.SOUTH, mirrored: true }
  ], { materialCost: 'lowest', useNormals: false })) // these are the defaults
  district.add(new CITY.InstancedFeature(new CITY.Tree({ trunkHeight: 15, name: 'Tree (MeshLambertMaterial, with normals)' }), [
    { x: -60, y: 50, z: 0, rotated: Facing.NORTH },
    { x: -60, y: 11, z: 0, rotated: Facing.SOUTH, mirrored: true }
  ], { materialCost: 'medium', useNormals: true })) // these are the defaults
}

function addPyramid (district) {
  district.add(new CITY.PyramidOfKhufu({ pose: { x: 500, y: -1500, z: 0 } }))
}

function addInstancedBuildings (district) {
  const specReader = new SpecReader()

  const cottagePoses = [
    { x: -540, y: -200, z: 0, rotated: Facing.NORTH },
    { x: -460, y: -200, z: 0, rotated: Facing.NORTH, mirrored: true },
    { x: -450, y: -170, z: 0, rotated: Facing.EAST },
    { x: -550, y: -150, z: 0, rotated: Facing.WEST },
    { x: -510, y: -100, z: 0, rotated: Facing.SOUTHWEST },
    { x: -490, y: -100, z: 0, rotated: Facing.SOUTHEAST, mirrored: true }
  ]
  const cottage1 = specReader.makeModelFromSpecName('Cottage', { x: 0, y: 0, z: 0 })
  const cottagePoses1 = cottagePoses.map(p => CITY.Pose.combine({ x: 0, y: 0, z: 0 }, p))
  district.add(new CITY.InstancedFeature(cottage1, cottagePoses1, { materialCost: 'high', useNormals: true }))
  const cottage2 = specReader.makeModelFromSpecName('Cottage', { x: 0, y: 0, z: 0 })
  const cottagePoses2 = cottagePoses.map(p => CITY.Pose.combine({ x: 220, y: 0, z: 0 }, p))
  district.add(new CITY.InstancedFeature(cottage2, cottagePoses2, { materialCost: 'lowest', useNormals: false }))

  const wursterHall = specReader.makeModelFromSpecName('Wurster Hall', { x: 0, y: 0, z: 0 })
  district.add(new CITY.InstancedFeature(wursterHall, [
    { x: 80, y: -650, z: 0, rotated: Facing.NORTH },
    { x: 780, y: -650, z: 0, rotated: Facing.NORTH, mirrored: true },
    { x: 380, y: -700, z: 0, rotated: Facing.SOUTH },
    { x: 480, y: -700, z: 0, rotated: Facing.SOUTH, mirrored: true }
  ], { materialCost: 'high', useNormals: true }))
}

function addKalpanaOrbital (district) {
  district.add(new CITY.Kalpana())
}

function addLatticeburg (specReader) {
  const latticeburg = new CITY.Model({ name: 'Latticeburg' })
  const POPULATION = 1000
  latticeburg.setValueForMetric(METRIC.POPULATION, POPULATION)
  latticeburg.add(new CITY.SoccerField({ at: { x: 1620 - 740, y: 515 - 140, z: 0 } }))
  addObjectFromSpec(latticeburg, specReader, 'Lattice Parcel', { x: 0, y: 100, z: 0 })
  addObjectFromSpec(latticeburg, specReader, 'Lattice Parcel', { x: 0, y: 830, z: 0 })
  latticeburg.add(new MidriseComplex({ pose: { x: 198, y: 298, z: 7.5 }, numRowPairs: 4, numColPairs: 4 }))
  latticeburg.add(new CITY.EiffelTower({ pose: { x: 390, y: 1220, z: 0 } }))
  return latticeburg
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

function addObjectFromSpec (district, specReader, specName, pose) {
  const modelObject = specReader.makeModelFromSpecName(specName, pose)
  district.add(modelObject)
}

function _addObjectWithoutSpec (name, specReader = null) {
  if (name === 'creek') {
    const tethys = new CITY.Model({ name: 'River Tethys' })
    addCreek(tethys)
    addTrees(tethys)
    return tethys
  } else if (name === 'Latticeburg') {
    const latticeburg = addLatticeburg(specReader)
    return latticeburg
  } else if (name === 'extras') {
    const extras = new CITY.Model({ name: 'extras' })
    addPyramid(extras)
    addKalpanaOrbital(extras)
    addMovers(extras)
    addInstancedBuildings(extras)
    return extras
  }
}

function main () {
  const city = new CITY.City({ name: 'Paracosm' })
  const districts = []
  const specReader = new SpecReader()

  const url = new URL(window.location.href)
  const modelName = url.searchParams.get('model')

  if (modelName) {
    // window.alert(`showing only:\nmodel=${modelName}`)
    if (modelName === 'creek' || modelName === 'Latticeburg' || modelName === 'extras') {
      const model = _addObjectWithoutSpec(modelName, specReader)
      districts.push(model)
    } else {
      addObjectFromSpec(city, specReader, modelName, { x: 100, y: 100, z: 0 })
      districts.push(...city.getDistricts())
    }
  } else {
    const tethys = _addObjectWithoutSpec('creek')
    city.add(tethys)
    districts.push(tethys)

    addObjectFromSpec(city, specReader, 'Suburbia', { x: -550, y: -800, z: 0 })
    addObjectFromSpec(city, specReader, 'Campus', { x: 50, y: -400, z: 0 })
    addObjectFromSpec(city, specReader, 'Manhattan', { x: -610, y: 800, z: 0 })
    addObjectFromSpec(city, specReader, 'Layered_buildings', { x: -600, y: 40, z: 0 })
    districts.push(...city.getDistricts())

    // const latticeburg = addLatticeburg(specReader)
    const latticeburg = _addObjectWithoutSpec('Latticeburg', specReader)
    districts.push(latticeburg)

    const extras = _addObjectWithoutSpec('extras')
    city.add(extras)
    districts.push(extras)
  }

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
