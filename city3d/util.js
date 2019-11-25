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

const UP = new THREE.Vector3(0, 0, 1)

/*
 * To visualize this, pretend that obj is a unicycle. Initially, it's facing in the +X direction,
 * the line through the pedals is parallel to the Y-axis and the seatpost is parallel to the Z-axis.
 * We want the unicycle to be facing the focus, so we want the X-axis to move to vector f.
 * We want the line through the pedals to be perpendicular to f and also, by definition of up, to up.
 * Thus, the Y-axis should move to vector s. Finally, we want the seatpost perpendicular to both
 * the direction of travel, f, and s, which is parallel to the line through the pedals.
 * Thus, the Z-axis should move to vector v.
 * The matrix m maps the X-axis to f, the Y-axis to s and the Z-axis to v, so it performs the
 * desired rotation.
 */
function lookAt (obj, focus, up = UP) {
  const f = focus.clone().sub(obj.position).normalize()
  const s = new THREE.Vector3().crossVectors(up, f).normalize()
  const v = new THREE.Vector3().crossVectors(f, s)
  const m = new THREE.Matrix4().makeBasis(f, s, v)
  obj.setRotationFromMatrix(m)
}

export { xyz, count, countTo, randomInt, randomPsuedoGaussian, nudge, xy2xyz, lookAt, hypotenuse }
