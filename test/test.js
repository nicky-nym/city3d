/** @file test.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { CITY } from '../src/citylib.js'
import 'chai/register-should'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('CITY', function () {
  describe('City', function () {
    it('should create a City', function () {
      const city = new CITY.City('Testopia')

      city.should.exist
    })
  })
})
