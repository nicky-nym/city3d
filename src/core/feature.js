/** @file feature.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

class Feature {
  constructor (name) {
    this.name = name
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
}

/**
 * FeatureInstance is a class for specifying an instance of a geometrical template.
 * The vertices are obtained by translating the template so that the first vertex has the specified coordinates.
 *
 * @param {Object} geometry - a template such as Geometry.ThickPolygon or Geometry.TriangularPolyhedron
 * @param {Number} [x=0] - desired x-coordinate of first vertex
 * @param {Number} [y=0] - desired y-coordinate of first vertex
 * @param {Number} [z=0] - desired z-coordinate of first vertex
 * @param {Number} hexColor - rgb color, e.g. 0x0000ff
 * @param {string} [name]
 */
class FeatureInstance extends Feature {
  constructor (geometry, { x = 0, y = 0, z = 0 }, hexColor, name) {
    super(name)
    this.geometry = geometry
    this.p0 = { x, y, z }
    this.hexColor = hexColor
  }
}

class FeatureGroup extends Feature {
  constructor (name) {
    super(name)
    this.children = []
  }

  add (...features) {
    this.children.push(...features)
    features.forEach(feature => { feature.parent = this })
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
   */
  constructor (name) {
    super(name)
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
    this._levels.push({ feature, distanceThreshold })
  }

  /**
   * Returns an array of objects specifying low resolution alternate instances along with their thresholds.
   * @returns {Object[]} array of objects with properties 'feature' and 'distanceThreshold'
   */
  getLevelsOfDetail () {
    return this._levels.map(level => ({ ...level }))
  }
}

export { Feature, FeatureGroup, FeatureInstance, FeatureLODGroup }
