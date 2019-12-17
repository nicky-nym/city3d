/** @file route.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { xyzSubtract, length, countTo } from '../core/util.js'

/**
* Route is a class for representing the path of a Mover
*/
class Route {
  /**
   * @param {xyz[]} listOfWaypoints - array of xyz coordinates specifying a route
   * @param {Use} use - e.g. Use.BIKEPATH
   */
  constructor (listOfWaypoints, use) {
    this._listOfWaypoints = listOfWaypoints || []
    this.use = use
    this._segments = []

    if (this._listOfWaypoints.length > 1) {
      for (const i of countTo(listOfWaypoints.length - 1)) {
        const vector = xyzSubtract(listOfWaypoints[i + 1], listOfWaypoints[i])
        const len = length(vector)
        const vNorm = { x: vector.x / len, y: vector.y / len, z: vector.z / len }
        this._segments.push({ vNorm, len })
      }
    }
  }

  /**
   * Returns the list of waypoints for this Route
   * @returns {xyz[]} array of xyz coordinates specifying the route
   */
  waypoints () {
    return this._listOfWaypoints
  }

  /**
   * Returns a list of segments representing pairs of consecutive waypoints
   * @returns {Object[]} segments - correspond to vectors from one waypoint to the next
   * @returns {number} segments[].len - length of vector
   * @returns {xyz} segments[].vNorm - normalized vector
   */
  segments () {
    return this._segments
  }

  speedLimit () {
    // TODO: should be optional constructor arg, and default should at least depend on use
    return 1
  }
}

export { Route }
