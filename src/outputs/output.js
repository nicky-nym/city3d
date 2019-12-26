/** @file output.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

/**
 * Output is an abstract superclass for displaying some view of a City in some way.
 */
class Output {
  /**
   * Creates an output instance to view a given City.
   * @param {CITY.City} city - an instance of CITY.City
   */
  constructor (city) {
    this._city = city
  }

  /**
   * Given a newly created Output instance, give it a <div> element to display content in.
   * @param {Output} outputInstance - a new instance of an Output subclass
   */
  static addOutput (outputInstance) {
    const outputDiv = document.createElement('div')
    document.body.appendChild(outputDiv)

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
    this.print(`rendering time was ${Date.now() - t0} milliseconds`)
  }
}

export { Output }
