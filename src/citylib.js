/** @file citylib.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// architecture
import { Building } from './architecture/building.js'
import { Byway } from './architecture/byway.js'
import { City } from './architecture/city.js'
import { District } from './architecture/district.js'
import { Door } from './architecture/door.js'
import { Model } from './architecture/model.js'
import { Opening } from './architecture/opening.js'
import { Parcel } from './architecture/parcel.js'
import { Roof } from './architecture/roof.js'
import { Storey } from './architecture/storey.js'
import { Wall } from './architecture/wall.js'
import { Window } from './architecture/window.js'
import { Use } from './architecture/use.js'

// core
import { FeatureGroup, InstancedFeature } from './core/feature.js'

// outputs
import { Output } from './outputs/output.js'
import { TableOutput } from './outputs/table_output.js'
import { MemoryOutput } from './outputs/memory_output.js'
import { MetricsOutput } from './outputs/metrics_output.js'
import { SummaryOutput } from './outputs/summary_output.js'
import { TextOutput } from './outputs/text_output.js'
import { ThreeOutput } from './outputs/three_output.js'

// routes
import { Route } from './routes/route.js'

// metrics
import { Tabulator } from './metrics/tabulator.js'

// buildings
import { Lattice } from '../content/buildings/lattice.js'
import { MidriseComplex } from '../content/buildings/midrise_complex.js'

// structures
import { EiffelTower } from '../content/structures/eiffel_tower.js'
import { PyramidOfKhufu } from '../content/structures/pyramid_of_khufu.js'

// landscape
import { Creek } from '../content/landscape/creek.js'
import { SoccerField } from '../content/landscape/soccer_field.js'
import { Tree } from '../content/landscape/tree.js'

// movers
import { Kalpana } from '../content/movers/kalpana.js'
import { Kayak } from '../content/movers/kayak.js'
import { Vehicle } from '../content/movers/vehicle.js'

// districts
import { LatticeDistrict } from '../content/districts/lattice_district.js'

export const CITY = {
  Lattice,
  Building,
  Byway,
  City,
  Creek,
  District,
  Door,
  EiffelTower,
  FeatureGroup,
  Kalpana,
  Kayak,
  InstancedFeature,
  LatticeDistrict,
  MemoryOutput,
  MidriseComplex,
  MetricsOutput,
  Model,
  Opening,
  Output,
  Parcel,
  PyramidOfKhufu,
  Roof,
  Route,
  SoccerField,
  Storey,
  SummaryOutput,
  TableOutput,
  Tabulator,
  TextOutput,
  ThreeOutput,
  Tree,
  Use,
  Vehicle,
  Wall,
  Window
}
