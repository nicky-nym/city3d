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
   * Given a specification object, return a tree of corresponding model objects.
   */
  modelFromSpec (specification, at) {
    if (specification.context !== 'city3d') {
      throw new Error('Unrecognised "context" string in spec object')
    }
    if (specification.type === 'building.schema.json') {
      // TODO: this Cottage() is just a placeholder until we are correctly generating actual models
      return new Cottage({ at })
    }
  }

  /**
   * Given the name of a specification object, return a tree of corresponding model objects.
   */
  modelFromSpecName (specName, at) {
    const specObject = this._catalog.getSpec(specName)
    return this.modelFromSpec(specObject, at)
  }
}

export { SpecReader }
