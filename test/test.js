/** @file test.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { CITY } from '../src/citylib.js'
import 'chai/register-should'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('City', function () {
  describe('#constructor', function () {
    it('should create a City with the specified name', function () {
      const city = new CITY.City('Testopia')
      city.name.should.equal('Testopia')
    })
  })
  describe('#getRoutes()', function () {
    it('should return the routes of Movers added directly to it', function () {
      const city = new CITY.City('Testopia')
      const vehicleRoute = [[100, 0, 5], [100, 200, 10], [200, 200, 10]]
      const kayakRoute = [[0, 0, 0], [100, 200, 0]]
      city.add(new CITY.Vehicle(vehicleRoute))
      city.add(new CITY.Kayak(kayakRoute))
      city.getRoutes().should.have.length(2)
      city.getRoutes().should.include(vehicleRoute)
      city.getRoutes().should.include(kayakRoute)
    })
  })
  describe('#getRoutes()', function () {
    it('should return the routes of Movers added indirectly to it', function () {
      const city = new CITY.City('Testopia')
      const movers = new CITY.Group()
      city.add(movers)
      const watercraft = new CITY.Group()
      movers.add(watercraft)
      const vehicles = new CITY.Group()
      movers.add(vehicles)
      const bicycles = new CITY.Group()
      vehicles.add(bicycles)

      const kayakRoute = [[0, 0, 0], [100, 200, 0]]
      watercraft.add(new CITY.Kayak(kayakRoute))
      const vehicleRoute = [[100, 200, 0], [100, 500, 20], [100, 700, 20]]
      vehicles.add(new CITY.Vehicle(vehicleRoute))
      const bikeRoute1 = [[0, 0, 0], [500, 500, 0]]
      bicycles.add(new CITY.Vehicle(bikeRoute1, 0.5, 'bicycle'))
      const bikeRoute2 = [[0, 0, 0], [500, -500, 0]]
      bicycles.add(new CITY.Vehicle(bikeRoute2, 0.5, 'bicycle'))

      city.getRoutes().should.have.length(4)
      city.getRoutes().should.include(kayakRoute)
      city.getRoutes().should.include(vehicleRoute)
      city.getRoutes().should.include(bikeRoute1)
      city.getRoutes().should.include(bikeRoute2)
    })
  })
})

describe('Vehicle', function () {
  describe('#constructor', function () {
    it('should create a Vehicle of the specified type', function () {
      const v = new CITY.Vehicle([[0, 0, 0], [500, 0, 0]], 0.5, 'unicycle')
      v.threeComponent.name.should.equal('unicycle')
      v.threeComponent.userData.spinningWheels.should.have.length(1)
    })
  })
  describe('#getRoute()', function () {
    it('should return the route it was constructed with', function () {
      const v = new CITY.Vehicle([[0, 0, 0], [100, 0, 0], [100, 100, 0]], 0.5)
      v.getRoute().should.eql([[0, 0, 0], [100, 0, 0], [100, 100, 0]])
    })
  })
  describe('#update()', function () {
    it('should not change the position if speed = 0', function () {
      const v = new CITY.Vehicle([[100, 0, 0], [100, 100, 0]], 0)
      v.update()
      v.position.should.eql([100, 0, 0])

      // TODO: see following comment.
      v.update.bind(v).should.not.change(v, 'position')
    })
    it('should change the position if speed > 0', function () {
      const v = new CITY.Vehicle([[100, 0, 0], [100, 100, 0]], 0.5)
      v.update()
      v.position.should.not.eql([100, 0, 0])

      // TODO: This actually expresses the intent better, and in only one line.
      // Is it easier or harder to understand?
      v.update.bind(v).should.change(v, 'position')
    })
  })
})
