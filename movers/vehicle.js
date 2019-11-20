// vehicle.js
//
// Authored in 2019 at <https://github.com/nicky-nym/city3d>

// UNLICENSE
// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org>

import * as THREE from '../three/build/three.module.js'
import { countTo, randomInt, lookAt } from '../city3d/util.js'

const VEHICLE_TYPES = {

  // "pedicab" becomes the tooltip display name of the vehicle
  pedicab: {

    // sets the color used for the frame, but not the tires, etc.
    color: 0x0066ff,

    // places a bicycle saddle, 2.8 feet above and 1.5 feet forward of the rear axle
    saddles: [{ forward: 3.2, up: 3 }],

    // places bicycle handlebars 5 feet forward from rear axle
    handlebars: { forward: 5.2 },

    // places a flat floor deck 1 foot in front of the rear axle
    deck: { forward: 1, width: 3, length: 1.2 },

    // places a chair-style seat, relative to the rear axle
    seating: [{ forward: 0.2, up: 2 }],

    wheels: [{
      // places a pair of rear wheel
      axleWidth: 3.5, // vehicle is 3.5 feet wide between rear wheels
      diameter: 2.25, // rear wheels are 2.25 feet tall
      spokes: 18 // rear wheels have 36 spokes
    }, {
      // places a front wheel
      forward: 6, // front wheel is 6 feet forward of rear axle
      diameter: 2.25, // front wheel is 2.25 feet tall
      spokes: 12 // front wheel has 36 spokes
    }]
  },

  unicycle: {
    color: 0xff6600,
    saddles: [{ up: 2.8 }],
    wheels: [{
      diameter: 2.25,
      spokes: 18
    }]
  },

  ninebot: {
    deck: { width: 1.4, length: 0.8, forward: -0.4 },
    wheels: [{ diameter: 1.2 }]
  },

  bicycle: {
    saddles: [{ forward: 0.8, up: 3 }],
    handlebars: { forward: 2.8 },
    wheels: [{
      diameter: 2.25,
      spokes: 11
    }, {
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
    handlebars: { forward: 4.8 },
    wheels: [{
      diameter: 2.25,
      spokes: 11
    }, {
      forward: 5.6,
      diameter: 2.25,
      spokes: 11
    }]
  },

  kickscooter: {
    deck: { width: 0.5, length: 2 },
    handlebars: { forward: 1.6, width: 1 },
    wheels: [{
      diameter: 0.36
    }, {
      forward: 2,
      diameter: 0.36
    }]
  },

  skateboard: {
    deck: { width: 0.65, length: 2.6, forward: -0.6, up: 0.2 },
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
    seating: [{ up: 1 }],
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
    seating: [{ up: 1 }],
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
    deck: { width: 1.8, length: 0.8, forward: -0.4 },
    handlebars: { forward: 0 },
    wheels: [{
      axleWidth: 1.8,
      diameter: 1,
      tireWidth: 0.2
    }]
  },

  wheelchair: {
    color: 0x66ccff,
    seating: [{ up: 1.3, forward: -0.1 }],
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
    deck: { width: 1.8, length: 3.2 },
    seating: [{ forward: 0.8, up: 0.5 }],
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
    saddles: [{ forward: 1.6, up: 5 }],
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
    saddles: [{ forward: 0.6, up: 1.4 }],
    handlebars: { forward: 1, width: 1.4, up: -1.2 },
    deck: { forward: -0.25, width: 1.3, length: 0.5, up: -0.2 },
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
    seating: [{ forward: 1.6, up: 0.8 }],
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
    seating: [{ width: 1.4, forward: 1.6, up: 1.6 }],
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
    saddles: [{ forward: 0.8, up: 3 }],
    handlebars: { forward: 2.8 },
    deck: { width: 2.8, length: 3, height: 1.7, up: 0.0, forward: 3 },
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
    saddles: [{ forward: 3.2, up: 3 }],
    handlebars: { forward: 5.2 },
    deck: { forward: -1.5, width: 3, length: 4, height: 5.5 },
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
    deck: { width: 1.1, length: 1.2, height: 1.7, up: 0.6, forward: -0.2 },
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
    deck: { width: 1.8, length: 2.9, up: 0, forward: -0.3 },
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
    deck: { width: 1.4, length: 1.8, height: 1.4, up: 0, forward: -0.2 },
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
    deck: { width: 1.2, length: 2, up: 0, forward: 2.7 },
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

  // TODO: add more vehicles:
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
const VEHICLE_NAMES = Object.keys(VEHICLE_TYPES)
const TIRE_COLOR = 0x202020

const material = new THREE.MeshLambertMaterial({ color: TIRE_COLOR })
const tireMaterial = new THREE.MeshLambertMaterial({ color: TIRE_COLOR })
const deckMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 })
const saddleMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 })
const axleMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 })
const spokeMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 })
const hubMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee, side: THREE.DoubleSide })

