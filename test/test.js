import { CITY } from '../citylib.js'
import { Geometry } from '../city3d/geometry.js'

/* global describe, it */

var assert = require('assert')

describe('Geometry', function () {
  describe('XYPolygon', function () {
    describe('#area()', function () {
      it('should return the correct area for a rectangle', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 3 })
        xyPolygon.push({ x: 2, y: 3 })
        xyPolygon.push({ x: 2, y: 0 })
        assert.strictEqual(xyPolygon.area(), 6)
      })
      it('should return the correct area for a triangle', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 3 })
        xyPolygon.push({ x: 4, y: 3 })
        assert.strictEqual(xyPolygon.area(), 6)
      })
      it('should return zero for a line', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 1 })
        xyPolygon.push({ x: 0, y: 4 })
        assert.strictEqual(xyPolygon.area(), 0)
      })
      it('should return zero for a point', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 1, y: 2 })
        assert.strictEqual(xyPolygon.area(), 0)
      })
      it('should return the correct area for a closed rectangle', function () {
        const xyPolygon = new Geometry.XYPolygon()
        xyPolygon.push({ x: 0, y: 0 })
        xyPolygon.push({ x: 0, y: 3 })
        xyPolygon.push({ x: 2, y: 3 })
        xyPolygon.push({ x: 2, y: 0 })
        xyPolygon.push({ x: 0, y: 0 })
        assert.strictEqual(xyPolygon.area(), 6)
      })
    })
  })
})

describe('Vehicle', function () {
  describe('#constructor', function () {
    it('should create a Vehicle of the specified type', function () {
      const v = new CITY.Vehicle([[0, 0, 0], [500, 0, 0]], 0.5, 'unicycle')
      assert.strictEqual(v.threeComponent.name, 'unicycle')
      assert.strictEqual(v.threeComponent.userData.spinningWheels.length, 1)
    })
  })
  describe('#getRoute()', function () {
    it('should return the route it was constructed with', function () {
      const v = new CITY.Vehicle([[0, 0, 0], [100, 0, 0], [100, 100, 0]], 0.5)
      assert.deepStrictEqual(v.getRoute(), [[0, 0, 0], [100, 0, 0], [100, 100, 0]])
    })
  })
  describe('#update()', function () {
    it('should not change the position if speed = 0', function () {
      const v = new CITY.Vehicle([[100, 0, 0], [100, 100, 0]], 0)
      v.update()
      assert.deepStrictEqual(v.position, [100, 0, 0])
    })
    it('should change the position if speed > 0', function () {
      const v = new CITY.Vehicle([[100, 0, 0], [100, 100, 0]], 0.5)
      v.update()
      assert.notDeepStrictEqual(v.position, [100, 0, 0])
    })
  })
})
