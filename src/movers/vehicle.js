// vehicle.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../../node_modules/three/build/three.module.js'
import { countTo, randomInt } from '../core/util.js'
import Mover from './mover.js'

const VEHICLE_SPECS = {

  // "pedicab" becomes the tooltip display name of the vehicle
  pedicab: {

    // optional display name to appear in tooltips
    name: 'Pedicab (bicycle rickshaw)',

    // sets the color used for the frame, but not the tires, etc.
    color: 0x0066ff,

    // places a bicycle saddle, 2.8 feet above and 1.5 feet forward of the rear axle
    saddles: { forward: 3.2, up: 3 },

    // places bicycle handlebars 5 feet forward from rear axle
    // handlebars: { forward: 5.2 },

    // places a flat floor body 1 foot in front of the rear axle
    body: { forward: 1, width: 3, length: 1.2 },

    // places a chair-style seat, relative to the rear axle
    seating: { forward: 0.2, up: 2 },

    wheels: [{
      // places a pair of rear wheels
      axleWidth: 3.5, // vehicle is 3.5 feet wide between rear wheels
      diameter: 2.25, // rear wheels are 2.25 feet tall
      spokes: 18 // rear wheels have 36 spokes
    }, {
      // places a front wheel
      handlebars: { forward: -0.8 }, // adds handlebars 0.8 feet back from axle with post down to axle
      forward: 6, // front wheel is 6 feet forward of rear axle
      diameter: 2.25, // front wheel is 2.25 feet tall
      spokes: 12 // front wheel has 36 spokes
    }]
  },

  unicycle: {
    color: 0xff6600,
    saddles: { up: 3.8, bottomOffset: 0 },
    wheels: {
      diameter: 2.25,
      spokes: 18
    }
  },

  ninebot: {
    body: { width: 1.4, length: 0.8, forward: -0.4 },
    wheels: { diameter: 1.2 }
  },

  bicycle: {
    saddles: { forward: 0.8, up: 3 },
    wheels: [{
      diameter: 2.25,
      spokes: 11
    }, {
      handlebars: { },
      forward: 3.6,
      diameter: 2.25,
      spokes: 11
    }]
  },

  tandem: {
    saddles: [
      { forward: 0.8, up: 3 },
      { forward: 2.8, up: 3 }
    ],
    wheels: [{
      diameter: 2.25,
      spokes: 11
    }, {
      handlebars: { },
      forward: 5.6,
      diameter: 2.25,
      spokes: 11
    }]
  },

  kickscooter: {
    body: { width: 0.5, length: 2 },
    handlebars: { forward: 1.6, width: 1 },
    wheels: [{
      diameter: 0.36
    }, {
      forward: 2,
      diameter: 0.36
    }]
  },

  skateboard: {
    body: { width: 0.65, length: 2.6, forward: -0.6, up: 0.2 },
    wheels: [{
      diameter: 0.2,
      axleWidth: 0.65
    }, {
      forward: 1.3,
      diameter: 0.2,
      axleWidth: 0.65
    }]
  },

  stroller: {
    color: 0xff66ff,
    seating: { up: 1 },
    handlebars: { forward: -1 },
    wheels: [{
      axleWidth: 2,
      diameter: 1.25,
      tireWidth: 0.2
    }, {
      forward: 2.5,
      axleWidth: 1.7,
      diameter: 0.65
    }]
  },

  jogger: {
    color: 0x00ff99,
    seating: { up: 1 },
    handlebars: { forward: -1 },
    wheels: [{
      axleWidth: 2,
      diameter: 1.25,
      tireWidth: 0.2
    }, {
      forward: 2.5,
      diameter: 0.65
    }]
  },

  segway: {
    body: { width: 1.8, length: 0.8, forward: -0.4 },
    handlebars: { forward: 0 },
    wheels: [{
      axleWidth: 1.8,
      diameter: 1,
      tireWidth: 0.2
    }]
  },

  wheelchair: {
    color: 0x66ccff,
    seating: { up: 1.3, forward: -0.1 },
    wheels: [{
      axleWidth: 2.3,
      diameter: 1.8,
      spokes: 8
    }, {
      forward: 1.35,
      axleWidth: 2.3,
      diameter: 0.5
    }]
  },

  gokart: {
    color: 0xffff00,
    body: { width: 1.8, length: 3.2 },
    seating: { forward: 0.8, up: 0.5 },
    handlebars: { forward: 2.4, up: -1, width: 1.6 },
    wheels: [{
      axleWidth: 2.8,
      diameter: 0.7,
      tireWidth: 0.4
    }, {
      forward: 3,
      axleWidth: 2.8,
      diameter: 0.7,
      tireWidth: 0.4
    }]
  },

  penny_farthing: {
    saddles: { forward: 1.6, up: 5 },
    handlebars: { forward: 2.4, up: 2 },
    wheels: [{
      diameter: 1.4,
      spokes: 11
    }, {
      forward: 2.7,
      diameter: 4.6,
      spokes: 21
    }]
  },

  tricycle: {
    color: 0xff2222,
    saddles: { forward: 0.6, up: 1.4 },
    handlebars: { forward: 1, width: 1.4, up: -1.2 },
    body: { forward: -0.25, width: 1.3, length: 0.5, up: -0.2 },
    wheels: [{
      axleWidth: 1.5,
      diameter: 0.5
    }, {
      forward: 1.5,
      diameter: 1,
      spokes: 7
    }]
  },

  tadpole: {
    color: 0xffff00,
    seating: { forward: 1.6, up: 0.8 },
    handlebars: { forward: 2.5, width: 1.4, up: -2.8 },
    wheels: [{
      diameter: 2.166,
      spokes: 9
    }, {
      forward: 3.65,
      axleWidth: 2.7,
      diameter: 1.666,
      spokes: 9
    }]
  },

  haluzak_horizon_recumbent: {
    color: 0xffff00,
    seating: { width: 1.4, forward: 1.6, up: 1.6 },
    handlebars: { forward: 2.5, width: 1.4, up: -2.0 },
    wheels: [{
      diameter: 2.166,
      spokes: 15
    }, {
      forward: 4,
      diameter: 1.666,
      spokes: 11
    }]
  },

  bakfiets_cargo_trike: {
    color: 0x996600,
    saddles: { forward: 0.8, up: 3 },
    handlebars: { forward: 2.8 },
    body: { width: 2.8, length: 3, height: 1.7, up: 0.0, forward: 3 },
    wheels: [{
      diameter: 2.166,
      spokes: 15
    }, {
      forward: 4.8,
      axleWidth: 3.1,
      diameter: 1.666,
      spokes: 11
    }]
  },

  ups_etrike: {
    color: 0x4d2600,
    saddles: { forward: 3.2, up: 3 },
    handlebars: { forward: 5.2 },
    body: [
      { forward: -1.5, width: 3, length: 4, height: 5.5 },
      { forward: 2.5, width: 1.5, length: 2.5 }
    ],
    wheels: [{
      axleWidth: 3.5,
      diameter: 1.666,
      spokes: 11
    }, {
      forward: 6,
      diameter: 1.666,
      spokes: 11
    }]
  },

  fedex_delivery_bot: {
    color: 0xffffff,
    body: { width: 1.1, length: 1.2, height: 1.7, up: 0.6, forward: -0.2 },
    wheels: [{
      axleWidth: 1.4,
      diameter: 0.5,
      tireWidth: 0.2
    }, {
      forward: 0.7,
      axleWidth: 1.4,
      diameter: 0.5,
      tireWidth: 0.2
    }]
  },

  brainos_delivery_bot: {
    color: 0xffffff,
    body: { width: 1.8, length: 2.9, up: 0, forward: -0.3 },
    handlebars: { forward: 2.5, width: 1.4, up: -0.1 },
    wheels: [{
      axleWidth: 2,
      diameter: 0.5
    }, {
      forward: 3,
      diameter: 0.5
    }]
  },

  amazon_scout_delivery_bot: {
    color: 0x2222ff,
    body: { width: 1.4, length: 1.8, height: 1.4, up: 0, forward: -0.2 },
    wheels: [{
      axleWidth: 1.5,
      diameter: 0.5
    }, {
      forward: 0.7,
      axleWidth: 1.5,
      diameter: 0.5
    }, {
      forward: 1.4,
      axleWidth: 1.5,
      diameter: 0.5
    }]
  },

  quadro_eqooder: {
    color: 0x777777,
    body: { width: 1.2, length: 2, up: 0, forward: 2.7 },
    handlebars: { forward: 4.5, width: 1.6, up: -0.1 },
    seating: [
      { forward: 0.3, up: 2.2 },
      { forward: 1.7, up: 1.4 }
    ],
    wheels: [{
      axleWidth: 1.48,
      diameter: 1.5
    }, {
      forward: 5.2,
      axleWidth: 1.8,
      diameter: 1.5
    }]
  }

  // TODO: add some emergency vehicles:
  // + ambulance
  // + gurney
  // + hospital bed
  // + fire truck
  // + evacution bus

  // TODO: add some hand-pushed vehicles:
  // + grocery shopping cart
  // + wheelbarrow
  // + hand-truck
  // + platform hand-truck
  // + double-decker platform hand-truck

  // TODO: add some speculative future vehicles:
  // + push-me-pull-you (4 wheels & 2 seats facing each other)

  // TODO: add some additional name-brand vehicles:
  // + "Burley Encore" stroller
  // + "Burley Flatbed" bike cargo trailer
  // + "Burley Coho XC" single-wheel cargo trailer
  // + "Burley Travoy" trailer
  // + "Burley Kazoo" trailercycle
  // + "Toyota i-Real"
  // + "YikeBike"
  // + "KO1+ scooter"
  // + "Jack-rabbit" bike
  // + "halfbike"
  // + "Gocycle"
  // + "EAV model p1" (Electric Assisted Vehciles)
  // + "Doohan gotcha"
}
const VEHICLE_TYPE_NAMES = Object.keys(VEHICLE_SPECS)
const FIXME_FUCHSIA = 0xff00ff
const TIRE_COLOR = 0x202020
const HUB_COLOR = 0xeeeeee
const DEFAULT_FRAME_COLOR = 0x0000ff
const DEFAULT_HANDLEBAR_COLOR = 0x202020

