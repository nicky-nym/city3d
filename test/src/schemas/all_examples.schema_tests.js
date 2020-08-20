/** @file all_examples.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

// TODO: refactor to merge lists in all_examples.schema_tests.js and spec_reader_tests.js
import BUILDING from '../../../content/entities/building/building.examples.json.js'
import CEILING from '../../../content/entities/ceiling/ceiling.examples.json.js'
import CITY from '../../../content/entities/city/city.examples.json.js'
import COPY from '../../../content/datatypes/copy/copy.examples.json.js'
import DISTRICT from '../../../content/entities/district/district.examples.json.js'
import DOOR from '../../../content/entities/door/door.examples.json.js'
import FLOOR from '../../../content/entities/floor/floor.examples.json.js'
import GRID from '../../../content/datatypes/grid/grid.examples.json.js'
import LINE from '../../../content/datatypes/line/line.examples.json.js'
import METADATA from '../../../content/datatypes/metadata/metadata.examples.json.js'
import OUTLINE from '../../../content/datatypes/outline/outline.examples.json.js'
import PARCEL from '../../../content/entities/parcel/parcel.examples.json.js'
import PITCH from '../../../content/datatypes/pitch/pitch.examples.json.js'
import POSE from '../../../content/datatypes/pose/pose.examples.json.js'
import ROOF from '../../../content/entities/roof/roof.examples.json.js'
import ROOM from '../../../content/entities/room/room.examples.json.js'
import ROUTE from '../../../content/entities/route/route.examples.json.js'
import STOREY from '../../../content/entities/storey/storey.examples.json.js'
import STRUCTURE from '../../../content/entities/structure/structure.examples.json.js'
import SURFACE from '../../../content/datatypes/surface/surface.examples.json.js'
import WALL from '../../../content/entities/wall/wall.examples.json.js'
import WINDOW from '../../../content/entities/window/window.examples.json.js'
import XY from '../../../content/datatypes/xy/xy.examples.json.js'
// import XYZ from '../../../content/datatypes/xyz/xyz.examples.json.js'

/* global describe, it */

describe('TYPES', function () {
  const TYPES = {
    COPY,
    GRID,
    LINE,
    METADATA,
    OUTLINE,
    PITCH,
    POSE,
    SURFACE,
    XY
    // TODO: XYZ
  }
  const types = Object.keys(TYPES).map(item => TYPES[item])

  types.forEach(schema => {
    describe(schema.$type, function () {
      it('should have examples.', function () {
        schema.should.have.property('examples')
        schema.examples.should.have.length.at.least(1)
      })

      it('should have only valid examples.', function () {
        const validator = Schematic.getTypeValidator(schema.$type)

        schema.examples.forEach(example => {
          const msg = `example.name = ${example.name}`
          validator(example).should.equal(true, msg)
        })
      })
    })
  })
})

describe('ENTITIES', function () {
  const ENTITIES = {
    BUILDING,
    CEILING,
    CITY,
    DISTRICT,
    DOOR,
    FLOOR,
    PARCEL,
    ROOF,
    ROOM,
    ROUTE,
    STOREY,
    STRUCTURE,
    WALL,
    WINDOW
  }
  const entities = Object.keys(ENTITIES).map(item => ENTITIES[item])

  entities.forEach(schema => {
    describe(schema.$type, function () {
      it('should have examples.', function () {
        schema.should.have.property('examples')
        schema.examples.should.have.length.at.least(1)
      })

      it('should have only valid examples.', function () {
        const entityName = schema.$type.replace('.schema.json', '')
        const validator = Schematic.getEntityValidator(entityName)

        schema.examples.forEach(example => {
          const msg = `example.name = ${example.name}`
          validator(example).should.equal(true, msg)
        })
      })
    })
  })
})
