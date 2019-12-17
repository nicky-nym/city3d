/** @file unit_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { xyz } from '../../../src/core/util.js'
import { UNIT } from '../../../src/core/unit.js'
// import { Facing } from '../../../src/core/facing.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('UNIT', function () {
  describe('#meters', function () {
    it('should convert from meters to feet', function () {
      const result = UNIT.meters(1)

      result.should.eql(3.28084)
    })
  })

  describe('#km', function () {
    it('should convert from kilometers to feet', function () {
      const result = UNIT.km(1)

      result.should.eql(3280.84)
    })
  })

  describe('#feet', function () {
    it('should return the value it is given', function () {
      const result = UNIT.feet(1)

      result.should.eql(1)
    })
  })

  describe('#radians', function () {
    it('should return the same value for an angle of 0 radians', function () {
      const result = UNIT.radians(0)

      result.should.eql(0)
    })

    it('should convert from radians to degrees for a positive value', function () {
      const result = UNIT.radians(Math.PI)

      result.should.eql(180)
    })
  })

  describe('#degrees', function () {
    it('should return the value it is given', function () {
      const result = UNIT.degrees(180)

      result.should.eql(180)
    })
  })

  describe('#toRadians', function () {
    it('should return the same value for an angle of 0 radians', function () {
      const result = UNIT.toRadians(0)

      result.should.eql(0)
    })

    it('should convert from degrees to radians for a cardinal direction', function () {
      const result = UNIT.toRadians(180)

      result.should.eql(Math.PI)
    })

    it('should convert from degrees to radians for any positive angle', function () {
      const result = UNIT.toRadians(45)
      const expected = Math.PI / 4

      result.should.eql(expected)
    })
  })
})
