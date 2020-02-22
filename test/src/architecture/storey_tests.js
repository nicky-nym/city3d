/** @file storey_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance } from '../../../src/core/feature.js'
import { Ray } from '../../../src/core/ray.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Use } from '../../../src/architecture/use.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it, beforeEach */
/* eslint-disable no-unused-expressions */

describe('Storey', function () {
  const ray = new Ray()
  const rectangle = [xy(0, 0), xy(50, 0), xy(50, 20), xy(0, 20)]
  let count

  describe('#constructor', function () {
    beforeEach(function () {
      count = 0
    })

    it('should return a Group with the right name if one was specified', function () {
      const room = new Storey({ name: 'lobby', placement: ray, outline: rectangle, deprecatedSpec: { use: Use.ROOM } })

      room.name.should.equal('lobby')
    })
    it('should return a Group named by its use if no name was specified', function () {
      const room = new Storey({ placement: ray, outline: rectangle, deprecatedSpec: { use: Use.ROOM } })

      room.name.should.equal('ROOM')
    })
    it('should return a Group with one Instance when called with a rectangle and no wall value', function () {
      const room = new Storey({ placement: ray, outline: rectangle, deprecatedSpec: { use: Use.ROOM } })

      room.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
      count.should.equal(1)
    })
    it('should return a Group with five Instances when called with a rectangle and a wall value', function () {
      const room = new Storey({ placement: ray, outline: rectangle, deprecatedSpec: { use: Use.ROOM, wall: 12 } })

      room.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
      count.should.equal(5)
    })
  })

  describe('#floorDepth', function () {
    it('should return negative value if no depth was specified.', function () {
      const storey = new Storey({ placement: ray, outline: rectangle, deprecatedSpec: { use: Use.BARE } })

      storey.floorDepth().should.be.lessThan(0)
    })

    it('should return the specified depth if there was one.', function () {
      const storey = new Storey({ placement: ray, outline: rectangle, deprecatedSpec: { use: Use.BARE, depth: 0.8 } })

      storey.floorDepth().should.equal(0.8)
    })
  })

  describe('#makeModelFromSpec', function () {
    it('should return a Storey if passed a good spec.', function () {
      // TODO: This is a copy of goodJSON from storey.schema_tests.js, but it might be a better idea
      // to use the examples in storey.schema.json.js instead, both here and in storey.schema_tests.js,
      // since it would not only keep the tests in sync, but would also validate the examples.
      const goodJSON = {
        context: 'city3d',
        type: 'storey.schema.json',
        name: 'Third floor',
        unit: 'feet',
        height: 8,
        floors: [{
          outline: {
            shape: 'rectangle',
            size: { x: 200, y: 200 }
          }
        }],
        rooms: [],
        roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
        ceiling: {},
        walls: {
          exterior: []
        }
      }
      const storey = new Storey()

      storey.makeModelFromSpec(goodJSON, ray)

      storey.should.exist
      storey.should.be.an.instanceof(Storey)
    })
  })
})
