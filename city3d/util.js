// util.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

function count ({ to, from = 0 } = {}) {
  return [...Array(1 + to - from).keys()].map(i => from + i)
}

function countTo (to) {
  return [...Array(to).keys()]
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

function xy2xyz (xyz, deltaZ = 0) {
  const X = 0
  const Y = 1
  const Z = 2
  // z = xyz[Z] + delta_z if len(xyz) > 2 else delta_z
  const z = xyz.length > 2 ? xyz[Z] + deltaZ : deltaZ
  return [xyz[X], xyz[Y], z]
}

export { xyz, rgba, count, countTo, randomInt, nudge, xy2xyz }