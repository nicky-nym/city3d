/** @file facing.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

const Facing = Object.freeze({
  // Compass bearings: North, South, East, and West.
  NORTH: 0, // degrees
  EAST: 270, // degrees
  SOUTH: 180, // degrees
  WEST: 90, // degrees

  NORTHEAST: 315,
  SOUTHEAST: 225,
  SOUTHWEST: 135,
  NORTHWEST: 45
})

// const LEFT = 90    // degrees
// const RIGHT = 270  // degrees

function opposite (facing) { // eslint-disable-line no-unused-vars
  return 360 - facing
}

export { Facing }
