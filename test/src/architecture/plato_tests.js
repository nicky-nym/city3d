/** @file plato_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Byway } from '../../../src/architecture/byway.js'
import { City } from '../../../src/architecture/city.js'
import { Group } from '../../../src/architecture/group.js'
import { Parcel } from '../../../src/architecture/parcel.js'
import { Plato } from '../../../src/architecture/plato.js'
import { Ray } from '../../../src/core/ray.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Use } from '../../../src/architecture/use.js'
import { xy, xyz } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Plato', function () {
  const ray = new Ray()

  describe('#aggregateMetric()', function () {
    const rect1 = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
    const rect2 = [xy(0, 0), xy(40, 0), xy(40, 20), xy(0, 20)]

    beforeEach(function () {

    })

    it('should return the correct floor area for a room made from a single rectangle', function () {
      const room = new Storey(ray, Use.ROOM, rect1)

      Plato.aggregateMetric(room, 'Floor area: ROOM').should.equal(1000)
    })
    it('should return the correct floor area for a house made of two rectangular rooms', function () {
      const house = new Group()
      house.add(new Storey(ray, Use.ROOM, rect1))
      house.add(new Storey(ray, Use.ROOM, rect2))

      Plato.aggregateMetric(house, 'Floor area: ROOM').should.equal(1800)
    })
    it('should return the correct floor area for a house with nested rectangular rooms', function () {
      const house = new Group()
      house.add(new Storey(ray, Use.ROOM, rect1))
      const wing = new Group()
      wing.add(new Storey(ray, Use.ROOM, rect2))
      wing.add(new Storey(ray, Use.ROOM, rect2))
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

    it('should result in a district of the city being created with the specified name', function () {
      plato.study('test district')

      const districts = city.getDistricts()
      districts.should.have.length(1)
      districts[0].name.should.equal('test district')
    })
  })

  describe('#pontificate()', function () {
    let city
    let plato
    let ray
    let district
    const parcelRect = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
    const roomRect = [xyz(5, 5, 0), xyz(45, 5, 0), xyz(45, 15, 0), xyz(5, 15, 0)]

    beforeEach(function () {
      city = new City('Testopia')
      plato = new Plato(city)
      ray = plato.goto()
      plato.study('test district')
      district = city.getDistricts()[0]
    })

    it('should add the expected metrics when a Parcel and a room are created', function () {
      plato.appendToDistrict(new Parcel(parcelRect, ray))
      plato.appendToDistrict(new Storey(ray, Use.ROOM, roomRect))

      plato.pontificate()

      district.metrics.should.include.all.keys('Floor area', 'Parcel FAR', 'Overall FAR')
    })
    it('should add Floor area metric but not FAR metrics when a room but no Parcel is created', function () {
      plato.appendToDistrict(new Storey(ray, Use.ROOM, roomRect))
      plato.pontificate()

      district.metrics.should.include.keys('Floor area')
      district.metrics.should.not.include.any.keys('Parcel FAR', 'Overall FAR')
    })
    it('should compute the correct value and units for Floor area for one rectangular room', function () {
      plato.appendToDistrict(new Storey(ray, Use.ROOM, roomRect))
      plato.pontificate()

      const floorAreaMetric = district.metrics.get('Floor area')
      floorAreaMetric.value.ROOM.should.equal(400)
      floorAreaMetric.units.should.equal('square feet')
    })
    it('should compute the correct values and units for FAR metrics for a rectangular Parcel and room', function () {
      plato.appendToDistrict(new Parcel(parcelRect, ray))
      plato.appendToDistrict(new Storey(ray, Use.ROOM, roomRect))
      plato.pontificate()

      district.metrics.get('Parcel FAR').value.should.equal('0.4')
      district.metrics.get('Parcel FAR').units.should.equal('floor area ratio')
      district.metrics.get('Overall FAR').value.should.equal('0.4')
      district.metrics.get('Overall FAR').units.should.equal('floor area ratio')
    })
    it('should compute the correct value and units for Wall area for one rectangular room with walls', function () {
      plato.appendToDistrict(new Storey(ray, Use.ROOM, roomRect, { wall: 10 }))
      plato.pontificate()

      const wallAreaMetric = district.metrics.get('Wall area')
      wallAreaMetric.value.should.equal(1000)
      wallAreaMetric.units.should.equal('square feet')
    })

    describe('For a three storey building on a Parcel bordered by streets', function () {
      const parcelRect = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
      const streetRect = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
      const storeyRect = [xyz(0, 0, 0), xyz(40, 0, 0), xyz(40, 10, 0), xyz(0, 10, 0)]

      beforeEach(function () {
        city = new City('Testopia')
        plato = new Plato(city)
        ray = plato.goto()
        plato.study('test district')
        district = city.getDistricts()[0]
        plato.appendToDistrict(new Parcel(parcelRect, ray))
        ray = plato.goto(xyz(5, 5, 0))
        plato.appendToDistrict(new Storey(ray, Use.ROOM, storeyRect, { wall: 10 }))
        ray = plato.goto(xyz(5, 5, 10))
        plato.appendToDistrict(new Storey(ray, Use.ROOM, storeyRect, { wall: 10 }))
        ray = plato.goto(xyz(5, 5, 20))
        plato.appendToDistrict(new Storey(ray, Use.ROOM, storeyRect, { wall: 10 }))
        ray = plato.goto(xyz(0, 20, 0))
        plato.appendToDistrict(new Byway(ray, Use.STREET, streetRect))
        ray = plato.goto(xyz(0, -20, 0))
        plato.appendToDistrict(new Byway(ray, Use.STREET, streetRect))
      })

      it('should compute the correct values for Floor area', function () {
        plato.pontificate()

        district.metrics.get('Floor area').value.ROOM.should.equal(1200)
        district.metrics.get('Floor area').value.PARCEL.should.equal(1000)
        district.metrics.get('Floor area').value.STREET.should.equal(2000)
      })
      it('should compute the correct value for Parcel FAR', function () {
        plato.pontificate()

        district.metrics.get('Parcel FAR').value.should.equal('1.2')
      })
      it('should compute the correct value for Overall FAR', function () {
        plato.pontificate()

        district.metrics.get('Overall FAR').value.should.equal('0.4')
      })
      it('should compute the correct values for Wall areas', function () {
        plato.pontificate()

        district.metrics.get('Wall area').value.should.equal(3000)
        district.metrics.get('Wall opening area').value.should.equal(0)
      })
    })
  })
})
