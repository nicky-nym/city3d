// util.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

function * upto (n) {
  for (let i = 0; i < n; i++) {
    yield i
  }
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function nudge (xyz, { dx = 0, dy = 0, dz = 0, dxyz = [0, 0, 0] }) {
  let x = 0
  let y = 0
  let z = 0
  let dX = 0
  let dY = 0
  let dZ = 0
  ;[x, y, z] = xyz
  ;[dX, dY, dZ] = dxyz
  return [x + dx + dX, y + dy + dY, z + dz + dZ]
}

export { upto, randomInt, nudge }
