/** @file district.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { array, countTo, xyz, xyzAdd } from '../core/util.js'
import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { METRIC } from './metric.js'
import { Model } from './model.js'
import { Outline } from '../core/outline.js'
import { Pavement } from './pavement.js'
import { Ray } from '../core/ray.js'

const MARTIAN_ORANGE = 0xdf4911

/**
 * District is a class for representing structure and metrics for a district of a city.
 * A district can have land, parcels, buildings, and structures.
 */
class District extends Model {
  /**
   * Create a new instance of a specified District, and generate the Geometry objects for it.
   * @param {string} [name] - a display name for this individual instance at a given placement
   * @param {Ray} [placement] - the location and orientation of this parcel
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   * @param {object} [spec] - a specification object that is valid against district.schema.json.js
   * @param {SpecReader} [specReader] - an instance of a SpecReader, for adding content models in the district
   */
  constructor ({
    name,
    placement = new Ray(),
    deprecatedSpec,
    spec,
    specReader
  } = {}) {
    name = name || (spec && spec.name)
    super({ name })
    if (deprecatedSpec) {
      this._makeModelFromDeprecatedSpec(deprecatedSpec, placement)
    }
    if (spec) {
      this.makeModelFromSpec(spec, placement, specReader)
    }
  }

  placement () {
    return this._placement
  }

  goto ({ x = 0, y = 0, z = 0 } = {}, facing) {
    return this._placement.add(xyz(x, y, z), facing)
  }

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against district.schema.json.js
   * @param {Ray} [placement] - the location and orientation of this part
   */
  makeModelFromSpec (spec, placement, specReader) {
    const { name, unit, /* anchorPoint, */ border, parcels, contents, pavement } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }
    const outline = new Outline(border)
    const corners = outline.corners()
    const deprecatedSpec = { outline: corners }
    this._makeModelFromDeprecatedSpec(deprecatedSpec, placement)

    if (parcels) {
      for (const copySpec of parcels) {
        const at = placement.applyRay(copySpec.at)
        const specName = copySpec.copy.$ref
        const modelObject = specReader.makeModelFromSpecName(specName, at)
        this.add(modelObject)
      }
    }

    if (contents) {
      for (const copySpec of contents) {
        const specName = copySpec.copy.$ref
        // let count = 1
        // let offset = { x: 0, y: 0, z: 0 }
        // const repeats = array(copySpec.repeat)
        // for (const repeatSpec of repeats) {

        // }
        if (copySpec.repeat) {
          const repeatSpecs = District._copySpecFragment(array(copySpec.repeat))
          this._applyRepeats(repeatSpecs, placement, specReader, specName, copySpec)
          // const repeat = repeatSpecs[0]
          // count = repeat.count
          // offset = xyzAdd(offset, repeat.offset)
        } else {
          const offset = { x: 0, y: 0, z: 0 }
          this._makeModelOnce(1, offset, placement, specReader, specName, copySpec)
        }
      }
    }

    if (pavement) {
      for (const spec of pavement) {
        const surface = new Pavement({ spec, placement })
        this.add(surface)
      }
    }
  }

  static _copySpecFragment (specFragment) {
    return JSON.parse(JSON.stringify(specFragment))
  }

  _applyRepeats (repeatSpecs, placement, specReader, specName, copySpec) {
    let count = 1
    let offset = { x: 0, y: 0, z: 0 }
    if (repeatSpecs.length === 0) {
      return null
    } else if (repeatSpecs.length === 1) {
      const repeatSpec = repeatSpecs[0]
      count = repeatSpec.count
      offset = xyzAdd(offset, repeatSpec.offset)
      // console.log(`District make '${specName}' x ${count}`)
      for (let i = 0; i < count; i++) {
        this._makeModelOnce(i, offset, placement, specReader, specName, copySpec)
      }
    } else if (repeatSpecs.length > 1) {
      const lastSpec = repeatSpecs.pop()
      count = lastSpec.count
      offset = xyzAdd(offset, lastSpec.offset)
      // console.log(`District make '${specName}' x ${count} x ${repeatSpecs.length}`)
      for (let i = 0; i < count; i++) {
        const iOffset = {
          x: i * offset.x,
          y: i * offset.y,
          z: i * offset.z
        }
        const at = placement.add(iOffset, placement.az)
        this._applyRepeats(repeatSpecs, at, specReader, specName, copySpec)
      }
    }
  }

  _makeModelOnce (i, offset, placement, specReader, specName, copySpec) {
    const iOffset = {
      x: i * offset.x,
      y: i * offset.y,
      z: i * offset.z
    }
    const iAt = xyzAdd(copySpec.at, iOffset)
    const at = placement.applyRay(iAt)
    const modelObject = specReader.makeModelFromSpecName(specName, at)
    this.add(modelObject)
  }

  _makeModelFromDeprecatedSpec (deprecatedSpec, placement) {
    this._placement = Object.freeze(placement || new Ray())
    const adjustedCorners = placement.applyRay(deprecatedSpec.outline)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const [{ x, y }, z] = [adjustedCorners[0], placement.xyz.z]
    for (const i of countTo(3)) {
      const concreteOutlinePolygon = new FeatureInstance(abstractOutlinePolygon, { x, y, z: z + (i * 3) }, MARTIAN_ORANGE, { layer: DistrictBoundary.layer })
      this.add(concreteOutlinePolygon)
    }

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }
}

class DistrictBoundary {}
DistrictBoundary.layer = Feature.registerLayer(DistrictBoundary, 'district boundary', { category: 'Abstract' })

export { District }
