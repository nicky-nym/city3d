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

const LIGHT_GRAY = 0x808080

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
  constructor ({ placement, deprecatedSpec, spec }) {
    super({ name: 'Roof', layer: Roof.layer })
    if (deprecatedSpec) {
      this.makeModelFromDeprecatedSpec(deprecatedSpec, placement)
    }
    if (spec) {
      this.makeModelFromSpec(spec, placement)
    }
  }

  makeModelFromDeprecatedSpec (deprecatedSpec, placement) {
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

  makeModelFromSpec (spec, placement) {
    let { name, unit, outline, form, pitch, eaves /* surface */ } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
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
      const adjustedCorners = placement.applyRay(outline.corners())
      const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
      const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth: 0.5 })
      const p0 = { ...adjustedCorners[0], z: placement.xyz.z }
      const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, LIGHT_GRAY)
      this.add(concreteThickPolygon)
    } else if (form === FORM.PITCHED) {
      throw new Error('TODO: "pitched" Roof code has not yet been written')
    } else if (form === FORM.LIVING) {
      throw new Error('TODO: "living" Roof code has not yet been written')
    } else if (form === FORM.VAULTED) {
      throw new Error('TODO: "vaulted" Roof code has not yet been written')
    }
  }
}

Roof.layer = Feature.registerLayer(Roof, 'roofs', { category: 'Buildings' })

export { Roof }
