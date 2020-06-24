/** @file storey_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureInstance, Feature } from '../../../src/core/feature.js'
import { Pose } from '../../../src/core/pose.js'
import { Storey } from '../../../src/architecture/storey.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it, beforeEach, expect */
/* eslint-disable no-unused-expressions */

describe('Storey', function () {
  const pose = Pose.DEFAULT
  const A = xy(0, 0)
  const B = xy(50, 0)
  const C = xy(50, 20)
  const D = xy(0, 20)
  const rectangle = [A, B, C, D]
  const outline = {
    shape: 'polygon',
    corners: rectangle
  }
  const walls = {
    exterior: [
      { begin: A, end: B },
      { end: C },
      { end: D },
      { end: A }
    ]
  }
  let count

  describe('#constructor', function () {
    beforeEach(function () {
      count = 0
    })

    it('should return a Group with the right name if one was specified', function () {
      const spec = { name: 'lobby', floors: [{ outline }] }
      const room = new Storey({ spec, pose })

      room.name.should.equal('lobby')
    })
    it('should return a Group named "Storey" if no name was specified', function () {
      const spec = { floors: [{ outline }] }
      const room = new Storey({ spec, pose })

      room.name.should.equal('Storey')
    })
    it('should return a Group with one Instance when called with a rectangle and no wall value', function () {
      const spec = { floors: [{ outline }] }
      const room = new Storey({ spec, pose })

      room.accept(node => { count += node instanceof FeatureInstance ? 1 : 0 })
      count.should.equal(1)
    })
    it('should return a Group with eight Features when called with a rectangle and four walls', function () {
      const spec = { floors: [{ outline }], walls }
      const room = new Storey({ spec, pose })

      room.accept(node => { count += node instanceof Feature ? 1 : 0 })
      count.should.equal(8)
    })
  })

  describe('#makeModelFromSpec', function () {
    it('should succeed if passed a good spec.', function () {
      // See also model_tests.js, which tests all the examples in storey.schema.json.js.
      // TODO: test the result.
      const goodJSON = {
        context: 'city3d',
        type: 'storey.schema.json',
        name: 'Third floor',
        unit: 'feet',
        height: 8,
        altitude: 40,
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

      expect(() => storey.makeModelFromSpec(goodJSON, pose)).to.not.throw()
    })
  })
})
