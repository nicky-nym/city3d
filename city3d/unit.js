/** @file units.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

const FEET_PER_METER = 3.28084
const FEET_PER_KILOMETER = 3280.84
const FEET_PER_FOOT = 1

/**
 * Returns a value in feet when given a value in meters.
 * @param {number} length - a measurement in meters
 * @returns {number} the measurement in feet
 */
function meters (length) {
  return length * FEET_PER_METER
}

/**
 * Returns a value in feet when given a value in kilometers.
 * @param {number} length - a measurement in kilometers
 * @returns {number} the measurement in feet
 */
function km (length) {
  return length * FEET_PER_KILOMETER
}

/**
 * Returns a value in feet when given a value in feet.
 * @param {number} length - a measurement in feet
 * @returns {number} the measurement in feet
 */
function feet (length) {
  return length * FEET_PER_FOOT
}

export const UNIT = {
  meters,
  km,
  feet
}
