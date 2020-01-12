/** @file xy.schema_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../../node_modules/ajv/dist/ajv.min.js'
import { xyz } from '../../../../src/core/util.js'
import xyzSchema from '../../../../src/architecture/schemas/xyz.schema.json.js'

/* global describe, it */

describe('schemas', function () {
  describe('xyz.schema', function () {
    const ajv = new Ajv()
    const xyzValidator = ajv.compile(xyzSchema)

    it('should accept a simple valid {xyz} object', function () {
      const goodXYZ = { x: 0, y: 0, z: 0 }
      xyzValidator(goodXYZ).should.equal(true)
    })

    it('should treat x: y: and z: as all optional', function () {
      const goodXYZ = { }
      xyzValidator(goodXYZ).should.equal(true)
    })

    it('should ignore unrecognized additional optional properties', function () {
      const goodXYZ = { q: 0 }
      xyzValidator(goodXYZ).should.equal(true)
    })

    it('should accept the output from xyz()', function () {
      const goodXYZ = xyz(22, 33, -44)
      xyzValidator(goodXYZ).should.equal(true)
    })

    it('should reject any non-numeric {xyz} values', function () {
      const badXYZ = { x: false, y: 0, z: 0 }
      xyzValidator(badXYZ).should.equal(false)
    })

    it('should reject any string {xy} values', function () {
      const badXYZ = { x: 0, y: 0, z: '33' }
      xyzValidator(badXYZ).should.equal(false)
    })

    it('should reject any non-object substitute for {xy}', function () {
      const badXYZ = true
      const alsoBad = 88
      const worse = []
      const omg = null

      xyzValidator(badXYZ).should.equal(false)
      xyzValidator(alsoBad).should.equal(false)
      xyzValidator(worse).should.equal(false)
      xyzValidator(omg).should.equal(false)
      xyzValidator().should.equal(false)
    })
  })
})
