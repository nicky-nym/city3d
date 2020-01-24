/** @file stock_catalog.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Catalog } from './catalog.js'
import COTTAGE from './buildings/cottage.json.js'
import GARAGE from './buildings/garage.json.js'
import HIGHRISE from './buildings/highrise.json.js'
import HOUSE from './buildings/house.json.js'
import WURSTER_HALL from './buildings/wurster_hall.json.js'
import CAMPUS from './districts/campus.json.js'

/**
 * Catalog of all the model specification objects included as example content in city3d.
 */
class StockCatalog extends Catalog {
  constructor () {
    super()
    this.registerSpec([
      COTTAGE,
      GARAGE,
      HIGHRISE,
      HOUSE,
      WURSTER_HALL,
      CAMPUS
    ])
  }
}

export { StockCatalog }
