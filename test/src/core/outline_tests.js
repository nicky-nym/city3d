/** @file outline_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Outline } from '../../../src/core/outline.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Outline', function () {
  describe('rectangle', function () {
    const rectangle = new Outline(
      { shape: 'rectangle', size: { x: 10, y: 20 } }
    )

    it('should have 4 corners', function () {
      rectangle.corners().length.should.equal(4)
    })
  })

  describe('offsetRectangle', function () {
    const offsetRectangle = new Outline(
      { shape: 'rectangle', size: { x: 10, y: 20 } },
      0
    )

    it.skip('should have 4 corners', function () {
      offsetRectangle.corners().length.should.equal(4)
    })
  })
})
