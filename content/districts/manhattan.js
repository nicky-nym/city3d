/** @file manhattan.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../../src/core/unit.js'
import { xy, xyz, countTo, rectangleOfSize } from '../../src/core/util.js'
import { Byway } from '../../src/architecture/byway.js'
import { District } from '../../src/architecture/district.js'
import { FeatureInstance } from '../../src/core/feature.js'
import { Geometry } from '../../src/core/geometry.js'
import { Highrise } from '../buildings/highrise.js'
import { METRIC } from '../../src/architecture/metric.js'
import { Parcel } from '../../src/architecture/parcel.js'
import { Ray } from '../../src/core/ray.js'
import { Use } from '../../src/architecture/use.js'

const MANHATTEN_STREET_GRID_ORIENTATION = UNIT.degrees(-29)
const BLOCK_DX = UNIT.feet(600)
const BLOCK_DY = UNIT.feet(200)

const BUILDINGS_PER_STREET = 2
const BUILDINGS_PER_AVENUE = 6

const BUILDING_DX = BLOCK_DX / BUILDINGS_PER_AVENUE
const BUILDING_DY = BLOCK_DY / BUILDINGS_PER_STREET

const SIDEWALK_WIDTH_STREETS = UNIT.feet(16)
const SIDEWALK_WIDTH_AVENUES = UNIT.feet(20)
const STREET_WIDTH = UNIT.feet(32)
const AVENUE_WIDTH = UNIT.feet(60)
const HALF_STREET = STREET_WIDTH / 2
const HALF_AVENUE = AVENUE_WIDTH / 2

const INTERSECTION = [
  xy(0, 0),
  xy(HALF_AVENUE, 0),
  xy(HALF_AVENUE, HALF_STREET),
  xy(0, HALF_STREET)]
const STREET = [
  xy(0, 0),
  xy(BLOCK_DX, 0),
  xy(BLOCK_DX, HALF_STREET),
  xy(0, HALF_STREET)]
const AVENUE = [
  xy(0, 0),
  xy(HALF_AVENUE, 0),
  xy(HALF_AVENUE, BLOCK_DY),
  xy(0, BLOCK_DY)]
const SIDEWALK_FOR_STREET = [
  xy(0, 0),
  xy(BLOCK_DX, 0),
  xy(BLOCK_DX, SIDEWALK_WIDTH_STREETS),
  xy(0, SIDEWALK_WIDTH_STREETS)]
const SIDEWALK_FOR_AVENUE = [
  xy(0, 0),
  xy(0, BLOCK_DY),
  xy(SIDEWALK_WIDTH_AVENUES, BLOCK_DY),
  xy(SIDEWALK_WIDTH_AVENUES, 0)]
const REPEAT_DX = BLOCK_DX + AVENUE_WIDTH + (SIDEWALK_WIDTH_AVENUES * 2)
const REPEAT_DY = BLOCK_DY + STREET_WIDTH + (SIDEWALK_WIDTH_STREETS * 2)

// TODO: refactor to merge this with _makeLine() in EiffelTower, Swingset & UtilityPole
function _makeLine (waypoints, ray, color) {
  const adjustedWaypoints = ray.applyRay(waypoints)
  const line = new Geometry.Line(adjustedWaypoints)
  return new FeatureInstance(line, adjustedWaypoints[0], color)
}

/**
 * Manhattan objects know how to describe the city blocks in New York.
 */
class Manhattan extends District {
  makeByway (use, area, { x = 0, y = 0, z = 0, dx = 0, dy = 0 } = {}) {
    // TODO: This is messy. It needs some clean up.
    let ray = this._ray
    ray = new Ray(ray.az, xyz(ray.xyz.x, ray.xyz.y, z))
    const delta = new Ray(ray.az, ray.xyz)
    ray.xyz = delta.applyRay({ x: x + dx, y: y + dy })
    this._parcel.add(new Byway(ray, use, area))
  }

  addBuildingAt (x = 0, y = 0) {
    // TODO: This is messy. It needs some clean up.
    const z = 0
    const offset = { x, y, z }
    const size = { x: BUILDING_DX, y: BUILDING_DY }
    let ray = this._ray
    ray = new Ray(ray.az, xyz(ray.xyz.x, ray.xyz.y, 0))
    const x0 = ray.xyz.x
    const y0 = ray.xyz.y
    this._parcel.add(new Highrise(size, { ray, x0, y0, at: offset }))
  }

