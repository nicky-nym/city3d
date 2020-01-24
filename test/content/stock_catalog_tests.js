/** @file stock_catalog_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { StockCatalog } from '../../content/stock_catalog.js'
import COTTAGE_SPEC from '../../content/buildings/cottage.json.js'
import GARAGE_SPEC from '../../content/buildings/garage.json.js'

/* global describe, it, should */

describe('StockCatalog', function () {
  describe('getSpec()', function () {
    const catalog = new StockCatalog()

    it('should successfully return a pre-registered spec object', function () {
      catalog.getSpec('Cottage').should.equal(COTTAGE_SPEC)
      catalog.getSpec('Garage').should.equal(GARAGE_SPEC)
    })

    it('should return undefined for names that were never registered', function () {
      should.not.exist(catalog.getSpec('10 Downing Street'))
    })
  })
})
