/** @file kalpana.js
  * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
  * @license UNLICENSE
  * This is free and unencumbered software released into the public domain.
  * For more information, please refer to <http://unlicense.org>
  */

import * as THREE from '../three/build/three.module.js'
import Mover from './mover.js'
import { UNIT } from '../city3d/unit.js'

/**
 * Class representing a Kalpana One orbital station.
 * @see [2007 white paper]{@link http://alglobus.net/NASAwork/papers/2007KalpanaOne.pdf}
 */
class Kalpana extends Mover {
  constructor (path, speed = 100) {
    path = path || Kalpana.leoPath()
    super(path, speed, Kalpana.makeStation(path, speed))
    this.threeComponent.update = this.update.bind(this)
  }

  /**
   * Return the flight path of the space station.
   */
  static leoPath () {
    const LOW_EARTH_ORBIT_ALTITUDE = UNIT.km(600)
    const EQUATOR = 0
    const HORIZON = UNIT.km(6000)
    const EAST_XYZ = [+HORIZON, EQUATOR, LOW_EARTH_ORBIT_ALTITUDE]
    const WEST_XYZ = [-HORIZON, EQUATOR, LOW_EARTH_ORBIT_ALTITUDE]
    return [EAST_XYZ, WEST_XYZ]
  }

  /**
   * Return a THREE.Group object model of the station.
   */
  static makeStation (path, speed = 1) {
    const kalpana = new THREE.Group()
    kalpana.name = 'Kalpana One Orbital'

    const rotatingStructure = new THREE.Group()

    const HULL_RADIUS = UNIT.meters(250)
    const HULL_LENGTH = UNIT.meters(325)
    const RESOLUTION = 32

    const hullMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 })
    const cylinder = new THREE.CylinderGeometry(HULL_RADIUS, HULL_RADIUS, HULL_LENGTH, RESOLUTION)
    const hull = new THREE.Mesh(cylinder, hullMaterial)

    const RADIATOR_RADIUS = 1.5 * HULL_RADIUS
    const RADIATOR_THICKNESS = UNIT.meters(10)
    const disk = new THREE.CylinderGeometry(RADIATOR_RADIUS, RADIATOR_RADIUS, RADIATOR_THICKNESS, RESOLUTION)
    const thermalRadiator = new THREE.Mesh(disk, hullMaterial)

    rotatingStructure.add(hull, thermalRadiator)

    kalpana.userData = { spinningWheels: [] }
    kalpana.userData.spinningWheels.push(rotatingStructure)

    kalpana.add(rotatingStructure)

    return kalpana
  }
}

export { Kalpana }