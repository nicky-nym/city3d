/** @file catalog_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Catalog } from '../../content/catalog.js'
import COTTAGE_SPEC from '../../content/buildings/cottage.json.js'

/* global describe, it, should */

describe('Catalog', function () {
  describe('registerSpec() and getSpec()', function () {
    const catalog = new Catalog()
    catalog.registerSpec(COTTAGE_SPEC)

    it('should return the same spec that was registered', function () {
      catalog.getSpec('Cottage').should.equal(COTTAGE_SPEC)
    })

    it('should return undefined for names that were never registered', function () {
      should.not.exist(catalog.getSpec('10 Downing Street'))
    })
  })
})
