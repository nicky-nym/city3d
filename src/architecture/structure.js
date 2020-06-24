/** @file structure.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { FeatureGroup, FeatureInstance } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'
import { Layer } from '../core/layer.js'
import { LAYER } from './layer.js'
import { Model } from './model.js'
import { Pose } from '../core/pose.js'

const WHITE = 0xffffff
const RED = 0xcc0000 // eslint-disable-line no-unused-vars
const BLACKTOP = 0x1a1a1a // very dark grey
const GREEN = 0x00ff00 // eslint-disable-line no-unused-vars
const BLUE = 0x0000ff
const YELLOW = 0xffff00

const GREEN_GRASS = 0x003300
const BROWN = 0x806633
const DARK_GRAY = 0x404040
const LIGHT_GRAY = 0xdddddd
const BLUE_GLASS = 0x9a9aff // eslint-disable-line no-unused-vars
const MARTIAN_ORANGE = 0xdf4911

const COLORS_BY_USE = {
  STREET: BLACKTOP,
  BIKEPATH: MARTIAN_ORANGE,
  WALKWAY: YELLOW,
  ROOM: BROWN,
  BARE: LIGHT_GRAY,
  PARCEL: GREEN_GRASS,
  CANAL: BLUE,
  WALL: WHITE,
  ROOF: DARK_GRAY,
  DOOR: YELLOW
}

/**
 * Structure is an abstract superclass for buildings, city blocks, and other types of structures.
 */
class Structure extends Model {
  constructor (options = {}) {
    let { pose, spec, ...remainingOptions } = options
    let layer = null
    if (spec && spec.layer) {
      layer = Layer.getLayer(spec.layer)
    }
    super({ spec, ...remainingOptions, layer })

    if (!pose) {
      pose = Pose.DEFAULT
    }

    this.offset = Pose.collapse(pose)

    this._pose = Pose.set(Pose.DEFAULT, { rotated: this.offset.rotated })
    if (spec) {
      this.makeModelFromSpec(spec, this._pose)
    }
  }

  pose () {
    return this._pose
  }

  makePlaceholder (pose, use, corners, depth, { z = 0, name } = {}) {
    z = z + pose.z
    const group = new FeatureGroup(name)
    const adjustedCorners = Pose.relocate(pose, corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const color = COLORS_BY_USE[use]
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth })
    const p0 = { ...adjustedCorners[0], z }
    const concreteThickPolygon = new FeatureInstance(abstractThickPolygon, p0, color)
    group.add(concreteThickPolygon)
    return group
  }

  makeModelFromSpec (spec, pose) {
    const { lines /* anchorPoint, */ } = spec
    if (spec.layer && typeof spec.layer === 'string') {
      spec.layer = Layer.getLayer(spec.layer)
    }
    const options = spec.layer ? { layer: spec.layer } : { layer: LAYER.STRUCTURES }
    for (const lineSpec of lines) {
      const vertices = lineSpec.vertices
      const adjustedWaypoints = Pose.relocate(pose, vertices)
      const line = new Geometry.Line(adjustedWaypoints, lineSpec.radius)
      const result = new FeatureInstance(line, adjustedWaypoints[0], 0x663300, options)
      this.add(result)
    }
  }
}

export { Structure }
