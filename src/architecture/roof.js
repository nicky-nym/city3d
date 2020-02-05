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
  FLAT: 'flat',
  PITCHED: 'pitched',
  LIVING: 'living',
  VAULTED: 'vaulted'
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

  _makeSlab (corners, placement, incline = 0) {
    const adjustedCorners = placement.applyRay(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { incline, depth: 0.5 })
    const p0 = { ...adjustedCorners[0], z: placement.xyz.z }
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, LIGHT_GRAY)
    this.add(concreteThickPolygon)
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

    if (outline) {
      outline = new Outline(outline, eaves || 0)
    }

    form = form || FORM.FLAT
    if (form === FORM.FLAT) {
      this._makeSlab(outline.corners(), placement)
    } else if (form === FORM.PITCHED) {
      let previousWall = walls[walls.length - 1]
      let currentWall = null
      let nextWall = null // eslint-disable-line no-unused-vars
      for (let i = 0; i < walls.length; i++) {
        currentWall = walls[i]
        nextWall = i === (walls.length - 1) ? walls[0] : walls[i + 1]
        if (currentWall.roofline() === 'gabled') { // TODO: use enum value from Wall
          const begin = currentWall.begin()
          const endPoint = currentWall.end()
          const midpoint = currentWall.midpoint()
          const halfLength = currentWall.length() / 2
          const insetDistance = Math.max(halfLength, previousWall.length())
          const insetX = insetDistance * (endPoint.y - begin.y) / currentWall.length()
          const insetY = insetDistance * (begin.x - endPoint.x) / currentWall.length()
          const gableHeight = halfLength * pitch.slope()
          const hyp = hypotenuse(halfLength, gableHeight)
          const ratio = hyp / halfLength
          const dx = (midpoint.x - begin.x) * (ratio - 1)
          const dy = (midpoint.y - begin.y) * (ratio - 1)
          const incline = halfLength * pitch.slope()

          const cornersForLeftFace = [
            begin,
            { x: midpoint.x + dx, y: midpoint.y + dy },
            { x: midpoint.x + dx - insetX, y: midpoint.y + dy - insetY },
            { x: begin.x - insetX, y: begin.y - insetY }
          ]
          this._makeSlab(cornersForLeftFace, placement, incline)

          const cornersForRightFace = [
            { x: endPoint.x - insetX, y: endPoint.y - insetY },
            { x: midpoint.x - dx - insetX, y: midpoint.y - dy - insetY },
            { x: midpoint.x - dx, y: midpoint.y - dy },
            endPoint
          ]
          this._makeSlab(cornersForRightFace, placement, incline)
        }
        previousWall = currentWall
      }
      // TODO: write this code!
    } else if (form === FORM.LIVING) {
      // TODO: write this code!
      throw new Error('TODO: "living" Roof code has not yet been written')
    } else if (form === FORM.VAULTED) {
      // TODO: write this code!
      throw new Error('TODO: "vaulted" Roof code has not yet been written')
    }
  }
}

Roof.layer = Feature.registerLayer(Roof, 'roofs', { category: 'Buildings' })

export { Roof }
