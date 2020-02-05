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
   * @param {number} [inset] - an optional inner border distance to subtract around the whole outline
   */
  constructor (outlineSpec, inset) {
    this._corners = Outline.cornersFromSpec(outlineSpec, inset)
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
   * @param {number} [inset] - an optional inner border distance to subtract around the whole outline
   * @returns {array} an array of {x, y} corners
   */
  static cornersFromSpec (spec, inset = 0) {
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
      corners = spec.corners
    } else {
      throw new Error('bad Outline shape name: ' + spec.shape)
    }
    if (inset) {
      const newCorners = []
      let p0 = corners[corners.length - 1]
      let p1 = null
      let p2 = null // eslint-disable-line no-unused-vars
      for (let i = 0; i < corners.length; i++) {
        p1 = corners[i]
        p2 = i === (corners.length - 1) ? corners[0] : corners[i + 1]

        const p0p1 = {
          dx: p1.x - p0.x,
          dy: p1.y - p0.y
        }
        const p1p2 = {
          dx: p2.x - p1.x,
          dy: p2.y - p1.y
        }
        p1p2.dx = p1p2.dx && (p1p2.dx / Math.abs(p1p2.dx))
        p1p2.dy = p1p2.dy && (p1p2.dy / Math.abs(p1p2.dy))
        p0p1.dx = p0p1.dx && (p0p1.dx / Math.abs(p0p1.dx))
        p0p1.dy = p0p1.dy && (p0p1.dy / Math.abs(p0p1.dy))

        const newCorner = {
          x: p1.x + (p1p2.dx - p0p1.dx) * inset,
          y: p1.y + (+p1p2.dy - p0p1.dy) * inset
        }
        newCorners.push(newCorner)
        p0 = p1
      }

      corners = newCorners
    }
    return corners
  }
}

export { Outline }
