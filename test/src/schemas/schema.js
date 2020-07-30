/** @file schema.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import DEFINITIONS from '../../../src/schemas/definitions.json.js'
import METADATA from '../../../src/schemas/metadata.schema.json.js'

import BUILDING from '../../../src/schemas/building.schema.json.js'
import CEILING from '../../../src/schemas/ceiling.schema.json.js'
import CITY from '../../../src/schemas/city.schema.json.js'
import COPY from '../../../src/schemas/copy.schema.json.js'
import DISTRICT from '../../../src/schemas/district.schema.json.js'
import DOOR from '../../../src/schemas/door.schema.json.js'
import FLOOR from '../../../src/schemas/floor.schema.json.js'
import GRID from '../../../src/schemas/grid.schema.json.js'
import LINE from '../../../src/schemas/line.schema.json.js'
import OUTLINE from '../../../src/schemas/outline.schema.json.js'
import PARCEL from '../../../src/schemas/parcel.schema.json.js'
import PITCH from '../../../src/schemas/pitch.schema.json.js'
import POSE from '../../../src/schemas/pose.schema.json.js'
import ROOF from '../../../src/schemas/roof.schema.json.js'
import ROOM from '../../../src/schemas/room.schema.json.js'
import ROUTE from '../../../src/schemas/route.schema.json.js'
import STOREY from '../../../src/schemas/storey.schema.json.js'
import STRUCTURE from '../../../src/schemas/structure.schema.json.js'
import SURFACE from '../../../src/schemas/surface.schema.json.js'
import VEHICLE from '../../../src/schemas/vehicle.schema.json.js'
import WALL from '../../../src/schemas/wall.schema.json.js'
import WINDOW from '../../../src/schemas/window.schema.json.js'
import XY from '../../../src/schemas/xy.schema.json.js'
import XYZ from '../../../src/schemas/xyz.schema.json.js'

const SCHEMA = {
  DEFINITIONS,
  METADATA,

  BUILDING,
  CEILING,
  CITY,
  COPY,
  DISTRICT,
  DOOR,
  FLOOR,
  GRID,
  LINE,
  OUTLINE,
  PARCEL,
  PITCH,
  POSE,
  ROOF,
  ROOM,
  ROUTE,
  STOREY,
  STRUCTURE,
  SURFACE,
  VEHICLE,
  WALL,
  WINDOW,
  XY,
  XYZ
}

export { SCHEMA }
