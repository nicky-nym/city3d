/** @file plato.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyz } from '../core/util.js'
import { Facing } from '../core/facing.js'
import { Geometry } from '../core/geometry.js'
import { Group } from '../architecture/group.js'
import { Ray } from '../core/ray.js'
import { Sector } from './sector.js'
import { Use } from './use.js'

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
 * Plato can envision 3D architectural spaces, with walls, floors, etc.
 */
class Plato {
  /**
   * Sets plato's initial state.
   */
  constructor (city) {
    this._ray = new Ray(Facing.NORTH, xyz(0, 0, 0))
    this.study()
    this._city = city
    this._routes = []
  }

  makeRoute (use, listOfWaypoints) {
    const route = this._ray.applyRay(listOfWaypoints)
    this._routes.push(route)
    return route
  }

  study (topic = '', { x0 = 0, y0 = 0 } = {}) {
    if (topic) {
      this._sector = new Sector(topic)
      this._city.add(this._sector)
    }
    this._topic = topic
    this._x0 = x0
    this._y0 = y0
    this._t0 = Date.now()
  }

  goto ({ x = 0, y = 0, z = 0, facing = Facing.NORTH } = {}) {
    this._ray.goto(facing, xyz(this._x0 + x, this._y0 + y, z))
    return this._ray
  }

  appendToSector (group) {
    this._sector.add(group)
    return group
  }

  makePlaceholder (use, corners, depth, { z = 0, name } = {}) {
    z = z + this._ray.xyz.z
    const group = new Group(name)
    const adjustedCorners = this._ray.applyRay(corners)
    const xyPolygon = new Geometry.XYPolygon(adjustedCorners)
    const color = COLORS_BY_USE[use]
    const abstractThickPolygon = new Geometry.ThickPolygon(xyPolygon, { depth })
    const concreteThickPolygon = new Geometry.Instance(abstractThickPolygon, z, color)
    group.add(concreteThickPolygon)
    return group
  }

  static aggregateMetric (group, metricName) {
    let sum = 0
    group.accept(node => { const m = node.metrics && node.metrics.get(metricName); if (m) sum += m.value })
    return sum
  }

  pontificate () {
    // Print a report of square footage of rooms, walkways, etc.
    const floorArea = {}
    for (const use of Object.keys(Use)) {
      const sum = Plato.aggregateMetric(this._sector, `Floor area: ${use}`)
      if (sum > 0) {
        floorArea[use] = sum
      }
    }
    this._sector.addMetric('Floor area', floorArea, 'square feet')
    if (floorArea[Use.PARCEL]) {
      const parcelFar = floorArea[Use.ROOM] / floorArea[Use.PARCEL]
      const urbanFar = floorArea[Use.ROOM] / (floorArea[Use.PARCEL] + (floorArea[Use.STREET] || 0))
      this._sector.addMetric('Parcel FAR', parcelFar.toFixed(1), 'floor area ratio')
      this._sector.addMetric('Overall FAR', urbanFar.toFixed(1), 'floor area ratio')
    }
    for (const metric of ['Wall area', 'Wall opening area']) {
      const sum = Plato.aggregateMetric(this._sector, metric)
      this._sector.addMetric(metric, sum, 'square feet')
    }
    return this
  }
}

export { Plato }
