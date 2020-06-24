/** @file pose_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Pose } from '../../../src/core/pose.js'
import { xyz } from '../../../src/core/util.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Pose', function () {
  const noop = { x: 0, y: 0, z: 0, rotated: 0, mirrored: false }
  const translated = { x: 10, y: 20 }
  const rotated = { rotated: 90 }
  const mirrored = { mirrored: true }
  const complicated = { x: 8, y: 16.5, z: -2, rotated: 45, mirrored: true }

  const originXYZ = { x: 0, y: 0, z: 0 }
  const x5y10 = { x: 5, y: 10, z: 0 }

  describe('#copy', function () {
    it('should match the original', function () {
      const copy = Pose.copy(complicated)
      copy.should.eql(complicated)
    })

    it('should not return the input object', function () {
      const copy = Pose.copy(noop)
      copy.x += 1
      copy.should.not.eql(noop)
    })
  })

  describe('#locate origin point', function () {
    it('should return a matching point given an empty pose', function () {
      const resultXYZ = Pose.relocate({}, originXYZ)
      resultXYZ.should.eql(originXYZ)
    })

    it('should not return the input object', function () {
      const resultXYZ = Pose.relocate({}, originXYZ)
      resultXYZ.x += 1
      resultXYZ.should.not.eql(originXYZ)
    })

    it('should work for the "noop" pose', function () {
      const resultXYZ = Pose.relocate(noop, originXYZ)
      resultXYZ.should.eql(originXYZ)
    })

    it('should work for the "translated" pose', function () {
      const resultXYZ = Pose.relocate(translated, originXYZ)
      const expected = {
        x: originXYZ.x + translated.x,
        y: originXYZ.y + translated.y,
        z: originXYZ.z
      }
      resultXYZ.should.eql(expected)
    })

    it('should work for the "rotated" pose', function () {
      const resultXYZ = Pose.relocate(rotated, originXYZ)
      resultXYZ.should.eql(originXYZ)
    })

    it('should work for the "mirrored" pose', function () {
      const resultXYZ = Pose.relocate(mirrored, originXYZ)
      resultXYZ.should.eql(originXYZ)
    })

    it('should work for the "complicated" pose', function () {
      const resultXYZ = Pose.relocate(complicated, originXYZ)
      const expected = {
        x: complicated.x,
        y: complicated.y,
        z: complicated.z
      }
      resultXYZ.should.eql(expected)
    })
  })

  describe('#relocate x5y10', function () {
    it('should return a matching point given an empty pose', function () {
      const resultXYZ = Pose.relocate({}, x5y10)
      resultXYZ.should.eql(x5y10)
    })

    it('should not return the input object', function () {
      const resultXYZ = Pose.relocate({}, x5y10)
      resultXYZ.x += 1
      resultXYZ.should.not.eql(x5y10)
    })

    it('should work for the "noop" pose', function () {
      const resultXYZ = Pose.relocate(noop, x5y10)
      resultXYZ.should.eql(x5y10)
    })

    it('should work for the "translated" pose', function () {
      const resultXYZ = Pose.relocate(translated, x5y10)
      const expected = {
        x: x5y10.x + translated.x,
        y: x5y10.y + translated.y,
        z: x5y10.z
      }
      resultXYZ.should.eql(expected)
    })

    it('should work for the "rotated" pose', function () {
      const resultXYZ = Pose.relocate(rotated, x5y10)
      const expected = {
        x: -x5y10.y,
        y: x5y10.x,
        z: x5y10.z
      }
      resultXYZ.should.eql(expected)
    })

    it('should work for the "mirrored" pose', function () {
      const resultXYZ = Pose.relocate(mirrored, x5y10)
      const expected = {
        x: -x5y10.x,
        y: x5y10.y,
        z: x5y10.z
      }
      resultXYZ.should.eql(expected)
    })

    it('should work for the "complicated" pose', function () {
      const resultXYZ = Pose.relocate(complicated, x5y10)
      const expected = {
        x: 11.5,
        y: 27.1,
        z: -2
      }
      resultXYZ.x.should.be.closeTo(expected.x, 0.1)
      resultXYZ.y.should.be.closeTo(expected.y, 0.1)
      resultXYZ.z.should.eql(expected.z)
    })
  })

  describe('#relocate list', function () {
    const listOfPoints = [xyz(0, 0, 0), xyz(30, 20, 10)]

    it('should return a list of equal length', function () {
      const result = Pose.relocate(complicated, listOfPoints)
      result.length.should.eql(listOfPoints.length)
    })

    it('should not return the input list', function () {
      const result = Pose.relocate(complicated, listOfPoints)
      result.push({ z: 4 })
      result.length.should.not.eql(listOfPoints.length)
    })

    it('should rotate correctly for angles that are not cardinal directions', function () {
      const pose = { x: 0, y: 0, z: 0, rotated: 30 }
      const expected = [xyz(0, 0, 0), xyz(15.98, 32.32, 10)]

      const result = Pose.relocate(pose, listOfPoints)

      result[0].should.eql(expected[0])
      result[1].x.should.be.closeTo(expected[1].x, 0.001)
      result[1].y.should.be.closeTo(expected[1].y, 0.001)
      result[1].z.should.eql(expected[1].z)
    })
  })

  describe('#combine', function () {
    it('should effective ignore a "noop" parent pose', function () {
      const combined = Pose.combine(noop, complicated)
      const expectedXyz = Pose.relocate(complicated, x5y10)
      const actualXyz = Pose.relocate(combined, x5y10)
      actualXyz.should.eql(expectedXyz)
    })

    it('should effective ignore a "noop" child pose', function () {
      const combined = Pose.combine(complicated, noop)
      const expectedXyz = Pose.relocate(complicated, x5y10)
      const actualXyz = Pose.relocate(combined, x5y10)
      actualXyz.should.eql(expectedXyz)
    })

    it('should work for simple transations', function () {
      const combined = Pose.combine({ x: 1, y: 2 }, { x: 10, y: 20 })
      const expectedXyz = {
        x: 11 + x5y10.x,
        y: 22 + x5y10.y,
        z: 0
      }
      const actualXyz = Pose.relocate(combined, x5y10)
      actualXyz.should.eql(expectedXyz)
    })

    it('should work for double mirrors', function () {
      const combined = Pose.combine({ mirrored: true }, { mirrored: true })
      const resultXyz = Pose.relocate(combined, x5y10)
      resultXyz.should.eql(x5y10)
    })

    it('should work for complementary rotations', function () {
      const combined = Pose.combine({ rotated: 90 }, { rotated: 270 })
      const resultXyz = Pose.relocate(combined, x5y10)
      resultXyz.x.should.be.closeTo(x5y10.x, 0.1)
      resultXyz.y.should.be.closeTo(x5y10.y, 0.1)
    })
  })

  describe('#collapse', function () {
    const X1 = 2
    const Y1 = 5
    const Z1 = 6
    const R1 = 28
    const X2 = 4
    const Y2 = 4
    const Z2 = 1
    const R2 = 48
    const X3 = 9
    const Y3 = 8
    const Z3 = 0
    const R3 = 23
    const P1 = { x: X1, y: Y1, z: Z1, rotated: R1, mirrored: true }
    const P2 = { x: X2, y: Y2, z: Z2, rotated: R2, mirrored: false, subPose: P1 }
    const P3 = { x: X3, y: Y3, z: Z3, rotated: R3, mirrored: true, subPose: P2 }

    it('should collapse origin pose to origin pose', function () {
      const collapsedOriginPose = Pose.collapse(Pose.DEFAULT)

      collapsedOriginPose.should.eql(Pose.DEFAULT)
    })

    it('should collapse flat pose (pose without subPose) to itself', function () {
      const collapsedFlatPose = Pose.collapse(P1)

      collapsedFlatPose.should.eql(P1)
    })

    it('should add translations for nested pose', function () {
      const nestedPose = {
        x: X3,
        y: Y3,
        z: Z3,
        subPose: {
          x: X2,
          y: Y2,
          z: Z2,
          subPose: {
            x: X1,
            y: Y1,
            z: Z1
          }
        }
      }
      const collapsedNestedPose = Pose.collapse(nestedPose)

      collapsedNestedPose.x.should.equal(X1 + X2 + X3)
      collapsedNestedPose.y.should.equal(Y1 + Y2 + Y3)
      collapsedNestedPose.z.should.equal(Z1 + Z2 + Z3)
    })

    it('should add rotations for nested pose', function () {
      const collapsedNestedPose = Pose.collapse(P3)

      collapsedNestedPose.rotated.should.equal(R1 + R2 + R3)
    })

    it('should collapse mirrored part of flat poses correctly', function () {
      const P4 = { ...P1, mirrored: false }
      Pose.collapse(P4).mirrored.should.be.false
      P4.mirrored = true
      Pose.collapse(P4).mirrored.should.be.true
      delete P4.mirrored
      Pose.collapse(P4).mirrored.should.be.false
    })

    it('should collapse non-mirrored pose with mirrored subPose to mirrored pose', function () {
      Pose.collapse(P2).mirrored.should.be.true
    })

    it('should work for double mirrors', function () {
      Pose.collapse(P3).mirrored.should.be.false
    })

    it('should collapse mirrors correctly when one mirror is undefined', function () {
      const P4 = { ...P3 }
      delete P4.mirrored

      Pose.collapse(P4).mirrored.should.be.true
    })
  })
})
