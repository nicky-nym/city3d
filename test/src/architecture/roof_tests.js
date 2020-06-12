/** @file roof_tests.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Roof } from '../../../src/architecture/roof.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Roof', function () {
  describe.skip('accessor methods', function () {
    let flatRoof
    let shedRoof
    let gableRoof
    let saltboxRoof
    let hipRoof
    let gambrelRoof
    let mansardRoof
    let jerkinheadRoof
    let dutchGableRoof

    const flatRoofSpec = {
      name: 'Flat roof',
      form: 'flat',
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const shedRoofSpec = {
      name: 'Shed roof',
      form: 'shed',
      pitch: { rise: 9, run: 12 },
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const gableRoofSpec = {
      name: 'Gable roof',
      form: 'pitched',
      pitch: { rise: 9, run: 12 },
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const saltboxRoofSpec = {
      name: 'Saltbox roof',
      form: 'pitched',
      pitch: { rise: 9, run: 12 },
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const hipRoofSpec = {
      name: 'Hip roof',
      form: 'hipped',
      pitch: { rise: 9, run: 12 },
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const gambrelRoofSpec = {
      name: 'Gambrel roof',
      form: 'pitched',
      pitch: [{ rise: 18, run: 12 }, { rise: 6, run: 12 }],
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const mansardRoofSpec = {
      name: 'Mansard roof',
      form: 'hipped',
      pitch: [{ rise: 18, run: 12 }, { rise: 6, run: 12 }],
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const jerkinheadRoofSpec = {
      name: 'Jerkinhead roof',
      form: 'jerkinhead',
      pitch: { rise: 9, run: 12 },
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    const dutchGableRoofSpec = {
      name: 'Dutch Gable roof',
      form: 'dutch',
      pitch: { rise: 9, run: 12 },
      eaves: 1,
      outline: { shape: 'rectangle', size: xy(10, 20) }
    }

    beforeEach(function () {
      flatRoof = new Roof({ spec: flatRoofSpec })
      shedRoof = new Roof({ spec: shedRoofSpec })
      gableRoof = new Roof({ spec: gableRoofSpec })
      saltboxRoof = new Roof({ spec: saltboxRoofSpec })
      hipRoof = new Roof({ spec: hipRoofSpec })
      gambrelRoof = new Roof({ spec: gambrelRoofSpec })
      mansardRoof = new Roof({ spec: mansardRoofSpec })
      jerkinheadRoof = new Roof({ spec: jerkinheadRoofSpec })
      dutchGableRoof = new Roof({ spec: dutchGableRoofSpec })
    })

    describe('#getFaceCount()', function () {
      it('should return the number of faces on the roof', function () {
        flatRoof.getFaceCount().should.equal(1)
        shedRoof.getFaceCount().should.equal(1)
        gableRoof.getFaceCount().should.equal(2)
        saltboxRoof.getFaceCount().should.equal(2)
        hipRoof.getFaceCount().should.equal(4)
        gambrelRoof.getFaceCount().should.equal(4)
        mansardRoof.getFaceCount().should.equal(8)
        jerkinheadRoof.getFaceCount().should.equal(4)
        dutchGableRoof.getFaceCount().should.equal(4)
      })
    })

    describe('#getRidgeCount()', function () {
      it('should return the number of ridge lines on the roof', function () {
        flatRoof.getRidgeCount().should.equal(0)
        shedRoof.getRidgeCount().should.equal(0)
        gableRoof.getRidgeCount().should.equal(1)
        saltboxRoof.getRidgeCount().should.equal(1)
        hipRoof.getRidgeCount().should.equal(1)
        gambrelRoof.getRidgeCount().should.equal(3)
        mansardRoof.getRidgeCount().should.equal(5)
        jerkinheadRoof.getRidgeCount().should.equal(1)
        dutchGableRoof.getRidgeCount().should.equal(1)
      })
    })

    describe('#getHipCount()', function () {
      it('should return the number of hip lines on the roof', function () {
        flatRoof.getHipCount().should.equal(0)
        shedRoof.getHipCount().should.equal(0)
        gableRoof.getHipCount().should.equal(0)
        saltboxRoof.getHipCount().should.equal(0)
        hipRoof.getHipCount().should.equal(4)
        gambrelRoof.getHipCount().should.equal(0)
        mansardRoof.getHipCount().should.equal(8)
        jerkinheadRoof.getHipCount().should.equal(4)
        dutchGableRoof.getHipCount().should.equal(4)
      })
    })

    describe('#getValleyCount()', function () {
      it('should return the number of valley lines on the roof', function () {
        flatRoof.getValleyCount().should.equal(0)
        shedRoof.getValleyCount().should.equal(0)
        gableRoof.getValleyCount().should.equal(0)
        saltboxRoof.getValleyCount().should.equal(0)
        hipRoof.getValleyCount().should.equal(0)
        gambrelRoof.getValleyCount().should.equal(0)
        mansardRoof.getValleyCount().should.equal(0)
        jerkinheadRoof.getValleyCount().should.equal(0)
        dutchGableRoof.getValleyCount().should.equal(0)
      })
    })

    describe('#getRakeCount()', function () {
      it('should return the number of rake lines on the roof', function () {
        flatRoof.getRakeCount().should.equal(0)
        shedRoof.getRakeCount().should.equal(2)
        gableRoof.getRakeCount().should.equal(4)
        saltboxRoof.getRakeCount().should.equal(4)
        hipRoof.getRakeCount().should.equal(0)
        gambrelRoof.getRakeCount().should.equal(8)
        mansardRoof.getRakeCount().should.equal(0)
        jerkinheadRoof.getRakeCount().should.equal(4)
        dutchGableRoof.getRakeCount().should.equal(4)
      })
    })

    describe('#getEaveCount()', function () {
      it('should return the number of eave lines on the roof', function () {
        flatRoof.getEaveCount().should.equal(4)
        shedRoof.getEaveCount().should.equal(2)
        gableRoof.getEaveCount().should.equal(2)
        saltboxRoof.getEaveCount().should.equal(2)
        hipRoof.getEaveCount().should.equal(4)
        gambrelRoof.getEaveCount().should.equal(2)
        mansardRoof.getEaveCount().should.equal(4)
        jerkinheadRoof.getEaveCount().should.equal(4)
        dutchGableRoof.getEaveCount().should.equal(4)
      })
    })

    describe('#getRoofArea()', function () {
      it('should return the number of eave lines on the roof', function () {
        const flatArea = (10 + 1 + 1) * (20 + 1 + 1)
        const slopedBy60 = 2 * flatArea
        flatRoof.getRoofArea().should.equal(flatArea)
        shedRoof.getRoofArea().should.equal(slopedBy60)
        gableRoof.getRoofArea().should.equal(slopedBy60)
        saltboxRoof.getRoofArea().should.equal(slopedBy60)
        hipRoof.getRoofArea().should.equal(slopedBy60)
        gambrelRoof.getRoofArea().should.equal(-1) // TODO: fix me!
        mansardRoof.getRoofArea().should.equal(-1) // TODO: fix me!
        jerkinheadRoof.getRoofArea().should.equal(slopedBy60)
        dutchGableRoof.getRoofArea().should.equal(slopedBy60)
      })
    })
  })
})
