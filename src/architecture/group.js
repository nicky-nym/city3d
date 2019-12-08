/** @file group.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

class Group {
  constructor (name) {
    this.name = name
    this.children = []
    this.metrics = new Map()
  }

  add (...things) {
    this.children.push(...things)
    things.forEach(thing => { thing.parent = this })
    return this
  }

  accept (visitor) {
    for (const child of this.children) {
      if (child.accept) {
        child.accept(visitor)
      } else {
        visitor(child)
      }
    }
    visitor(this)
  }

  addMetric (name, value, units) {
    this.metrics.set(name, { value, units })
  }
}

/**
 * A LODGroup extends a Group with lower resolution alternatives to be used at specified
 * distance thresholds.
 */
class LODGroup extends Group {
  /**
   * Creates a LODGroup.
   * @param {string} [name]
   */
  constructor (name) {
    super(name)
    this._levels = []
  }

  /**
   * Adds an instance to be used in place of this.children when the current distance is greater
   * than a threshold. If multiple low resolution instances with thresholds smaller than the
   * current distance exist, the one with the highest threshold should be used.
   * @param {Group|Geometry.Instance} instance - a simpler representation of this.children
   * @param {number} distanceThreshold - when to switch to this instance
   */
  addLevelOfDetail (instance, distanceThreshold) {
    this._levels.push({ instance, distanceThreshold })
  }

  /**
   * Returns an array of objects specifying low resolution alternate instances along with their thresholds.
   * @returns {Object[]} array of objects with properties 'instance' and 'distanceThreshold'
   */
  getLevelsOfDetail () {
    return this._levels.map(level => ({ ...level }))
  }
}

export { Group, LODGroup }
