/** @file group.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

class Group {
  constructor (name) {
    this.name = name
    this.children = []
  }

  add (thing) {
    this.children.push(thing)
  }
}

export { Group }
