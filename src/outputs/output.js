/** @file output.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { Model } from '../architecture/model'

/**
 * Output is an abstract superclass for displaying some view a set of Models in some way.
 */
class Output {
  /**
   * Creates an output instance to view the given Models.
   * @param {City.Model[]} models - an list of CITY.Model instances
   */
  constructor (models) {
    this._models = models
  }

  /**
   * Given a newly created Output instance, give it a <div> element to display content in.
   * @param {Output} outputInstance - a new instance of an Output subclass
   */
  static addOutput (outputInstance) {
    const outputDiv = document.createElement('div')
    const city3dDiv = document.getElementById('city3d')
    if (city3dDiv) {
      city3dDiv.appendChild(outputDiv)
    } else {
      document.body.appendChild(outputDiv)
    }

    // hack to make scrollbars go away
    // document.body.style.overflow = 'hidden'

    outputInstance.setDisplayDiv(outputDiv)
    outputInstance.envision()
  }

  print (str) {
    console.log(str)
  }

  error (str) {
    console.error(str)
  }

  /**
   * Provide the Output instance with an HTML <div> element to display content in.
   * @param {HTMLElement} htmlDivElement - a new, empty <div> element in the document.body
   * @abstract
   */
  setDisplayDiv (htmlDivElement) {
    throw new Error('setDisplayDiv was not implemented by Output subclass')
  }

  envision () {
    const t0 = Date.now()
    if (this.animate) {
      this.animate()
    } else if (this.render) {
      this.render()
    } else {
      this.error('Output.envision() failed: requires animate() or render().')
      return
    }
    this.print(`initial rendering time for ${this.constructor.name} was ${Date.now() - t0} milliseconds`)
  }
}

export { Output }
