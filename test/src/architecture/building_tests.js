/**
 * @file building_tests.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Building } from '../../../src/architecture/building.js'
import { FeatureGroup, FeatureInstance } from '../../../src/core/feature.js'
import { Storey } from '../../../src/architecture/storey.js'
import { xy, xyz } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Building', function () {
  let count

  describe('#constructor', function () {
    const minimalSpec = {
      name: 'hut',
      anchorPoint: xyz(0, 0, 0),
      storeys: [{
        name: 'ground floor',
        floors: [{
          outline: {
            shape: 'rectangle',
            size: xy(10, 20)
          }
        }]
      }]
    }

    it('should return a Building with the name from the spec if no other name was specified', function () {
      const building = new Building({ spec: minimalSpec })

      building.name.should.equal('hut')
    })

    describe('For a minimal spec', function () {
      beforeEach(function () {
        count = 0
      })

      it('should return a Building with one Storey', function () {
        const building = new Building({ spec: minimalSpec })

        building.accept(node => { count += node instanceof Storey ? 1 : 0 })
        count.should.equal(1)
      })
      it('should return a Building with a Storey with the expected name', function () {
        const building = new Building({ spec: minimalSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys[0].name.toLowerCase().should.equal('ground floor')
      })
      it('should return a Building with a Storey with the expected full name', function () {
        const building = new Building({ spec: minimalSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys[0].fullName().toLowerCase().should.equal('ground floor of hut')
      })
      it('should return a Building with a Storey with one level of detail', function () {
        const building = new Building({ spec: minimalSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys[0].getLevelsOfDetail().should.have.length(1)
      })
      it('should create levels with property "feature" with value of type FeatureGroup', function () {
        const building = new Building({ spec: minimalSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        const lods = storeys[0].getLevelsOfDetail()
        lods[0].should.have.property('feature')
        lods[0].feature.should.be.an.instanceof(FeatureGroup)
      })
    })

    describe('For a simple three storey spec', function () {
      const simpleThreeStoreySpec = {
        name: 'Triplex',
        anchorPoint: xyz(0, 0, 0),
        storeys: [{
          repeat: 3,
          floors: [{
            outline: {
              shape: 'rectangle',
              size: xy(10, 20)
            }
          }]
        }]
      }

      beforeEach(function () {
        count = 0
      })

      it('should return a Building with one Storey with a repeat of 3', function () {
        const building = new Building({ spec: simpleThreeStoreySpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys.should.have.length(1)
        storeys[0]._repeat.should.equal(3)
      })
      it('should return a Building with one Storey with the expected full names', function () {
        const building = new Building({ spec: simpleThreeStoreySpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys.should.have.length(1)
        storeys[0].fullName().toLowerCase().should.equal('triplex')
      })
      it('should create levels of detail with exactly one Geometry Instance', function () {
        const building = new Building({ spec: simpleThreeStoreySpec })

        building.getLevelsOfDetail().forEach(lod => {
          let count = 0
          lod.feature.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
          count.should.equal(1)
        })
      })
    })

    describe('For a spec with a random storey height and number of storeys', function () {
      const randomSpec = {
        name: 'High-rise building',
        anchorPoint: xyz(0, 0, 0),
        storeys: [{
          repeat: { $random: [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60] },
          height: { $random: [9, 10, 11, 12, 13, 14] },
          floors: [{
            outline: {
              shape: 'rectangle',
              size: xy(10, 10)
            }
          }]
        }]
      }

      beforeEach(function () {
        count = 0
      })

      it('should return a Building with two lower resolution levels of detail', function () {
        const building = new Building({ spec: randomSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys[0].getLevelsOfDetail().should.have.length(1)
      })
      it('should create levels with property "feature" with value of type FeatureGroup', function () {
        const building = new Building({ spec: randomSpec })

        building.getLevelsOfDetail().forEach(lod => {
          lod.should.have.property('feature')
          lod.feature.should.be.an.instanceof(FeatureGroup)
        })
      })
      it('should create levels of detail with exactly one Geometry Instance', function () {
        const building = new Building({ spec: randomSpec })

        building.getLevelsOfDetail().forEach(lod => {
          let count = 0
          lod.feature.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
          count.should.equal(1)
        })
      })
    })

    describe('Contained in a FeatureGroup', function () {
      const minimalSpec = {
        name: 'hut',
        anchorPoint: xyz(0, 0, 0),
        storeys: [{
          name: 'ground floor',
          floors: [{
            outline: {
              shape: 'rectangle',
              size: xy(10, 20)
            }
          }]
        }]
      }

      it('should result in a Building whose full name includes the name of the containing group', function () {
        const neighborhood = new FeatureGroup('Neighborhood 2')
        const building = new Building({ spec: minimalSpec })
        neighborhood.add(building)

        building.fullName().should.equal('hut of Neighborhood 2')
      })
      it('should result in levels of detail whose full names include the name of the containing group', function () {
        const neighborhood = new FeatureGroup('Neighborhood 2')
        const building = new Building({ spec: minimalSpec })
        neighborhood.add(building)

        building.getLevelsOfDetail().forEach(lod => {
          lod.feature.fullName().should.equal('hut of Neighborhood 2')
        })
      })

      describe('#addLevelOfDetail', function () {
        let building

        beforeEach(function () {
          const neighborhood = new FeatureGroup('Neighborhood 2')
          building = new Building({ spec: minimalSpec })
          neighborhood.add(building)
        })

        it('should result in an additional level of detail', function () {
          const storeys = []
          building.accept(node => { if (node instanceof Storey) storeys.push(node) })
          storeys[0].getLevelsOfDetail().should.have.length(1)
          storeys[0].addLevelOfDetail(new FeatureGroup('hut'), 9999)
          storeys[0].getLevelsOfDetail().should.have.length(2)
        })
        it('should result in a level of detail whose full name includes the name of the containing group', function () {
          building.addLevelOfDetail(new FeatureGroup('speck'), 9999)

          building.getLevelsOfDetail().pop().feature.fullName().should.equal('speck of Neighborhood 2')
        })
      })
    })
  })
})
