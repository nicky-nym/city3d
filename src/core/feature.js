/** @file feature.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Layer } from './layer.js'

class Feature {
  /**
   * Creates a Feature.
   * @param {string} name - can be an empty string, null, or undefined, in which case it will be skipped over by fullName()
   * @param {Layer} [layer]
   * @param {Layer} [copyLayer] - the Layer assigned to an InstancedFeature based on this Feature
   */
  constructor (name, { layer = DEFAULT_LAYER, copyLayer } = {}) {
    this.name = name
    this._layer = layer
    this._copyLayer = copyLayer
    this._valuesByMetric = new Map()
  }

  /**
   * Creates a new instance that represents some measurable physical attribute.
   * @param {Metric} metric - a physical attribute of a feature, like the square footage of a room.
   * @param {number} value - the value of the Metric for this group
   */
  setValueForMetric (metric, value) {
    this._valuesByMetric.set(metric, value)
  }

  getValueForMetric (metric) {
    if (metric.formula) {
      return metric.formula(this)
    } else {
      return this._valuesByMetric.get(metric)
    }
  }

  fullName () {
    const names = []
    for (let f = this; f; f = f.parent) {
      if (f.name) names.push(f.name)
    }
    return names.join(' of ')
  }

  layerIndex () {
    return this._layer.index
  }

  static registerLayer (displayName, { description, category } = {}) {
    return Layer.register(displayName, { description, category })
  }

  static getRegisteredLayers () {
    return Layer.getLayers()
  }

  static getRegisteredLayersByCategory () {
    const map = new Map()

    Layer.getLayers().forEach(layer => {
      if (!map.has(layer.category)) map.set(layer.category, [])
      map.get(layer.category).push(layer)
    })
    return map
  }
}

const DEFAULT_LAYER = Feature.registerLayer('layer 0',
  { description: 'Default layer for Features', category: 'Abstract' })

/**
 * A point (or vector) in a 3D space
 * @typedef {object} xyz
 * @property {number} [x=0] - distance on x-axis
 * @property {number} [y=0] - distance on y-axis
 * @property {number} [z=0] - distance on z-axis
 */

/**
 * FeatureInstance is a class for specifying an instance of a geometrical template.
 * The vertices are obtained by translating the template so that the first vertex has the specified coordinates.
 */
class FeatureInstance extends Feature {
  /**
   * Creates a new instance of a geometry at a given placement.
   * @param {object} geometry - a template such as Geometry.ThickPolygon or Geometry.TriangularPolyhedron
   * @param {xyz} [xyz] - desired xyz-coordinates of first vertex
   * @param {number} hexColor - rgb color, e.g. 0x0000ff
   * @param {object} [options]
   */
  constructor (geometry, { x = 0, y = 0, z = 0 }, hexColor, options = {}) {
    super(options.name, options)
    this.geometry = geometry
    this.p0 = { x, y, z }
    this.hexColor = hexColor
    this.side = options.side || 'double'
  }
}

/**
 * InstancedFeature is a class for representing multiple instances of a Feature, with an array
 * of placements specifying the location and orientation of each instance.
 */
class InstancedFeature extends Feature {
  /**
   * @param {Feature} feature
   * @param {Ray[]} placements
   */
  constructor (feature, placements, { materialCost = 'lowest', useNormals = false } = {}) {
    super()
    this.feature = feature
    this.placements = placements
    this.materialCost = materialCost
    this.useNormals = useNormals
  }

  layerIndex () {
    return this.feature._copyLayer ? this.feature._copyLayer.index : this.feature._layer.index
  }
}

class FeatureGroup extends Feature {
  /**
   * Creates a FeatureGroup.
   * @param {string} [name]
   * @param {object} [options]
   */
  constructor (name, options) {
    super(name, options)
    this.children = []
  }

  add (...features) {
    this.children.push(...features)
    features.forEach(feature => {
      feature.parent = this
      if (feature._onSetParent) feature._onSetParent(this)
    })
    return this
  }

  accept (visitor) {
    for (const child of this.children) {
      if (child.accept) {
        child.accept(visitor)
      } else {
        visitor(child)
      }
    }
    visitor(this)
  }

  getValueForMetric (metric) {
    if (metric.formula) {
      return metric.formula(this)
    } else {
      return this._aggregateValuesForMetric(metric)
    }
  }

  _aggregateValuesForMetric (metric) {
    let sum = 0
    this.accept(node => { const val = node._valuesByMetric && node._valuesByMetric.get(metric); if (val) sum += val })
    return sum
  }
}

/**
 * A FeatureLODGroup extends a FeatureGroup with lower resolution alternatives to be used at specified
 * distance thresholds.
 */
class FeatureLODGroup extends FeatureGroup {
  /**
   * Creates a FeatureLODGroup.
   * @param {string} [name]
   * @param {object} [options]
   */
  constructor (name, options) {
    super(name, options)
    this._levels = []
  }

  /**
   * Adds a feature to be used in place of this.children when the current distance is greater
   * than a threshold. If multiple low resolution instances with thresholds smaller than the
   * current distance exist, the one with the highest threshold should be used.
   * Note that features added here are not visited by FeatureGroup.accept(), so, e.g., any metrics
   * belonging to them would not be aggregated.
   * @param {Feature} feature - a simpler representation of this.children
   * @param {number} distanceThreshold - when to switch to this feature
   */
  addLevelOfDetail (feature, distanceThreshold) {
    feature.parent = this.parent
    this._levels.push({ feature, distanceThreshold })
  }

  _onSetParent (parent) {
    this._levels.forEach(level => { level.feature.parent = parent })
  }

  /**
   * Returns an array of objects specifying low resolution alternate instances along with their thresholds.
   * @returns {Object[]} array of objects with properties 'feature' and 'distanceThreshold'
   */
  getLevelsOfDetail () {
    return this._levels.map(level => ({ ...level }))
  }
}

export { Feature, FeatureGroup, FeatureInstance, FeatureLODGroup, InstancedFeature }
