/** @file architecture_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Building } from '../../../src/architecture/building.js'
import { Facing } from '../../../src/core/facing.js'
import { Ray } from '../../../src/core/ray.js'
import { Storey } from '../../../src/architecture/storey.js'
import { ThreeOutput } from '../../../src/outputs/three_output.js'
import { Use } from '../../../src/architecture/use.js'
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

      spy.getAllAddedVertices().should.have.length(8)
    })
    it('should have the expected vertices for v1 = (0, 0), v2 = (X, 0)', function () {
      const wall = new Wall(xy(0, 0), xy(10, 0), 6, { depth: D })
      threeOutput._traverse(wall, spy)

      spy.getAllAddedVertices().should.include.deep.members([
        xyz(0, 0, 0), xyz(10, 0, 0), xyz(10, -D, 0), xyz(0, -D, 0),
        xyz(0, 0, 6), xyz(10, 0, 6), xyz(10, -D, 6), xyz(0, -D, 6)
      ])
    })
    it('should have the expected vertices for v1 = (X1, 0), v2 = (X2, 0)', function () {
      const wall = new Wall(xy(2, 0), xy(10, 0), 6, { depth: D })
      threeOutput._traverse(wall, spy)

      spy.getAllAddedVertices().should.include.deep.members([
        xyz(2, 0, 0), xyz(10, 0, 0), xyz(10, -D, 0), xyz(2, -D, 0),
        xyz(2, 0, 6), xyz(10, 0, 6), xyz(10, -D, 6), xyz(2, -D, 6)
      ])
    })
    it('should have the expected vertices for v1 = (0, Y1), v2 = (0, Y2)', function () {
      const wall = new Wall(xy(0, -5), xy(0, 15), 6, { depth: D })
      threeOutput._traverse(wall, spy)

      spy.getAllAddedVertices().should.include.deep.members([
        xyz(0, -5, 0), xyz(0, 15, 0), xyz(D, 15, 0), xyz(D, -5, 0),
        xyz(0, -5, 6), xyz(0, 15, 6), xyz(D, 15, 6), xyz(D, -5, 6)
      ])
    })
    // From here on we'll ignore the depth of the wall, and just check one face.
    it('should have the expected vertices for arbitrary v1 and v2', function () {
      const wall = new Wall(xy(-3, -5), xy(13, 15), 6)
      threeOutput._traverse(wall, spy)

      spy.getAllAddedVertices().should.include.deep.members([
        xyz(-3, -5, 0), xyz(13, 15, 0), xyz(-3, -5, 6), xyz(13, 15, 6)
      ])
    })
    it('should offset the vertices correctly when a value for z is specified', function () {
      const wall = new Wall(xy(0, 0), xy(10, 0), 6, { z: 20 })
      threeOutput._traverse(wall, spy)

      spy.getAllAddedVertices().should.include.deep.members([
        xyz(0, 0, 20), xyz(10, 0, 20), xyz(0, 0, 26), xyz(10, 0, 26)
      ])
    })
  })
})

describe('Storey traversed by ThreeOutput', function () {
  const D = 0.8
  const threeOutput = new ThreeOutput()
  threeOutput._material = function () { return null }
  const [X, Y, Z] = [50, 20, 8]
  let spy
  let vertices

  beforeEach(function () {
    spy = new ThreeObjectSpy()
  })

  describe('Constructed with counterclockwise rectangle, and walls', function () {
    const widdershins = [xy(0, 0), xy(X, 0), xy(X, Y), xy(0, Y)]
    const storey = new Storey(new Ray(Facing.NORTH), Use.BARE, widdershins, { depth: D, wall: Z })

    beforeEach(function () {
      threeOutput._traverse(storey, spy)
      vertices = spy.getAllAddedVertices()
    })

    it('should have the expected number of vertices for a rectangular floor and four walls.', function () {
      vertices.should.have.length(8 /* floor */ + 4 * 8 /* 4 walls */)
    })

    it('should have z-coordinates of bounding box exactly matching wall, i.e. bottom of floor is not below bottom of wall.', function () {
      Math.min(...vertices.map(v => v.z)).should.equal(0)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have a bounding box exactly matching rectangle, i.e. walls inside rectangle.', function () {
      Math.min(...vertices.map(v => v.x)).should.equal(0)
      Math.max(...vertices.map(v => v.x)).should.equal(X)
      Math.min(...vertices.map(v => v.y)).should.equal(0)
      Math.max(...vertices.map(v => v.y)).should.equal(Y)
    })
  })

  describe('Constructed with clockwise rectangle, and walls', function () {
    const clockwise = [xy(0, 0), xy(0, Y), xy(X, Y), xy(X, 0)]
    const storey = new Storey(new Ray(Facing.NORTH), Use.BARE, clockwise, { depth: D, wall: Z })

    beforeEach(function () {
      threeOutput._traverse(storey, spy)
      vertices = spy.getAllAddedVertices()
    })

    it('should have the expected number of vertices for a rectangular floor and four walls.', function () {
      vertices.should.have.length(8 /* floor */ + 4 * 8 /* 4 walls */)
    })

    it('should have z-coordinates of bounding box exactly matching wall, i.e. bottom of floor is not below bottom of wall.', function () {
      Math.min(...vertices.map(v => v.z)).should.equal(0)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have a bounding box extending outside the rectangle, i.e. walls outside rectangle.', function () {
      Math.min(...vertices.map(v => v.x)).should.equal(0 - 0.5)
      Math.max(...vertices.map(v => v.x)).should.equal(X + 0.5)
      Math.min(...vertices.map(v => v.y)).should.equal(0 - 0.5)
      Math.max(...vertices.map(v => v.y)).should.equal(Y + 0.5)
    })
  })
})