  addBlock (row = 0, col = 0) {
    const x = row * REPEAT_DX
    const y = col * REPEAT_DY

    for (const bx of countTo(BUILDINGS_PER_AVENUE)) {
      for (const by of countTo(BUILDINGS_PER_STREET)) {
        const x0 = HALF_AVENUE + SIDEWALK_WIDTH_AVENUES + x
        const y0 = HALF_STREET + SIDEWALK_WIDTH_STREETS + y
        const dx = bx * BUILDING_DX
        const dy = by * BUILDING_DY
        this.addBuildingAt(dx + x0, dy + y0)
      }
    }

    this.makeByway(Use.STREET, STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES })
    this.makeByway(Use.STREET, STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.makeByway(Use.STREET, AVENUE, { x: x, y: y, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.makeByway(Use.STREET, AVENUE, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y })
    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX })
    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })
    this.makeByway(Use.STREET, INTERSECTION, { x: x, y: y, dx: HALF_AVENUE + (SIDEWALK_WIDTH_AVENUES * 2) + BLOCK_DX, dy: HALF_STREET + (SIDEWALK_WIDTH_STREETS * 2) + BLOCK_DY })

    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET })
    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_STREET, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS + BLOCK_DY })
    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_AVENUE, { x: x, y: y, dx: HALF_AVENUE, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })
    this.makeByway(Use.WALKWAY, SIDEWALK_FOR_AVENUE, { x: x, y: y, dx: HALF_AVENUE + SIDEWALK_WIDTH_AVENUES + BLOCK_DX, dy: HALF_STREET + SIDEWALK_WIDTH_STREETS })

    return this
  }

  addBlocks (numRows = 2, numCols = 2) {
    this._ray.xyz.x += UNIT.feet(7200) // TODO: this places the blocks at about 1st Ave and 1st St
    this._ray.xyz.y += UNIT.feet(6000) //  TODO: someday we should adjust the location, and add more blocks
    this._ray.az = MANHATTEN_STREET_GRID_ORIENTATION
    this._addLowLevelOfDetailStreetsAndAvenues(this._ray)
    const corners = rectangleOfSize(xy(REPEAT_DX * numRows, REPEAT_DY * numCols))
    this._parcel = new Parcel(corners, this._ray)
    this.add(this._parcel)
    for (const row of countTo(numRows)) {
      for (const col of countTo(numCols)) {
        this.addBlock(row, col)
      }
    }
    const PEOPLE_PER_BLOCK = 682 // roughly accurate for actual Manhattan population density
    const population = PEOPLE_PER_BLOCK * numRows * numCols
    this.setValueForMetric(METRIC.POPULATION, population)
    return this
  }

  _addLowLevelOfDetailStreetsAndAvenues (ray) {
    const ASPHALT_GRAY = 0x222222
    const NUM_AVENUES = 11
    const NUM_STREETS = 217
    const ISLAND_WIDTH = (NUM_AVENUES - 1) * REPEAT_DX
    const ISLAND_LENGTH = (NUM_STREETS - 1) * REPEAT_DY
    const PAVEMENT_HEIGHT = 0.5
    for (const street of countTo(NUM_STREETS)) {
      const endpoints = [
        xyz(REPEAT_DX - ISLAND_WIDTH, street * REPEAT_DY, PAVEMENT_HEIGHT),
        xyz(REPEAT_DX, street * REPEAT_DY, PAVEMENT_HEIGHT)
      ]
      this.add(_makeLine(endpoints, ray, ASPHALT_GRAY))
    }
    for (const avenue of countTo(NUM_AVENUES)) {
      const x = REPEAT_DX + (avenue * -REPEAT_DX)
      const endpoints = [
        xyz(x, 0, PAVEMENT_HEIGHT),
        xyz(x, ISLAND_LENGTH, PAVEMENT_HEIGHT)
      ]
      this.add(_makeLine(endpoints, ray, ASPHALT_GRAY))
    }
  }
}

/**
 * Boundary corners for the island of Manhattan.
 * The proportions here are pretty accurate, but the overall scale
 * is probably off by 5% or 10% one way or the other. Needs adjustment
 * if you care about that. Also, even if the scale is corrected, the
 * total land area number will still be lower than the official
 * Manhattan borough of New York City, because the official borough
 * also includes not just the island of Manhattan, but also Roosevelt Island,
 * Governors Island, the Statue of Liberty, Randalls and Wards Islands, etc.
 */
