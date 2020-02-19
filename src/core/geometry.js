/** @file geometry.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

class Line {
  constructor (xyzWaypoints, radius = 0.1) {
    this.xyzWaypoints = xyzWaypoints
    this.radius = radius
  }
}

class OutlinePolygon {
  constructor (xyPolygon) {
    this.xyPolygon = xyPolygon
  }
}

class TriangularPolyhedron {
  constructor (vertices, indicesOfFaces) {
    this.vertices = vertices
    this.indicesOfFaces = indicesOfFaces
  }
}

const DEFAULT_THICKNESS = -0.5

/**
 * ThickPolygon is a class for representing a polygon with some thickness (or depth) and
 * with a possible incline relative to the XY plane.
 *
 * @param {XYPolygon} xyPolygon
 * @param {number} [incline=0] - z-offset of second vertex relative to first
 * @param {Number} [zRotation=0] - rotation around z-axis in radians
 * @param {Number} [depth=DEFAULT_THICKNESS] - volume extends between z = 0 and z = depth
 * @param {xy[][]} [openings] - array of openings, where each is specified by an array of xy values
 */
class ThickPolygon {
  constructor (xyPolygon, { incline = 0, zRotation = 0, depth = DEFAULT_THICKNESS, openings = [] } = {}) {
    this.xyPolygon = xyPolygon
    this.incline = incline
    this.zRotation = zRotation
    this.depth = depth
    this.openings = openings
  }

  area () {
    return this.xyPolygon.area()
  }

  areaOfOpenings () {
    let sum = 0
    this.openings.forEach(o => { sum += (new XYPolygon(o)).area() })
    return sum
  }
}

class XYPolygon extends Array {
  constructor (xyVertices = []) {
    super(...xyVertices)
  }

  map (fn) {
    const out = []
    this.forEach(v => out.push(fn(v)))
    return out
  }

  area () {
    const n = this.length
    let sum = this[n - 1].x * this[0].y - this[0].x * this[n - 1].y
    for (let i = 0; i < n - 1; i++) {
      sum += this[i].x * this[i + 1].y - this[i + 1].x * this[i].y
    }
    return Math.abs(sum / 2)
  }
}

export const Geometry = { Line, OutlinePolygon, ThickPolygon, TriangularPolyhedron, XYPolygon }
