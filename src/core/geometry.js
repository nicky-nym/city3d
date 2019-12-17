/** @file geometry.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

class Instance {
  constructor (geometry, zOffset, hexColor, name) {
    this.geometry = geometry
    this.zOffset = zOffset
    this.hexColor = hexColor
    this.name = name
  }
}

class Line {
  constructor (xyzWaypoints) {
    this.xyzWaypoints = xyzWaypoints
  }
}

class OutlinePolygon {
  constructor (xyPolygon) {
    this.xyPolygon = xyPolygon
  }
}

class ThickPolygon {
  constructor (xyPolygon, { incline = 0, depth = -0.5 } = {}) {
    this.xyPolygon = xyPolygon
    this.incline = incline
    this.depth = depth
  }
}

class TriangularPolyhedron {
  constructor (vertices, indicesOfFaces) {
    this.vertices = vertices
    this.indicesOfFaces = indicesOfFaces
  }
}

const DEFAULT_THICKNESS = 0.5

/**
 * ThickPolygon2 is currently used for building Walls.
 * TODO: merge with ThickPolygon
 *
 * @param {XYPolygon} xyPolygon
 * @param {Number} [xRotation=0] - rotation around x-axis in radians
 * @param {Number} [zRotation=0] - rotation around z-axis in radians
 * @param {Number} [xOffset=0]
 * @param {Number} [yOffset=0]
 * @param {Number} [depth=DEFAULT_THICKNESS]
 * @param {xy[][]} [openings] - array of openings, where each is specified by an array of xy values
 */
class ThickPolygon2 {
  constructor (xyPolygon, {
    xRotation = 0, zRotation = 0, xOffset = 0, yOffset = 0, depth = DEFAULT_THICKNESS, openings = []
  } = {}) {
    this.xyPolygon = xyPolygon
    this.xRotation = xRotation
    this.zRotation = zRotation
    this.xOffset = xOffset
    this.yOffset = yOffset
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

  area () {
    const n = this.length
    let sum = this[n - 1].x * this[0].y - this[0].x * this[n - 1].y
    for (let i = 0; i < n - 1; i++) {
      sum += this[i].x * this[i + 1].y - this[i + 1].x * this[i].y
    }
    return Math.abs(sum / 2)
  }
}

export const Geometry = { Instance, Line, OutlinePolygon, ThickPolygon, ThickPolygon2, TriangularPolyhedron, XYPolygon }
