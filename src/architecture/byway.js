/** @file byway.js
 * @author Authored in 2019, 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Storey } from './storey.js'

/**
* Byway is a class for representing roads, sidewalks, bike paths, etc.
*/
class Byway extends Storey {
  constructor ({
    name,
    pose,
    outline,
    deprecatedSpec = {}
  } = {}) {
    const use = deprecatedSpec.use
    const z = deprecatedSpec.z || 0
    const incline = deprecatedSpec.incline || 0
    const depth = deprecatedSpec.depth || -0.5
    super({ name, pose, outline, deprecatedSpec: { use, z, incline, depth } })
  }
}

export { Byway }
