/** @file stock_catalog.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Catalog } from './catalog.js'

// buildings
import COTTAGE from './buildings/cottage.json.js'
import GARAGE from './buildings/garage.json.js'
import HIGHRISE from './buildings/highrise.json.js'
import HOUSE_353 from './buildings/house_353.json.js'
import WURSTER_HALL from './buildings/wurster_hall.json.js'

// districts
import CAMPUS from './districts/campus.json.js'
import SUBURBIA from './districts/suburbia.json.js'
import MANHATTAN from './districts/manhattan.json.js'

// parcels
import PARCEL_353 from './parcels/parcel_353.json.js'

// landscape
import TREE from './landscape/tree.json.js'

// structures
import SWINGSET from './structures/swingset.json.js'
import UTILITY_POLE from './structures/utility_pole.json.js'

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
      HOUSE_353,
      WURSTER_HALL,
      CAMPUS,
      MANHATTAN,
      PARCEL_353,
      SUBURBIA,
      SWINGSET,
      TREE,
      UTILITY_POLE
    ])
  }
}

export { StockCatalog }
