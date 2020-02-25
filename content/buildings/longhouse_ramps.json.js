export default /* eslint-disable */
{
  context: 'city3d',
  type: 'building.schema.json',
  name: 'Longhouse Ramps',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 0, y: 0, z: 0 },
  comments: [
    '                                                      ',
    '                                                      ',
    '      ab                                              ',
    '      | \          r     l--m                         ',
    '      e  \               | /                          ',
    '       \  \   q       o  n/                           ',
    '        \  \      p                                   ',
    '         d--c--h                                      ',
    '         |  |  |                                      ',
    '         |  |  |                                      ',
    '         |  |  |                                      ',
    '         g--f--i-j-k--s                               ',
    '         |         u--t                               ',
    '         |         |                                  ',
    '         |         U--T                               ',
    '         G--F--I-J-K--S                               ',
    '         |  |  |                                      ',
    '         |  |  |                                      ',
    '         |  |  |                                      ',
    '         D--C--H                                      ',
    '        /  /       P                                  ',
    '       /  /   Q       O  N\    X--Z0--Z1--Z2--Z3--W   ',
    '      E  /               | \   |                  |   ',
    '      | /          R     L--M  Y------------------V   ',
    '      AB                                              ',
    '                                                      ',
    '                                                      '
  ],
  def: {
    /* exit from highroad (toward landing) */
    A: { x: 30, y: 0 },
    B: { x: 35, y: 0 },
    C: { x: 50, y: 90 },
    D: { x: 35, y: 90 },
    E: { x: 30, y: 45 },
    AB: { x: 30, y: 0, z: 22.5 },
    CD: { x: 45, y: 90, z: 22.5 },

    /* ramp down from highroad exit to landing */
    F: { x: 50, y: 270 },
    G: { x: 35, y: 270 },
    FG: { x: 45, y: 270, z: 15 },

    /* ramp up from lowroad exit to landing */
    H: { x: 65, y: 90 },
    I: { x: 65, y: 270 },
    CH: { x: 60, y: 90, z: 7.5 },
    IF: { x: 60, y: 270, z: 15 },

    /* landing */
    J: { x: 70, y: 270 },
    K: { x: 85, y: 270 },

    /* exit from lowroad (toward landing) */
    L: { x: 130, y: 30 },
    M: { x: 200, y: 30 },
    N: { x: 130, y: 45 },
    O: { x: 89, y: 58 },
    P: { x: 73, y: 69 },
    Q: { x: 60, y: 55 },
    R: { x: 80, y: 40 },
    LM: { x: 170, y: 30, z: 7.5 },
    LN: { x: 130, y: 40, z: 7.5 },
    OR: { x: 86, y: 52, z: 7.5 },
    PQ: { x: 68, y: 64, z: 7.5 },

    /* landing, south access walkway */
    S: { x: 129, y: 279 },
    T: { x: 129, y: 285 },
    U: { x: 85, y: 285 },

    /* lower plaza */
    V: { x: 490, y: 30 },
    W: { x: 490, y: 45 },
    X: { x: 170, y: 45 },
    Y: { x: 170, y: 30 },

    /* lower plaza access walkways */
    Z0a: { x: (96 * 0) + 183 + 6, y: 45 },
    Z0b: { x: (96 * 0) + 183 + 6, y: 129 },
    Z0c: { x: (96 * 0) + 183, y: 129 },
    Z0d: { x: (96 * 0) + 183, y: 45 },

    Z1a: { x: (96 * 1) + 183 + 6, y: 45 },
    Z1b: { x: (96 * 1) + 183 + 6, y: 129 },
    Z1c: { x: (96 * 1) + 183, y: 129 },
    Z1d: { x: (96 * 1) + 183, y: 45 },

    Z2a: { x: (96 * 2) + 183 + 6, y: 45 },
    Z2b: { x: (96 * 2) + 183 + 6, y: 129 },
    Z2c: { x: (96 * 2) + 183, y: 129 },
    Z2d: { x: (96 * 2) + 183, y: 45 },

    Z3a: { x: (96 * 3) + 183 + 6, y: 45 },
    Z3b: { x: (96 * 3) + 183 + 6, y: 129 },
    Z3c: { x: (96 * 3) + 183, y: 129 },
    Z3d: { x: (96 * 3) + 183, y: 45 },

    /* entrance to highroad (from landing) */
    a: { x: 30, y: 670 - 0 },
    b: { x: 35, y: 670 - 0 },
    c: { x: 50, y: 670 - 90 },
    d: { x: 35, y: 670 - 90 },
    e: { x: 30, y: 670 - 45 },
    ab: { x: 30, y: 670 - 0, z: 22.5 },
    cd: { x: 45, y: 670 - 90, z: 22.5 },

    /* ramp up from landing to highroad */
    f: { x: 50, y: 670 - 270 },
    g: { x: 30, y: 670 - 270 },
    fg: { x: 45, y: 670 - 270, z: 15 },

    /* ramp down from landing to lowroad */
    h: { x: 65, y: 670 - 90 },
    i: { x: 65, y: 670 - 270 },
    ch: { x: 60, y: 670 - 90, z: 7.5 },
    'if': { x: 60, y: 670 - 270, z: 15 },

    /* landing */
    j: { x: 70, y: 670 - 270 },
    k: { x: 85, y: 670 - 270 },

    /* entrance to lowroad (from landing) */
    l: { x: 130, y: 670 - 30 },
    m: { x: 200, y: 670 - 30 },
    n: { x: 130, y: 670 - 45 },
    o: { x: 89, y: 670 - 58 },
    p: { x: 73, y: 670 - 69 },
    q: { x: 60, y: 670 - 55 },
    r: { x: 80, y: 670 - 40 },
    lm: { x: 170, y: 670 - 30, z: 7.5 },
    ln: { x: 130, y: 670 - 40, z: 7.5 },
    or: { x: 86, y: 670 - 52, z: 7.5 },
    pq: { x: 68, y: 670 - 64, z: 7.5 },

    /* landing, north access walkway */
    s: { x: 129, y: 670 - 279 },
    t: { x: 129, y: 670 - 285 },
    u: { x: 85, y: 670 - 285 }
  },
  routes: [{
    name: 'ramp from highroad to lowroad (via landing)',
    waypoints: [
      { $ref: '#/def/AB' },
      { $ref: '#/def/CD' },
      { $ref: '#/def/FG' },
      { $ref: '#/def/if' },
      { $ref: '#/def/ch' },
      { $ref: '#/def/pq' },
      { $ref: '#/def/or' },
      { $ref: '#/def/ln' },
      { $ref: '#/def/lm' }
    ]
  }, {
    name: 'ramp up from lowroad to highroad (via landing)',
    waypoints: [
      { $ref: '#/def/LM' },
      { $ref: '#/def/LN' },
      { $ref: '#/def/OR' },
      { $ref: '#/def/PQ' },
      { $ref: '#/def/CH' },
      { $ref: '#/def/IF' },
      { $ref: '#/def/fg' },
      { $ref: '#/def/cd' },
      { $ref: '#/def/ab' }
    ]
  }],
  storeys: [{
    name: 'exit from highroad (toward landing)',
    altitude: 22.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/A' },
          { $ref: '#/def/B' },
          { $ref: '#/def/C' },
          { $ref: '#/def/D' },
          { $ref: '#/def/E' }
        ]
      }
    }],
  }, {
    name: 'ramp down from highroad exit to landing',
    altitude: 22.5,
    incline: -7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/C' },
          { $ref: '#/def/F' },
          { $ref: '#/def/G' },
          { $ref: '#/def/D' }
        ]
      }
    }],
  }, {
    name: 'ramp up from lowroad exit to landing',
    altitude: 7.5,
    incline: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/H' },
          { $ref: '#/def/I' },
          { $ref: '#/def/F' },
          { $ref: '#/def/C' }
        ]
      }
    }],
  }, {
    name: 'landing', 
    altitude: 15,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/G' },
          { $ref: '#/def/K' },
          { $ref: '#/def/k' },
          { $ref: '#/def/g' }
        ]
      }
    }]
  }, {
    name: 'exit from lowroad (toward landing)', 
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/L' },
          { $ref: '#/def/M' },
          { $ref: '#/def/N' },
          { $ref: '#/def/O' },
          { $ref: '#/def/P' },
          { $ref: '#/def/H' },
          { $ref: '#/def/C' },
          { $ref: '#/def/Q' },
          { $ref: '#/def/R' }
        ]
      }
    }]
  }, {
    name: 'landing, south access walkway',
    altitude: 15,
    incline: 2.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/K' },
          { $ref: '#/def/S' },
          { $ref: '#/def/T' },
          { $ref: '#/def/U' }
        ]
      }
    }],
  }, {
    name: 'entrance to highroad (from landing)',
    altitude: 22.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/e' },
          { $ref: '#/def/d' },
          { $ref: '#/def/c' },
          { $ref: '#/def/b' },
          { $ref: '#/def/a' }
        ]
      }
    }],
  }, {
    name: 'ramp up from landing to highroad',
    altitude: 22.5,
    incline: -7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/d' },
          { $ref: '#/def/g' },
          { $ref: '#/def/f' },
          { $ref: '#/def/c' }
        ]
      }
    }],
  }, {
    name: 'ramp down from landing to lowroad',
    altitude: 7.5,
    incline: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/c' },
          { $ref: '#/def/f' },
          { $ref: '#/def/i' },
          { $ref: '#/def/h' }
        ]
      }
    }],
  }, {
    name: 'entrance to lowroad (from landing)',
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/r' },
          { $ref: '#/def/q' },
          { $ref: '#/def/c' },
          { $ref: '#/def/h' },
          { $ref: '#/def/p' },
          { $ref: '#/def/o' },
          { $ref: '#/def/n' },
          { $ref: '#/def/m' },
          { $ref: '#/def/l' }
        ]
      }
    }]
  }, {
    name: 'landing, north access walkway',
    altitude: 15,
    incline: 2.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/u' },
          { $ref: '#/def/t' },
          { $ref: '#/def/s' },
          { $ref: '#/def/k' }
        ]
      }
    }],
  }, {
    name: 'lower plaza',
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/V' },
          { $ref: '#/def/W' },
          { $ref: '#/def/X' },
          { $ref: '#/def/Y' }
        ]
      }
    }],
  }, {
    name: 'lower plaza walkway 0 of 4',
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/Z0a' },
          { $ref: '#/def/Z0b' },
          { $ref: '#/def/Z0c' },
          { $ref: '#/def/Z0d' }
        ]
      }
    }],
  }, {
    name: 'lower plaza walkway 1 of 4',
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/Z1a' },
          { $ref: '#/def/Z1b' },
          { $ref: '#/def/Z1c' },
          { $ref: '#/def/Z1d' }
        ]
      }
    }],
  }, {
    name: 'lower plaza walkway 2 of 4',
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/Z2a' },
          { $ref: '#/def/Z2b' },
          { $ref: '#/def/Z2c' },
          { $ref: '#/def/Z2d' }
        ]
      }
    }],
  }, {
    name: 'lower plaza walkway 3 of 4',
    altitude: 7.5,
    floors: [{ 
      outline: {
        shape: 'polygon',
        corners: [
          { $ref: '#/def/Z3a' },
          { $ref: '#/def/Z3b' },
          { $ref: '#/def/Z3c' },
          { $ref: '#/def/Z3d' }
        ]
      }
    }],
  }]
}