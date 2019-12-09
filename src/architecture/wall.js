/** @file wall.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Group } from './group.js'

/**
* Wall is a class to represent a single flat wall on a single storey of a building.
* For example, a square garden shed would have four walls, and four instances of Wall.
* A one-storey house would have 4 instances of Wall, and a two-storey house would
* have 8 instances of wall.
* Walls can have Doors and Windows.
*/
class Wall extends Group {
}

export { Wall }
