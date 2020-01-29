/** @file ray_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyz } from '../../../src/core/util.js'
import { Ray } from '../../../src/core/ray.js'
import { Facing } from '../../../src/core/facing.js'
import { UNIT } from '../../../src/core/unit.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Ray', function () {
  let ray

  describe('#constructor', function () {
    it('should initialize the ray', function () {
      ray = new Ray()

      ray.az.should.eql(Facing.NORTH)
      ray.xyz.should.eql(xyz(0, 0, 0))
    })
  })

  describe('#goto', function () {
    it.skip('should set the ray values', function () {
      ray = new Ray(Facing.EAST, xyz(3, 2, 1))

      ray.az.should.eql(Facing.EAST)
      ray.xyz.should.eql(xyz(3, 2, 1))
    })
  })

  describe('#applyRay', function () {
    const individualPoint = xyz(30, 20, 10)
    const listOfPoints = [xyz(0, 0, 0), xyz(30, 20, 10)]

    it('should operate on individual points as well as lists', function () {
      ray = new Ray(Facing.NORTH, xyz(3, 2, 1))
      const expected = xyz(33, 22, 11)

      const result = ray.applyRay(individualPoint)

      result.should.eql(expected)
    })

    it('should neither rotate nor translate, when facing NORTH at the origin', function () {
      ray = new Ray(Facing.NORTH, xyz(0, 0, 0))

      const result = ray.applyRay(listOfPoints)

      result.should.eql(listOfPoints)
    })

    it('should translate but not rotate, when facing NORTH', function () {
      ray = new Ray(Facing.NORTH, xyz(300, 200, 100))
      const expected = [xyz(300, 200, 100), xyz(330, 220, 110)]

      const result = ray.applyRay(listOfPoints)

      result.should.eql(expected)
    })

    it('should rotate, but not translate, when at the origin', function () {
      ray = new Ray(Facing.SOUTH, xyz(0, 0, 0))
      const expected = [xyz(0, 0, 0), xyz(-30, -20, 10)]

      const result = ray.applyRay(listOfPoints)

      result.should.eql(expected)
    })

    it('should rotate and translate, when not facing NORTH and not at the origin', function () {
      ray = new Ray(Facing.SOUTH, xyz(300, 200, 100))
      const expected = [xyz(300, 200, 100), xyz(270, 180, 110)]

      const result = ray.applyRay(listOfPoints)

      result.should.eql(expected)
    })

    it('should rotate correctly for angles that are not cardinal directions', function () {
      ray = new Ray(UNIT.degrees(30), xyz(0, 0, 0))
      const expected = [xyz(0, 0, 0), xyz(15.98, 32.32, 10)]

      const result = ray.applyRay(listOfPoints)

      result[0].should.eql(expected[0])
      result[1].x.should.be.closeTo(expected[1].x, 0.001)
      result[1].y.should.be.closeTo(expected[1].y, 0.001)
      result[1].z.should.eql(expected[1].z)
    })
  })
})
