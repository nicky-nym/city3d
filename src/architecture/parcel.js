/** @file parcel.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Feature, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { Model } from './model.js'
import { METRIC } from './metric.js'
import { Outline } from '../core/outline.js'
import { Pavement } from './pavement.js'

const MARTIAN_ORANGE = 0xdf4911

/**
* Parcel is a class for representing a parcel of land in a city.
*/
class Parcel extends Model {
  /**
   * Create a new instance of a specified Parcel, and generate the Geometry objects for it.
   * @param {string} [name] - a display name for this individual instance at a given placement
   * @param {Ray} [placement] - the location and orientation of this parcel
   * @param {object} [deprecatedSpec] - an old 2019 spec format that we're phasing out
   * @param {object} [spec] - a specification object that is valid against parcel.schema.json.js
   * @param {SpecReader} [specReader] - an instance of a SpecReader, for adding content models in the parcel
   */
  constructor ({
    name = 'Parcel',
    placement,
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

  /**
   * Generate Geometry objects corresponding to a specification.
   * @param {object} spec - an specification object that is valid against parcel.schema.json.js
   * @param {Ray} [placement] - the location and orientation of this part
   */
  makeModelFromSpec (spec, placement, specReader) {
    const { name, unit, /* anchorPoint, */ border, contents, pavement } = spec

    this.name = name || this.name

    if (unit && unit !== 'feet') {
      // TODO: write this code!
      throw new Error('TODO: need to convert values into feet')
    }
    const outline = new Outline(border)
    const corners = outline.corners()
    const deprecatedSpec = { outline: corners }
    this._makeModelFromDeprecatedSpec(deprecatedSpec, placement)

    if (contents) {
      for (const copySpec of contents) {
        const at = placement.applyRay(copySpec.at)
        const specName = copySpec.copy.$ref
        const modelObject = specReader.makeModelFromSpecName(specName, at)
        this.add(modelObject)
      }
    }

    if (pavement) {
      for (const spec of pavement) {
        const surface = new Pavement({ spec, placement })
        this.add(surface)
      }
    }
  }

  // TODO: delete this code when it is no longer used by any content model classes
  _makeModelFromDeprecatedSpec (parcelSpec, placement) {
    const adjustedCorners = placement.applyRay(parcelSpec.outline)
    adjustedCorners.push(adjustedCorners[0])
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const abstractOutlinePolygon = new Geometry.OutlinePolygon(xyPolygon)
    const p0 = { ...adjustedCorners[0], z: placement.xyz.z }
    const concreteOutlinePolygon = new FeatureInstance(abstractOutlinePolygon, p0, MARTIAN_ORANGE, { layer: ParcelBoundary.layer })
    this.add(concreteOutlinePolygon)

    this.setValueForMetric(METRIC.LAND_AREA, xyPolygon.area())
  }
}

class ParcelBoundary {}
ParcelBoundary.layer = Feature.registerLayer(ParcelBoundary, 'parcel boundary', { category: 'Abstract' })

export { Parcel }
