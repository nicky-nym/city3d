/** @file city_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { City } from '../../../src/architecture/city.js'
import { FeatureGroup } from '../../../src/core/feature.js'
import { Route } from '../../../src/routes/route.js'
import { Use } from '../../../src/architecture/use.js'

/* global describe, it */

describe('City', function () {
  describe('#constructor', function () {
    it('should create a City with the specified name', function () {
      const city = new City({ name: 'Testopia' })
      city.name.should.equal('Testopia')
    })
  })
  describe('#getRoutes()', function () {
    it('should return the Routes added directly to it', function () {
      const city = new City({ name: 'Testopia' })
      const vehicleRoute = new Route([[100, 0, 5], [100, 200, 10], [200, 200, 10]], Use.BIKEPATH)
      const kayakRoute = new Route([[0, 0, 0], [100, 200, 0]], Use.CANAL)
      city.add(vehicleRoute)
      city.add(kayakRoute)

      city.getRoutes().should.have.length(2)
      city.getRoutes().should.include(vehicleRoute)
      city.getRoutes().should.include(kayakRoute)
    })
    it('should return the Routes added indirectly to it', function () {
      const city = new City({ name: 'Testopia' })
      const someRegion = new FeatureGroup()
      city.add(someRegion)
      const watercraftLanes = new FeatureGroup()
      someRegion.add(watercraftLanes)
      const vehicleLanes = new FeatureGroup()
      someRegion.add(vehicleLanes)
      const bicycleLanes = new FeatureGroup()
      vehicleLanes.add(bicycleLanes)
      const kayakRoute = new Route([[0, 0, 0], [100, 200, 0]], Use.CANAL)
      watercraftLanes.add(kayakRoute)
      const vehicleRoute = new Route([[100, 0, 5], [100, 200, 10], [200, 200, 10]], Use.BIKEPATH)
      vehicleLanes.add(vehicleRoute)
      const bikeRoute1 = new Route([[0, 0, 0], [500, 500, 0]], Use.BIKEPATH)
      bicycleLanes.add(bikeRoute1)
      const bikeRoute2 = new Route([[0, 0, 0], [500, -500, 0]], Use.BIKEPATH)
      bicycleLanes.add(bikeRoute2)

      city.getRoutes().should.have.length(4)
      city.getRoutes().should.include(kayakRoute)
      city.getRoutes().should.include(vehicleRoute)
      city.getRoutes().should.include(bikeRoute1)
      city.getRoutes().should.include(bikeRoute2)
    })
  })
})
