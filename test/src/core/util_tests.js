/** @file util_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xy, xyz, xyzAdd, xyzSubtract, count, countTo, randomInt, randomPseudoGaussian, hypotenuse, array } from '../../../src/core/util.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('util', function () {
  describe('#xy()', function () {
    it('should return an object with .x and .y properties', function () {
      const obj = xy(3.4, 4.5)
      obj.should.have.property('x', 3.4)
      obj.should.have.property('y', 4.5)
    })
  })
  describe('#xyx()', function () {
    it('should return an object with .x, .y and .z properties', function () {
      const obj = xyz(3.4, 4.5, 6.7)
      obj.should.have.property('x', 3.4)
      obj.should.have.property('y', 4.5)
      obj.should.have.property('z', 6.7)
    })
  })
  describe('#xyzAdd()', function () {
    it('should return an object with the sums of the .x .y .z values', function () {
      const sum = xyzAdd(xyz(1, 2, 3), xyz(10, 20, 30))
      sum.should.eql({ x: 11, y: 22, z: 33 })
    })
  })
  describe('#xyzSubtract()', function () {
    it('should return an object with the differences of the .x .y .z values', function () {
      const difference = xyzSubtract(xyz(10, 20, 30), xyz(1, 2, 3))
      difference.should.eql({ x: 9, y: 18, z: 27 })
    })
  })
  describe('#count()', function () {
    it('should return an array with the requested number of integers', function () {
      const array = count(6, 15, 3)
      array.should.have.length((15 - 6) / 3)
      array.should.eql([6, 9, 12])
    })
  })
  describe('#countTo()', function () {
    it('should return an array with the requested number of integers', function () {
      const array = countTo(8)
      array.should.have.length(8)
      array.should.eql([0, 1, 2, 3, 4, 5, 6, 7])
    })
  })
  describe('#randomInt()', function () {
    it('should return a number within the requested range', function () {
      const random = randomInt(12, 24)
      random.should.be.within(12, 24)
    })
  })
  describe('#randomPseudoGaussian()', function () {
    it('should return a number', function () {
      const random = randomPseudoGaussian(100, 10)
      random.should.be.finite
    })
  })
  describe('#hypotenuse()', function () {
    it('should work for 2D right triangles', function () {
      const result = hypotenuse(3, 4)
      result.should.equal(5)
    })
    it('should work for 3D vectors', function () {
      const result = hypotenuse(2, 8, 16)
      result.should.equal(18)
    })
  })
  describe('#array()', function () {
    it('should wrap single objects in arrays', function () {
      const result = array('foo')
      result.should.have.length(1)
      result[0].should.equal('foo')
    })
    it('should return empty arrays for non-objects', function () {
      let x
      const result = array(x)
      result.should.be.an('array').that.is.empty
    })
    it('should return any array it is given', function () {
      const input = ['foo', 'bar']
      const output = array(input)
      output.should.eql(input)
    })
  })
})
