/** @file all_examples.schema_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Schematic } from '../../../src/schemas/schematic.js'

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
import WALL from '../../../src/schemas/wall.schema.json.js'
import WINDOW from '../../../src/schemas/window.schema.json.js'
import XY from '../../../src/schemas/xy.schema.json.js'

/* global describe, it */

describe('TYPES', function () {
  const TYPES = {
    COPY,
    GRID,
    LINE,
    OUTLINE,
    PITCH,
    POSE,
    SURFACE,
    XY
  }
  const types = Object.keys(TYPES).map(item => TYPES[item])

  types.forEach(schema => {
    describe(schema.$id, function () {
      it('should have examples.', function () {
        schema.should.have.property('examples')
        schema.examples.should.have.length.at.least(1)
      })

      it('should have only valid examples.', function () {
        const validator = Schematic.getTypeValidator(schema.title.toLowerCase())

        schema.examples.forEach(example => {
          const msg = `example.name = ${example.name}`
          validator(example).should.equal(true, msg)
          if (example.type) {
            example.type.should.equal(schema.$id, msg)
          }
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
    describe(schema.$id, function () {
      it('should have examples.', function () {
        schema.should.have.property('examples')
        schema.examples.should.have.length.at.least(1)
      })

      it('should have only valid examples.', function () {
        const validator = Schematic.getEntityValidator(schema.title.toLowerCase())

        schema.examples.forEach(example => {
          const msg = `example.name = ${example.name}`
          validator(example).should.equal(true, msg)
          if (example.type) {
            example.type.should.equal(schema.$id, msg)
          }
        })
      })
    })
  })
})
