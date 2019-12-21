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

/**
 * Returns a value in degrees when given a value in radians.
 * @param {number} angle - a measurement in radians
 * @returns {number} the measurement in degrees
 */
function radians (angle) {
  return angle * DEGREES_PER_RADIAN
}

/**
 * Returns a value in degrees when given a value in degrees.
 * @param {number} angle - a measurement in degrees
 * @returns {number} the measurement in degrees
 */
function degrees (angle) {
  return angle * DEGREES_PER_DEGREE
}

/**
 * Returns a value in radians when given a value in degrees.
 * @param {number} angle - a measurement in degrees
 * @returns {number} the measurement in radians
 */
function toRadians (angle) {
  return angle / DEGREES_PER_RADIAN
}

// TODO: code review: reconsider whether we really want this
function count (count) {
  return count
}

// TODO: code review: reconsider whether we really want this
function squareFeet (area) {
  return area
}

// TODO: code review: reconsider whether we really want this
function numberPerSquareFoot (average) {
  return average
}

// TODO: code review: reconsider whether we really want this
function ratio (float) {
  return float
}

const UNIT = {
  meters,
  km,
  feet,
  radians,
  degrees,
  toRadians,
  count,
  squareFeet,
  numberPerSquareFoot,
  ratio
}
export { UNIT }
