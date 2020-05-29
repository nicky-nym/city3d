/** @file architecture_tests.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Building } from '../../../src/architecture/building.js'
import { Storey } from '../../../src/architecture/storey.js'
import { ThreeOutputScene } from '../../../src/outputs/three_output_scene.js'
import { Use } from '../../../src/architecture/use.js'
import { Wall } from '../../../src/architecture/wall.js'
import { xy, xyz } from '../../../src/core/util.js'
import { roundXYZ } from '../../test_utils.js'

/* global describe, it, beforeEach */
/* eslint-disable no-unused-expressions */

describe('Wall', function () {
  describe('When traversed by ThreeOutputScene', function () {
    const D = -0.5
    const threeOutputScene = new ThreeOutputScene()
    threeOutputScene._material = function () { return null }
    let spy

    beforeEach(function () {
      spy = new ThreeObjectSpy()
    })

    it('should add one LOD, containing one Group, containing one Mesh', function () {
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(10, 0), height: 6 } })
      threeOutputScene._traverse(wall, spy)

      spy.thingsAdded.should.have.length(1)
      spy.thingsAdded[0].type.should.equal('LOD')
      spy.thingsAdded[0].children.should.have.length(1)
      spy.thingsAdded[0].children[0].type.should.equal('Group')
      spy.thingsAdded[0].children[0].children.should.have.length(1)
      spy.thingsAdded[0].children[0].children[0].type.should.equal('Mesh')
    })
    it('should add a mesh with 8 vertices', function () {
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(10, 0), height: 6 } })
      threeOutputScene._traverse(wall, spy)

      spy.getAllAddedVerticesAfterTransform().should.have.length(8)
    })
    it('should have the expected vertices for begin = (0, 0), end = (X, 0)', function () {
      const wall = new Wall({ spec: { begin: xy(0, 0), end: xy(10, 0), height: 6 } })
      threeOutputScene._traverse(wall, spy)

      spy.getAllAddedVerticesAfterTransform().should.include.deep.members([
        xyz(0, 0, 0), xyz(10, 0, 0), xyz(10, -D, 0), xyz(0, -D, 0),
        xyz(0, 0, 6), xyz(10, 0, 6), xyz(10, -D, 6), xyz(0, -D, 6)
      ])
    })
    it('should have the expected vertices for begin = (X1, 0), end = (X2, 0)', function () {
      const wall = new Wall({ spec: { begin: xy(2, 0), end: xy(10, 0), height: 6 } })
      threeOutputScene._traverse(wall, spy)

      spy.getAllAddedVerticesAfterTransform().should.include.deep.members([
        xyz(2, 0, 0), xyz(10, 0, 0), xyz(10, -D, 0), xyz(2, -D, 0),
        xyz(2, 0, 6), xyz(10, 0, 6), xyz(10, -D, 6), xyz(2, -D, 6)
      ])
    })
    it('should have the expected vertices for begin = (0, Y1), end = (0, Y2)', function () {
      const wall = new Wall({ spec: { begin: xy(0, -5), end: xy(0, 15), height: 6 } })
      threeOutputScene._traverse(wall, spy)

      spy.getAllAddedVerticesAfterTransform().should.include.deep.members([
        xyz(0, -5, 0), xyz(0, 15, 0), xyz(D, 15, 0), xyz(D, -5, 0),
        xyz(0, -5, 6), xyz(0, 15, 6), xyz(D, 15, 6), xyz(D, -5, 6)
      ])
    })
    // From here on we'll ignore the depth of the wall, and just check one face.
    it('should have the expected vertices for arbitrary begin and end', function () {
      const wall = new Wall({ spec: { begin: xy(-3, -5), end: xy(13, 15), height: 6 } })
      threeOutputScene._traverse(wall, spy)

      spy.getAllAddedVerticesAfterTransform().should.include.deep.members([
        xyz(-3, -5, 0), xyz(13, 15, 0), xyz(-3, -5, 6), xyz(13, 15, 6)
      ])
    })
  })
})

