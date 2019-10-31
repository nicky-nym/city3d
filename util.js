// util.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

function * count ({ to, from = 0 } = {}) {
  for (let i = from; i < to; i++) {
    yield i
  }
}

function * countTo (to) {
  count({ to: to })
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function xyz (x, y, z = 0) {
  return [x, y, z]
}

function rgba (r, g, b, a = 0) {
  return [r, g, b, a]
}

function nudge (xyz, { dx = 0, dy = 0, dz = 0, dxyz = [0, 0, 0] } = {}) {
  const [x, y, z] = xyz
  const [dX, dY, dZ] = dxyz
  return [x + dx + dX, y + dy + dY, z + dz + dZ]
}

export { xyz, rgba, count, countTo, randomInt, nudge }
