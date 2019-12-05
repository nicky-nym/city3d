/** @file plato_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { City } from '../../../src/architecture/city.js'
import { Geometry } from '../../../src/core/geometry.js'
import { Group } from '../../../src/architecture/group.js'
import { Facing } from '../../../src/core/facing.js'
import { Plato } from '../../../src/architecture/plato.js'
import { Use } from '../../../src/architecture/use.js'
import { xy, xyz } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Plato', function () {
  const plato = new Plato()

  describe('#makeRoute', function () {
    const listOfWaypoints = [xyz(0, 0, 0), xyz(50, 20, 0), xyz(200, 20, 8)]

    it('should create a route equal to its input if goto not called', function () {
      const route = plato.makeRoute('NOTCURRENTLYUSED', listOfWaypoints)

      route.should.eql(listOfWaypoints)
    })
    it('should create a route offset from its input after goto called', function () {
      plato.goto(xyz(1, 2, 4))
      const expectedRoute = [xyz(1, 2, 4), xyz(51, 22, 4), xyz(201, 22, 12)]

      const route = plato.makeRoute('NOTCURRENTLYUSED', listOfWaypoints)

      route.should.eql(expectedRoute)
    })
    it('should create a route rotated by 90 deg from its input after goto called with Facing.WEST', function () {
      plato.goto({ facing: Facing.WEST })
      const expectedRoute = [xyz(0, 0, 0), xyz(-20, 50, 0), xyz(-20, 200, 8)]

      const route = plato.makeRoute('NOTCURRENTLYUSED', listOfWaypoints)

      route.should.eql(expectedRoute)
    })
  })

  describe('#makePlace2()', function () {
    const rectangle = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
    let count

    beforeEach(function () {
      count = 0
    })

    it('should return a Group with the right name if one was specified', function () {
      const room = plato.makePlace2(Use.ROOM, rectangle, { name: 'lobby' })

      room.name.should.equal('lobby')
    })
    it('should return a Group named by its use if no name was specified', function () {
      const room = plato.makePlace2(Use.ROOM, rectangle)

      room.name.should.equal('ROOM')
    })
    it('should return a Group with one Instance when called with a rectangle and no wall value', function () {
      const room = plato.makePlace2(Use.ROOM, rectangle)

      room.accept(node => { count += node instanceof Geometry.Instance ? 1 : 0 })
      count.should.equal(1)
    })
    it('should return a Group with five Instances when called with a rectangle and a wall value', function () {
      const room = plato.makePlace2(Use.ROOM, rectangle, { wall: 12 })

      room.accept(node => { count += node instanceof Geometry.Instance ? 1 : 0 })
      count.should.equal(5)
    })
  })

  describe('#aggregateMetric()', function () {
    const rect1 = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
    const rect2 = [xy(0, 0), xy(40, 0), xy(40, 20), xy(0, 20)]

    beforeEach(function () {
    })

    it('should return the correct floor area for a room made from a single rectangle', function () {
      const room = plato.makePlace2(Use.ROOM, rect1)

      Plato.aggregateMetric(room, 'Floor area: ROOM').should.equal(1000)
    })
    it('should return the correct floor area for a house made of two rectangular rooms', function () {
      const house = new Group()
      house.add(plato.makePlace2(Use.ROOM, rect1))
      house.add(plato.makePlace2(Use.ROOM, rect2))

      Plato.aggregateMetric(house, 'Floor area: ROOM').should.equal(1800)
    })
    it('should return the correct floor area for a house with nested rectangular rooms', function () {
      const house = new Group()
      house.add(plato.makePlace2(Use.ROOM, rect1))
      const wing = new Group()
      wing.add(plato.makePlace2(Use.ROOM, rect2))
      wing.add(plato.makePlace2(Use.ROOM, rect2))
      house.add(wing)

      Plato.aggregateMetric(house, 'Floor area: ROOM').should.equal(2600)
    })
  })

  describe('#study()', function () {
    let city
    let plato

    beforeEach(function () {
      city = new City('Testopia')
      plato = new Plato(city)
    })

    it('should result in a sector of the city being created with the specified name', function () {
      plato.study('test sector')

      const sectors = city.getSectors()
      sectors.should.have.length(1)
      sectors[0].name.should.equal('test sector')
    })
  })

  describe('#pontificate()', function () {
    let city
    let plato
    let sector
    const parcelRect = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
    const roomRect = [xyz(5, 5, 0), xyz(45, 5, 0), xyz(45, 15, 0), xyz(5, 15, 0)]

    beforeEach(function () {
      city = new City('Testopia')
      plato = new Plato(city)
      plato.study('test sector')
      sector = city.getSectors()[0]
    })

    it('should add the expected metrics when a Parcel and a room are created', function () {
      plato.makeParcel(parcelRect)
      plato.makePlace(Use.ROOM, roomRect)
      plato.pontificate()

      sector.metrics.should.include.all.keys('Floor area', 'Parcel FAR', 'Overall FAR')
    })
    it('should add Floor area metric but not FAR metrics when a room but no Parcel is created', function () {
      plato.makePlace(Use.ROOM, roomRect)
      plato.pontificate()

      sector.metrics.should.include.keys('Floor area')
      sector.metrics.should.not.include.any.keys('Parcel FAR', 'Overall FAR')
    })
    it('should compute the correct value and units for Floor area for one rectangular room', function () {
      plato.makePlace(Use.ROOM, roomRect)
      plato.pontificate()

      const floorAreaMetric = sector.metrics.get('Floor area')
      floorAreaMetric.value.ROOM.should.equal(400)
      floorAreaMetric.units.should.equal('square feet')
    })
    it('should compute the correct values and units for FAR metrics for a rectangular Parcel and room', function () {
      plato.makeParcel(parcelRect)
      plato.makePlace(Use.ROOM, roomRect)
      plato.pontificate()

      sector.metrics.get('Parcel FAR').value.should.equal('0.4')
      sector.metrics.get('Parcel FAR').units.should.equal('floor area ratio')
      sector.metrics.get('Overall FAR').value.should.equal('0.4')
      sector.metrics.get('Overall FAR').units.should.equal('floor area ratio')
    })
    it('should compute the correct value and units for Wall area for one rectangular room with walls', function () {
      plato.makePlace(Use.ROOM, roomRect, { wall: 10 })
      plato.pontificate()

      const wallAreaMetric = sector.metrics.get('Wall area')
      wallAreaMetric.value.should.equal(1000)
      wallAreaMetric.units.should.equal('square feet')
    })

    describe('For a three story building on a Parcel bordered by streets', function () {
      const parcelRect = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
      const streetRect = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
      const storyRect = [xyz(0, 0, 0), xyz(40, 0, 0), xyz(40, 10, 0), xyz(0, 10, 0)]

      beforeEach(function () {
        city = new City('Testopia')
        plato = new Plato(city)
        plato.study('test sector')
        sector = city.getSectors()[0]
        plato.makeParcel(parcelRect)
        plato.goto(xyz(5, 5, 0))
        plato.makePlace(Use.ROOM, storyRect, { wall: 10 })
        plato.goto(xyz(5, 5, 10))
        plato.makePlace(Use.ROOM, storyRect, { wall: 10 })
        plato.goto(xyz(5, 5, 20))
        plato.makePlace(Use.ROOM, storyRect, { wall: 10 })
        plato.goto(xyz(0, 20, 0))
        plato.makePlace(Use.STREET, streetRect)
        plato.goto(xyz(0, -20, 0))
        plato.makePlace(Use.STREET, streetRect)
      })

      it('should compute the correct values for Floor area', function () {
        plato.pontificate()

        sector.metrics.get('Floor area').value.ROOM.should.equal(1200)
        sector.metrics.get('Floor area').value.PARCEL.should.equal(1000)
        sector.metrics.get('Floor area').value.STREET.should.equal(2000)
      })
      it('should compute the correct value for Parcel FAR', function () {
        plato.pontificate()

        sector.metrics.get('Parcel FAR').value.should.equal('1.2')
      })
      it('should compute the correct value for Overall FAR', function () {
        plato.pontificate()

        sector.metrics.get('Overall FAR').value.should.equal('0.4')
      })
      it('should compute the correct values for Wall areas', function () {
        plato.pontificate()

        sector.metrics.get('Wall area').value.should.equal(3000)
        sector.metrics.get('Wall opening area').value.should.equal(0)
      })
    })
  })
})
