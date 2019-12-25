/** @file geometry_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Geometry } from '../../../src/core/geometry.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Geometry', function () {
  describe('XYPolygon', function () {
    describe('#area()', function () {
      it('should return the correct area for a rectangle', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 3 })
        xyPolygon.push({ x: 2, y: 3 })
        xyPolygon.push({ x: 2, y: 0 })
        xyPolygon.area().should.equal(6)
      })
      it('should return the correct area for a triangle', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 3 })
        xyPolygon.push({ x: 4, y: 3 })
        xyPolygon.area().should.equal(6)
      })
      it('should return zero for a line', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 1 })
        xyPolygon.push({ x: 0, y: 4 })
        xyPolygon.area().should.equal(0)
      })
      it('should return zero for a point', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 1, y: 2 })
        xyPolygon.area().should.equal(0)
      })
      it('should return the correct area for a closed rectangle', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 3 })
        xyPolygon.push({ x: 2, y: 3 })
        xyPolygon.push({ x: 2, y: 0 })
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.area().should.equal(6)
      })
    })
  })

  describe('ThickPolygon2', function () {
    describe('constructed with a rectangle', function () {
      const rectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: 0, y: 6 }, { x: 8, y: 6 }, { x: 8, y: 0 }])

      describe('#area()', function () {
        it('should return the correct area', function () {
          const poly = new Geometry.ThickPolygon2(rectangle)

          poly.area().should.equal(48)
        })
      })

      describe('#areaOfOpenings()', function () {
        it('should return the correct area', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { openings: [[xy(4, 3), xy(6, 3), xy(6, 5), xy(4, 5)]] })
          poly.areaOfOpenings().should.equal(4)
        })
      })
    })
  })
})
