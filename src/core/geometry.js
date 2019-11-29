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

const DEFAULT_WALL_THICKNESS = 0.5
class Wall {
  constructor (xyVertex0, xyVertex1, height, { depth, openings } = {}) {
    this.xyVertex0 = xyVertex0
    this.xyVertex1 = xyVertex1
    this.height = height
    this.depth = depth || DEFAULT_WALL_THICKNESS
    this.openings = openings || []
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

export const Geometry = { Instance, ThickPolygon, TriangularPolyhedron, Wall, XYPolygon }
