/** @file storey_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Geometry } from '../../../src/core/geometry.js'
import { Ray } from '../../../src/core/ray.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Use } from '../../../src/architecture/use.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it, beforeEach */
/* eslint-disable no-unused-expressions */

describe('Storey', function () {
  const ray = new Ray()
  let count

  describe('#constructor', function () {
    const rectangle = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]

    beforeEach(function () {
      count = 0
    })

    it('should return a Group with the right name if one was specified', function () {
      const room = new Storey(ray, Use.ROOM, rectangle, { name: 'lobby' })

      room.name.should.equal('lobby')
    })
    it('should return a Group named by its use if no name was specified', function () {
      const room = new Storey(ray, Use.ROOM, rectangle)

      room.name.should.equal('ROOM')
    })
    it('should return a Group with one Instance when called with a rectangle and no wall value', function () {
      const room = new Storey(ray, Use.ROOM, rectangle)

      room.accept(node => { count += node instanceof Geometry.Instance ? 1 : 0 })
      count.should.equal(1)
    })
    it('should return a Group with five Instances when called with a rectangle and a wall value', function () {
      const room = new Storey(ray, Use.ROOM, rectangle, { wall: 12 })

      room.accept(node => { count += node instanceof Geometry.Instance ? 1 : 0 })
      count.should.equal(5)
    })
  })
})
