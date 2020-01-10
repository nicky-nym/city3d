/** @file structure.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import { Facing } from '../core/facing.js'
import { Geometry } from '../core/geometry.js'
import { Group } from './group.js'
import { Model } from './model.js'
import { Ray } from '../core/ray.js'
import { xyz, xyzAdd } from '../core/util.js'

const WHITE = 0xffffff
const RED = 0xcc0000 // eslint-disable-line no-unused-vars
const BLACKTOP = 0x1a1a1a // very dark grey
const GREEN = 0x00ff00 // eslint-disable-line no-unused-vars
const BLUE = 0x0000ff
const YELLOW = 0xffff00

const GREEN_GRASS = 0x00cc00
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
  constructor ({ ray, x0 = 0, y0 = 0, name, at = xyz(0, 0, 0) } = {}) {
    super(name)
    this._ray = ray || new Ray()
    this.offset = xyzAdd({ x: x0, y: y0 }, at)
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._ray.goto(facing, xyz(x, y, z))
    return this._ray
  }

  makePlaceholder (use, corners, depth, { z = 0, name } = {}) {
    z = z + this._ray.xyz.z
    const group = new Group(name)
    const adjustedCorners = this._ray.applyRay(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const color = COLORS_BY_USE[use]
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth })
    const p0 = { ...adjustedCorners[0], z }
    const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, p0, color)
    group.add(concreteThickPolygon)
    return group
  }
}

export { Structure }
