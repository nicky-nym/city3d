// util.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'

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

function xyz (x, y, z = 0) {
  return [x, y, z]
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

const UP = new THREE.Vector3(0, 0, -1)

function lookAt (obj, focus, up = UP) {
  const f = focus.clone().sub(obj.position).normalize()
  const s = new THREE.Vector3().crossVectors(f, up).normalize()
  const v = new THREE.Vector3().crossVectors(s, f)
  const m = new THREE.Matrix4().makeBasis(v, s, f)
  obj.setRotationFromMatrix(m)
}

export { xyz, count, countTo, randomInt, nudge, xy2xyz, lookAt }