describe('Building traversed by ThreeOutput', function () {
  const threeOutput = new ThreeOutput()
  threeOutput._material = function () { return null }
  const [X, Y, Z] = [50, 20, 8]
  let spy
  let vertices

  beforeEach(function () {
    spy = new ThreeObjectSpy()
  })

  describe('Constructed with default (counerclockwise) rectangle and zero height roof', function () {
    const zeroHeightRoofSpec = {
      vertices: [xyz(0, 0, Z), xyz(0, Y, Z), xyz(X, Y, Z), xyz(X, 0, Z)],
      indices: [[0, 1, 2], [2, 3, 0]]
    }
    const buildingSpec = {
      offset: xyz(0, 0, 0),
      shape: { type: 'rectangle', data: xy(X, Y) },
      roof: { custom: zeroHeightRoofSpec }
    }
    const building = new Building(buildingSpec)

    beforeEach(function () {
      threeOutput._traverse(building, spy)
      vertices = spy.getAllAddedVertices()
    })

    it('should have the expected number of vertices for a rectangular floor, four walls and a two-triangle roof.', function () {
      vertices.should.have.length(8 /* floor */ + 4 * 8 /* 4 walls */ + 4 /* roof */)
    })

    it('should have z-coordinates of bounding box exactly matching wall, i.e. bottom of floor is not below bottom of wall.', function () {
      Math.min(...vertices.map(v => v.z)).should.equal(0)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have a bounding box exactly matching rectangle, i.e. walls inside rectangle.', function () {
      Math.min(...vertices.map(v => v.x)).should.equal(0)
      Math.max(...vertices.map(v => v.x)).should.equal(X)
      Math.min(...vertices.map(v => v.y)).should.equal(0)
      Math.max(...vertices.map(v => v.y)).should.equal(Y)
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

  getAllAddedVertices () {
    const vertices = []
    for (const obj of this.thingsAdded) {
      this._collectVerticesFromObject(obj, vertices)
    }
    return vertices
  }

  _collectVerticesFromObject (obj, vertices) {
    for (const child of obj.children) {
      this._collectVerticesFromObject(child, vertices)
      if (obj.type === 'LOD') break // skip remaining children, i.e. lower resolution levels of detail
    }
    if (obj.geometry) {
      vertices.push(...obj.geometry.vertices.map(roundXYZ))
    }
  }
}
