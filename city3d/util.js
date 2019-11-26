// util.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

function count (from, to, by = 1) {
  const total = (to - from) / by
  return [...Array(total).keys()].map(i => from + i * by)
}

function countTo (to) {
  return [...Array(to).keys()]
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomPsuedoGaussian (median, standardDeviation) {
  const N = 6
  let total = 0
  for (let i = 0; i < N; i++) {
    total += Math.random()
  }
  const random0to1 = total / N
  const MAGIC_ARRIVED_AT_BY_TRIAL_AND_ERROR = 9.54
  const random = median + ((random0to1 - 0.5) * (standardDeviation * MAGIC_ARRIVED_AT_BY_TRIAL_AND_ERROR))
  return random
}

function hypotenuse (run, rise) {
  return Math.sqrt(run ** 2 + rise ** 2)
}

function xyzArray (x, y, z = 0) {
  return [x, y, z]
}

function xyz (x, y, z = 0) {
  return { x, y, z }
}

function nudge (xyzArray, { dx = 0, dy = 0, dz = 0, dxyz = [0, 0, 0] } = {}) {
  const [x, y, z] = xyzArray
  const [dX, dY, dZ] = dxyz
  return [x + dx + dX, y + dy + dY, z + dz + dZ]
}

function xy2xyz (xyzArray, deltaZ = 0) {
  const X = 0
  const Y = 1
  const Z = 2
  // z = xyzArray[Z] + delta_z if len(xyzArray) > 2 else delta_z
  const z = xyzArray.length > 2 ? xyzArray[Z] + deltaZ : deltaZ
  return [xyzArray[X], xyzArray[Y], z]
}

function array (object) {
  if (object) {
    if (Array.isArray(object)) {
      return object
    } else {
      return [object]
    }
  } else {
    return []
  }
}

export { xyzArray, xyz, count, countTo, randomInt, randomPsuedoGaussian, nudge, xy2xyz, hypotenuse, array }
