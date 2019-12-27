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

  describe('#makeThickPolygonMesh', function () {
    describe('with input geometry constructed with a rectangle', function () {
      const rectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: 0, y: 6 }, { x: 8, y: 6 }, { x: 8, y: 0 }])

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
          xyz(0, 0, 0), xyz(0, 6, 0), xyz(8, 6, 0), xyz(8, 0, 0),
          xyz(0, 0, D), xyz(0, 6, D), xyz(8, 6, D), xyz(8, 0, D)
        ])
      })
      it('should return same vertices even with non-zero incline', function () {
        const poly = new Geometry.ThickPolygon(rectangle, { incline: 3, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const actualVertices = mesh.geometry.vertices.map(roundXYZ)
        actualVertices.should.include.deep.members([
          xyz(0, 0, 0), xyz(0, 6, 0), xyz(8, 6, 0), xyz(8, 0, 0),
          xyz(0, 0, 1), xyz(0, 6, 1), xyz(8, 6, 1), xyz(8, 0, 1)
        ])
      })
      it('should return expected world direction with 45 deg incline', function () {
        const poly = new Geometry.ThickPolygon(rectangle, { incline: 6 / Math.sqrt(2), depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const v = new THREE.Vector3()
        mesh.getWorldDirection(v)
        v.y.should.be.closeTo(1 / Math.sqrt(2), 0.00001)
        v.z.should.be.closeTo(1 / Math.sqrt(2), 0.00001)
      })
      it('should return expected world direction with 30 deg incline', function () {
        const poly = new Geometry.ThickPolygon(rectangle, { incline: 3, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const v = new THREE.Vector3()
        mesh.getWorldDirection(v)
        v.y.should.be.closeTo(1 / 2, 0.00001)
        v.z.should.be.closeTo(Math.sqrt(3) / 2, 0.00001)
      })
      it('should return quaternion that transforms the vertices to the expected values, with 30 deg incline', function () {
        // This test is more fundamental than the previous tests that check either the vertices or the
        // rotation/direction. We might change the geometry so that, e.g., the effect of an incline is
        // achieved by modifying the vertices rather than the transform matrix, and the previous tests
        // would fail, but this test should still pass.
        const poly = new Geometry.ThickPolygon(rectangle, { incline: 3, depth: 1 })
        const mesh = threeOutput.makeThickPolygonMesh(poly, 0, null)

        const q = new THREE.Quaternion()
        mesh.getWorldQuaternion(q)
        const rotatedVertices = mesh.geometry.vertices.map(v => roundXYZ(v.applyQuaternion(q)))
        const A = round(3 * Math.sqrt(3))
        const B = 1 / 2
        const C = round(Math.sqrt(3) / 2)
        const expectedVerticesOfTopFace = [xyz(0, 0, 0), xyz(0, A, -3), xyz(8, A, -3), xyz(8, 0, 0)]
        const expectedVerticesOfBottomFace = expectedVerticesOfTopFace.map(v => xyzAdd(v, xyz(0, B, C)))
        rotatedVertices.should.include.deep.members(expectedVerticesOfTopFace)
        rotatedVertices.should.include.deep.members(expectedVerticesOfBottomFace)
      })
    })
  })

  describe('#makeThickPolygon2Mesh', function () {
    describe('with input geometry constructed with a rectangle', function () {
      const rectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: 0, y: 6 }, { x: 8, y: 6 }, { x: 8, y: 0 }])

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
          xyz(0, 0, 0), xyz(0, 6, 0), xyz(8, 6, 0), xyz(8, 0, 0),
          xyz(0, 0, D), xyz(0, 6, D), xyz(8, 6, D), xyz(8, 0, D)
        ])
      })
      it('should return expected vertices with rotation of 90 degrees around x-axis', function () {
        const poly = new Geometry.ThickPolygon2(rectangle, { depth: 1, xRotation: Math.PI / 2 })
        const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

        const actualVertices = mesh.geometry.vertices.map(roundXYZ)
        actualVertices.should.include.deep.members([
          xyz(0, 0, 0), xyz(8, 0, 0), xyz(8, -1, 0), xyz(0, -1, 0),
          xyz(0, 0, 6), xyz(8, 0, 6), xyz(8, -1, 6), xyz(0, -1, 6)
        ])
      })

      describe('checking one face only', function () {
        it('should return expected vertices with rotation of 30 degrees around z-axis', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { zRotation: Math.PI / 6 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          const expectedVerticesOneFace = [
            xyz(0, 0, 0), xyz(4 * Math.sqrt(3), 4, 0),
            xyz(4 * Math.sqrt(3) - 3, 4 + 3 * Math.sqrt(3), 0), xyz(-3, 3 * Math.sqrt(3), 0)
          ]
          actualVertices.should.include.deep.members(expectedVerticesOneFace.map(roundXYZ))
        })
        it('should return expected vertices with rotations around x-axis and z-axis', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { xRotation: Math.PI / 2, zRotation: Math.PI / 6 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          const expectedVerticesOneFace = [
            xyz(0, 0, 0), xyz(4 * Math.sqrt(3), 4, 0),
            xyz(0, 0, 6), xyz(4 * Math.sqrt(3), 4, 6)
          ]
          actualVertices.should.include.deep.members(expectedVerticesOneFace.map(roundXYZ))
        })
        it('should return expected vertices with xOffset and yOffset', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { xOffset: 20, yOffset: 30 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          const expectedVerticesOneFace = [
            xyz(20, 30, 0), xyz(28, 30, 0), xyz(28, 36, 0), xyz(20, 30, 0)
          ]
          actualVertices.should.include.deep.members(expectedVerticesOneFace)
        })
      })
    })
  })
})
