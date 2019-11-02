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

function countTo (to) {
  return count({ to: to })
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

function yzwh2rect (y, z, width, height) {
  // [(3, 2), (8, 2), (8, 6), (3, 6)] == yzwh2rect(3, 2, 5, 4)
  return [xyz(y, z), xyz(y + width, z), xyz(y + width, z + height), xyz(y, z + height)]
}

export { xyz, rgba, count, countTo, randomInt, nudge, xy2xyz, yzwh2rect }
