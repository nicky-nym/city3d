/** @file citylib.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// architecture
import { Building } from './architecture/building.js'
import { Byway } from './architecture/byway.js'
import { City } from './architecture/city.js'
import { Door } from './architecture/door.js'
import { Group } from './architecture/group.js'
import { Opening } from './architecture/opening.js'
import { Parcel } from './architecture/parcel.js'
import { Place } from './architecture/place.js'
import { Plato } from './architecture/plato.js'
import { Roof } from './architecture/roof.js'
import { Storey } from './architecture/storey.js'
import { Wall } from './architecture/wall.js'
import { Window } from './architecture/window.js'

// outputs
import { Output } from './outputs/output.js'
import { MetricsOutput } from './outputs/metrics_output.js'
import { SummaryOutput } from './outputs/summary_output.js'
import { TextOutput } from './outputs/text_output.js'
import { ThreeOutput } from './outputs/three_output.js'

// buildings
import { Bikeway } from '../content/buildings/bikeway.js'
import { Cottage } from '../content/buildings/cottage.js'
import { Garage } from '../content/buildings/garage.js'
import { Highrise } from '../content/buildings/highrise.js'
import { House } from '../content/buildings/house.js'
import { Merlon } from '../content/buildings/merlon.js'
import { Wurster } from '../content/buildings/wurster.js'

// structures
import { Swingset } from '../content/structures/swingset.js'
import { UtilityPole } from '../content/structures/utility_pole.js'

// landscape
import { Creek } from '../content/landscape/creek.js'
import { Tree } from '../content/landscape/tree.js'

// movers
import { Kalpana } from '../content/movers/kalpana.js'
import { Kayak } from '../content/movers/kayak.js'
import { Vehicle } from '../content/movers/vehicle.js'

// places
import { Campus } from '../content/places/campus.js'
import { Manhattan } from '../content/places/manhattan.js'
import { Suburbia } from '../content/places/suburbia.js'

export const CITY = {
  Bikeway,
  Building,
  Byway,
  Campus,
  City,
  Cottage,
  Creek,
  Door,
  Kalpana,
  Kayak,
  Garage,
  Group,
  Highrise,
  House,
  Manhattan,
  Merlon,
  MetricsOutput,
  Opening,
  Output,
  Parcel,
  Place,
  Plato,
  Roof,
  Storey,
  Suburbia,
  SummaryOutput,
  Swingset,
  TextOutput,
  ThreeOutput,
  Tree,
  UtilityPole,
  Vehicle,
  Wall,
  Window,
  Wurster
}