describe('Storey traversed by ThreeOutputScene', function () {
  const threeOutputScene = new ThreeOutputScene()
  threeOutputScene._material = function () { return null }
  const [X, Y, Z] = [50, 20, 8]
  let spy
  let vertices

  beforeEach(function () {
    spy = new ThreeObjectSpy()
  })

  describe('Constructed with counterclockwise rectangle, walls of height Z, and no depth specified', function () {
    const widdershins = [xy(0, 0), xy(X, 0), xy(X, Y), xy(0, Y)]
    const storey = new Storey({ outline: widdershins, deprecatedSpec: { use: Use.BARE, wall: Z } })

    beforeEach(function () {
      threeOutputScene._traverse(storey, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()
    })

    it('should have the expected number of vertices for a rectangular floor and four walls.', function () {
      vertices.should.have.length(8 /* floor */ + 4 * 8 /* 4 walls */)
    })

    it('should have negative depth.', function () {
      storey.floorDepth().should.be.lessThan(0)
    })

    it('should have z-coordinates with min = depth (where depth < 0) and max = Z.', function () {
      Math.min(...vertices.map(v => v.z)).should.equal(storey.floorDepth())
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have a bounding box exactly matching rectangle, i.e. walls inside rectangle.', function () {
      Math.min(...vertices.map(v => v.x)).should.equal(0)
      Math.max(...vertices.map(v => v.x)).should.equal(X)
      Math.min(...vertices.map(v => v.y)).should.equal(0)
      Math.max(...vertices.map(v => v.y)).should.equal(Y)
    })
  })

  describe('Constructed with clockwise rectangle, walls of height Z, and no depth specified', function () {
    const clockwise = [xy(0, 0), xy(0, Y), xy(X, Y), xy(X, 0)]
    const storey = new Storey({ outline: clockwise, deprecatedSpec: { use: Use.BARE, wall: Z } })

    beforeEach(function () {
      threeOutputScene._traverse(storey, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()
    })

    it('should have the expected number of vertices for a rectangular floor and four walls.', function () {
      vertices.should.have.length(8 /* floor */ + 4 * 8 /* 4 walls */)
    })

    it('should have negative depth.', function () {
      storey.floorDepth().should.be.lessThan(0)
    })

    it('should have z-coordinates with min = depth (where depth < 0) and max = Z.', function () {
      Math.min(...vertices.map(v => v.z)).should.equal(storey.floorDepth())
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have a bounding box extending outside the rectangle, i.e. walls outside rectangle.', function () {
      Math.min(...vertices.map(v => v.x)).should.equal(0 - 0.5)
      Math.max(...vertices.map(v => v.x)).should.equal(X + 0.5)
      Math.min(...vertices.map(v => v.y)).should.equal(0 - 0.5)
      Math.max(...vertices.map(v => v.y)).should.equal(Y + 0.5)
    })
  })

  describe('Constructed with counterclockwise rectangle, walls of height Z and non-default depth', function () {
    const widdershins = [xy(0, 0), xy(X, 0), xy(X, Y), xy(0, Y)]

    it('should have z-coordinates with min = -1 and max = Z, when depth = -1.', function () {
      const storey = new Storey({ outline: widdershins, deprecatedSpec: { use: Use.BARE, depth: -1, wall: Z } })
      threeOutputScene._traverse(storey, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()

      Math.min(...vertices.map(v => v.z)).should.equal(-1)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have z-coordinates of bounding box exactly matching wall, when depth = 1, i.e. bottom of floor is not below bottom of wall.', function () {
      const storey = new Storey({ outline: widdershins, deprecatedSpec: { use: Use.BARE, depth: 1, wall: Z } })
      threeOutputScene._traverse(storey, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()

      Math.min(...vertices.map(v => v.z)).should.equal(0)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })
  })

  describe('Constructed with clockwise rectangle, walls of height Z and non-default depth', function () {
    const clockwise = [xy(0, 0), xy(0, Y), xy(X, Y), xy(X, 0)]

    it('should have z-coordinates with min = -1 and max = Z, when depth = -1.', function () {
      const storey = new Storey({ outline: clockwise, deprecatedSpec: { use: Use.BARE, depth: -1, wall: Z } })
      threeOutputScene._traverse(storey, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()

      Math.min(...vertices.map(v => v.z)).should.equal(-1)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })

    it('should have z-coordinates of bounding box exactly matching wall, when depth = 1, i.e. bottom of floor is not below bottom of wall.', function () {
      const storey = new Storey({ outline: clockwise, deprecatedSpec: { use: Use.BARE, depth: 1, wall: Z } })
      threeOutputScene._traverse(storey, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()

      Math.min(...vertices.map(v => v.z)).should.equal(0)
      Math.max(...vertices.map(v => v.z)).should.equal(Z)
    })
  })
})

describe('Building traversed by ThreeOutputScene', function () {
  const threeOutputScene = new ThreeOutputScene()
  threeOutputScene._material = function () { return null }
  const [X, Y, Z] = [50, 20, 8]
  let spy
  let vertices

  beforeEach(function () {
    spy = new ThreeObjectSpy()
  })

  describe('Constructed with default (counterclockwise) rectangle and default (flat slab) roof', function () {
    const buildingSpec = {
      anchorPoint: xyz(0, 0, 0),
      storeys: [{
        height: Z,
        floors: [{
          outline: { shape: 'rectangle', size: xy(X, Y) }
        }]
      }],
      walls: {
        exterior: [{
          name: 'front wall',
          begin: { x: 0, y: 0 },
          end: { x: 0, y: Y },
          doors: [],
          windows: [],
          outside: {}
        }]
      }
    }
    const building = new Building({ spec: buildingSpec })

    beforeEach(function () {
      threeOutputScene._traverse(building, spy)
      vertices = spy.getAllAddedVerticesAfterTransform()
    })

    it('should have the expected number of vertices for a rectangular floor, four walls and a flat roof.', function () {
      vertices.should.have.length(8 /* floor */) // + 4 * 8 /* 4 walls */ + 8 /* roof */)
    })

    it('should have z-coordinates with min = floor depth < 0.', function () {
      Math.min(...vertices.map(v => v.z)).should.be.lessThan(0)
    })
    it.skip('should have z-coordinates with max = height of wall, i.e. top of roof is not above top of wall.', function () {
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

  add (object) {
    this.thingsAdded.push(object)
  }

  getAllAddedVerticesAfterTransform () {
    const vertices = []
    for (const obj of this.thingsAdded) {
      this._transformAndCollectVerticesFromObject(obj, vertices)
    }
    return vertices
  }

  _transformAndCollectVerticesFromObject (obj, vertices) {
    for (const child of obj.children) {
      this._transformAndCollectVerticesFromObject(child, vertices)
      if (obj.type === 'LOD') break // skip remaining children, i.e. lower resolution levels of detail
    }
    if (obj.geometry && obj.matrix) {
      vertices.push(...obj.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(obj.matrix))))
    }
  }
}
