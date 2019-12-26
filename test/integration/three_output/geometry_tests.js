/** @file geometry_tests.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Geometry } from '../../../src/core/geometry.js'
import { ThreeOutput } from '../../../src/outputs/three_output.js'
import { xyz } from '../../../src/core/util.js'
import { roundXYZ } from '../../test_utils.js'

/* global describe, it */
/* eslint-disable no-unused-expressions */

describe('Geometry', function () {
  describe('ThickPolygon2', function () {
    describe('constructed with a rectangle', function () {
      const rectangle = new Geometry.XYPolygon([{ x: 0, y: 0 }, { x: 0, y: 6 }, { x: 8, y: 6 }, { x: 8, y: 0 }])

      describe('When processed by ThreeOutput', function () {
        const threeOutput = new ThreeOutput()

        it('should return a mesh containing a geometry containing eight vertices', function () {
          const poly = new Geometry.ThickPolygon2(rectangle)
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          mesh.geometry.should.exist
          mesh.geometry.vertices.should.exist
          mesh.geometry.vertices.should.have.length(8)
        })
        it('should return expected vertices', function () {
          const poly = new Geometry.ThickPolygon2(rectangle, { depth: 1 })
          const mesh = threeOutput.makeThickPolygon2Mesh(poly, 0, null)

          const actualVertices = mesh.geometry.vertices.map(roundXYZ)
          actualVertices.should.include.deep.members([
            xyz(0, 0, 0), xyz(0, 6, 0), xyz(8, 6, 0), xyz(8, 0, 0),
            xyz(0, 0, 1), xyz(0, 6, 1), xyz(8, 6, 1), xyz(8, 0, 1)
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
})