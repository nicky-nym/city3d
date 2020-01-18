/** @file schema.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import DEFINITIONS from './definitions.json.js'

import BUILDING from './building.schema.json.js'
import CEILING from './ceiling.schema.json.js'
import CITY from './city.schema.json.js'
import COPY from './copy.schema.json.js'
import DISTRICT from './district.schema.json.js'
import DOOR from './door.schema.json.js'
import FLOOR from './floor.schema.json.js'
import GRID from './grid.schema.json.js'
import OUTLINE from './outline.schema.json.js'
import PARCEL from './parcel.schema.json.js'
import PITCH from './pitch.schema.json.js'
import PLACEMENT from './placement.schema.json.js'
import ROOF from './roof.schema.json.js'
import ROOM from './room.schema.json.js'
import STOREY from './storey.schema.json.js'
import SURFACE from './surface.schema.json.js'
import VEHICLE from './vehicle.schema.json.js'
import WALL from './wall.schema.json.js'
import WINDOW from './window.schema.json.js'
import XY from './xy.schema.json.js'
import XYZ from './xyz.schema.json.js'

const SCHEMA = {
  DEFINITIONS,

  BUILDING,
  CEILING,
  CITY,
  COPY,
  DISTRICT,
  DOOR,
  FLOOR,
  GRID,
  OUTLINE,
  PARCEL,
  PITCH,
  PLACEMENT,
  ROOF,
  ROOM,
  STOREY,
  SURFACE,
  VEHICLE,
  WALL,
  WINDOW,
  XY,
  XYZ
}

export { SCHEMA }
