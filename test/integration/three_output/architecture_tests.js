/** @file architecture_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { ThreeOutput } from '../../../src/outputs/three_output.js'
import { Wall } from '../../../src/architecture/wall.js'
import { xy, xyz } from '../../../src/core/util.js'
import { roundXYZ } from '../../test_utils.js'

/* global describe, it, beforeEach */
/* eslint-disable no-unused-expressions */

describe('Wall', function () {
  describe('When traversed by ThreeOutput', function () {
    const D = 0.2
    const threeOutput = new ThreeOutput()
    threeOutput._material = function () { return null }
    let spy

    beforeEach(function () {
      spy = new ThreeObjectSpy()
    })

    it('should add one group containing one mesh', function () {
      const wall = new Wall(xy(0, 0), xy(10, 0), 6)
      threeOutput._traverse(wall, spy)

      spy.thingsAdded.should.have.length(1)
      spy.thingsAdded[0].type.should.equal('Group')
      spy.thingsAdded[0].children.should.have.length(1)
      spy.thingsAdded[0].children[0].type.should.equal('Mesh')
    })
    it('should add a mesh with 8 vertices', function () {
      const wall = new Wall(xy(0, 0), xy(10, 0), 6)
      threeOutput._traverse(wall, spy)

      spy.verticesOfMesh().should.have.length(8)
    })
    it('should have the expected vertices for v1 = (0, 0), v2 = (X, 0)', function () {
      const wall = new Wall(xy(0, 0), xy(10, 0), 6, { depth: D })
      threeOutput._traverse(wall, spy)

      spy.verticesOfMesh().should.include.deep.members([
        xyz(0, 0, 0), xyz(10, 0, 0), xyz(10, -D, 0), xyz(0, -D, 0),
        xyz(0, 0, 6), xyz(10, 0, 6), xyz(10, -D, 6), xyz(0, -D, 6)
      ])
    })
    it('should have the expected vertices for v1 = (X1, 0), v2 = (X2, 0)', function () {
      const wall = new Wall(xy(2, 0), xy(10, 0), 6, { depth: D })
      threeOutput._traverse(wall, spy)

      spy.verticesOfMesh().should.include.deep.members([
        xyz(2, 0, 0), xyz(10, 0, 0), xyz(10, -D, 0), xyz(2, -D, 0),
        xyz(2, 0, 6), xyz(10, 0, 6), xyz(10, -D, 6), xyz(2, -D, 6)
      ])
    })
    it('should have the expected vertices for v1 = (0, Y1), v2 = (0, Y2)', function () {
      const wall = new Wall(xy(0, -5), xy(0, 15), 6, { depth: D })
      threeOutput._traverse(wall, spy)

      spy.verticesOfMesh().should.include.deep.members([
        xyz(0, -5, 0), xyz(0, 15, 0), xyz(D, 15, 0), xyz(D, -5, 0),
        xyz(0, -5, 6), xyz(0, 15, 6), xyz(D, 15, 6), xyz(D, -5, 6)
      ])
    })
    // From here on we'll ignore the depth of the wall, and just check one face.
    it('should have the expected vertices for arbitrary v1 and v2', function () {
      const wall = new Wall(xy(-3, -5), xy(13, 15), 6)
      threeOutput._traverse(wall, spy)

      spy.verticesOfMesh().should.include.deep.members([
        xyz(-3, -5, 0), xyz(13, 15, 0), xyz(-3, -5, 6), xyz(13, 15, 6)
      ])
    })
    it('should offset the vertices correctly when a value for z is specified', function () {
      const wall = new Wall(xy(0, 0), xy(10, 0), 6, { z: 20 })
      threeOutput._traverse(wall, spy)

      spy.verticesOfMesh().should.include.deep.members([
        xyz(0, 0, 20), xyz(10, 0, 20), xyz(0, 0, 26), xyz(10, 0, 26)
      ])
    })
  })
})

class ThreeObjectSpy {
  constructor () {
    this.thingsAdded = []
  }

  add (thing) {
    this.thingsAdded.push(thing)
  }

  verticesOfMesh () {
    const group = this.thingsAdded[0]
    const mesh = group && group.children[0]
    const geometry = mesh && mesh.geometry
    return geometry && geometry.vertices.map(roundXYZ)
  }
}
