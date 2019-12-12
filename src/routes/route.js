/** @file route.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

/**
* Route is a class for representing the path of a Mover
*/
class Route {
  /**
   * @param {xyz[]} listOfWaypoints - array of xyz coordinates specifying a route
   * @param {Use} use - e.g. Use.BIKEPATH
   */
  constructor (listOfWaypoints, use) {
    this.listOfWaypoints = listOfWaypoints
    this.use = use
  }
}

export { Route }
