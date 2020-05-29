export default /* eslint-disable */
{
  context: 'city3d',
  type: 'district.schema.json',
  name: 'Manhattan',
  metadata: {
    license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
    creator: 'Authored at <https://github.com/nicky-nym/city3d>',
    date: '2020'
  },
  unit: 'feet',
  anchorPoint: { x: 360, y: 270, z: 0 },
  comments: [
    '                                       ',
    '                                Q   R  ',
    '                                |   |  ',
    '                                :   :  ',
    '                                |   |  ',
    '       K---L----------------I---C---D  ',
    '       |   |     north      |   |   |  ',
    '       |   P----------------O   | a |  ',
    '       | w |                | e | v |  ',
    '       | e |                | a | e |  ',
    '       | s |                | s | n |  ',
    '       | t |                | t | u |  ',
    '       |   M----------------N   | e |  ',
    '       |   |     south      |   |   |  ',
    '  T-..-F---J----------------H---G   |  ',
    '  |    |         street         |   |  ',
    '  S-..-E------------------------B---A  ',
    '                                       '
  ],
  def: {
    /* avenue */
    A: { x: 0, y: 0 },
    B: { x: -60, y: 0 },
    C: { x: -60, y: 264 },
    D: { x: 0, y: 264 },
    /* street */
    E: { x: -700, y: 0 },
    F: { x: -700, y: 32 },
    G: { x: -60, y: 32 },
    /* sidewalk, east */
    H: { x: -80, y: 32 },
    I: { x: -80, y: 264 },
    /* sidewalk, west */
    J: { x: -680, y: 32 },
    K: { x: -700, y: 264 },
    L: { x: -680, y: 264 },
    /* sidewalk, south */
    M: { x: -680, y: 48 },
    N: { x: -80, y: 48 },
    /* sidewalk, north */
    O: { x: -80, y: 248 },
    P: { x: -680, y: 248 },
    /* full-length avenue */
    Q: { x: -60, y: 216 * 264 },
    R: { x: 0, y: 216 * 264 },
    /* full-length street */
    S: { x: 10 * -700, y: 0 },
    T: { x: 10 * -700, y: 32 },
    peoplePerBlock: 682,
    population: 682 * 11 * 217
  },
  parcels: [],
  contents: [{
    copy: { $ref: 'Highrise building' },
    pose: { x: -180, y: 48 },
    numRandomPartitions: 5,
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } },
      { count: 6, offset: { x: -100 } },
      { count: 2, offset: { x: -60, y: 496, rotated: 180 } } // x, y adjusted for rotation
    ]
  }],
  /* TODO: rotate street grid by -29 degrees */
  pavement: [{
    name: 'avenue',
    surface: { material: 'asphalt' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/A' },
        { $ref: '#/def/B' },
        { $ref: '#/def/C' },
        { $ref: '#/def/D' }
      ]
    },
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } }
    ]
  }, {
    name: 'street',
    surface: { material: 'asphalt' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/B' },
        { $ref: '#/def/E' },
        { $ref: '#/def/F' },
        { $ref: '#/def/G' }
      ]
    },
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } }
    ]
  }, {
    name: 'sidewalk, west',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/G' },
        { $ref: '#/def/H' },
        { $ref: '#/def/I' },
        { $ref: '#/def/C' }
      ]
    },
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } }
    ]
  }, {
    name: 'sidewalk, east',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/J' },
        { $ref: '#/def/F' },
        { $ref: '#/def/K' },
        { $ref: '#/def/L' }
      ]
    },
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } }
    ]
  }, {
    name: 'sidewalk, south',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/H' },
        { $ref: '#/def/J' },
        { $ref: '#/def/M' },
        { $ref: '#/def/N' }
      ]
    },
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } }
    ]
  }, {
    name: 'sidewalk, north',
    surface: { material: 'concrete' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/O' },
        { $ref: '#/def/P' },
        { $ref: '#/def/L' },
        { $ref: '#/def/I' }
      ]
    },
    repeat: [
      { count: 4, offset: { x: -700 } },
      { count: 6, offset: { y: 264 } }
    ]
  }, {
    name: '11 parallel avenues',
    surface: { material: 'asphalt' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/A' },
        { $ref: '#/def/B' },
        { $ref: '#/def/Q' },
        { $ref: '#/def/R' }
      ]
    },
    repeat: { count: 11, offset: { x: -700 } }
  }, {
    name: '217 parallel streets',
    surface: { material: 'asphalt' },
    outline: {
      shape: 'polygon',
      corners: [
        { $ref: '#/def/B' },
        { $ref: '#/def/S' },
        { $ref: '#/def/T' },
        { $ref: '#/def/G' }
      ]
    },
    repeat: { count: 217, offset: { y: 264 } }
  }],
  comment: [
    'Boundary corners for the island of Manhattan.',
    'The proportions here are pretty accurate, but the overall scale',
    'is probably off by 5% or 10% one way or the other. Needs adjustment',
    'if you care about that. Also, even if the scale is corrected, the',
    'total land area number will still be lower than the official',
    'Manhattan borough of New York City, because the official borough',
    'also includes not just the island of Manhattan, but also Roosevelt Island,',
    'Governors Island, the Statue of Liberty, Randalls and Wards Islands, etc.'
  ],
  border: {
    shape: 'polygon',
    at: { x: -12200, y: -6000 },
    corners: [
      { x: 30160, y: 62408 },
      { x: 29708, y: 60435 },
      { x: 29096, y: 59981 },
      { x: 28566, y: 59759 },
      { x: 28861, y: 59371 },
      { x: 28581, y: 58994 },
      { x: 28068, y: 58435 },
      { x: 27696, y: 58004 },
      { x: 27306, y: 57994 },
      { x: 27071, y: 57282 },
      { x: 25737, y: 54669 },
      { x: 25323, y: 53771 },
      { x: 24887, y: 52820 },
      { x: 24487, y: 52075 },
      { x: 24335, y: 51373 },
      { x: 24331, y: 51356 },
      { x: 23862, y: 49897 },
      { x: 23525, y: 48509 },
      { x: 23525, y: 47171 },
      { x: 23865, y: 44850 },
      { x: 23740, y: 42728 },
      { x: 23717, y: 41540 },
      { x: 23717, y: 40594 },
      { x: 23717, y: 39803 },
      { x: 23908, y: 39138 },
      { x: 24462, y: 38549 },
      { x: 25294, y: 37052 },
      { x: 25334, y: 35784 },
      { x: 25189, y: 34761 },
      { x: 24442, y: 34114 },
      { x: 23414, y: 33270 },
      { x: 22975, y: 32377 },
      { x: 22588, y: 31678 },
      { x: 21318, y: 30191 },
      { x: 21466, y: 29516 },
      { x: 21716, y: 28784 },
      { x: 21977, y: 28108 },
      { x: 21494, y: 27478 },
      { x: 20811, y: 26690 },
      { x: 19416, y: 24709 },
      { x: 18661, y: 23530 },
      { x: 16700, y: 21021 },
      { x: 15282, y: 18869 },
      { x: 14027, y: 16972 },
      { x: 13731, y: 16038 },
      { x: 13645, y: 15033 },
      { x: 13517, y: 14592 },
      { x: 13859, y: 13783 },
      { x: 13160, y: 13250 },
      { x: 13787, y: 12681 },
      { x: 13081, y: 12462 },
      { x: 13294, y: 11993 },
      { x: 13962, y: 10537 },
      { x: 13814, y: 9557 },
      { x: 13706, y: 9024 },
      { x: 13622, y: 8940 },
      { x: 13622, y: 8792 },
      { x: 13156, y: 6410 },
      { x: 12666, y: 5263 },
      { x: 12151, y: 4526 },
      { x: 11444, y: 4164 },
      { x: 10567, y: 3942 },
      { x: 9562, y: 3786 },
      { x: 8846, y: 3526 },
      { x: 8693, y: 4049 },
      { x: 8499, y: 4243 },
      { x: 8162, y: 4222 },
      { x: 7099, y: 4008 },
      { x: 6135, y: 3511 },
      { x: 5780, y: 3031 },
      { x: 5913, y: 2473 },
      { x: 4643, y: 1012 },
      { x: 3740, y: 1417 },
      { x: 3593, y: 482 },
      { x: 3253, y: 780 },
      { x: 2695, y: 668 },
      { x: 2169, y: 418 },
      { x: 1593, y: 708 },
      { x: 1343, y: 1076 },
      { x: 1083, y: 1585 },
      { x: 1384, y: 2032 },
      { x: 1057, y: 2304 },
      { x: 422, y: 2373 },
      { x: 529, y: 3067 },
      { x: 769, y: 4115 },
      { x: 999, y: 5033 },
      { x: 1126, y: 6264 },
      { x: 1636, y: 9215 },
      { x: 1748, y: 10039 },
      { x: 2528, y: 10294 },
      { x: 2676, y: 10548 },
      { x: 1891, y: 11235 },
      { x: 2237, y: 11589 },
      { x: 1935, y: 11829 },
      { x: 2801, y: 12173 },
      { x: 2039, y: 12678 },
      { x: 2274, y: 13487 },
      { x: 2639, y: 13869 },
      { x: 3044, y: 14152 },
      { x: 2445, y: 14336 },
      { x: 2401, y: 14634 },
      { x: 2700, y: 14953 },
      { x: 2417, y: 15351 },
      { x: 2312, y: 15782 },
      { x: 2424, y: 16440 },
      { x: 2868, y: 17911 },
      { x: 3161, y: 18666 },
      { x: 2853, y: 19436 },
      { x: 3212, y: 20390 },
      { x: 3467, y: 20074 },
      { x: 3868, y: 20219 },
      { x: 3937, y: 20696 },
      { x: 3687, y: 20994 },
      { x: 3763, y: 21369 },
      { x: 4181, y: 22144 },
      { x: 4378, y: 22391 },
      { x: 4633, y: 22476 },
      { x: 4381, y: 22733 },
      { x: 5245, y: 23195 },
      { x: 4931, y: 23453 },
      { x: 5186, y: 23771 },
      { x: 5568, y: 23815 },
      { x: 5273, y: 24032 },
      { x: 5882, y: 24095 },
      { x: 5648, y: 24345 },
      { x: 5655, y: 24705 },
      { x: 6275, y: 24628 },
      { x: 5859, y: 24939 },
      { x: 6227, y: 25046 },
      { x: 6033, y: 25301 },
      { x: 6398, y: 25585 },
      { x: 6306, y: 26003 },
      { x: 6508, y: 26424 },
      { x: 7117, y: 27296 },
      { x: 7242, y: 26982 },
      { x: 7523, y: 27107 },
      { x: 7400, y: 27788 },
      { x: 7668, y: 28086 },
      { x: 7821, y: 28384 },
      { x: 8252, y: 28915 },
      { x: 7862, y: 29170 },
      { x: 8287, y: 29318 },
      { x: 8729, y: 29425 },
      { x: 9037, y: 29958 },
      { x: 9856, y: 31401 },
      { x: 10216, y: 32230 },
      { x: 10820, y: 32990 },
      { x: 11258, y: 33819 },
      { x: 12054, y: 35308 },
      { x: 12603, y: 36438 },
      { x: 12773, y: 37006 },
      { x: 13936, y: 38993 },
      { x: 14721, y: 40454 },
      { x: 15137, y: 41451 },
      { x: 15642, y: 42278 },
      { x: 16002, y: 42940 },
      { x: 15773, y: 43302 },
      { x: 16300, y: 43637 },
      { x: 16625, y: 44210 },
      { x: 16875, y: 44236 },
      { x: 17061, y: 44471 },
      { x: 18454, y: 46516 },
      { x: 19490, y: 48699 },
      { x: 20127, y: 50864 },
      { x: 20765, y: 52547 },
      { x: 20260, y: 53853 },
      { x: 20393, y: 54686 },
      { x: 20921, y: 55097 },
      { x: 21770, y: 56178 },
      { x: 23144, y: 58601 },
      { x: 24103, y: 60457 },
      { x: 24484, y: 62151 },
      { x: 24507, y: 62896 },
      { x: 24952, y: 63640 },
      { x: 25605, y: 64357 },
      { x: 26103, y: 64637 },
      { x: 26884, y: 63768 },
      { x: 27097, y: 63044 },
      { x: 27773, y: 62936 },
      { x: 27990, y: 63449 },
      { x: 28831, y: 63215 },
      { x: 30160, y: 62408 }
    ]
  }
}
