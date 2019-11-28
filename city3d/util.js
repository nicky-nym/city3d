/** @file util.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

/**
 * Returns an array of integers.
 * @param {number} from - the first number in the array
 * @param {number} to - the last number in the array
 * @param {number} by - increment to step by; default is 1
 * @returns {number[]} an array of integers
 */
function count (from, to, by = 1) {
  const total = (to - from) / by
  return [...Array(total).keys()].map(i => from + i * by)
}

/**
 * Returns an array of integers, from 0 up to the given value 
 * @param {number} to - the last number in the array
 * @returns {number[]} an array of integers
 */
function countTo (to) {
  return [...Array(to).keys()]
}

/**
 * Returns a random integer between min and max, inclusive 
 * @returns {number} a random integer
 */
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns a random number within a roughly gaussian distribution
 * @returns {number} a random number
 */
function randomPsuedoGaussian (median, standardDeviation) {
  const N = 6
  let total = 0
  for (let i = 0; i < N; i++) {
    total += Math.random()
  }
  const random0to1 = total / N
  const MAGIC_ARRIVED_AT_BY_TRIAL_AND_ERROR = 9.54
  const random = median + ((random0to1 - 0.5) * (standardDeviation * MAGIC_ARRIVED_AT_BY_TRIAL_AND_ERROR))
  return random
}

/**
 * Returns the length of the hypotenuse of a right triangle
 * @returns {number} the length of the hypotenuse
 */
function hypotenuse (run, rise) {
  return Math.sqrt(run ** 2 + rise ** 2)
}

/**
 * @deprecated use util.js xyz() instead
 */
function xyzArray (x, y, z = 0) {
  return [x, y, z]
}

function xy (x, y) {
  return { x, y }
}

function xyz (x, y, z = 0) {
  return { x, y, z }
}

/**
 * @deprecated use ??? instead
 */
function nudge (xyzArray, { dx = 0, dy = 0, dz = 0, dxyz = [0, 0, 0] } = {}) {
  const [x, y, z] = xyzArray
  const [dX, dY, dZ] = dxyz
  return [x + dx + dX, y + dy + dY, z + dz + dZ]
}

/**
 * @deprecated use ??? instead
 */
function xy2xyz (xyzArray, deltaZ = 0) {
  const X = 0
  const Y = 1
  const Z = 2
  // z = xyzArray[Z] + delta_z if len(xyzArray) > 2 else delta_z
  const z = xyzArray.length > 2 ? xyzArray[Z] + deltaZ : deltaZ
  return [xyzArray[X], xyzArray[Y], z]
}

/**
 * Given either a value or an array, returns an array
 * @param {*} object - an array, or a single value
 * @returns {array} an array, possibly of length 0
 */
function array (object) {
  if (object) {
    if (Array.isArray(object)) {
      return object
    } else {
      return [object]
    }
  } else {
    return []
  }
}

export { xy, xyz, xyzArray, count, countTo, randomInt, randomPsuedoGaussian, nudge, xy2xyz, hypotenuse, array }
