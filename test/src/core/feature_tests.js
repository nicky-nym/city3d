/** @file feature_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Feature } from '../../../src/core/feature.js'
import { Model } from '../../../src/architecture/model.js'
import { Roof } from '../../../src/architecture/roof.js'
import { Ray } from '../../../src/core/ray.js'
import { Wall } from '../../../src/architecture/wall.js'

/* global describe, it */

describe('Feature ', function () {
  const roofSpec = { flat: [] }
  const ray = new Ray()
  let origNumRegisteredLayers
  let origNumCategories
  let origNumBuildingLayers

  describe('#layerIndex()', function () {
    it('should return valid value for a Roof', function () {
      const roof = new Roof({ placement: ray, deprecatedSpec: roofSpec })
      roof.layerIndex().should.be.within(1, 31)
    })
    it('should return same value for two different Roofs', function () {
      const roof = new Roof({ placement: ray, deprecatedSpec: roofSpec })
      const roof2 = new Roof({ placement: ray, deprecatedSpec: roofSpec })

      roof2.layerIndex().should.equal(roof.layerIndex())
    })
    it('should return different values for a Wall and a Roof', function () {
      const roof = new Roof({ placement: ray, deprecatedSpec: roofSpec })
      const wall = new Wall({}, new Ray())

      wall.layerIndex().should.be.within(1, 31)
      wall.layerIndex().should.not.equal(roof.layerIndex())
    })
  })

  describe('#getRegisteredLayers()', function () {
    const layers = Feature.getRegisteredLayers()

    it('should return list of at least 4 layers', function () {
      origNumRegisteredLayers = layers.length
      origNumRegisteredLayers.should.be.at.least(4)
    })
    it('should return list with expected first layer', function () {
      layers[0].index.should.equal(0)
      layers[0].definingClass.should.equal(Feature)
      layers[0].displayName.should.equal('layer 0')
      layers[0].description.should.equal('Default layer for Features')
      layers[0].category.should.equal('Abstract')
    })
    it('should return layers with defining classes Wall and Roof', function () {
      const definingClasses = layers.map(l => l.definingClass)

      definingClasses.should.include(Wall)
      definingClasses.should.include(Roof)
    })
  })

  describe('#getRegisteredLayersByCategory()', function () {
    const layerMap = Feature.getRegisteredLayersByCategory()

    it('should return Map with at least 2 categories', function () {
      origNumCategories = layerMap.size
      origNumCategories.should.be.at.least(2)
      ;[...layerMap.keys()].should.deep.include('Buildings', 'Landscape')
    })
    it('should return Map with key "Buildings" with value of length at least 3', function () {
      layerMap.should.include.keys('Buildings')
      origNumBuildingLayers = layerMap.get('Buildings').length
      origNumBuildingLayers.should.be.at.least(3)
    })
  })

  describe('#registerLayer()', function () {
    class Cricket {}
    class LightningRod {}
    let newLayer

    describe('With a new category', function () {
      const newCategory = 'Those that belong to the emperor'

      it('should return a layer with the specified properties', function () {
        newLayer = Feature.registerLayer(Cricket, 'cricket', { description: 'Gryllidae', category: newCategory })

        newLayer.displayName.should.equal('cricket')
        newLayer.description.should.equal('Gryllidae')
        newLayer.category.should.equal(newCategory)
      })
      it('should result in getRegisteredLayers() now returning a list with one additional layer', function () {
        Feature.getRegisteredLayers().should.have.length(origNumRegisteredLayers + 1)
      })
      it('should result in getRegisteredLayersByCategory() now returning a Map with one additional category', function () {
        Feature.getRegisteredLayersByCategory().size.should.equal(origNumCategories + 1)
      })
    })

    describe('With existing category "Buildings"', function () {
      it('should return a layer with the specified properties', function () {
        newLayer = Feature.registerLayer(LightningRod, 'lightning rod', { category: 'Buildings' })

        newLayer.displayName.should.equal('lightning rod')
        newLayer.category.should.equal('Buildings')
      })
      it('should return a layer with the description defaulting to the display name', function () {
        newLayer.description.should.equal('lightning rod')
      })
      it('should result in getRegisteredLayers() now returning a list with a second additional layer', function () {
        Feature.getRegisteredLayers().should.have.length(origNumRegisteredLayers + 2)
      })
      it('should not increase the number of categories returned by getRegisteredLayersByCategory()', function () {
        Feature.getRegisteredLayersByCategory().size.should.equal(origNumCategories + 1)
      })
      it('should result in one additional layer in category "Buildings"', function () {
        Feature.getRegisteredLayersByCategory().get('Buildings').should.have.length(origNumBuildingLayers + 1)
      })
    })
  })

  const genericRoof = new Roof({ placement: ray, deprecatedSpec: roofSpec })
  const roofLayerIndex = genericRoof.layerIndex()

  describe('With new class extending Roof', function () {
    class FancyRoof extends Roof {
    }

    describe('#layerIndex()', function () {
      it('should return same value as for a Roof', function () {
        const fancyRoof = new FancyRoof({ placement: new Ray(), deprecatedSpec: { flat: [] } })

        fancyRoof.layerIndex().should.equal(roofLayerIndex)
      })
    })
  })

  describe('With new class extending Roof and specifying a new layer', function () {
    class Dome extends Roof {
      constructor (spec, placement, layer) {
        super({ placement, layer, deprecatedSpec: spec })
        this._layer = layer
      }
    }

    describe('#layerIndex()', function () {
      it('should return different value than for a Roof', function () {
        Dome.Layer = Feature.registerLayer(Dome, 'domes', { category: 'Buildings' })
        const dome = new Dome(roofSpec, ray, Dome.Layer)

        dome.layerIndex().should.not.equal(roofLayerIndex)
      })
    })
  })

  describe('With new class ShadeStructure reusing Roof.layer', function () {
    class ShadeStructure extends Model {
      constructor () {
        super({ name: 'SS', layer: Roof.layer })
      }
    }

    describe('#layerIndex()', function () {
      it('should return same value as for a Roof', function () {
        const ss = new ShadeStructure()

        ss.layerIndex().should.equal(roofLayerIndex)
      })
    })
  })
})
