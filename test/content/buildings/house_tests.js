/** @file house_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { House } from '../../../content/buildings/house.js'
// import { xy, xyz, fullName } from '../../../src/core/util.js'

/* global describe, it */

describe('House', function () {
  describe('#constructor', function () {
    it('should return a House named "House" if no name is specified', function () {
      const house = new House()
      house.name.should.equal('House')
    })
    it('should return a House with the right name if one was specified', function () {
      const house = new House({ name: '4222 Clinton Way' })
      house.name.should.equal('4222 Clinton Way')
    })
  })
})
