/** @file units.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// distances
const FEET_PER_METER = 3.28084
const FEET_PER_KILOMETER = 3280.84
const FEET_PER_FOOT = 1

// angles
const DEGREES_PER_RADIAN = 180 / Math.PI
const DEGREES_PER_DEGREE = 1

/**
 * Returns a value in a new unit of measure from a given value.
 * @param {number} from - a measurement, such as UNIT.meters(5)
 * @param {function} to - a unit of measure, such as UNIT.km
 * @returns {number} the measurement, after converting to the new units
 */
function convert ({ from, to }) {
  return 1 / to(1 / from)
}

/**
 * Returns a value in feet when given a value in meters.
 * @param {number} length - a measurement in meters
 * @returns {number} the measurement in feet
 */
function meters (length) {
  return length * FEET_PER_METER
}
meters.displayName = 'meters'

/**
 * Returns a value in feet when given a value in kilometers.
 * @param {number} length - a measurement in kilometers
 * @returns {number} the measurement in feet
 */
function km (length) {
  return length * FEET_PER_KILOMETER
}
km.displayName = 'km'

/**
 * Returns a value in feet when given a value in feet.
 * @param {number} length - a measurement in feet
 * @returns {number} the measurement in feet
 */
function feet (length) {
  return length * FEET_PER_FOOT
}
feet.displayName = 'feet'

/**
 * Returns a value in degrees when given a value in radians.
 * @param {number} angle - a measurement in radians
 * @returns {number} the measurement in degrees
 */
function radians (angle) {
  return angle * DEGREES_PER_RADIAN
}
radians.displayName = 'radians'

/**
 * Returns a value in degrees when given a value in degrees.
 * @param {number} angle - a measurement in degrees
 * @returns {number} the measurement in degrees
 */
function degrees (angle) {
  return angle * DEGREES_PER_DEGREE
}
degrees.displayName = 'degrees'

// TODO: code review: reconsider whether we really want this
function count (count) {
  return count
}
count.displayName = 'count'

// TODO: code review: reconsider whether we really want this
function squareFeet (area) {
  return area
}
squareFeet.displayName = 'square feet'

// TODO: code review: reconsider whether we really want this
function numberPerSquareFoot (average) {
  return average
}
numberPerSquareFoot.displayName = 'per square foot'

// TODO: code review: reconsider whether we really want this
function ratio (float) {
  return float
}
ratio.displayName = 'ratio'

const UNIT = {
  convert,
  meters,
  km,
  feet,
  radians,
  degrees,
  count,
  squareFeet,
  numberPerSquareFoot,
  ratio
}
export { UNIT }