// TODO: These are currently very low, to make transitions noticeable while developing.
const LOW_RES_DISTANCE = 40
const MED_RES_DISTANCE = 20

const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 })
const saddleMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 })
const axleMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 })
const spokeMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 })

const materials = {
  lowRes: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} },
  medRes: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} },
  highRes: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} }
}

function _material (resType, color, twoSided = false) {
  if (isNaN(color)) {
    color = FIXME_FUCHSIA
  }
  const side = twoSided ? THREE.DoubleSide : THREE.FrontSide
  if (!(color in materials[resType][side])) {
    if (resType === 'lowRes') {
      materials[resType][side][color] = new THREE.MeshBasicMaterial({ color, side })
    } else if (resType === 'medRes') {
      materials[resType][side][color] = new THREE.MeshLambertMaterial({ color, side })
    } else if (resType === 'highRes') {
      materials[resType][side][color] = new THREE.MeshPhongMaterial({ color, side })
    } else {
      console.error('unknown resType', resType)
    }
  }
  return materials[resType][side][color]
}

function _newLine (start, end, material) {
  const geometry = new THREE.Geometry()
  const from = new THREE.Vector3(start.x, start.y, start.z)
  const to = new THREE.Vector3(end.x, end.y, end.z)
  geometry.vertices.push(from, to)
  const line = new THREE.Line(geometry, material)
  return line
}

