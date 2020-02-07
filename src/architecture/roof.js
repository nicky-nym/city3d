/** @file roof.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { Model } from './model.js'
import { Pitch } from '../core/pitch.js'
import { Outline } from '../core/outline.js'
import { hypotenuse } from '../core/util.js'

const LIGHT_GRAY = 0x808080

/**
 * The overall shape of the roof as a whole, including all the different roof faces and/or surfaces.
 */
const FORM = {
  // NOTE: these values must exactly match the values in roof.schema.json.js
  NONE: 'none',
  FLAT: 'flat',
  PITCHED: 'pitched',
  HIPPED: 'hipped',
  SHED: 'shed',
  LIVING: 'living',
  VAULTED: 'vaulted'
}

const ROOF_THICKNESS = 0.05

function _distance (a, b) {
  return hypotenuse(b.x - a.x, b.y - a.y)
}

function _midpoint (a, b) {
  const x = ((b.x - a.x) / 2) + a.x
  const y = ((b.y - a.y) / 2) + a.y
  return { x, y }
}

/**
 * Roof is a class for representing the roof of a building.
 */
class Roof extends Model {
  /**
   * Create a new instance of a specified Roof, and generate the Geometry objects for it.
   * @param {Ray} [placement] - the location and orientation of this part
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   * @param {object} [spec] - an specification object that is valid against roof.schema.json.js
   * @param {Wall[]} [walls] - an array of Wall instances
   */
  constructor ({ placement, deprecatedSpec, spec, walls }) {
    super({ name: 'Roof', layer: Roof.layer })
    if (deprecatedSpec) {
      this._makeModelFromDeprecatedSpec(deprecatedSpec, placement)
    }
    if (spec) {
      this.makeModelFromSpec(spec, placement, walls)
    }
  }

