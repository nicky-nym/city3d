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

function _xyDistance (xy0, xy1) {
  const dx = xy0.x - xy1.x
  const dy = xy0.y - xy1.y
  return Math.sqrt(dx ** 2 + dy ** 2)
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

  area () {
    return this.height * _xyDistance(this.xyVertex0, this.xyVertex1)
  }

  areaOfOpenings () {
    let sum = 0
    const n = this.openings
    for (let i = 0; i < n - 1; i++) {
      const opening = this.openings[i] // eslint-disable-line no-unused-vars
      // TODO: implement me!
      // sum += opening[i].x * opening[i + 1].y - opening[i + 1].x * opening[i].y
      sum += 0
    }
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

export const Geometry = { Instance, Line, OutlinePolygon, ThickPolygon, TriangularPolyhedron, Wall, XYPolygon }
