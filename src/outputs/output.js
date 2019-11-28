// output.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

export default class Output {
  // Output is an abstract superclass for visualizing cities.

  constructor (city) {
    this._city = city
  }

  print (str) {
    console.log(str)
  }

  error (str) {
    console.error(str)
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
    this.print(`rendering time time was ${Date.now() - t0} milliseconds`)
  }
}
