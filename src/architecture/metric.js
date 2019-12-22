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
  'Population density  (per square mile)',
  UNIT.numberPerSquareFoot,
  feature => 5280 * 5280 * feature.getValueForMetric(METRIC.POPULATION) / feature.getValueForMetric(METRIC.LAND_AREA)
)
METRIC.FLOOR_AREA_RATIO = new Metric(
  'Floor area ratio',
  UNIT.ratio,
  feature => feature.getValueForMetric(METRIC.USABLE_FLOOR_AREA) / feature.getValueForMetric(METRIC.LAND_AREA)
)
METRIC.CIRCULATION_AREA_RATIO = new Metric(
  'Circulation area ratio',
  UNIT.ratio,
  feature => feature.getValueForMetric(METRIC.CIRCULATION_AREA) / feature.getValueForMetric(METRIC.USABLE_FLOOR_AREA)
)
METRIC.KINEMATIC_RANGE_30 = new Metric(
  'Kinematic range, 30 minute',
  UNIT.squareFeet,
  feature => 0 // TODO!
)
METRIC.DAYLIGHT_FACTOR_ESTIMATE = new Metric(
  'Daylight factor estimate',
  UNIT.ratio,
  feature => ((45 * feature.getValueForMetric(METRIC.WINDOW_AREA)) + (90 * feature.getValueForMetric(METRIC.WINDOW_AREA))) / (feature.getValueForMetric(METRIC.WALL_AREA) + (2 * feature.getValueForMetric(METRIC.USABLE_FLOOR_AREA)))
)

export { METRIC }
