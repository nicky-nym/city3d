/** @file opening.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Model } from './model.js'
import { Outline } from '../core/outline.js'

/**
* Opening is an abstract superclass for Windows and Doors
*/
class Opening extends Model {
  setWallLength (wallLength) {
    this._wallLength = wallLength
  }

  setOutline (outline) {
    if (!(outline instanceof Outline)) {
      outline = new Outline(outline)
    }
    this._outline = outline
  }

  pushAt (at) {
    this._atList = this._atList || []
    this._atList.push(at ? { ...at } : { x: 0, from: 'center' })
  }

  openings () {
    const openings = []
    const w = this._outline.width()
    let x = 0
    for (const at of this._atList) {
      const y = at.y || 0
      if (at.from === 'left') {
        x = at.x - (w / 2)
      } else if (at.from === 'right') {
        x = this._wallLength + at.x - (w / 2)
      } else if (at.from === 'center') {
        x = (this._wallLength / 2) + at.x - (w / 2)
      }
      openings.push(this._outline.corners().map(xy => ({ x: xy.x + x, y: xy.y + y })))
    }
    return openings
  }
}

export { Opening }
