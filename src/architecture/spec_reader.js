/** @file spec_reader.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { StockCatalog } from '../../content/stock_catalog.js'
import { Building } from './building.js'
import { City } from './city.js'
import { District } from './district.js'
import { Door } from './door.js'
import { Floor } from './floor.js'
import { Parcel } from './parcel.js'
import { Roof } from './roof.js'
import { Storey } from './storey.js'
import { Structure } from './structure.js'
import { Wall } from './wall.js'
import { Window } from './window.js'

// 'NA': schema does not have an associated class and is not expected to
// 'Pending': associated class not yet implemented, or not yet known if it will be
const classesByType = Object.freeze({
  'metadata.schema.json': 'NA',
  'building.schema.json': Building,
  'ceiling.schema.json': 'Pending',
  'city.schema.json': City,
  'copy.schema.json': 'NA',
  'district.schema.json': District,
  'door.schema.json': Door,
  'floor.schema.json': Floor,
  'grid.schema.json': 'Pending',
  'line.schema.json': 'Pending', // Geometry.Line exists, but is probably not the right class
  'outline.schema.json': 'NA',
  'parcel.schema.json': Parcel,
  'pitch.schema.json': 'NA',
  'pose.schema.json': 'Pending',
  'roof.schema.json': Roof,
  'room.schema.json': 'Pending',
  'route.schema.json': 'Pending', // class Route exists, but doesn't take a spec
  'storey.schema.json': Storey,
  'structure.schema.json': Structure,
  'surface.schema.json': 'NA',
  'vehicle.schema.json': 'Pending', // class Vehicle exists, but doesn't take a spec
  'wall.schema.json': Wall,
  'window.schema.json': Window,
  'xy.schema.json': 'NA',
  'xyz.schema.json': 'NA'
})

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

  /**
   * Returns true if the node is an object like { $random: ['foo', 'bar', 3, 4, false] }
   * @param {*} node - a value that might be an object
   * @return {boolean} true, if the value is a $random object
   */
  static _isRandomDirectiveNode (node) {
    return SpecReader._isVanillaObject(node) &&
      Object.prototype.hasOwnProperty.call(node, '$random') &&
      Object.keys(node).length === 1 &&
      !!node.$random &&
      Array.isArray(node.$random)
  }

  /**
   * Looks up a reference and returns the value for it.
   * @param {any[]} list - an array of candidate values
   * @return {value} the value in the tree at the reference location
   */
  static _pickRandomValue (list) {
    const i = Math.floor(Math.random() * list.length)
    return list[i]
  }

  static _resolveLocalRefDirectives (root, node) {
    if (Array.isArray(node)) {
      return node.map((itemInList, i) => {
        if (SpecReader._isLocalRefNode(itemInList)) {
          return SpecReader._getValueOfRef(root, itemInList.$ref)
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

  static _resolveRandomDirectives (root, node) {
    if (Array.isArray(node)) {
      return node.map((itemInList, i) => {
        if (SpecReader._isRandomDirectiveNode(itemInList)) {
          return SpecReader._pickRandomValue(itemInList.$random)
        } else {
          return SpecReader._resolveRandomDirectives(root, itemInList)
        }
      })
    }

    if (SpecReader._isVanillaObject(node)) {
      return Object.keys(node).reduce((result, key) => {
        if (SpecReader._isRandomDirectiveNode(node[key])) {
          result[key] = SpecReader._pickRandomValue(node[key].$random)
        } else {
          result[key] = SpecReader._resolveRandomDirectives(root, result[key])
        }
        return result
      }, node)
    }

    return node
  }

  static canInstantiateType (type) {
    if (!(type in classesByType)) {
      throw new Error(`Unknown type '${type}'`)
    }
    return !!classesByType[type].prototype
  }

  copySpec (specification) {
    return JSON.parse(JSON.stringify(specification))
  }

  /**
   * Given a specification object, return a new object instantiated from it.
   */
  makeObjectFromSpec (specification, pose) {
    let spec = this.copySpec(specification)
    if (!spec.type) {
      throw new Error('Missing "type" in spec object')
    }
    if (!SpecReader.canInstantiateType(spec.type)) {
      throw new Error(`No class registered for type = '${spec.type}'`)
    }
    if (spec.context !== 'city3d') {
      throw new Error(`Unrecognised "context" string in spec object ${spec.context}`)
    }
    spec = SpecReader._resolveLocalRefDirectives(spec, spec)
    spec = SpecReader._resolveRandomDirectives(spec, spec)

    return new classesByType[spec.type]({ spec, pose, specReader: this })
  }

  /**
   * Given the name of a specification object for a Model, return a new Model.
   */
  makeModelFromSpecName (modelSpecName, pose) {
    const modelSpec = this._catalog.getSpec(modelSpecName)
    return this.makeObjectFromSpec(modelSpec, pose)
  }
}

export { SpecReader }