function _makeWheel (spec, vehicle, frameColor) {
  const radius = spec.diameter / 2
  const wheel = new THREE.LOD()
  wheel.position.x = spec.forward || 0
  wheel.position.z = radius + spec.tireWidth / 2
  wheel.position.y = spec.y || 0
  if (spec.spokes) {
    vehicle.userData.spinningWheels.push(wheel)
  }
  wheel.addLevel(_makeLowResWheel(spec, vehicle), LOW_RES_DISTANCE)
  wheel.addLevel(_makeMedResWheel(spec, vehicle), MED_RES_DISTANCE)
  wheel.addLevel(_makeHighResWheel(spec, vehicle), 0)

  if (spec.handlebars) {
    const handlebars = _makeHandlebars(spec.handlebars)
    handlebars.position.x = wheel.position.x + (spec.handlebars.forward || -0.4)
    handlebars.position.z = 3.3 + (spec.handlebars.up || 0)
    vehicle.add(handlebars)

    const top = { x: handlebars.position.x, y: 0, z: handlebars.position.z }
    const bottom = { x: wheel.position.x, y: 0, z: radius }
    const post = _makePost(top, bottom, frameColor)
    vehicle.add(post)
  }

  return wheel
}

function _makeLowResWheel (spec, vehicle) {
  const radius = spec.diameter / 2
  const wheel = new THREE.Group()
  const resolution = 8
  const torus = new THREE.TorusGeometry(radius, spec.tireWidth, resolution, resolution)
  torus.rotateX(-Math.PI / 2)
  const tire = new THREE.Mesh(torus, _material('lowRes', TIRE_COLOR))
  wheel.add(tire)
  if (!spec.spokes) {
    const circle = new THREE.CircleGeometry(radius, resolution)
    const hub = new THREE.Mesh(circle, _material('lowRes', HUB_COLOR, true))
    hub.rotation.x = Math.PI / 2
    wheel.add(hub)
  }
  return wheel
}

