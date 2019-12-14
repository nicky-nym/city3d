/** @file mover_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Mover } from '../../../src/architecture/mover.js'
import { Route } from '../../../src/routes/route.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Mover', function () {
  describe('#constructor', function () {
    it('should create a Mover', function () {
      const mover = new Mover(new Route([[0, 0, 0]]), 2.2, null)

      mover.should.exist
    })
  })
  describe('#update()', function () {
    it('should not change the position if speed = 0', function () {
      const m = new Mover(new Route([[100, 0, 0], [100, 100, 0]]), 0)

      m.update.bind(m).should.not.change(m, 'position')
    })
    it('should change the position if speed > 0', function () {
      const m = new Mover(new Route([[100, 0, 0], [100, 100, 0]]), 0.5)

      m.update.bind(m).should.change(m, 'position')
    })
  })
})
