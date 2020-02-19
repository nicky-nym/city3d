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
import HOTEL_ON_BOARDWALK from './buildings/hotel_on_boardwalk.json.js'
import HOUSE_ON_PARK_PLACE from './buildings/house_on_park_place.json.js'
import HOUSE_353 from './buildings/house_353.json.js'
import LATTICE from './buildings/lattice.json.js'
import WURSTER_HALL from './buildings/wurster_hall.json.js'

// districts
import CAMPUS from './districts/campus.json.js'
import MANHATTAN from './districts/manhattan.json.js'
import SUBURBIA from './districts/suburbia.json.js'

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
      // buildings
      COTTAGE,
      GARAGE,
      HIGHRISE,
      HOTEL_ON_BOARDWALK,
      HOUSE_ON_PARK_PLACE,
      HOUSE_353,
      LATTICE,
      WURSTER_HALL,
      // districts
      CAMPUS,
      MANHATTAN,
      SUBURBIA,
      // parcels
      PARCEL_353,
      // landscape
      TREE,
      // structures
      SWINGSET,
      UTILITY_POLE
    ])
  }
}

export { StockCatalog }
