/** @file test_utils.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

/**
* round() serves two purposes: ignoring rounding error and working around the fact that
* chai thinks 0 !eql -0 even though 0 === -0.  See https://github.com/chaijs/deep-eql
*
* @param {Number} f - a floating point value
*/
function round (f) {
  const z = Math.round(f * 1e6) / 1e6

  // This looks like it does nothing, but it converts -0 to 0
  return z === 0 ? 0 : z
}

/**
* roundXYZ() rounds and returns the x, y and z properties of an object
*
* @param {Object} xyz - an object including x, y and z properties with numeric values
* @returns {Object} an object containing only x, y and z properties
*/
function roundXYZ (xyz) {
  return { x: round(xyz.x), y: round(xyz.y), z: round(xyz.z) }
}

export { round, roundXYZ }
