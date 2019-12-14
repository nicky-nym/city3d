/** @file route_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Route } from '../../../src/routes/route.js'
import { xyz } from '../../../src/core/util.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Route', function () {
  describe('#constructor', function () {
    it('should create a Route', function () {
      const route = new Route()

      route.should.exist
    })
  })
  describe('#waypoints', function () {
    it('should return the list of points it was created with', function () {
      const points = [xyz(1, 2, 3), xyz(5, 5, 5), xyz(6, 7, 0)]
      const route = new Route(points)

      route.waypoints().should.equal(points)
    })
  })
  describe('#segments', function () {
    describe('for two waypoints', function () {
      const twoWaypoints = [xyz(0, 0, 0), xyz(3, 4, 0)]

      it('should return one segment', function () {
        const route = new Route(twoWaypoints)

        route.segments().should.have.length(1)
      })
      it('should return a segment with the correct length and normalized vector', function () {
        const route = new Route(twoWaypoints)

        const segment = route.segments()[0]
        segment.len.should.equal(5)
        segment.vNorm.should.eql(xyz(0.6, 0.8, 0))
      })
    })

    describe('for three waypoints', function () {
      const threeWaypoints = [xyz(0, 0, 0), xyz(100, 0, 0), xyz(100, 6, 8)]

      it('should return two segments', function () {
        const route = new Route(threeWaypoints)

        route.segments().should.have.length(2)
      })
      it('should return segments with the correct lengths and normalized vectors', function () {
        const route = new Route(threeWaypoints)

        const segments = route.segments()
        segments[0].len.should.equal(100)
        segments[0].vNorm.should.eql(xyz(1, 0, 0))
        segments[1].len.should.equal(10)
        segments[1].vNorm.should.eql(xyz(0, 0.6, 0.8))
      })
    })
  })
})
