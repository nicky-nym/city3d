/** @file units.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

const UNIT = {}

/**
 * Returns a value in a new unit of measure from a given value.
 * @param {number} from - a measurement, such as UNIT.meters(5)
 * @param {function} to - a unit of measure, such as UNIT.km
 * @returns {number} the measurement, after converting to the new units
 */
UNIT.convert = ({ from, to }) => 1 / to(1 / from)

/**
 * Defines a new unit of measure, such as "meters per second squared".
 * @param {string} displayName - a descriptive name to show an end-user
 * @param {function} func - a function that convert a value of this unit to the corresponding value in the canonical units for this physical property
 * @returns {function} the same func that was given as an arg
 */
UNIT.define = function (displayName, func) {
  func.displayName = displayName
  return func
}

// For distances, we use FEET as the canonical unit
const _FEET = {
  PER_METER: 3.28084,
  PER_KILOMETER: 3280.84,
  PER_FOOT: 1
}

// For angles, we use DEGREES as the canonical unit
const _DEGREES = {
  PER_RADIAN: 180 / Math.PI,
  PER_DEGREE: 1
}

/**
 * Returns a value in feet when given a value in meters.
 * @param {number} length - a measurement in meters
 * @returns {number} the measurement in feet
 */
UNIT.meters = UNIT.define('meters', length => length * _FEET.PER_METER)

/**
 * Returns a value in feet when given a value in kilometers.
 * @param {number} length - a measurement in kilometers
 * @returns {number} the measurement in feet
 */
UNIT.km = UNIT.define('km', length => length * _FEET.PER_KILOMETER)

/**
 * Returns a value in feet when given a value in feet.
 * @param {number} length - a measurement in feet
 * @returns {number} the measurement in feet
 */
UNIT.feet = UNIT.define('feet', length => length * _FEET.PER_FOOT)

/**
 * Returns a value in degrees when given a value in radians.
 * @param {number} angle - a measurement in radians
 * @returns {number} the measurement in degrees
 */
UNIT.radians = UNIT.define('radians', angle => angle * _DEGREES.PER_RADIAN)

/**
 * Returns a value in degrees when given a value in degrees.
 * @param {number} angle - a measurement in degrees
 * @returns {number} the measurement in degrees
 */
UNIT.degrees = UNIT.define('degrees', angle => angle * _DEGREES.PER_DEGREE)

/**
 * Returns an integer count.
 * @param {number} count - an integer count
 * @returns {number} an integer count
 */
UNIT.count = UNIT.define('count', count => count)

/**
 * Returns a value in square feet when given a value in square feet.
 * @param {number} area - a measurement in square feet
 * @returns {number} the measurement in square feet
 */
UNIT.squareFeet = UNIT.define('square feet', area => area)

/**
 * Returns a value in quantity per square foot when given a value in quantity per square foot.
 * @param {number} average - a measurement in quantity per square foot
 * @returns {number} the measurement in quantity per square foot
 */
UNIT.numberPerSquareFoot = UNIT.define('per square foot', average => average)

/**
 * Returns a ratio value when given a ratio value.
 * @param {float} float - a ratio value
 * @returns {float} the ratio value
 */
UNIT.ratio = UNIT.define('ratio', float => float)

export { UNIT }
