/** @file feature_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { City } from '../../../src/architecture/city.js'
import { Facing } from '../../../src/core/facing.js'
import { Feature, InstancedFeature } from '../../../src/core/feature.js'
import { SpecReader } from '../../../src/architecture/spec_reader.js'

/* global describe, it */

describe('InstancedFeature', function () {
  const specReader = new SpecReader()

  describe('#fullName()', function () {
    const city = new City({ name: 'Testopia' })

    it('should return the correct full name when added to a city', function () {
      const tree = specReader.makeModelFromSpecName('Tree', { x: 0, y: 0, z: 0 })
      const instancedTree = new InstancedFeature(tree, [
        { x: -60, y: 50, z: 0, rotated: Facing.NORTH },
        { x: -60, y: 11, z: 0, rotated: Facing.SOUTH, mirrored: true }
      ])
      city.add(instancedTree)

      // Note: it's tree, not instancedTree, that is assigned to the userData that ThreeOutput uses.
      tree.fullName().should.equal('Tree of Testopia')
    })
  })

  describe('#layerIndex()', function () {
    const layerMap = Feature.getRegisteredLayersByCategory()
    const landscapeLayers = layerMap.get('Landscape')
    const treeLayer = landscapeLayers.find(layer => layer.displayName === 'trees & plants')
    const buildingsLayers = layerMap.get('Buildings')
    const buildingCopiesLayer = buildingsLayers.find(layer => layer.displayName === 'copies')

    it('should return the right value for an instanced Tree', function () {
      const tree = specReader.makeModelFromSpecName('Tree', { x: 0, y: 0, z: 0 })
      const instancedTree = new InstancedFeature(tree, [
        { x: -60, y: 50, z: 0, rotated: Facing.NORTH },
        { x: -60, y: 11, z: 0, rotated: Facing.SOUTH, mirrored: true }
      ])
      instancedTree.layerIndex().should.equal(treeLayer.index)
    })
    it('should return the right value for an instanced Cottage', function () {
      const cottage = specReader.makeModelFromSpecName('Cottage', { x: 0, y: 0, z: 0 })
      const instancedCottage = new InstancedFeature(cottage, [
        { x: -440, y: 450, z: 0, rotated: Facing.NORTH },
        { x: -450, y: 400, z: 0, rotated: Facing.WEST },
        { x: -390, y: 350, z: 0, rotated: Facing.SOUTHEAST, mirrored: true }
      ])
      instancedCottage.layerIndex().should.equal(buildingCopiesLayer.index)
    })
  })
})