function _makeMedResWheel (spec, vehicle) {
  const radius = spec.diameter / 2
  const wheel = new THREE.Group()
  const resolution = 16
  const torus = new THREE.TorusGeometry(radius, spec.tireWidth, resolution, resolution)
  torus.rotateX(-Math.PI / 2)
  const tire = new THREE.Mesh(torus, _material('medRes', TIRE_COLOR))
  wheel.add(tire)
  if (spec.spokes) {
    const hub = { x: radius, y: 0, z: 0 }
    const rim = { x: 0, y: 0, z: 0 }
    for (const i of countTo(spec.spokes)) {
      const line = _newLine(hub, rim, spokeMaterial)
      line.rotation.y = i * 2 * Math.PI / spec.spokes
      wheel.add(line)
    }
  } else {
    const circle = new THREE.CircleGeometry(radius, resolution)
    const hub = new THREE.Mesh(circle, _material('medRes', HUB_COLOR, true))
    hub.rotation.x = Math.PI / 2
    wheel.add(hub)
  }
  return wheel
}

function _makeHighResWheel (spec, vehicle) {
  const radius = spec.diameter / 2
  const wheel = new THREE.Group()
  const resolution = 32
  const torus = new THREE.TorusGeometry(radius, spec.tireWidth, resolution, resolution)
  torus.rotateX(-Math.PI / 2)
  const tire = new THREE.Mesh(torus, _material('highRes', TIRE_COLOR))
  wheel.add(tire)
  if (spec.spokes) {
    const hub = { x: radius, y: 0, z: 0 }
    const rim = { x: 0, y: 0, z: 0 }
    for (const i of countTo(spec.spokes)) {
      const line = _newLine(hub, rim, spokeMaterial)
      line.rotation.y = i * 2 * Math.PI / spec.spokes
      wheel.add(line)
    }
  } else {
    const circle = new THREE.CircleGeometry(radius, resolution)
    const hub = new THREE.Mesh(circle, _material('highRes', HUB_COLOR, true))
    hub.rotation.x = Math.PI / 2
    wheel.add(hub)
  }
  return wheel
}

function _makeHandlebars (spec) {
  const width = spec.width || 2
  const color = spec.color || DEFAULT_HANDLEBAR_COLOR
  const handlebars = new THREE.LOD()
  handlebars.addLevel(_makeLowResHandlebars(width, color), LOW_RES_DISTANCE)
  handlebars.addLevel(_makeMedResHandlebars(width, color), MED_RES_DISTANCE)
  handlebars.addLevel(_makeHighResHandlebars(width, color), 0)
  return handlebars
}

function _makeLowResHandlebars (width, color) {
  const material = _material('lowRes', color)
  return _newLine({ x: 0, y: -width / 2, z: 0 }, { x: 0, y: width / 2, z: 0 }, material)
}

function _makeMedResHandlebars (width, color) {
  const handlebars = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, width, 4),
    _material('medRes', color)
  )
  return handlebars
}