  // TODO: delete this code when it is no longer used by any content model classes
  _makeModelFromDeprecatedSpec (deprecatedSpec, placement) {
    if (deprecatedSpec.custom) {
      let { vertices, indices } = deprecatedSpec.custom
      vertices = placement.applyRay(vertices)
      const abstractRoof = new Geometry.TriangularPolyhedron(vertices, indices)
      const concreteRoof = new FeatureInstance(abstractRoof, { ...vertices[0] }, LIGHT_GRAY)
      this.add(concreteRoof)
    } else if (deprecatedSpec.flat) {
      const adjustedCorners = placement.applyRay(deprecatedSpec.flat)
      const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
      const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: 0.5 })
      const p0 = { ...adjustedCorners[0], z: placement.xyz.z }
      const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, LIGHT_GRAY)
      this.add(concreteThickPolygon)
    } else {
      throw new Error('bad roof type in spec for new Roof()')
    }
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against roof.schema.json.js
   * @param {Ray} [placement] - the location and orientation of this part
   */
  makeModelFromSpec (spec, placement, walls) {
    let { name, unit, outline, form, pitch, eaves /* surface */ } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }

    if (pitch) {
      pitch = new Pitch(pitch.rise, ':', pitch.run)
    }

    let corners = []
    if (outline) {
      corners = outline.corners
    } else {
      for (const wall of walls) {
        corners.push(wall.begin())
      }
    }
    outline = new Outline({ shape: 'polygon', corners }, -eaves || 0)

    form = form || FORM.FLAT
    if (form === FORM.FLAT) {
      this._makeSlab(outline.corners(), placement)
    } else if (form === FORM.PITCHED) {
      this._makePitchedRoof(eaves, pitch, placement, walls, outline)
    } else if (form === FORM.HIPPED) {
      this._makeHippedRoof(eaves, pitch, placement, walls, outline)
    } else if (form === FORM.SHED) {
      this._makeShedRoof(eaves, pitch, placement, walls, outline)
    } else if (form === FORM.LIVING) {
      // TODO: write this code!
      throw new Error('TODO: "living" Roof code has not yet been written')
    } else if (form === FORM.VAULTED) {
      // TODO: write this code!
      throw new Error('TODO: "vaulted" Roof code has not yet been written')
    }
  }

  _makeSlab (corners, placement, incline = 0) {
    const adjustedCorners = placement.applyRay(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline, depth: ROOF_THICKNESS })
    const p0 = { ...adjustedCorners[0], z: placement.xyz.z }
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, LIGHT_GRAY)
    this.add(concreteThickPolygon)
  }

  // TODO: do a DRY refactor to extract common code from _makeShedRoof, _makeHippedRoof, _makePitchedRoof
  _makePitchedRoof (eaves, pitch, placement, walls, outline) {
    const corners = outline.corners()
    let leftCorner = null
    let rightCorner = null
    let previousWall = walls[walls.length - 1]
    let currentWall = null
    let nextWall = null // eslint-disable-line no-unused-vars
    for (let i = 0; i < walls.length; i++) {
      leftCorner = corners[i]
      rightCorner = (i === (corners.length - 1)) ? corners[0] : corners[i + 1]
      const length = _distance(leftCorner, rightCorner)
      currentWall = walls[i]
      nextWall = (i === (walls.length - 1)) ? walls[0] : walls[i + 1]
      if (currentWall.roofline() === 'gabled') { // TODO: use enum value from Wall
        const begin = leftCorner
        const endPoint = rightCorner
        const midpoint = _midpoint(leftCorner, rightCorner)
        const halfLength = length / 2
        const insetDistance = Math.max(halfLength, previousWall.length())
        const insetX = insetDistance * (endPoint.y - begin.y) / length
        const insetY = insetDistance * (begin.x - endPoint.x) / length
        const gableHeight = halfLength * pitch.slope()
        const hyp = hypotenuse(halfLength, gableHeight)
        const ratio = hyp / halfLength
        const stretch = {
          x: (midpoint.x - begin.x) * (ratio - 1),
          y: (midpoint.y - begin.y) * (ratio - 1)
        }
        const incline = halfLength * pitch.slope()

        const at = placement.copy()
        at.xyz.z -= eaves * pitch.slope()
        const cornersForLeftFace = [
          begin,
          { x: midpoint.x + stretch.x, y: midpoint.y + stretch.y },
          { x: midpoint.x + stretch.x - insetX, y: midpoint.y + stretch.y - insetY },
          { x: begin.x - insetX, y: begin.y - insetY }
        ]
        this._makeSlab(cornersForLeftFace, at, incline)

        const cornersForRightFace = [
          { x: endPoint.x - insetX, y: endPoint.y - insetY },
          { x: midpoint.x - stretch.x - insetX, y: midpoint.y - stretch.y - insetY },
          { x: midpoint.x - stretch.x, y: midpoint.y - stretch.y },
          endPoint
        ]
        this._makeSlab(cornersForRightFace, at, incline)
      }
      previousWall = currentWall
    }
  }

  // TODO: do a DRY refactor to extract common code from _makeShedRoof, _makeHippedRoof, _makePitchedRoof
  _makeHippedRoof (eaves, pitch, placement, walls, outline) {
    const at = placement.copy()
    at.xyz.z -= eaves * pitch.slope()
    const corners = outline.corners()
    let previousWall = walls[walls.length - 1]
    let currentWall = null
    let leftCorner = null
    let rightCorner = null
    for (let i = 0; i < corners.length; i++) {
      currentWall = walls[i]
      const bookendLength = eaves + Math.min(previousWall.length(), currentWall.length()) / 2
      const wallLength = (eaves * 2) + currentWall.length()
      const middleLength = wallLength - (bookendLength * 2)
      const incline = bookendLength * pitch.slope()
      leftCorner = corners[i]
      rightCorner = (i === (corners.length - 1)) ? corners[0] : corners[i + 1]
      const dxAtGutter = rightCorner.x - leftCorner.x
      const dyAtGutter = rightCorner.y - leftCorner.y
      const peakHeight = bookendLength * pitch.slope()
      const hyp = hypotenuse(bookendLength, peakHeight)
      const ratio = hyp / bookendLength

      const leftishCorner = {
        x: leftCorner.x + dxAtGutter * (bookendLength / wallLength),
        y: leftCorner.y + dyAtGutter * (bookendLength / wallLength)
      }
      const rightishCorner = {
        x: leftishCorner.x + dxAtGutter * (middleLength / wallLength),
        y: leftishCorner.y + dyAtGutter * (middleLength / wallLength)
      }
      const leftishPeak = {
        x: leftishCorner.x - (ratio * dyAtGutter * (bookendLength / wallLength)),
        y: leftishCorner.y + (ratio * dxAtGutter * (bookendLength / wallLength))
      }
      const rightishPeak = {
        x: rightishCorner.x - (ratio * dyAtGutter * (bookendLength / wallLength)),
        y: rightishCorner.y + (ratio * dxAtGutter * (bookendLength / wallLength))
      }

      const cornersForLeftFace = [
        leftishCorner,
        leftishPeak,
        leftCorner
      ]
      this._makeSlab(cornersForLeftFace, at, incline)
      if (middleLength) {
        const middleSlabCorners = [
          leftishCorner,
          leftishPeak,
          rightishPeak,
          rightishCorner
        ]
        this._makeSlab(middleSlabCorners, at, incline)
      }
      const cornersForRightFace = [
        rightishCorner,
        rightishPeak,
        rightCorner
      ]
      this._makeSlab(cornersForRightFace, at, incline)
      previousWall = currentWall
    }
  }

  // TODO: do a DRY refactor to extract common code from _makeShedRoof, _makeHippedRoof, _makePitchedRoof
  _makeShedRoof (eaves, pitch, placement, walls, outline) {
    const corners = outline.corners()
    let leftCorner = null
    let rightCorner = null
    let previousWall = walls[walls.length - 1]
    let currentWall = null
    let nextWall = null // eslint-disable-line no-unused-vars
    for (let i = 0; i < walls.length; i++) {
      leftCorner = corners[i]
      rightCorner = (i === (corners.length - 1)) ? corners[0] : corners[i + 1]
      const length = _distance(leftCorner, rightCorner)
      currentWall = walls[i]
      nextWall = (i === (walls.length - 1)) ? walls[0] : walls[i + 1]
      if (currentWall.roofline() === 'shed') { // TODO: use enum value from Wall
        const begin = leftCorner
        const endPoint = rightCorner
        const insetDistance = Math.max(length, previousWall.length())
        const insetX = insetDistance * (endPoint.y - begin.y) / length
        const insetY = insetDistance * (begin.x - endPoint.x) / length
        const peakHeight = length * pitch.slope()
        const hyp = hypotenuse(length, peakHeight)
        const ratio = hyp / length
        const stretch = {
          x: (endPoint.x - begin.x) * (ratio - 1),
          y: (endPoint.y - begin.y) * (ratio - 1)
        }
        const incline = length * pitch.slope()

        const at = placement.copy()
        at.xyz.z -= eaves * pitch.slope()

        if (currentWall.isFirstWall()) {
          const cornersForFace = [
            { x: endPoint.x - insetX, y: endPoint.y - insetY },
            { x: begin.x - stretch.x - insetX, y: begin.y - stretch.y - insetY },
            { x: begin.x - stretch.x, y: begin.y - stretch.y },
            endPoint
          ]
          this._makeSlab(cornersForFace, at, incline)
        } else {
          const cornersForFace = [
            begin,
            { x: endPoint.x + stretch.x, y: endPoint.y + stretch.y },
            { x: endPoint.x + stretch.x - insetX, y: endPoint.y + stretch.y - insetY },
            { x: begin.x - insetX, y: begin.y - insetY }
          ]
          this._makeSlab(cornersForFace, at, incline)
        }
      }
      previousWall = currentWall
    }
  }
}

Roof.layer = Feature.registerLayer(Roof, 'roofs', { category: 'Buildings' })

export { Roof }
