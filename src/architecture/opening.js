/** @file opening.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Model } from './model.js'
import { xywh2rect } from '../core/util.js'

/**
* Opening is an abstract superclass for Windows and Doors
*/
class Opening extends Model {
  setWallLength (wallLength) {
    this._wallLength = wallLength
  }

  setOutline (outline) {
    this._outline = outline
  }

  setAt (at) {
    this._at = at ? { ...at } : { x: 0, from: 'center' }
  }

  opening () {
    // TODO: this assumes the outline is just a rectangled
    // TODO: make an instance of Outline instead
    const w = this._outline.size.x
    const h = this._outline.size.y
    let x = 0
    const y = this._at.y || 0
    if (this._at.from === 'left') {
      x = this._at.x - (w / 2)
    } else if (this._at.from === 'right') {
      x = this._wallLength + this._at.x - (w / 2)
    } else if (this._at.from === 'center') {
      x = (this._wallLength / 2) + this._at.x - (w / 2)
    }
    return xywh2rect(x, y, w, h)
  }
}

export { Opening }
