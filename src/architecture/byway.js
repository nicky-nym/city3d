/** @file byway.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Storey } from './storey.js'

/**
* Byway is a class for representing roads, sidewalks, bike paths, etc.
*/
class Byway extends Storey {
  constructor (ray, use, corners, { z = 0, incline = 0, depth = -0.5, name } = {}) {
    super(ray, use, corners, { z, incline, depth, name })
  }
}

export { Byway }
