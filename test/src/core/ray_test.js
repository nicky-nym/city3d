/** @file ray_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { xyz } from '../../../src/core/util.js'
import { Ray } from '../../../src/core/ray.js'
import { Facing } from '../../../src/core/facing.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Ray', function () {
  const ray = new Ray()

  describe('#constructor', function () {
    it('should initialize the ray', function () {
      ray.az.should.eql(Facing.NORTH)
      ray.xyz.should.eql(xyz(0, 0, 0))
    })
  })

  describe('#goto', function () {
    it('should set the ray values', function () {
      ray.goto(Facing.EAST, xyz(3, 2, 1))

      ray.az.should.eql(Facing.EAST)
      ray.xyz.should.eql(xyz(3, 2, 1))
    })
  })

  describe('#applyRay', function () {
    const listOfPoints = [xyz(0, 0, 0), xyz(30, 20, 10)]

    it('should neither rotate nor translate, when faceing NORTH at the origin', function () {
      ray.goto(Facing.NORTH, xyz(0, 0, 0))

      const result = ray.applyRay(listOfPoints)

      result.should.eql(listOfPoints)
    })
    it('should translate but not rotate, when facing NORTH', function () {
      ray.goto(Facing.NORTH, xyz(300, 200, 100))
      const expected = [xyz(300, 200, 100), xyz(330, 220, 110)]

      const result = ray.applyRay(listOfPoints)

      result.should.eql(expected)
    })
    it('should rotate, but not translate, when at the origin', function () {
      ray.goto(Facing.SOUTH, xyz(0, 0, 0))
      const expected = [xyz(0, 0, 0), xyz(-30, -20, 10)]

      const result = ray.applyRay(listOfPoints)

      result.should.eql(expected)
    })
    it('should rotate and translate, when not facing NORTH and not at the origin', function () {
      ray.goto(Facing.SOUTH, xyz(300, 200, 100))
      const expected = [xyz(300, 200, 100), xyz(270, 180, 110)]

      const result = ray.applyRay(listOfPoints)

      result.should.eql(expected)
    })
  })
})
