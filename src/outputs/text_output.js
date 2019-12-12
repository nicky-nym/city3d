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
    this._pre = document.createElement('pre')
    outputDivElement.appendChild(this._pre)
    outputDivElement.style.fontFamily = 'monospace'
    outputDivElement.style.color = 'green'
    outputDivElement.style.backgroundColor = 'black'
    outputDivElement.style.padding = '10px'
  }

  print (str) {
    this._pre.innerHTML += `${str}\n`
  }
}

export { TextOutput }
