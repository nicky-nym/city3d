/** @file three_output_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import * as THREE from '../../../node_modules/three/build/three.module.js'
import { Geometry } from '../../../src/core/geometry.js'
import { ThreeOutput } from '../../../src/outputs/three_output.js'
import { xyz, xyzAdd } from '../../../src/core/util.js'
import { round, roundXYZ } from '../../test_utils.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('ThreeOutput', function () {
  const threeOutput = new ThreeOutput()
  const SQRT2 = Math.sqrt(2)
  const SQRT3 = Math.sqrt(3)

  describe('#makeThickPolygonMesh', function () {
    describe('with input geometry constructed with a rectangle', function () {
      const X = 2
      const Y = 6
      const rectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: 0, y: Y }, { x: X, y: Y }, { x: X, y: 0 }])

      it('should return a mesh containing a geometry containing eight vertices', function () {
        const poly = new Geometry.ThickPolygon(rectangle)
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        mesh.geometry.should.exist
        mesh.geometry.vertices.should.exist
        mesh.geometry.vertices.should.have.length(8)
      })
      it('should return expected vertices with defaults', function () {
        const poly = new Geometry.ThickPolygon(rectangle)
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const actualVertices = mesh.geometry.vertices.map(roundXYZ)
        const D = -0.5
        actualVertices.should.include.deep.members([
          xyz(0, 0, 0), xyz(0, Y, 0), xyz(X, Y, 0), xyz(X, 0, 0),
          xyz(0, 0, D), xyz(0, Y, D), xyz(X, Y, D), xyz(X, 0, D)
        ])
      })
      it('should return same vertices even with non-zero incline', function () {
        const poly = new Geometry.ThickPolygon(rectangle, { incline: 3, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const actualVertices = mesh.geometry.vertices.map(roundXYZ)
        actualVertices.should.include.deep.members([
          xyz(0, 0, 0), xyz(0, Y, 0), xyz(X, Y, 0), xyz(X, 0, 0),
          xyz(0, 0, 1), xyz(0, Y, 1), xyz(X, Y, 1), xyz(X, 0, 1)
        ])
      })
      it('should return expected world direction with 45 deg incline', function () {
        const poly = new Geometry.ThickPolygon(rectangle, { incline: Y / SQRT2, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const v = new THREE.Vector3()
        mesh.getWorldDirection(v)
        v.y.should.be.closeTo(1 / SQRT2, 0.00001)
        v.z.should.be.closeTo(1 / SQRT2, 0.00001)
      })
      it('should return expected world direction with 30 deg incline', function () {
        const poly = new Geometry.ThickPolygon(rectangle, { incline: Y / 2, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const v = new THREE.Vector3()
        mesh.getWorldDirection(v)
        v.y.should.be.closeTo(1 / 2, 0.00001)
        v.z.should.be.closeTo(SQRT3 / 2, 0.00001)
      })
      it('should return a mesh with a matrix that transforms its vertices to the expected values, with 30 deg incline', function () {
        // This test is more fundamental than the previous tests that check either the vertices or the
        // rotation/direction. We might change the geometry so that, e.g., the effect of an incline is
        // achieved by modifying the vertices rather than the transform matrix, and the previous tests
        // would fail, but this test (and the others applying mesh.matrix) should still pass.
        const poly = new Geometry.ThickPolygon(rectangle, { incline: Y / 2, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))
        const A = round(Y / 2 * SQRT3)
        const B = 1 / 2
        const C = round(SQRT3 / 2)

        // Depth > 0, so bottom face is at z = 0 before rotation.
        const expectedVerticesOfBottomFace = [xyz(0, 0, 0), xyz(0, A, -Y / 2), xyz(X, A, -Y / 2), xyz(X, 0, 0)]
        const expectedVerticesOfTopFace = expectedVerticesOfBottomFace.map(v => roundXYZ(xyzAdd(v, xyz(0, B, C))))
        transformedVertices.should.include.deep.members(expectedVerticesOfBottomFace)
        transformedVertices.should.include.deep.members(expectedVerticesOfTopFace)
      })
      it('should return a mesh with a matrix that transforms its vertices so the specified incline is achieved', function () {
        const INC = 3
        const poly = new Geometry.ThickPolygon(rectangle, { incline: INC, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))

        // If we look at the four vertices on the front edge (y = 0 before rotation) compared to
        // those on the back edge (y = Y before rotation), then the z-coordinates of the latter
        // should equal the z-coordinates of the former minus INC.
        const zCoordsOfFrontEdge = transformedVertices.filter(v => v.y < Y / 2).map(v => v.z).sort((a, b) => a - b)
        const zCoordsOfBackEdge = transformedVertices.filter(v => v.y > Y / 2).map(v => v.z).sort((a, b) => a - b)
        zCoordsOfBackEdge.should.have.length(4)
        zCoordsOfFrontEdge.should.have.length(4)
        zCoordsOfBackEdge.forEach((z, i) => z.should.be.closeTo(zCoordsOfFrontEdge[i] - INC, 0.00001))
      })
      it('should achieve specified incline when rectangle is offset', function () {
        const [X0, Y0] = [2, 3]
        const INC = 3
        const offsetRectangle = new Geometry.XYPolygon([
          { x: X0 + 0, y: Y0 + 0 },
          { x: X0 + 0, y: Y0 + Y },
          { x: X0 + X, y: Y0 + Y },
          { x: X0 + X, y: Y0 + 0 }
        ])
        const poly = new Geometry.ThickPolygon(offsetRectangle, { incline: INC, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))

        // If we look at the four vertices on the front edge (y = Y0 before rotation) compared to
        // those on the back edge (y = Y + Y0 before rotation), then the z-coordinates of the latter
        // should equal the z-coordinates of the former minus INC.
        const zCoordsOfFrontEdge = transformedVertices.filter(v => v.y - Y0 < Y / 2).map(v => v.z).sort((a, b) => a - b)
        const zCoordsOfBackEdge = transformedVertices.filter(v => v.y - Y0 > Y / 2).map(v => v.z).sort((a, b) => a - b)
        zCoordsOfFrontEdge.should.have.length(4)
        zCoordsOfBackEdge.should.have.length(4)
        zCoordsOfBackEdge.forEach((z, i) => z.should.be.closeTo(zCoordsOfFrontEdge[i] - INC, 0.00001))
      })
      it('should achieve specified incline when rectangle is rotated 90 deg', function () {
        const rotatedRectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: Y, y: 0 }, { x: Y, y: -X }, { x: 0, y: -X }])

        const poly = new Geometry.ThickPolygon(rotatedRectangle, { incline: 3, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))

        // If we look at the four vertices on the left edge (x = 0 before rotation) compared to
        // those on the right edge (x = Y before rotation), then the z-coordinates of the latter
        // should equal the z-coordinates of the former minus 3.
        const zCoordsOfLeftEdge = transformedVertices.filter(v => v.x < Y / 2).map(v => v.z).sort((a, b) => a - b)
        const zCoordsOfRightEdge = transformedVertices.filter(v => v.x > Y / 2).map(v => v.z).sort((a, b) => a - b)
        zCoordsOfLeftEdge.should.have.length(4)
        zCoordsOfRightEdge.should.have.length(4)
        zCoordsOfRightEdge.forEach((z, i) => z.should.be.closeTo(zCoordsOfLeftEdge[i] - 3, 0.00001))
      })
      it('should achieve specified incline when rectangle is rotated 45 deg', function () {
        const rotatedRectangle = new Geometry.XYPolygon([
          { x: 0, y: 0 },
          { x: Y / SQRT2, y: Y / SQRT2 },
          { x: Y / SQRT2 + X / SQRT2, y: Y / SQRT2 - X / SQRT2 },
          { x: X / SQRT2, y: -X / SQRT2 }
        ])

        const poly = new Geometry.ThickPolygon(rotatedRectangle, { incline: 3, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))

        // If we look at the four vertices on the last edge (nearest to origin) compared to
        // those on the second edge (farthest from origin), then the z-coordinates of the latter
        // should equal the z-coordinates of the former minus 3.
        const zCoordsOfNearEdge = transformedVertices.filter(v => v.x + v.y < (X + Y) / 2).map(v => v.z).sort((a, b) => a - b)
        const zCoordsOfFarEdge = transformedVertices.filter(v => v.x + v.y > (X + Y) / 2).map(v => v.z).sort((a, b) => a - b)
        zCoordsOfNearEdge.should.have.length(4)
        zCoordsOfFarEdge.should.have.length(4)
        zCoordsOfFarEdge.forEach((z, i) => z.should.be.closeTo(zCoordsOfNearEdge[i] - 3, 0.00001))
      })
      it('should achieve specified incline when rectangle is counterclockwise', function () {
        const INC = 3
        const ccwRectangle = new Geometry.XYPolygon([
          { x: 0, y: 0 },
          { x: 0, y: Y },
          { x: -X, y: Y },
          { x: -X, y: 0 }
        ])
        const poly = new Geometry.ThickPolygon(ccwRectangle, { incline: INC, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))

        // If we look at the four vertices on the front edge (y = 0 before rotation) compared to
        // those on the back edge (y = Y before rotation), then the z-coordinates of the latter
        // should equal the z-coordinates of the former minus INC.
        const zCoordsOfFrontEdge = transformedVertices.filter(v => v.y < Y / 2).map(v => v.z).sort((a, b) => a - b)
        const zCoordsOfBackEdge = transformedVertices.filter(v => v.y > Y / 2).map(v => v.z).sort((a, b) => a - b)
        zCoordsOfFrontEdge.should.have.length(4)
        zCoordsOfBackEdge.should.have.length(4)
        zCoordsOfBackEdge.forEach((z, i) => z.should.be.closeTo(zCoordsOfFrontEdge[i] - INC, 0.00001))
      })
    })

    describe('with non-rectangular input geometry', function () {
      it('should return a mesh with a matrix that transforms its vertices so the specified incline is achieved', function () {
        const X = 2
        const Y = 6
        const INC = 3
        const chevron = new Geometry.XYPolygon([
          { x: 0, y: 0 },
          { x: 0, y: Y },
          { x: X / 2, y: Y + 1 },
          { x: X, y: Y },
          { x: X, y: 0 },
          { x: X / 2, y: 1 }
        ])
        const poly = new Geometry.ThickPolygon(chevron, { incline: INC, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const transformedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyMatrix4(mesh.matrix)))

        // Because of symmetry, if we look at the six vertices on the front half (y <= 1 before rotation)
        // compared to those on the back half (y >= Y - 1 before rotation), then the z-coordinates of the latter
        // should equal the z-coordinates of the former minus INC.
        const zCoordsOfFrontHalf = transformedVertices.filter(v => v.y < Y / 2).map(v => v.z).sort((a, b) => a - b)
        const zCoordsOfBackHalf = transformedVertices.filter(v => v.y > Y / 2).map(v => v.z).sort((a, b) => a - b)
        zCoordsOfFrontHalf.should.have.length(6)
        zCoordsOfBackHalf.should.have.length(6)
        zCoordsOfBackHalf.forEach((z, i) => z.should.be.closeTo(zCoordsOfFrontHalf[i] - INC, 0.00001))
      })
    })
  })

  describe('#makeThickPolygon2Mesh', function () {
    describe('with input geometry constructed with a rectangle', function () {
      const X = 2
      const Y = 6
      const rectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: 0, y: Y }, { x: X, y: Y }, { x: X, y: 0 }])

      it('should return a mesh containing a geometry containing eight vertices', function () {
        const poly = new Geometry.ThickPolygon2(rectangle)
        const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

        mesh.geometry.should.exist
        mesh.geometry.vertices.should.exist
        mesh.geometry.vertices.should.have.length(8)
      })
      it('should return expected vertices with defaults', function () {
        const poly = new Geometry.ThickPolygon2(rectangle)
        const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

        const actualVertices = mesh.geometry.vertices.map(roundXYZ)
        const D = 0.5
        actualVertices.should.include.deep.members([
          xyz(0, 0, 0), xyz(0, Y, 0), xyz(X, Y, 0), xyz(X, 0, 0),
          xyz(0, 0, D), xyz(0, Y, D), xyz(X, Y, D), xyz(X, 0, D)
        ])
      })
      it('should return expected vertices with rotation of 90 degrees around x-axis', function () {
        const poly = new Geometry.ThickPolygon2(rectangle, { depth: 1, xRotation: Math.PI / 2 })
        const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

        const actualVertices = mesh.geometry.vertices.map(roundXYZ)
        actualVertices.should.include.deep.members([
          xyz(0, 0, 0), xyz(X, 0, 0), xyz(X, -1, 0), xyz(0, -1, 0),
          xyz(0, 0, Y), xyz(X, 0, Y), xyz(X, -1, Y), xyz(0, -1, Y)
        ])
      })

      describe('checking one face only', function () {
        it('should return expected vertices with rotation of 30 degrees around z-axis', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { zRotation: Math.PI / 6 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          const expectedVerticesOneFace = [
            xyz(0, 0, 0), xyz(X / 2 * SQRT3, X / 2, 0),
            xyz(X / 2 * SQRT3 - Y / 2, X / 2 + Y / 2 * SQRT3, 0), xyz(-Y / 2, Y / 2 * SQRT3, 0)
          ]
          actualVertices.should.include.deep.members(expectedVerticesOneFace.map(roundXYZ))
        })
        it('should return expected vertices with rotations around x-axis and z-axis', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { xRotation: Math.PI / 2, zRotation: Math.PI / 6 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          const expectedVerticesOneFace = [
            xyz(0, 0, 0), xyz(X / 2 * SQRT3, X / 2, 0),
            xyz(0, 0, Y), xyz(X / 2 * SQRT3, X / 2, Y)
          ]
          actualVertices.should.include.deep.members(expectedVerticesOneFace.map(roundXYZ))
        })
        it('should return expected vertices with xOffset and yOffset', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { xOffset: 20, yOffset: 30 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          const expectedVerticesOneFace = [
            xyz(20, 30, 0), xyz(20 + X, 30, 0), xyz(20 + X, 30 + Y, 0), xyz(20, 30 + Y, 0)
          ]
          actualVertices.should.include.deep.members(expectedVerticesOneFace)
        })
      })
    })
  })
})
