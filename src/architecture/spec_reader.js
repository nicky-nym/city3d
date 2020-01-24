/** @file spec_reader.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { Building } from './building.js'
import { Cottage } from '../../content/buildings/cottage.js'
import { StockCatalog } from '../../content/stock_catalog.js'

/**
 * Class representing a catalog of model specification objects.
 */
class SpecReader {
  constructor (catalog = new StockCatalog()) {
    this._catalog = catalog
  }

  /**
   * Returns true if the value is a plain old JavaScript object
   * @param {*} value - a value that might be an object
   * @return {boolean} true, if the value is an object
   */
  static _isVanillaObject (value) {
    return Object.prototype.toString.call(value) === '[object Object]'
  }

  /**
   * Returns true if the node is an object like { $ref: '#foo' }
   * (where "foo" is any string value).
   * @param {*} node - a value that might be an object
   * @return {boolean} true, if the value is a local $ref object
   */
  static _isLocalRefNode (node) {
    return SpecReader._isVanillaObject(node) &&
      Object.prototype.hasOwnProperty.call(node, '$ref') &&
      Object.keys(node).length === 1 &&
      !!node.$ref &&
      typeof node.$ref === 'string' &&
      node.$ref.charAt(0) === '#'
  }

  /**
   * Looks up a reference and returns the value for it.
   * @param {object} root - a tree to look up values in
   * @param {string} ref - a local reference string, such as '#/def/A'
   * @return {value} the value in the tree at the reference location
   */
  static _getValueOfRef (root, ref) {
    const segments = ref.split('/')
    segments.shift() // throw away the leading '#' segment
    var current = root
    for (const segment of segments) {
      current = current[segment]
    }
    return current
  }

  static _resolveLocalRefDirectives (root, node) {
    if (Array.isArray(node)) {
      return node.map((itemInList, i) => {
        if (SpecReader._isLocalRefNode(itemInList)) {
          node[i] = SpecReader._getValueOfRef(root, itemInList.$ref)
        } else {
          return SpecReader._resolveLocalRefDirectives(root, itemInList)
        }
      })
    }

    if (SpecReader._isVanillaObject(node)) {
      return Object.keys(node).reduce((result, key) => {
        if (SpecReader._isLocalRefNode(node[key])) {
          result[key] = SpecReader._getValueOfRef(root, node[key].$ref)
        } else {
          result[key] = SpecReader._resolveLocalRefDirectives(root, result[key])
        }
        return result
      }, node)
    }

    return node
  }

  /**
   * Given a specification object, return a tree of corresponding model objects.
   */
  makeModelFromSpec (specification, at) {
    if (specification.context !== 'city3d') {
      throw new Error('Unrecognised "context" string in spec object')
    }
    if (specification.type === 'building.schema.json') {
      const resolvedSpec = SpecReader._resolveLocalRefDirectives(specification, specification) // eslint-disable-line no-unused-vars
      // TODO: this Cottage() is just a placeholder until we are correctly generating actual models
      return new Cottage({ at })
    }
  }

  /**
   * Given the name of a specification object, return a tree of corresponding model objects.
   */
  makeModelFromSpecName (specName, at) {
    const specObject = this._catalog.getSpec(specName)
    return this.makeModelFromSpec(specObject, at)
  }
}

export { SpecReader }
