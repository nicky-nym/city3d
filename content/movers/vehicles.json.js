export default /* eslint-disable */
{

  // "pedicab" becomes the tooltip display name of the vehicle
  pedicab: {

    // optional display name to appear in tooltips
    name: 'Pedicab (bicycle rickshaw)',

    // sets the color used for the frame, but not the tires, etc.
    color: 0x0066ff,

    // places a bicycle saddle, 2.8 feet above and 1.5 feet forward of the rear axle
    saddles: [{ forward: 3.2, up: 3 }],

    // places bicycle handlebars 5 feet forward from rear axle
    // handlebars: { forward: 5.2 },

    // places a flat floor body 1 foot in front of the rear axle
    body: [{ forward: 1, width: 3, length: 1.2 }],

    // places a chair-style seat, relative to the rear axle
    seating: [{ forward: 0.2, up: 2 }],

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
    saddles: [{ up: 3.8, bottomOffset: 0 }],
    wheels: [{
      diameter: 2.25,
      spokes: 18
    }]
  },

  ninebot: {
    body: [{ width: 1.4, length: 0.8, forward: -0.4 }],
    wheels: [{ diameter: 1.2 }]
  },

  bicycle: {
    saddles: [{ forward: 0.8, up: 3 }],
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
    body: [{ width: 0.5, length: 2 }],
    handlebars: { forward: 1.6, width: 1 },
    wheels: [{
      diameter: 0.36
    }, {
      forward: 2,
      diameter: 0.36
    }]
  },

  skateboard: {
    body: [{ width: 0.65, length: 2.6, forward: -0.6, up: 0.2 }],
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
    body: [{ width: 1.8, length: 0.8, forward: -0.4 }],
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
    body: [{ width: 1.8, length: 3.2 }],
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
    body: [{ forward: -0.25, width: 1.3, length: 0.5, up: -0.2 }],
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
    body: [{ width: 2.8, length: 3, height: 1.7, up: 0.0, forward: 3 }],
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
    body: [{ width: 1.1, length: 1.2, height: 1.7, up: 0.6, forward: -0.2 }],
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
    body: [{ width: 1.8, length: 2.9, up: 0, forward: -0.3 }],
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
    body: [{ width: 1.4, length: 1.8, height: 1.4, up: 0, forward: -0.2 }],
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
    body: [{ width: 1.2, length: 2, up: 0, forward: 2.7 }],
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
