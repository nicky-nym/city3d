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
 * Layer is a class used to classify Features.  Feature classes, e.g. Wall, or specs, e.g.
 * tree.json.js, can register a Layer and assign it to the Features they create.
 * Two independent pieces of code can use the same Layer by each registering a Layer with
 * the same displayName and category; subsequent calls to register() will return the already
 * registered Layer.
 * A user can specify a subset of features to render by selecting a subset of Layers.
 * Note: this class is only used by feature.js, and only tested indirectly, in feature_tests.js.
 */
class Layer {
  /**
   * Creates a new Layer
   * @param {Integer} index - 0-31; consecutive integers are assigned for each registered Layer
   * @param {string} displayName - a display name to show in the UI for selecting layers
   * @param {string} description - a possibly longer piece of text, such as might be displayed in a tooltip
   * @param {string} category - a group to which this Layer belongs, e.g. 'Buildings'
   */
  constructor (index, displayName, description, category) {
    this.index = index
    this.displayName = displayName
    this.description = description
    this.category = category
    if (index < 0 || index > 31) {
      throw new Error('Layer index out of range.')
    }
  }

  /**
   * Searches for a matching registered Layer and returns it if found, otherwise registers a
   * new Layer and returns it.
   * A Layer is considered to match if the displayName and category match.
   */
  static register (displayName, { description = displayName, category } = {}) {
    const foundLayer = LAYER.layers.find(layer => layer.displayName === displayName && layer.category === category)
    if (foundLayer) {
      return foundLayer
    } else {
      const index = LAYER.NEXT_INDEX++
      const layer = new Layer(index, displayName, description, category)
      LAYER.layers.push(layer)
      return layer
    }
  }

  static getLayers () {
    return LAYER.layers
  }

  static getLayer (id) {
    return LAYER.layers.find(layer => layer.displayName === id)
  }
}

export { Layer }
