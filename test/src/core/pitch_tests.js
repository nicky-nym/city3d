/** @file pitch_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Pitch } from '../../../src/core/pitch.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Pitch', function () {
  const pitch45degrees = new Pitch(45, 'degrees')
  const pitchPIover4radians = new Pitch(Math.PI / 4, 'radians')
  const pitch100percent = new Pitch(100, 'percent')
  const pitch12to12pitch = new Pitch(12, ':', 12)
  const pitch8to12pitch = new Pitch(8, ':', 12)
  const pitch4to12pitch = new Pitch(4, ':', 12)
  const pitch1to12pitch = new Pitch(1, ':', 12)

  describe('#degrees', function () {
    it('should return the angle in degrees', function () {
      pitch45degrees.degrees().should.equal(45)
      pitchPIover4radians.degrees().should.equal(45)
      pitch100percent.degrees().should.equal(45)
      pitch12to12pitch.degrees().should.equal(45)
      pitch8to12pitch.degrees().should.be.closeTo(33.7, 0.1)
      pitch4to12pitch.degrees().should.be.closeTo(18.4, 0.1)
      pitch1to12pitch.degrees().should.be.closeTo(4.8, 0.1)
    })
  })

  describe('#radians', function () {
    it('should return the angle in radians', function () {
      pitch45degrees.radians().should.equal(Math.PI / 4)
      pitchPIover4radians.radians().should.equal(Math.PI / 4)
      pitch100percent.radians().should.equal(Math.PI / 4)
      pitch12to12pitch.radians().should.equal(Math.PI / 4)
      pitch8to12pitch.radians().should.be.closeTo(0.588, 0.001)
      pitch4to12pitch.radians().should.be.closeTo(0.322, 0.001)
      pitch1to12pitch.radians().should.be.closeTo(Math.PI / 37.5, 0.001)
    })
  })

  describe('#slope', function () {
    it('should return the slope diveded by 100%', function () {
      pitch45degrees.slope().should.be.closeTo(1, 0.0001)
      pitchPIover4radians.slope().should.be.closeTo(1, 0.0001)
      pitch100percent.slope().should.be.closeTo(1, 0.0001)
      pitch12to12pitch.slope().should.be.closeTo(1, 0.0001)
      pitch8to12pitch.slope().should.equal(8 / 12)
      pitch4to12pitch.slope().should.equal(4 / 12)
      pitch1to12pitch.slope().should.equal(1 / 12)
    })
  })

  describe('#grade', function () {
    it('should return the grade diveded by 100%', function () {
      pitch45degrees.grade().should.be.closeTo(1, 0.0001)
      pitchPIover4radians.grade().should.be.closeTo(1, 0.0001)
      pitch100percent.grade().should.be.closeTo(1, 0.0001)
      pitch12to12pitch.grade().should.be.closeTo(1, 0.0001)
      pitch8to12pitch.grade().should.equal(8 / 12)
      pitch4to12pitch.grade().should.equal(4 / 12)
      pitch1to12pitch.grade().should.equal(1 / 12)
    })
  })

  describe('#pitch', function () {
    it('should return the pitch', function () {
      const pitch45degreePitch = pitch45degrees.pitch()
      const pitchPIover4pitch = pitchPIover4radians.pitch()
      const pitch100percentPitch = pitch100percent.pitch()

      const ratio45degrees = pitch45degreePitch.rise / pitch45degreePitch.run
      const ratioPIover4 = pitchPIover4pitch.rise / pitchPIover4pitch.run
      const ratio100percent = pitch100percentPitch.rise / pitch100percentPitch.run

      ratio45degrees.should.be.closeTo(1, 0.0001)
      ratioPIover4.should.be.closeTo(1, 0.0001)
      ratio100percent.should.be.closeTo(1, 0.0001)
      pitch12to12pitch.pitch().should.deep.equal({ rise: 12, run: 12 })
      pitch8to12pitch.pitch().should.deep.equal({ rise: 8, run: 12 })
      pitch4to12pitch.pitch().should.deep.equal({ rise: 4, run: 12 })
      pitch1to12pitch.pitch().should.deep.equal({ rise: 1, run: 12 })
    })
  })
})