function _makeHighResHandlebars (width, color) {
  const handlebars = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, width, 16),
    _material('highRes', color)
  )
  return handlebars
}

function _makePost (top, bottom, color) {
  const post = new THREE.LOD()
  const v = new THREE.Vector3().subVectors(top, bottom)
  post.addLevel(_makeLowResPost(v.length(), color), LOW_RES_DISTANCE)
  post.addLevel(_makeMedResPost(v.length(), color), MED_RES_DISTANCE)
  post.addLevel(_makeHighResPost(v.length(), color), 0)
  post.rotateY(-v.angleTo(new THREE.Vector3(1, 0, 0)))
  post.rotateZ(-Math.PI / 2)
  post.position.x = (top.x + bottom.x) / 2
  post.position.z = (top.z + bottom.z) / 2
  return post
}

function _makeLowResPost (length, color) {
  const material = _material('lowRes', color)
  return _newLine({ x: 0, y: -length / 2, z: 0 }, { x: 0, y: length / 2, z: 0 }, material)
}

function _makeMedResPost (length, color) {
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, length, 4),
    _material('medRes', color)
  )
  return post
}

function _makeHighResPost (length, color) {
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, length, 16),
    _material('highRes', color)
  )
  return post
}

function _array (object) {
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

function _makeModelFromSpec (vehicleSpec) {
  let maxAxleWidth = 0
  let axleHeight = 0

  const color = vehicleSpec.color || 0x000000
  const frameColor = color || DEFAULT_FRAME_COLOR
  const specMaterial = new THREE.MeshLambertMaterial({ color })

  const vehicle = new THREE.Group()
  vehicle.name = vehicleSpec.name
  vehicle.userData = { spinningWheels: [] }

  const wheels = new THREE.Group()
  vehicle.add(wheels)

  for (const wheelSpec of _array(vehicleSpec.wheels)) {
    const y = 0 // default is a single wheel, centered
    const { axleWidth, diameter, forward } = wheelSpec
    const spec = { ...wheelSpec, y }
    spec.tireWidth = spec.tireWidth || 0.1 // default thin tire

    axleHeight = diameter / 2
    if (axleWidth) {
      const halfWidth = axleWidth / 2
      maxAxleWidth = Math.max(axleWidth, maxAxleWidth)

      // draw the left and right wheels
      spec.y = halfWidth
      const leftWheel = _makeWheel(spec, vehicle, frameColor)
      spec.y = -halfWidth
      const rightWheel = _makeWheel(spec, vehicle, frameColor)
      wheels.add(leftWheel, rightWheel)

      // draw the axle
      const left = { x: forward, y: halfWidth, z: axleHeight }
      const right = { x: forward, y: -halfWidth, z: axleHeight }
      vehicle.add(_newLine(left, right, axleMaterial))
    } else {
      // draw a single wheel
      const wheel = _makeWheel(spec, vehicle, frameColor)
      wheels.add(wheel)
    }
  }

  for (const bodySpec of _array(vehicleSpec.body)) {
    let { forward = 0, width = 1, length = 1, up = 0, height = 0.1 } = bodySpec
    width = width / 2
    const corners = [
      new THREE.Vector2(forward, width),
      new THREE.Vector2(forward + length, width),
      new THREE.Vector2(forward + length, -width),
      new THREE.Vector2(forward, -width)
    ]
    const shape = new THREE.Shape(corners)
    shape.closePath()
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false
    })
    geometry.translate(0, 0, axleHeight + up)
    const material = height > 0.1 ? specMaterial : bodyMaterial
    const body = new THREE.Mesh(geometry, material)
    vehicle.add(body)
  }

  for (const saddleSpec of _array(vehicleSpec.saddles)) {
    const saddle = new THREE.Mesh(new THREE.SphereGeometry(), saddleMaterial)
    saddle.scale.set(0.65, 0.3, 0.1)
    saddle.position.x = saddleSpec.forward || 0
    saddle.position.y = 0
    saddle.position.z = saddleSpec.up || 0
    vehicle.add(saddle)

    const top = { x: saddle.position.x, y: 0, z: saddleSpec.up }
    const bottomOffset = 'bottomOffset' in saddleSpec ? saddleSpec.bottomOffset : 0.8
    const bottom = { x: saddle.position.x + bottomOffset, y: 0, z: axleHeight }
    const seatpost = _makePost(top, bottom, frameColor)
    vehicle.add(seatpost)
  }

  for (const seatSpec of _array(vehicleSpec.seating)) {
    const seat = new THREE.Group()
    seat.position.x = seatSpec.forward || 0
    seat.position.y = 0
    seat.position.z = seatSpec.up || 0

    const seatWidth = seatSpec.width || maxAxleWidth - 0.5
    const halfWidth = seatWidth / 2
    const dx = 1.25 // from front of seat to backrest
    const corners = [
      new THREE.Vector2(0, halfWidth),
      new THREE.Vector2(dx, halfWidth),
      new THREE.Vector2(dx, -halfWidth),
      new THREE.Vector2(0, -halfWidth)
    ]
    const cushionShape = new THREE.Shape(corners)
    cushionShape.closePath()
    const cushionGeometry = new THREE.ExtrudeGeometry(cushionShape, {
      depth: 0.1,
      bevelEnabled: false
    })
    cushionGeometry.rotateY(-Math.PI / 12)
    const cushion = new THREE.Mesh(cushionGeometry, specMaterial)

    const dz = 1.4 // from cushion to top of backrest
    const backrestCorners = [
      new THREE.Vector2(0, halfWidth),
      new THREE.Vector2(dz, halfWidth),
      new THREE.Vector2(dz, -halfWidth),
      new THREE.Vector2(0, -halfWidth)
    ]
    const backrestShape = new THREE.Shape(backrestCorners)
    backrestShape.closePath()
    const backrestGeometry = new THREE.ExtrudeGeometry(backrestShape, {
      depth: 0.1,
      bevelEnabled: false
    })
    backrestGeometry.rotateY(-Math.PI / 1.8)
    const backrest = new THREE.Mesh(backrestGeometry, specMaterial)
    backrest.position.x = -0.5
    backrest.position.z = dz
    seat.add(cushion, backrest)

    vehicle.add(seat)
  }

  for (const handlebarSpec of _array(vehicleSpec.handlebars)) {
    const handlebars = _makeHandlebars(handlebarSpec)
    handlebars.position.x = handlebarSpec.forward || 0
    handlebars.position.z = 3.3 + (handlebarSpec.up || 0)
    vehicle.add(handlebars)

    const top = { x: handlebars.position.x, y: 0, z: handlebars.position.z }
    const bottom = { x: handlebars.position.x + 0.4, y: 0, z: axleHeight * 2 }
    const post = _makePost(top, bottom, frameColor)
    vehicle.add(post)
  }

  return vehicle
}

