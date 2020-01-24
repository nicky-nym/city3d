/** @file catalog.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

/**
 * Class representing a catalog of model specification objects.
 */
class Catalog {
  constructor () {
    this._registry = {}
  }

  /**
   * Register a specification object so that we can look it up by name.
   */
  registerSpec (specification) {
    if (Array.isArray(specification)) {
      const _this = this
      specification.forEach(function (spec) { _this._registry[spec.name] = spec })
    } else {
      this._registry[specification.name] = specification
    }
  }

  /**
   * Return the specification object that was registered under a given name.
   */
  getSpec (name) {
    return this._registry[name]
  }
}

export { Catalog }