Manhattan.BOUNDARY = [
  xy(30160, 62408),
  xy(29708, 60435),
  xy(29096, 59981),
  xy(28566, 59759),
  xy(28861, 59371),
  xy(28581, 58994),
  xy(28068, 58435),
  xy(27696, 58004),
  xy(27306, 57994),
  xy(27071, 57282),
  xy(25737, 54669),
  xy(25323, 53771),
  xy(24887, 52820),
  xy(24487, 52075),
  xy(24335, 51373),
  xy(24331, 51356),
  xy(23862, 49897),
  xy(23525, 48509),
  xy(23525, 47171),
  xy(23865, 44850),
  xy(23740, 42728),
  xy(23717, 41540),
  xy(23717, 40594),
  xy(23717, 39803),
  xy(23908, 39138),
  xy(24462, 38549),
  xy(25294, 37052),
  xy(25334, 35784),
  xy(25189, 34761),
  xy(24442, 34114),
  xy(23414, 33270),
  xy(22975, 32377),
  xy(22588, 31678),
  xy(21318, 30191),
  xy(21466, 29516),
  xy(21716, 28784),
  xy(21977, 28108),
  xy(21494, 27478),
  xy(20811, 26690),
  xy(19416, 24709),
  xy(18661, 23530),
  xy(16700, 21021),
  xy(15282, 18869),
  xy(14027, 16972),
  xy(13731, 16038),
  xy(13645, 15033),
  xy(13517, 14592),
  xy(13859, 13783),
  xy(13160, 13250),
  xy(13787, 12681),
  xy(13081, 12462),
  xy(13294, 11993),
  xy(13962, 10537),
  xy(13814, 9557),
  xy(13706, 9024),
  xy(13622, 8940),
  xy(13622, 8792),
  xy(13156, 6410),
  xy(12666, 5263),
  xy(12151, 4526),
  xy(11444, 4164),
  xy(10567, 3942),
  xy(9562, 3786),
  xy(8846, 3526),
  xy(8693, 4049),
  xy(8499, 4243),
  xy(8162, 4222),
  xy(7099, 4008),
  xy(6135, 3511),
  xy(5780, 3031),
  xy(5913, 2473),
  xy(4643, 1012),
  xy(3740, 1417),
  xy(3593, 482),
  xy(3253, 780),
  xy(2695, 668),
  xy(2169, 418),
  xy(1593, 708),
  xy(1343, 1076),
  xy(1083, 1585),
  xy(1384, 2032),
  xy(1057, 2304),
  xy(422, 2373),
  xy(529, 3067),
  xy(769, 4115),
  xy(999, 5033),
  xy(1126, 6264),
  xy(1636, 9215),
  xy(1748, 10039),
  xy(2528, 10294),
  xy(2676, 10548),
  xy(1891, 11235),
  xy(2237, 11589),
  xy(1935, 11829),
  xy(2801, 12173),
  xy(2039, 12678),
  xy(2274, 13487),
  xy(2639, 13869),
  xy(3044, 14152),
  xy(2445, 14336),
  xy(2401, 14634),
  xy(2700, 14953),
  xy(2417, 15351),
  xy(2312, 15782),
  xy(2424, 16440),
  xy(2868, 17911),
  xy(3161, 18666),
  xy(2853, 19436),
  xy(3212, 20390),
  xy(3467, 20074),
  xy(3868, 20219),
  xy(3937, 20696),
  xy(3687, 20994),
  xy(3763, 21369),
  xy(4181, 22144),
  xy(4378, 22391),
  xy(4633, 22476),
  xy(4381, 22733),
  xy(5245, 23195),
  xy(4931, 23453),
  xy(5186, 23771),
  xy(5568, 23815),
  xy(5273, 24032),
  xy(5882, 24095),
  xy(5648, 24345),
  xy(5655, 24705),
  xy(6275, 24628),
  xy(5859, 24939),
  xy(6227, 25046),
  xy(6033, 25301),
  xy(6398, 25585),
  xy(6306, 26003),
  xy(6508, 26424),
  xy(7117, 27296),
  xy(7242, 26982),
  xy(7523, 27107),
  xy(7400, 27788),
  xy(7668, 28086),
  xy(7821, 28384),
  xy(8252, 28915),
  xy(7862, 29170),
  xy(8287, 29318),
  xy(8729, 29425),
  xy(9037, 29958),
  xy(9856, 31401),
  xy(10216, 32230),
  xy(10820, 32990),
  xy(11258, 33819),
  xy(12054, 35308),
  xy(12603, 36438),
  xy(12773, 37006),
  xy(13936, 38993),
  xy(14721, 40454),
  xy(15137, 41451),
  xy(15642, 42278),
  xy(16002, 42940),
  xy(15773, 43302),
  xy(16300, 43637),
  xy(16625, 44210),
  xy(16875, 44236),
  xy(17061, 44471),
  xy(18454, 46516),
  xy(19490, 48699),
  xy(20127, 50864),
  xy(20765, 52547),
  xy(20260, 53853),
  xy(20393, 54686),
  xy(20921, 55097),
  xy(21770, 56178),
  xy(23144, 58601),
  xy(24103, 60457),
  xy(24484, 62151),
  xy(24507, 62896),
  xy(24952, 63640),
  xy(25605, 64357),
  xy(26103, 64637),
  xy(26884, 63768),
  xy(27097, 63044),
  xy(27773, 62936),
  xy(27990, 63449),
  xy(28831, 63215),
  xy(30160, 62408)
]

export { Manhattan }
