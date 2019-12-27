/** @file tabulator.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { UNIT } from '../core/unit.js'

/**
 * Tabulator is a class for keeping track of the values of all the different Metrics for all the different Features in a city.
 * Tabulator knows how to record simple facts, like the square footage of a Building.
 * Tabulator knows how to calculate aggregate values, like the square footage of all the Buildings in a District.
 * Tabulator knows how to ask a Metric to calculate a derived value, like Population Density.
 */
class Tabulator {
  constructor () {
    this._metricsByFeature = new Map()
  }

  /**
   * Return the value of a metric for a given feature
   * @param {Metric} [metric] - a physical attribute of a feature, like the square footage of a room.
   * @param {Feature} [feature] - a building or other physical feature in the city, about which there are quantitative values for different metrics.
   * @return {number}
   */
  getValueOfMetricForFeature (metric, feature) {
    if (this._metricsByFeature.has(feature)) {
      const featureValuesByMetric = this._metricsByFeature.get(feature)
      return featureValuesByMetric.get(metric)
    } else {
      throw new Error(`Tabulator failed to construct map for ${feature.toString()}`)
    }
  }

  /**
   * Assigns a value for a Metric for a given Feature.
   * @param {Feature} [feature] - a building or other physical feature in the city, about which there are quantitative values for different metrics.
   * @param {Metric} [metric] - a physical attribute of a feature, like the square footage of a room.
   * @param {number} [value] - the value to record for the Metric.
   */
  setRawValue (feature, metric, value) {
    const valuesByMetric = this._getMetricsByFeature(feature)
    valuesByMetric.set(metric, value)
  }

  /**
   * Traverses a tree of Features, and sums up values from the leaf Features (e.g. Rooms) towards the rootward Features (Building, District, City).
   * @param {Feature} [rootFeature] - the root-most Feature of interest (typically a Building, Parcel, District, or City).
   */
  aggregateValuesForMetrics (metrics, rootFeature) {
    // TODO: traverse the tree, read raw values of leaf nodes, and set values of parent nodes as sums of the leaf node values
    for (const metric of metrics) {
      const sum = this.aggregateValuesForMetric(metric, rootFeature)
      rootFeature.setValueForMetric(metric, sum)
    }
  }

  aggregateValuesForMetric (metric, rootFeature) {
    let sum = 0
    rootFeature.accept(node => { const val = node._valuesByMetric && node._valuesByMetric.get(metric); if (val) sum += val })
    return sum
  }

  /**
   * Returns a Map of the values of different metrics for a given feature.
   * @param {Feature} [feature] - a physical feature in the city, about which there are quantitative values for different metrics.
   * @return {Map.<Metric, number>} a Map keyed by instances of Metric, with numeric values
   */
  _getMetricsByFeature (feature) {
    if (!this._metricsByFeature.has(feature)) {
      this._metricsByFeature.set(feature, new Map())
    }
    return this._metricsByFeature.get(feature)
  }
}

export { Tabulator }
