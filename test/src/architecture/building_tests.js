/**
 * @file building_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Building } from '../../../src/architecture/building.js'
import { FeatureGroup, FeatureInstance } from '../../../src/core/feature.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Wall } from '../../../src/architecture/wall.js'
import { xy, xyz } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Building', function () {
  let count

  describe('#makeBuildingFromSpec', function () {
    it('should return a Building with the right name if one was specified', function () {
      const testSpec = {
        name: 'hut',
        offset: xyz(0, 0, 0),
        shape: { type: 'rectangle', data: xy(10, 20) }
      }
      const building = new Building({ name: 'hut 22', deprecatedSpec: testSpec })

      building.name.should.equal('hut 22')
    })
    it('should return a Building with the name from the spec if no other name was specified', function () {
      const testSpec = {
        name: 'hut',
        offset: xyz(0, 0, 0),
        shape: { type: 'rectangle', data: xy(10, 20) }
      }
      const building = new Building({ deprecatedSpec: testSpec })

      building.name.should.equal('hut')
    })

    describe('For a minimal spec', function () {
      const minimalSpec = {
        name: 'hut',
        offset: xyz(0, 0, 0),
        shape: { type: 'rectangle', data: xy(10, 20) }
      }

      beforeEach(function () {
        count = 0
      })

      it('should return a Building with two Storeys (one being the roof)', function () {
        const building = new Building({ deprecatedSpec: minimalSpec })

        building.accept(node => { count += node instanceof Storey ? 1 : 0 })
        count.should.equal(2)
      })
      it('should return a Building with two Storeys with the expected names', function () {
        const building = new Building({ deprecatedSpec: minimalSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys[0].name.toLowerCase().should.equal('floor 0')
        storeys[1].name.toLowerCase().should.equal('roof')
      })
      it('should return a Building with two Storeys with the expected full names', function () {
        const building = new Building({ deprecatedSpec: minimalSpec })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys[0].fullName().toLowerCase().should.equal('floor 0 of hut')
        storeys[1].fullName().toLowerCase().should.equal('roof of hut')
      })
      it('should return a Building with two lower resolution levels of detail', function () {
        const building = new Building({ deprecatedSpec: minimalSpec })

        building.getLevelsOfDetail().should.have.length(2)
      })
      it('should create levels with property "feature" with value of type FeatureGroup', function () {
        const building = new Building({ deprecatedSpec: minimalSpec })

        const lods = building.getLevelsOfDetail()
        lods[0].should.have.property('feature')
        lods[0].feature.should.be.an.instanceof(FeatureGroup)
        lods[1].should.have.property('feature')
        lods[1].feature.should.be.an.instanceof(FeatureGroup)
      })
      it('should create levels of detail with exactly one Geometry Instance', function () {
        const building = new Building({ deprecatedSpec: minimalSpec })

        const lods = building.getLevelsOfDetail()
        lods[0].feature.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
        count.should.equal(1)
        count = 0
        lods[1].feature.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
        count.should.equal(1)
      })
    })
    describe('For a simple three storey spec', function () {
      const simpleThreeStoreySpec = {
        name: 'Triplex',
        numStoreys: 3,
        offset: xyz(0, 0, 0),
        shape: { type: 'rectangle', data: xy(10, 20) }
      }

      beforeEach(function () {
        count = 0
      })

      it('should return a Building with four Storeys (one being the roof)', function () {
        const building = new Building({ deprecatedSpec: simpleThreeStoreySpec })

        building.accept(node => { count += node instanceof Storey ? 1 : 0 })
        count.should.equal(4)
      })
      it('should return a Building with four Storeys with the expected full names', function () {
        const building = new Building({ deprecatedSpec: simpleThreeStoreySpec, name: '123 Main St.' })

        const storeys = []
        building.accept(node => { if (node instanceof Storey) storeys.push(node) })
        storeys.should.have.length(4)
        storeys[0].fullName().toLowerCase().should.equal('floor 0 of 123 main st.')
        storeys[1].fullName().toLowerCase().should.equal('floor 1 of 123 main st.')
        storeys[2].fullName().toLowerCase().should.equal('floor 2 of 123 main st.')
        storeys[3].fullName().toLowerCase().should.equal('roof of 123 main st.')
      })
      it('should return a Building with two lower resolution levels of detail', function () {
        const building = new Building({ deprecatedSpec: simpleThreeStoreySpec })

        building.getLevelsOfDetail().should.have.length(2)
      })
      it('should create levels with property "feature" with value of type FeatureGroup', function () {
        const building = new Building({ deprecatedSpec: simpleThreeStoreySpec })

        building.getLevelsOfDetail().forEach(lod => {
          lod.should.have.property('feature')
          lod.feature.should.be.an.instanceof(FeatureGroup)
        })
      })
      it('should create levels of detail with exactly one Geometry Instance', function () {
        const building = new Building({ deprecatedSpec: simpleThreeStoreySpec })

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
        offset: xyz(0, 0, 0),
        storeyHeight: { type: 'randomInt', min: 9, max: 14 },
        numStoreys: { type: 'randomInt', min: 8, max: 60 },
        shape: { type: 'rectangle', data: xy(10, 10) }
      }

      beforeEach(function () {
        count = 0
      })

      it('should return a Building with a number of Storeys in the specified range', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        building.accept(node => { count += node instanceof Storey ? 1 : 0 })
        count.should.be.within(8 + 1, 60 + 1)
      })
      it('should return a Building with a number of Walls equal to four times the number of non-roof Storeys', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        let storeyCount = 0
        building.accept(node => { storeyCount += node instanceof Storey ? 1 : 0 })
        let wallCount = 0
        building.accept(node => { wallCount += node instanceof Wall ? 1 : 0 })
        wallCount.should.equal(4 * (storeyCount - 1))
      })
      it('should return a Building with each Wall having the same height, which is in the specified range', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        const walls = []
        building.accept(node => { if (node instanceof Wall) { walls.push(node) } })
        const firstHeight = walls[0].height()
        firstHeight.should.be.within(9, 14)
        walls.forEach(wall => wall.height().should.equal(firstHeight))
      })
      it('should return a Building with two lower resolution levels of detail', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        building.getLevelsOfDetail().should.have.length(2)
      })
      it('should create levels with property "feature" with value of type FeatureGroup', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        building.getLevelsOfDetail().forEach(lod => {
          lod.should.have.property('feature')
          lod.feature.should.be.an.instanceof(FeatureGroup)
        })
      })
      it('should create levels of detail with exactly one Geometry Instance', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        building.getLevelsOfDetail().forEach(lod => {
          let count = 0
          lod.feature.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
          count.should.equal(1)
        })
      })
      it('should create levels of detail with height equal to the full resolution building', function () {
        const building = new Building({ deprecatedSpec: randomSpec })

        const walls = []
        building.accept(node => { if (node instanceof Wall) { walls.push(node) } })
        const storeyHeight = walls[0].height()
        const fullResTotalHeight = storeyHeight * walls.length / 4
        building.getLevelsOfDetail().forEach(lod => {
          let geometryInstance
          lod.feature.accept(node => { if (node instanceof FeatureInstance) geometryInstance = node })
          geometryInstance.geometry.depth.should.equal(fullResTotalHeight)
        })
      })
    })

    describe('For a nested spec', function () {
      const numStoreysInSouthWing = 4
      const numStoreysInTower = 10
      const numStoreysInNorthWing = 4
      const storeyHeight = 12
      const nestedSpec = {
        name: 'Three Part Building',
        offset: xyz(0, 0, 0),
        storeyHeight,
        children: [{
          name: 'South Wing',
          numStoreys: numStoreysInSouthWing,
          offset: xy(0, 0),
          shape: { type: 'rectangle', data: xy(100, 50) }
        }, {
          name: 'Tower',
          numStoreys: numStoreysInTower,
          offset: xy(100, 0),
          shape: { type: 'rectangle', data: xy(50, 50) }
        }, {
          name: 'North Wing',
          numStoreys: numStoreysInNorthWing,
          offset: xy(150, 0),
          shape: { type: 'rectangle', data: xy(100, 50) }
        }]
      }

      beforeEach(function () {
        count = 0
      })

      it('should return a Building with the expected total number of Storeys', function () {
        const building = new Building({ deprecatedSpec: nestedSpec })

        building.accept(node => { count += node instanceof Storey ? 1 : 0 })
        count.should.equal(numStoreysInSouthWing + 1 + numStoreysInTower + 1 + numStoreysInNorthWing + 1)
      })
      it('should create two levels of detail with property "feature" with value of type FeatureGroup', function () {
        const building = new Building({ deprecatedSpec: nestedSpec })

        building.getLevelsOfDetail().should.have.length(2)
        building.getLevelsOfDetail().forEach(lod => {
          lod.should.have.property('feature')
          lod.feature.should.be.an.instanceof(FeatureGroup)
        })
      })
      it('should create levels of detail with exactly three Geometry Instances', function () {
        const building = new Building({ deprecatedSpec: nestedSpec })

        building.getLevelsOfDetail().forEach(lod => {
          let count = 0
          lod.feature.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
          count.should.equal(3)
        })
      })
      it('should create levels of detail with full child names equal to the corresponding parts of the full resolution building', function () {
        const building = new Building({ deprecatedSpec: nestedSpec })

        building.getLevelsOfDetail().forEach(lod => {
          lod.feature.children[0].fullName().should.equal('South Wing of Three Part Building')
          lod.feature.children[1].fullName().should.equal('Tower of Three Part Building')
          lod.feature.children[2].fullName().should.equal('North Wing of Three Part Building')
        })
      })
      it('should create levels of detail with each Instance height equal to the corresponding part of the full resolution building', function () {
        const building = new Building({ deprecatedSpec: nestedSpec })

        building.getLevelsOfDetail().forEach(lod => {
          const geometryInstances = []
          lod.feature.accept(node => { if (node instanceof FeatureInstance) { geometryInstances.push(node) } })
          geometryInstances[0].geometry.depth.should.equal(numStoreysInSouthWing * storeyHeight)
          geometryInstances[1].geometry.depth.should.equal(numStoreysInTower * storeyHeight)
          geometryInstances[2].geometry.depth.should.equal(numStoreysInNorthWing * storeyHeight)
        })
      })
    })
  })
  // TODO: test 'at'
})
