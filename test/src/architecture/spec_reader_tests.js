/** @file spec_reader_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { SpecReader } from '../../../src/architecture/spec_reader.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

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
})
