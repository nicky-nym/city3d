/** @file garage.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import WURSTER_HALL_SPEC from '../../../content/buildings/wurster_hall.json.js'
import { Schematic } from '../../../src/schemas/schematic.js'

/* global describe, it */

describe('wurster_hall.json.js', function () {
  describe('wurster hall schema validation', function () {
    const validator = Schematic.getEntityValidator('building')

    it('should accept all the entire wurster hall spec', function () {
      const goodJSON = WURSTER_HALL_SPEC
      validator(goodJSON).should.equal(true)
    })
  })
})
