/** @file metric.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

// import { UNIT } from '../core/unit.js'

/**
 * Metric is a class for representing measurable physical attributes, such as LAND_AREA and POPULATION.
 * You can think of each instance of Metric as being sort of like the column header
 * information in a spreadsheet table. Each instance of Metric knows its own
 * display name and the unit-of-measure used for its values, but the actual values
 * are stored elsewhere (by analogy, the values are down in the cells of the
 * spreadsheet, not in the column headers).
 */
class Metric {
  /**
   * Creates a new instance that represents some measurable physical attribute.
   * @param {string} displayName - a display name to show the user when reporting values
   * @param {UNIT} unit - the unit of measure that values are measured in
   * @param {string} description - a definition to show the user
   * @param {function=} formula - an optional JavaScript function that returns a number value
   */
  constructor (displayName, unit, description, formula = null) {
    this.displayName = displayName
    this.unit = unit
    this.description = description
    this.formula = formula
  }
}

export { Metric }
