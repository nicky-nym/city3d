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
import HIGHROAD_BRIDGE from './buildings/highroad_bridge.json.js'
import HIGHROAD_LONGHOUSE from './buildings/highroad_longhouse.json.js'
import HOTEL_ON_BOARDWALK from './buildings/hotel_on_boardwalk.json.js'
import HOUSE_ON_PARK_PLACE from './buildings/house_on_park_place.json.js'
import HOUSE_353 from './buildings/house_353.json.js'
import HOUSE_1127 from './buildings/house_1127.json.js'
import LONGHOUSE_JUNCTION from './buildings/longhouse_junction.json.js'
import LONGHOUSE_RAMPS from './buildings/longhouse_ramps.json.js'
import LOWROAD_BRIDGE from './buildings/lowroad_bridge.json.js'
import LOWROAD_LONGHOUSE from './buildings/lowroad_longhouse.json.js'
import WURSTER_HALL from './buildings/wurster_hall.json.js'

// districts
import CAMPUS from './districts/campus.json.js'
import MANHATTAN from './districts/manhattan.json.js'
import SUBURBIA from './districts/suburbia.json.js'

// parcels
import LATTICE_PARCEL from './parcels/lattice_parcel.json.js'
import PARCEL_353 from './parcels/parcel_353.json.js'

// landscape
import TREE from './landscape/tree.json.js'

// furniture
import TABLE from './furniture/table.json.js'

// occupants
import DOG from './movers/dog.json.js'
import PERSON from './movers/person.json.js'

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
      HIGHROAD_BRIDGE,
      HIGHROAD_LONGHOUSE,
      HOTEL_ON_BOARDWALK,
      HOUSE_ON_PARK_PLACE,
      HOUSE_353,
      HOUSE_1127,
      LONGHOUSE_JUNCTION,
      LONGHOUSE_RAMPS,
      LOWROAD_BRIDGE,
      LOWROAD_LONGHOUSE,
      WURSTER_HALL,

      // districts
      CAMPUS,
      MANHATTAN,
      SUBURBIA,

      // parcels
      LATTICE_PARCEL,
      PARCEL_353,

      // landscape
      TREE,

      // furniture
      TABLE,

      // occupants
      DOG,
      PERSON,

      // structures
      SWINGSET,
      UTILITY_POLE
    ])
  }
}

export { StockCatalog }
