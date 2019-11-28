/** @file test.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { CITY } from '../src/citylib.js'
import { Geometry } from '../src/core/geometry.js'
import { xy, xyz, xyzAdd, xyzSubtract, count, countTo, randomInt, randomPsuedoGaussian, hypotenuse, array } from '../src/core/util.js'

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

describe('util', function () {
  describe('#xy()', function () {
    it('should return an object with .x and .y properties', function () {
      const obj = xy(3.4, 4.5)
      assert.strictEqual(obj.x, 3.4)
      assert.strictEqual(obj.y, 4.5)
    })
  })
  describe('#xyx()', function () {
    it('should return an object with .x, .y and .z properties', function () {
      const obj = xyz(3.4, 4.5, 6.7)
      assert.strictEqual(obj.x, 3.4)
      assert.strictEqual(obj.y, 4.5)
      assert.strictEqual(obj.z, 6.7)
    })
  })
  describe('#xyzAdd()', function () {
    it('should return an object with the sums of the .x .y .z values', function () {
      const sum = xyzAdd(xyz(1, 2, 3), xyz(10, 20, 30))
      assert.strictEqual(sum.x, 11)
      assert.strictEqual(sum.y, 22)
      assert.strictEqual(sum.z, 33)
    })
  })
  describe('#xyzSubtract()', function () {
    it('should return an object with the differences of the .x .y .z values', function () {
      const difference = xyzSubtract(xyz(10, 20, 30), xyz(1, 2, 3))
      assert.strictEqual(difference.x, 9)
      assert.strictEqual(difference.y, 18)
      assert.strictEqual(difference.z, 27)
    })
  })
  describe('#count()', function () {
    it('should return an array with the requested number of integers', function () {
      const array = count(6, 15, 3)
      assert.strictEqual(array.length, (15 - 6) / 3)
    })
  })
  describe('#countTo()', function () {
    it('should return an array with the requested number of integers', function () {
      const array = countTo(8)
      assert.strictEqual(array.length, 8)
    })
  })
  describe('#randomInt()', function () {
    it('should return a number within the requested range', function () {
      const random = randomInt(12, 24)
      assert(random >= 12)
      assert(random <= 24)
    })
  })
  describe('#randomPsuedoGaussian()', function () {
    it('should return a number', function () {
      const random = randomPsuedoGaussian(100, 10)
      assert(!isNaN(random))
    })
  })
  describe('#hypotenuse()', function () {
    it('should work for 2D right triangles', function () {
      const result = hypotenuse(3, 4)
      assert.strictEqual(result, 5)
    })
    it('should work for 3D vectors', function () {
      const result = hypotenuse(2, 8, 16)
      assert.strictEqual(result, 18)
    })
  })
  describe('#array()', function () {
    it('should wrap single objects in arrays', function () {
      const result = array('foo')
      assert.strictEqual(result.length, 1)
      assert.strictEqual(result[0], 'foo')
    })
    it('should return empty arrays for non-objects', function () {
      let x
      const result = array(x)
      assert.strictEqual(result.length, 0)
    })
    it('should return any array it is given', function () {
      const input = ['foo', 'bar']
      const output = array(input)
      assert.deepStrictEqual(input, output)
    })
  })
})
