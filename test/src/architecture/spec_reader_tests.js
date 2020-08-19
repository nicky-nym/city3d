/** @file spec_reader_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Pose } from '../../../src/core/pose.js'
import { SpecReader } from '../../../src/architecture/spec_reader.js'

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

/* global describe, it, expect */
/* eslint-disable no-unused-expressions */

const notYetWorking = [
  'district.schema.json', // needs unit conversion
  'floor.schema.json', // still takes placement (rather than pose)
  'roof.schema.json', // still takes placement (rather than pose)
  'storey.schema.json', // still takes placement (rather than pose)
  'wall.schema.json' // still takes placement (rather than pose)
]

describe('SpecReader', function () {
  const schemas = Object.keys(SCHEMA).filter(item => item !== 'DEFINITIONS').map(item => SCHEMA[item])

  describe('#_isVanillaObject', function () {
    it('should accept a simple object', function () {
      SpecReader._isVanillaObject({}).should.be.true
    })
    it('should accept a nested object', function () {
      SpecReader._isVanillaObject({ $ref: {} }).should.be.true
    })
    it('should reject an array value', function () {
      SpecReader._isVanillaObject([]).should.be.false
    })
    it('should reject a null value', function () {
      SpecReader._isVanillaObject(null).should.be.false
    })
    it('should reject a literal value', function () {
      SpecReader._isVanillaObject(88).should.be.false
    })
  })

  describe('#_isLocalRefNode', function () {
    it('should accept a valid $ref object', function () {
      SpecReader._isLocalRefNode({ $ref: '#/def/A' }).should.be.true
    })
    it('should reject a $ref object without a leading "#"', function () {
      SpecReader._isLocalRefNode({ $ref: '/def/A' }).should.be.false
    })
    it('should reject a $ref object without a string value', function () {
      SpecReader._isLocalRefNode({ $ref: {} }).should.be.false
    })
    it('should reject an empty object', function () {
      SpecReader._isLocalRefNode({}).should.be.false
    })
    it('should reject an array value', function () {
      SpecReader._isLocalRefNode([]).should.be.false
    })
    it('should reject a null value', function () {
      SpecReader._isLocalRefNode(null).should.be.false
    })
    it('should reject a literal value', function () {
      SpecReader._isLocalRefNode(88).should.be.false
    })
  })

  describe('#_getValueOfRef', function () {
    const root = {
      unit: 'feet',
      def: {
        A: { x: 12, y: 3 },
        B: { x: 24, y: 3 }
      }
    }

    it('should be able to return a string value', function () {
      const result = SpecReader._getValueOfRef(root, '#/unit')
      result.should.equal('feet')
    })
    it('should be able to return a nested value', function () {
      const result = SpecReader._getValueOfRef(root, '#/def/A')
      result.should.equal(root.def.A)
    })
  })

  describe('#_resolveLocalRefDirectives', function () {
    const root = {
      unit: 'feet',
      def: {
        A: { x: 12, y: 3 },
        B: { x: 24, y: 3 },
        C: { x: 24, y: 33 }
      },
      storeys: [{
        height: 4,
        walls: {
          exterior: [
            { begin: { $ref: '#/def/A' }, end: { $ref: '#/def/B' } },
            { end: { $ref: '#/def/C' } }
          ]
        }
      }]
    }

    it('should be able to resolve a single reference', function () {
      const node = root.storeys[0].walls.exterior[1]
      const result = SpecReader._resolveLocalRefDirectives(root, node)
      result.end.should.equal(root.def.C)
    })
    it('should correctly process a whole tree', function () {
      const node = root
      const result = SpecReader._resolveLocalRefDirectives(root, node)

      const newBeginning = result.storeys[0].walls.exterior[0].begin
      newBeginning.should.equal(root.def.A)
    })
  })

  describe('#canInstantiateType', function () {
    it('should return "true" for a type that can be instantiated.', function () {
      SpecReader.canInstantiateType('building.schema.json').should.be.true
    })

    it('should return "false" for a known type that can not be instantiated.', function () {
      SpecReader.canInstantiateType('metadata.schema.json').should.be.false
    })

    it('should throw expected exception for an unknown type.', function () {
      const expectedSubstring = 'Unknown type'

      expect(() => SpecReader.canInstantiateType('orange.schema.json')).to.throw(expectedSubstring)
    })

    schemas.forEach(schema => {
      describe(schema.$id, function () {
        it('should not throw for schemas in SCHEMA.', function () {
          expect(() => SpecReader.canInstantiateType(schema.$id)).not.to.throw()
        })
      })
    })
  })

  describe('#makeObjectFromSpec', function () {
    const reader = new SpecReader()

    it('should throw expected exception if the spec type is unknown.', function () {
      const spec = {
        context: 'city3d',
        type: 'aether.schema.json',
        style: 'luminiferous'
      }
      const expectedSubstring = 'Unknown type'

      expect(() => reader.makeObjectFromSpec(spec, new Pose())).to.throw(expectedSubstring)
    })

    it('should throw expected exception if the spec type has no registered class.', function () {
      const spec = {
        context: 'city3d',
        type: 'surface.schema.json',
        style: 'clapboard',
        material: 'fiber-cement'
      }
      const expectedSubstring = 'No class registered for type'

      expect(() => reader.makeObjectFromSpec(spec, new Pose())).to.throw(expectedSubstring)
    })

    schemas.forEach(schema => {
      describe(schema.$id, function () {
        if (SpecReader.canInstantiateType(schema.$id)) {
          it('should succeed for every example.', function () {
            if (notYetWorking.includes(schema.$id)) {
              this.skip()
            }

            schema.examples.forEach(example => {
              const msg = `example.name = '${example.name}'`

              expect(() => reader.makeObjectFromSpec(example, new Pose()), msg).to.not.throw()
            })
          })
        }
      })
    })
  })
})
