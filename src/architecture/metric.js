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

METRIC.POPULATION = new Metric(
  'Population',
  UNIT.count,
  'The number of people in an area.'
)

METRIC.LAND_AREA = new Metric(
  'Land area',
  UNIT.squareFeet,
  'Raw ground area, not including water area.'
)

METRIC.WATER_AREA = new Metric(
  'Water area',
  UNIT.squareFeet,
  'Total area covered by water features, natural or artificial'
)

METRIC.PLANTED_AREA = new Metric(
  'Planted area',
  UNIT.squareFeet,
  'Total green space, including living roofs, planters, lawns, and wildlife land.'
)

METRIC.TRANSPORTATION_AREA = new Metric(
  'Transportation area',
  UNIT.squareFeet,
  'Total surface area of streets, sidewalks, bike paths, and parking spaces.'
)

METRIC.GROSS_FLOOR_AREA = new Metric(
  'Gross floor area',
  UNIT.squareFeet,
  `Includes exterior wall thickness, garages, attics, excavated basements, and
  covered porchs (with or without walls).
  Excludes outdoor parking lots, outdoor basketball courts, unexcavated basements,
  regions where ceiling is less than 3 feet above floor, and the portion of the
  second floor lost due to a 2-story tall lobby.
  Example: a one-story building that is 10 feet by 10 feet on the exterior has a
  Gross floor area of 100 square feet`
)

METRIC.STRUCTURAL_AREA = new Metric(
  'Structural area',
  UNIT.squareFeet,
  `On a floor plan, the area taken up by the thickness of the walls (both exterior and interior).
  (This is the total area of the "poche" on the floor plan)`,
  feature => feature.getValueForMetric(METRIC.GROSS_FLOOR_AREA) - feature.getValueForMetric(METRIC.NET_FLOOR_AREA)
)

METRIC.CIRCULATION_AREA = new Metric(
  'Circulation area',
  UNIT.squareFeet,
  `Includes elevator shafts & elevator lobbies, stairwells & landings,
  corridors & lobbies, loading docks, tunnels & bridges.`
)

METRIC.BUILDING_SERVICE_AREA = new Metric(
  'Building service area',
  UNIT.squareFeet,
  'Includes public bathrooms, janitorial/custodial rooms, supply rooms, trash rooms, etc.'
)

METRIC.MECHANICAL_AREA = new Metric(
  'Mechanical area',
  UNIT.squareFeet,
  'Includes boiler rooms, telecom closets, vertical ventilation shafts and chimneys, service shafts, etc.'
)

METRIC.NET_NON_ASSIGNABLE_AREA = new Metric(
  'Net non-assignable area',
  UNIT.squareFeet,
  'The common spaces that could not be rented out or parceled out to different tenants',
  feature => feature.getValueForMetric(METRIC.CIRCULATION_AREA) + feature.getValueForMetric(METRIC.BUILDING_SERVICE_AREA) + feature.getValueForMetric(METRIC.MECHANICAL_AREA)
)

METRIC.NET_ASSIGNABLE_AREA = new Metric(
  'Net assignable area',
  UNIT.squareFeet,
  'Spaces that could be rented out or parceled out to different tenants'
)

METRIC.NET_FLOOR_AREA = new Metric(
  'Net floor area',
  UNIT.squareFeet,
  `This is the gross floor area minus the space the walls take up (which is
  the "structural area")`,
  feature => feature.getValueForMetric(METRIC.NET_NON_ASSIGNABLE_AREA) + feature.getValueForMetric(METRIC.NET_ASSIGNABLE_AREA)
)

METRIC.ROOF_AREA = new Metric(
  'Roof area',
  UNIT.squareFeet,
  'Surface area of roof faces.'
)

METRIC.SKYLIGHT_AREA = new Metric(
  'Skylight area',
  UNIT.squareFeet,
  'Surface area of skylights.'
)

METRIC.WALL_AREA = new Metric(
  'Wall area',
  UNIT.squareFeet,
  'Total surface area of a wall, including the area taken up by window openings and door openings.'
)

METRIC.WINDOW_AREA = new Metric(
  'Window area',
  UNIT.squareFeet,
  'Surface area of window raw openings.'
)

METRIC.DOOR_AREA = new Metric(
  'Door area',
  UNIT.squareFeet,
  'Surface area of doorway raw openings.'
)

METRIC.POPULATION_DENSITY = new Metric(
  'Population density',
  UNIT.numberPerSquareMile,
  'Number of people per area of land.',
  feature => 5280 * 5280 * feature.getValueForMetric(METRIC.POPULATION) / feature.getValueForMetric(METRIC.LAND_AREA)
)

METRIC.GROSS_FLOOR_AREA_RATIO = new Metric(
  'Gross floor area ratio (Gross FAR)',
  UNIT.ratio,
  'Ratio of "gross floor area" to "land area".',
  feature => feature.getValueForMetric(METRIC.GROSS_FLOOR_AREA) / feature.getValueForMetric(METRIC.LAND_AREA)
)

METRIC.NET_ASSIGNABLE_FLOOR_AREA_RATIO = new Metric(
  'Net assignable floor area ratio (Assignable FAR)',
  UNIT.ratio,
  'Ratio of "gross floor area" to "land area".',
  feature => feature.getValueForMetric(METRIC.NET_ASSIGNABLE_AREA) / feature.getValueForMetric(METRIC.LAND_AREA)
)

METRIC.KINEMATIC_RANGE_30 = new Metric(
  'Kinematic range, 30 minute',
  UNIT.squareFeet,
  'The total "net floor area" within a 30-minute travel radius.',
  feature => -1 // TODO: not yet implemented
)

METRIC.DAYLIGHT_FACTOR_ESTIMATE = new Metric(
  'Daylight factor estimate',
  UNIT.ratio,
  `This is based on the BRE Method for estimating the daylight factor,
  as part of the Simplified Building Energy Model (SBEM). See: bregroup.com`,
  feature => ((45 * feature.getValueForMetric(METRIC.WINDOW_AREA)) + (90 * feature.getValueForMetric(METRIC.WINDOW_AREA))) / (feature.getValueForMetric(METRIC.WALL_AREA) + (2 * feature.getValueForMetric(METRIC.GROSS_FLOOR_AREA)))
)

export { METRIC }
