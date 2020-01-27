/** @file roof_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Roof } from '../../../src/architecture/roof.js'
import { UNIT } from '../../../src/core/unit.js'
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
      roof: {
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) }
    }

    const shedRoofSpec = {
      name: 'Shed roof',
      roof: {
        pitched: UNIT.degrees(60),
        ridgeSetback: UNIT.feet(10),
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) },
      walls: [
        { type: 'rectangular' },
        { type: 'gabled' },
        { type: 'rectangular' },
        { type: 'gabled' }
      ]
    }

    const gableRoofSpec = {
      name: 'Gable roof',
      roof: {
        pitched: UNIT.degrees(60),
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) },
      walls: [
        { type: 'rectangular' },
        { type: 'gabled' },
        { type: 'rectangular' },
        { type: 'gabled' }
      ]
    }

    const saltboxRoofSpec = {
      name: 'Saltbox roof',
      roof: {
        pitched: UNIT.degrees(60),
        ridgeSetback: UNIT.feet(7),
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) },
      walls: [
        { type: 'rectangular' },
        { type: 'gabled' },
        { type: 'rectangular' },
        { type: 'gabled' }
      ]
    }

    const hipRoofSpec = {
      name: 'Hip roof',
      roof: {
        pitched: UNIT.degrees(60),
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) }
    }

    const gambrelRoofSpec = {
      name: 'Gambrel roof',
      roof: {
        pitched: [UNIT.degrees(30), UNIT.degrees(60)],
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) },
      walls: [
        { type: 'rectangular' },
        { type: 'gabled' },
        { type: 'rectangular' },
        { type: 'gabled' }
      ]
    }

    const mansardRoofSpec = {
      name: 'Mansard roof',
      pitched: [UNIT.degrees(30), UNIT.degrees(60)],
      eaves: UNIT.feet(1),
      shape: { type: 'rectangle', data: xy(10, 20) }
    }

    const jerkinheadRoofSpec = {
      name: 'Jerkinhead roof',
      roof: {
        pitched: UNIT.degrees(60),
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) },
      walls: [
        { type: 'rectangular' },
        { type: 'jerkinhead' },
        { type: 'rectangular' },
        { type: 'jerkinhead' }
      ]
    }

    const dutchGableRoofSpec = {
      name: 'Dutch Gable roof',
      roof: {
        pitched: UNIT.degrees(60),
        eaves: UNIT.feet(1)
      },
      shape: { type: 'rectangle', data: xy(10, 20) },
      walls: [
        { type: 'rectangular' },
        { type: 'dutch' },
        { type: 'rectangular' },
        { type: 'dutch' }
      ]
    }

    beforeEach(function () {
      flatRoof = new Roof({ deprecatedSpec: flatRoofSpec })
      shedRoof = new Roof({ deprecatedSpec: shedRoofSpec })
      gableRoof = new Roof({ deprecatedSpec: gableRoofSpec })
      saltboxRoof = new Roof({ deprecatedSpec: saltboxRoofSpec })
      hipRoof = new Roof({ deprecatedSpec: hipRoofSpec })
      gambrelRoof = new Roof({ deprecatedSpec: gambrelRoofSpec })
      mansardRoof = new Roof({ deprecatedSpec: mansardRoofSpec })
      jerkinheadRoof = new Roof({ deprecatedSpec: jerkinheadRoofSpec })
      dutchGableRoof = new Roof({ deprecatedSpec: dutchGableRoofSpec })
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