function _getRandomVehicleTypename () {
  return VEHICLE_TYPE_NAMES[randomInt(0, VEHICLE_TYPE_NAMES.length - 1)]
}

function _getVehicleSpec (typename) {
  typename = typename || _getRandomVehicleTypename()
  const vehicleSpec = VEHICLE_SPECS[typename] // = VEHICLE_SPECS.ups_etrike
  vehicleSpec.name = vehicleSpec.name || typename
  return vehicleSpec
}

function randomPath () {
  const p1 = [-randomInt(50, 250), -randomInt(50, 250), 0]
  const p2 = [-randomInt(50, 250), -randomInt(50, 250), 0]
  const p3 = [-randomInt(50, 500), -randomInt(50, 250), 0]
  return [p1, p2, p3, p1]
}

function makeVehicle (typename) {
  const vehicleSpec = _getVehicleSpec(typename)
  const vehicle = _makeModelFromSpec(vehicleSpec)
  return vehicle
}

export default class Vehicle extends Mover {
  // new Vehicle([[0, 0, 0], [0, 200, 10], [100, 200, 10], [0, 0, 0]], 0.8)
  // For a parked vehicle, use speed = 0, and path[0] and path[1] to specify location and orientation.
  constructor (path, speed = 0.5, typename) {
    path = path || randomPath()
    super(path, speed, makeVehicle(typename))
    this.threeComponent.update = this.update.bind(this)
  }
}
