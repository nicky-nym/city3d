/** @file outline.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Pitch } from './pitch.js'
import { rectangleOfSize } from './util.js'

const SHAPE = {
  // NOTE: these values must exactly match the values in outline.schema.json.js
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon'
}

const STYLE = {
  // NOTE: these values must exactly match the values in outline.schema.json.js
  ARCHED: 'arched',
  GABLED: 'gabled'
}

/**
 * Outline is a class for representing any simple 2D outline shape
 * (like a triangle or a trapezoid) that forms a closed, counterclockwise loop.
 */
class Outline {
  /**
   * Creates a new instance with a given shape.
   * @param {object} outlineSpec - an outline spec value, as defined in outline.schema.json.js
   * @param {number} [offset] - an optional extra border distance to add (or subtract) around the whole outline
   */
  constructor (outlineSpec, offset) {
    this._corners = Outline.cornersFromSpec(outlineSpec, offset)
  }

  corners () {
    return this._corners
  }

  /**
   * Given an object that specifies an outline, returns an array of {x, y} corners
   * @example:
   * outline.cornersFromSpec({ shape: 'rectangle', size: xy(10, 20) })
   * @example:
   * outline.cornersFromSpec({ shape: 'polygon', corners: [xy(0, 0), xy(5, 10), xy(-5, 10) })
   * @param {object} spec - shape specification object as defined in outline.schema.json.js
   * @param {number} [offset] - an optional extra border distance to add (or subtract) around the whole outline
   * @returns {array} an array of {x, y} corners
   */
  static cornersFromSpec (spec, offset) {
    if (offset) {
      throw new Error('TODO: offset Outline code has not yet been written')
    }
    let corners
    if (spec.shape === SHAPE.RECTANGLE) {
      if (spec.top) {
        const style = spec.top.style
        if (style === STYLE.ARCHED) {
          const curvature = spec.top.curvature || 1 // eslint-disable-line no-unused-vars
          throw new Error('TODO: Arched rectangle Outline code has not yet been written')
        } else if (style === STYLE.GABLED) {
          let pitch = spec.top.pitch || { rise: 12, run: 12 } // eslint-disable-line no-unused-vars
          pitch = new Pitch(pitch.rise, ':', pitch.run)
          throw new Error('TODO: Gabled rectangle Outline code has not yet been written')
        }
      } else {
        corners = rectangleOfSize(spec.size)
      }
    } else if (spec.shape === SHAPE.POLYGON) {
      corners = spec.shape.corners
    } else {
      throw new Error('bad Outline shape name: ' + spec.shape)
    }
    return corners
  }
}

export { Outline }
