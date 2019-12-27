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
  describe('#convert', function () {
    it('should convert from meters to km', function () {
      const result = UNIT.convert({ from: UNIT.meters(2100), to: UNIT.km })

      result.should.equal(2.1)
    })
    it('should convert from km to meters', function () {
      const result = UNIT.convert({ from: UNIT.km(4.2), to: UNIT.meters })

      result.should.be.closeTo(4200, 0.0001)
    })
    it('should convert from meters to meters', function () {
      const result = UNIT.convert({ from: UNIT.meters(1), to: UNIT.meters })

      result.should.equal(1)
    })
  })

  describe('#meters', function () {
    it('should convert from meters to feet', function () {
      const result = UNIT.meters(1)

      result.should.equal(3.28084)
    })
  })

  describe('#km', function () {
    it('should convert from kilometers to feet', function () {
      const result = UNIT.km(1)

      result.should.equal(3280.84)
    })
  })

  describe('#feet', function () {
    it('should return the value it is given', function () {
      const result = UNIT.feet(1)

      result.should.equal(1)
    })
  })

  describe('#squareFeet', function () {
    it('should have a display name', function () {
      const result = UNIT.squareFeet.displayName

      result.should.equal('square feet')
    })
  })

  describe('#radians', function () {
    it('should return the same value for an angle of 0 radians', function () {
      const result = UNIT.radians(0)

      result.should.equal(0)
    })

    it('should convert from radians to degrees for a positive value', function () {
      const result = UNIT.radians(Math.PI)

      result.should.equal(180)
    })
  })

  describe('#degrees', function () {
    it('should return the value it is given', function () {
      const result = UNIT.degrees(180)

      result.should.equal(180)
    })
  })

  describe('#convert', function () {
    it('should return the same value for an angle of 0 radians', function () {
      const radians = UNIT.convert({ from: UNIT.degrees(0), to: UNIT.radians })

      radians.should.equal(0)
    })

    it('should convert from degrees to radians for a cardinal direction', function () {
      const radians = UNIT.convert({ from: UNIT.degrees(180), to: UNIT.radians })

      radians.should.equal(Math.PI)
    })

    it('should convert from degrees to radians for any positive angle', function () {
      const radians = UNIT.convert({ from: UNIT.degrees(45), to: UNIT.radians })
      const expected = Math.PI / 4

      radians.should.equal(expected)
    })
  })
})
