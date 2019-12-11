/** @file text_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
*/

import { Output } from './output.js'

/**
 * TextOutput can display text strings in an HTML <div> element.
 */
class TextOutput extends Output {
  setDisplayDiv (outputDivElement) {
    this._outputDiv = outputDivElement
    this._outputDiv.style.fontFamily = 'monospace'
    this._outputDiv.style.color = 'green'
    this._outputDiv.style.backgroundColor = 'black'
    this._outputDiv.style.padding = '10px'
  }

  print (str) {
    this._outputDiv.innerHTML += `<p>${str}</p>`
  }
}

export { TextOutput }