function _getRandomVehicleSpec () {
  const name = VEHICLE_NAMES[randomInt(0, VEHICLE_NAMES.length - 1)]
  const vehicleSpec = VEHICLE_TYPES[name] // = VEHICLE_TYPES.ups_etrike
  vehicleSpec.name = name
  return vehicleSpec
}

function _newLine (start, end, material) {
  const geometry = new THREE.Geometry()
  const from = new THREE.Vector3(start.x, start.y, start.z)
  const to = new THREE.Vector3(end.x, end.y, end.z)
  geometry.vertices.push(from, to)
  const line = new THREE.Line(geometry, material)
  return line
}

function _makeWheel (spec, vehicle) {
  const radius = spec.diameter / 2
  const wheel = new THREE.Group()
  wheel.position.z = spec.forward || 0
  wheel.position.x = -radius - spec.tireWidth / 2
  wheel.position.y = spec.y || 0

  const resolution = 16
  const torus = new THREE.TorusGeometry(radius, spec.tireWidth, 8, resolution)
  torus.rotateX(-Math.PI / 2)
  const tire = new THREE.Mesh(torus, tireMaterial)
  wheel.add(tire)

  if (spec.spokes) {
    const hub = { x: radius, y: 0, z: 0 }
    const rim = { x: 0, y: 0, z: 0 }
    for (const i of countTo(spec.spokes)) {
      const line = _newLine(hub, rim, spokeMaterial)
      line.rotation.y = i * 2 * Math.PI / spec.spokes
      wheel.add(line)
    }
    vehicle.userData.spinningWheels.push(wheel)
  } else {
    const circle = new THREE.CircleGeometry(radius, resolution)
    const hub = new THREE.Mesh(circle, hubMaterial)
    hub.rotation.x = Math.PI / 2
    wheel.add(hub)
  }

  return wheel
}

function _makeModelFromSpec (vehicleSpec) {
  let maxAxleWidth = 0
  let axleHeight = 0

  const color = vehicleSpec.color || 0x000000
  const specMaterial = new THREE.MeshLambertMaterial({ color })

  const vehicle = new THREE.Group()
  vehicle.name = vehicleSpec.name
  vehicle.userData = { spinningWheels: [] }

  const wheels = new THREE.Group()
  vehicle.add(wheels)

  for (const wheelSpec of vehicleSpec.wheels) {
    const y = 0 // default is a single wheel, centered
    const { axleWidth, diameter, tireWidth, spokes, forward } = wheelSpec
    const spec = { diameter, tireWidth, spokes, forward, y }
    spec.tireWidth = spec.tireWidth || 0.1 // default thin tire

    axleHeight = diameter / 2
    if (axleWidth) {
      const halfWidth = axleWidth / 2
      maxAxleWidth = Math.max(axleWidth, maxAxleWidth)

      // draw the left and right wheels
      spec.y = halfWidth
      const leftWheel = _makeWheel(spec, vehicle)
      spec.y = -halfWidth
      const rightWheel = _makeWheel(spec, vehicle)
      wheels.add(leftWheel, rightWheel)

      // draw the axle
      const left = { x: -axleHeight, y: halfWidth, z: forward }
      const right = { x: -axleHeight, y: -halfWidth, z: forward }
      vehicle.add(_newLine(left, right, axleMaterial))
    } else {
      // draw a single wheel
      const wheel = _makeWheel(spec, vehicle)
      wheels.add(wheel)
    }
  }

  if (vehicleSpec.deck) {
    let { forward = 0, width = 1, length = 1, up = 0, height = 0.1 } = vehicleSpec.deck
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
    geometry.rotateY(-Math.PI / 2)
    geometry.translate(-axleHeight - up, 0, 0)
    const material = height > 0.1 ? specMaterial : deckMaterial
    const deck = new THREE.Mesh(geometry, material)
    vehicle.add(deck)
  }

  for (const saddleSpec of (vehicleSpec.saddles || [])) {
    const saddle = new THREE.Mesh(new THREE.SphereGeometry(), saddleMaterial)
    saddle.scale.set(0.1, 0.3, 0.65)
    saddle.position.z = saddleSpec.forward || 0
    saddle.position.y = 0
    saddle.position.x = -saddleSpec.up || 0
    vehicle.add(saddle)

    const top = { x: -saddleSpec.up, y: 0, z: saddleSpec.forward }
    const bottom = { x: -axleHeight, y: 0, z: saddleSpec.forward + 0.8 }
    const seatpost = _newLine(top, bottom, specMaterial)
    vehicle.add(seatpost)
  }

  for (const seatSpec of (vehicleSpec.seating || [])) {
    const seat = new THREE.Group()
    seat.position.z = seatSpec.forward || 0
    seat.position.y = 0
    seat.position.x = -seatSpec.up || 0

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
    cushionGeometry.rotateY(-Math.PI / 1.8)
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
    backrestGeometry.rotateY(-Math.PI / 12)
    const backrest = new THREE.Mesh(backrestGeometry, specMaterial)
    backrest.position.x = -dz
    backrest.position.z = -0.5
    seat.add(cushion, backrest)

    vehicle.add(seat)
  }

  if (vehicleSpec.handlebars) {
    const width = vehicleSpec.handlebars.width || 2
    const handlebars = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, width),
      material
    )
    handlebars.position.z = vehicleSpec.handlebars.forward || 0
    handlebars.position.x = -3.3 - (vehicleSpec.handlebars.up || 0)
    vehicle.add(handlebars)

    const top = { x: handlebars.position.x, y: 0, z: handlebars.position.z }
    const bottom = { x: -axleHeight * 2, y: 0, z: handlebars.position.z + 0.4 }
    const post = _newLine(top, bottom, specMaterial)
    vehicle.add(post)
  }

  return vehicle
}

