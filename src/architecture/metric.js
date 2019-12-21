/** @file metric.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { UNIT } from '../core/unit.js'
import { Metric } from '../metrics/metric.js'

// raw metrics
const METRIC = {}
METRIC.POPULATION = new Metric('Population', UNIT.count)
METRIC.LAND_AREA = new Metric('Land area', UNIT.squareFeet)
METRIC.WATER_AREA = new Metric('Water area', UNIT.squareFeet)
METRIC.PLANTED_AREA = new Metric('Planted area', UNIT.squareFeet)
METRIC.FLOOR_AREA = new Metric('Floor area', UNIT.squareFeet)
METRIC.GROSS_FLOOR_AREA = new Metric('Gross floor area', UNIT.squareFeet)
METRIC.CIRCULATION_AREA = new Metric('Circulation area', UNIT.squareFeet)
METRIC.USABLE_FLOOR_AREA = new Metric('Usable floor area', UNIT.squareFeet)
METRIC.ROOF_AREA = new Metric('Roof area', UNIT.squareFeet)
METRIC.SKYLIGHT_AREA = new Metric('Skylight area', UNIT.squareFeet)
METRIC.WINDOW_AREA = new Metric('Window area', UNIT.squareFeet)
METRIC.DOOR_AREA = new Metric('Door area', UNIT.squareFeet)
METRIC.WALL_AREA = new Metric('Wall area', UNIT.squareFeet)

// derived metrics
METRIC.POPULATION_DENSITY = new Metric(
  'Population density',
  UNIT.numberPerSquareFoot,
  feature => METRIC.POPULATION.getValue(feature) / METRIC.LAND_AREA.getValue(feature)
)
METRIC.FLOOR_AREA_RATIO = new Metric(
  'Floor area ratio',
  UNIT.ratio,
  feature => METRIC.GROSS_FLOOR_AREA.getValue(feature) / METRIC.LAND_AREA.getValue(feature)
)
METRIC.CIRCULATION_AREA_RATIO = new Metric(
  'Circulation area ratio',
  UNIT.ratio,
  feature => METRIC.CIRCULATION_AREA.getValue(feature) / METRIC.GROSS_FLOOR_AREA.getValue(feature)
)
METRIC.KINEMATIC_RANGE_30 = new Metric(
  'Kinematic range, 30 minute',
  UNIT.squareFeet,
  feature => 0 // TODO!
)
METRIC.DAYLIGHT_FACTOR_ESTIMATE = new Metric(
  'Daylight factor estimate',
  UNIT.ratio,
  feature => ((45 * METRIC.WINDOW_AREA.getValue(feature)) + (90 * METRIC.WINDOW_AREA.getValue(feature))) / (METRIC.WALL_AREA.getValue(feature) + (2 * METRIC.GROSS_FLOOR_AREA.getValue(feature)))
)

export { METRIC }
