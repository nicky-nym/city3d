/** @file spec_reader_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Pose } from '../../../src/core/pose.js'
import { SpecReader } from '../../../src/architecture/spec_reader.js'

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
import XYZ from '../../../content/datatypes/xyz/xyz.examples.json.js'

/* global describe, it, expect */
/* eslint-disable no-unused-expressions */

const EXAMPLES = {
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
  WALL,
  WINDOW,
  XY,
  XYZ
}

const schemaIds = [
  'metadata.schema.json',
  'building.schema.json',
  'ceiling.schema.json',
  'city.schema.json',
  'copy.schema.json',
  'district.schema.json',
  'door.schema.json',
  'floor.schema.json',
  'grid.schema.json',
  'line.schema.json',
  'outline.schema.json',
  'parcel.schema.json',
  'pitch.schema.json',
  'pose.schema.json',
  'roof.schema.json',
  'room.schema.json',
  'route.schema.json',
  'storey.schema.json',
  'structure.schema.json',
  'surface.schema.json',
  'wall.schema.json',
  'window.schema.json',
  'xy.schema.json',
  'xyz.schema.json'
]

const notYetWorking = [
  'district.schema.json', // needs unit conversion
  'floor.schema.json', // still takes placement (rather than pose)
  'roof.schema.json', // still takes placement (rather than pose)
  'storey.schema.json', // still takes placement (rather than pose)
  'wall.schema.json' // still takes placement (rather than pose)
]

describe('SpecReader', function () {
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

    schemaIds.forEach(schemaId => {
      describe(schemaId, function () {
        it('should not throw for known schemas.', function () {
          expect(() => SpecReader.canInstantiateType(schemaId)).not.to.throw()
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

    const exampleFiles = Object.keys(EXAMPLES).map(item => EXAMPLES[item])
    exampleFiles.forEach(content => {
      describe(content.$type, function () {
        let contentType = content.$type
        if (!contentType.includes('.schema.json')) {
          contentType += '.schema.json'
        }
        if (SpecReader.canInstantiateType(contentType)) {
          it('should succeed for every example.', function () {
            if (notYetWorking.includes(contentType)) {
              this.skip()
            }

            content.examples.forEach(example => {
              const msg = `example.name = '${example.name}'`

              expect(() => reader.makeObjectFromSpec(example, new Pose()), msg).to.not.throw()
            })
          })
        }
      })
    })
  })
})