export default class Vehicle {
  constructor (plato) {
    this._plato = plato
    this._vehicles = []
  }

  newVehicles (n) {
    for (const i of countTo(n)) {
      const p1 = new THREE.Vector3(250 + -50 * i, randomInt(-50, 50), 40)
      const p2 = new THREE.Vector3(p1.y, -p1.x, 40)
      const p3 = new THREE.Vector3(0, 0, 40)
      const speed = randomInt(1, 20) * 0.04
      this._newVehicle([p1, p2, p3, p1], speed)
    }
  }

  newVehicle (path, speed = 1) {
    this._newVehicle(path.map(p => new THREE.Vector3(...p)), speed)
  }

  // for now, speed is in units of unit vectors per frame
  _newVehicle (path, speed = 1) {
    const vehicleSpec = _getRandomVehicleSpec()
    const vehicle = _makeModelFromSpec(vehicleSpec)

    vehicle.position.copy(path[0])
    lookAt(vehicle, path[1])

    const userData = { path, pathIndex: 0, pathSegments: [], speed, delta: speed }
    vehicle.userData = { ...vehicle.userData, ...userData }
    for (const i of countTo(path.length - 1)) {
      const v = path[i + 1].clone().sub(path[i])
      const len = v.length() // compute before normalizing
      vehicle.userData.pathSegments.push({ vNorm: v.normalize(), len })
    }
    vehicle.userData.remainingDist = vehicle.userData.pathSegments[0].len
    vehicle.userData.currSegment = vehicle.userData.pathSegments[0]

    const SHOW_PATH = true
    if (SHOW_PATH) {
      const material = new THREE.LineBasicMaterial({ color: 0xFF00FF })
      const geometry = new THREE.Geometry()
      geometry.vertices.push(...path)
      const line = new THREE.Line(geometry, material)
      this._plato.addLine(line)
    }

    vehicle.update = this.updateVehicle.bind(vehicle)
    this._plato.addMover(vehicle)
  }

  updateVehicle () {
    // TODO: update speed based on slope of current segment
    const u = this.userData
    u.remainingDist -= u.delta
    if (u.remainingDist <= 0) {
      u.pathIndex = (u.pathIndex + 1) % (u.path.length - 1)
      u.currSegment = u.pathSegments[u.pathIndex]
      this.position.copy(u.path[u.pathIndex])
      this.position.addScaledVector(u.currSegment.vNorm, -u.remainingDist)
      u.remainingDist += u.currSegment.len
      lookAt(this, u.path[u.pathIndex + 1])
    } else {
      this.position.addScaledVector(u.currSegment.vNorm, u.delta)
    }

    for (const wheel of u.spinningWheels) {
      wheel.rotation.y += u.speed / Math.PI
    }
  }
}
