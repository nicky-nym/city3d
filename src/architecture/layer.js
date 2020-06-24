/** @file layer.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Layer } from '../core/layer.js'

const LAYER_ID = Object.freeze({
  // buildings
  ROOFS: 'roofs',
  WALLS: 'walls',
  FLOORS: 'floors',
  COPIES: 'copies',
  PORTALS: 'doors (TODO) & windows',
  PAVEMENT: 'streets & sidewalks',
  STRUCTURES: 'structures',

  // occupants
  PEOPLE: 'people',
  ANIMALS: 'animals',
  VEHICLES: 'vehicles',
  FURNITURE: 'furniture',

  // landscape
  GROUND: 'ground',
  WATER: 'water',
  PLANTS: 'trees & plants',
  CLOUDS: 'clouds (TODO)',
  FOG: 'fog (TODO)',
  LIGHTNING: 'lightning (TODO)',

  // highlighting
  DISTRICTS: 'district boundaries',
  PARCELS: 'parcel boundaries',
  ROUTES: 'vehicle routes',
  GRID: 'grid',
  /* TODO:
  TOOLTIPS: 'tooltips',
  SUN_PATH: 'sun path & day arcs',
  DAYLIGHT: 'daylight factor heatmap',
  KINEMATIC_RANGE: 'kinematic range heatmap',
  GREEN_SPACE: 'green space heatmap',
  ASSIGNABLE_FAR: 'assignable FAR heatmap',
   */

  // floor area
  ASSIGNABLE: 'assignable (TODO)',
  CIRCULATION: 'circulation (TODO)',
  BUILDING_SERVICES: 'building services (TODO)',
  MECHANICAL: 'mechanical (TODO)',
  STRUCTURAL: 'structural (TODO)'
})

const CATEGORIES = [{
  category: 'Buildings',
  layers: [
    { id: LAYER_ID.ROOFS },
    { id: LAYER_ID.WALLS },
    { id: LAYER_ID.FLOORS },
    { id: LAYER_ID.COPIES },
    { id: LAYER_ID.PORTALS },
    { id: LAYER_ID.PAVEMENT, description: 'streets, sidewalks, bike paths, parking lots' },
    { id: LAYER_ID.STRUCTURES }
  ]
}, {
  category: 'Occupants',
  layers: [
    { id: LAYER_ID.PEOPLE },
    { id: LAYER_ID.ANIMALS },
    { id: LAYER_ID.VEHICLES },
    { id: LAYER_ID.FURNITURE }
  ]
}, {
  category: 'Landscape',
  layers: [
    { id: LAYER_ID.GROUND },
    { id: LAYER_ID.WATER },
    { id: LAYER_ID.PLANTS },
    { id: LAYER_ID.CLOUDS },
    { id: LAYER_ID.FOG },
    { id: LAYER_ID.LIGHTNING }
  ]
}, {
  category: 'Highlighting',
  layers: [
    { id: LAYER_ID.DISTRICTS },
    { id: LAYER_ID.PARCELS },
    { id: LAYER_ID.ROUTES },
    { id: LAYER_ID.GRID }
  ]
}, {
  category: 'Floor area (TODO)',
  layers: [
    { id: LAYER_ID.ASSIGNABLE, description: 'homes, apartments, retail stores, office space' },
    { id: LAYER_ID.CIRCULATION, description: 'stairs, elevators, ramps, lobbies, hallways' },
    { id: LAYER_ID.BUILDING_SERVICES, description: 'bathrooms, trash rooms, supply closets' },
    { id: LAYER_ID.MECHANICAL, description: 'boiler rooms, ventilation shafts' },
    { id: LAYER_ID.STRUCTURAL, description: 'walls' }
  ]
}]

for (const categorySpec of CATEGORIES) {
  const category = categorySpec.category
  for (const layerSpec of categorySpec.layers) {
    const description = layerSpec.description
    Layer.register(layerSpec.id, { category, description })
  }
}

const LAYER = {}
const keys = Object.keys(LAYER_ID)
for (const key of keys) {
  LAYER[key] = Layer.getLayer(LAYER_ID[key])
}
Object.freeze(LAYER)

export { LAYER }
