/** @file layer.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

const LAYER = {
  layers: [],
  NEXT_INDEX: 0
}

/**
 * Layer is a class used to classify Features.  Feature classes, e.g. Wall, can register a
 * Layer and assign it to the instances it creates.
 * A user can specify a subset of features to render by selecting a subset of Layers.
 * The property 'definingClass' is meant to indicate the class that registered the Layer,
 * but that is not enforced.  Similarly, the intention is that a class that registers a Layer
 * would assign that Layer to its instances, but it is possible to assign any registered Layer
 * to any Feature.
 * Note: this class is only used by feature.js, and only tested indirectly, in feature_tests.js.
 */
class Layer {
  /**
   * Creates a new Layer
   * @param {Integer} index - 0-31; consecutive integers are assigned for each registered Layer
   * @param {Class} definingClass - the primary class this Layer is associated with
   * @param {string} displayName - a display name to show in the UI for selecting layers
   * @param {string} description - a possibly longer piece of text, such as might be displayed in a tooltip
   * @param {string} category - a group to which this Layer belongs, e.g. 'Buildings'
   */
  constructor (index, definingClass, displayName, description, category) {
    this.index = index
    this.definingClass = definingClass
    this.displayName = displayName
    this.description = description
    this.category = category
    if (index < 0 || index > 31) {
      throw new Error('Layer index out of range.')
    }
  }

  static register (definingClass, displayName, { description = displayName, category } = {}) {
    const index = LAYER.NEXT_INDEX++
    const layer = new Layer(index, definingClass, displayName, description, category)
    LAYER.layers.push(layer)
    return layer
  }

  static getLayers () {
    return LAYER.layers
  }
}

export { Layer }
