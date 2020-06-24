/** @file pitch.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

/**
 * Pitch is a class for representing slopes, ramp inclines, angles, and roof pitches.
 */
class Pitch {
  /**
   * Creates a new instance with a given slope.
   * @param {number} value - a slope value, in degrees, radians, percent grade, or rise-to-run pitch
   * @param {string} type - one of 'degrees', 'radians', 'percent', or ':'
   * @param {number=} run - this is only used when type is ':', for the 'run' of a 'rise:run' pair of values
   */
  constructor (value, type, run) {
    if (type === 'degrees') {
      this.rise = Math.tan(value * Math.PI / 180)
      this.run = 1
    } else if (type === 'radians') {
      this.rise = Math.tan(value)
      this.run = 1
    } else if (type === 'percent') {
      this.rise = value
      this.run = 100
    } else if (type === ':') {
      this.rise = value
      this.run = run
    } else {
      throw new Error('unknown "type" for new Pitch()')
    }
  }

  /**
   * Returns an angle in degrees, between 0 and 90.
   * @returns {number} an angle in degrees, between 0 and 90
   */
  degrees () {
    return Math.atan(this.rise / this.run) * 180 / Math.PI
  }

  /**
   * Returns an angle in radians, between 0 and PI/2.
   * @returns {number} an angle in radians, between 0 and PI/2
   */
  radians () {
    return Math.atan(this.rise / this.run)
  }

  /**
   * Returns a percent slope, divided by 100 (example: 0.50 for a 50% slope).
   * @returns {number} a slope, between 0 and infinity
   */
  slope () {
    return this.rise / this.run
  }

  /**
   * Returns a percent grade, divided by 100, which is a synonym for slope().
   * @returns {number} a grade, between 0 and infinity
   */
  grade () {
    return this.slope()
  }

  /**
   * Returns an object with rise and run values, such as { rise: 8, run: 12 }
   * @returns {object} an object with rise and run values
   */
  pitch () {
    return Object.freeze({ rise: this.rise, run: this.run })
  }
}

export { Pitch }
