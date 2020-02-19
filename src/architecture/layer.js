/** @file layer.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Layer } from '../core/layer.js'

const LAYER = {
  // buildings
  ROOFS: 'roofs',
  WALLS: 'walls',
  FLOORS: 'floors',
  COPIES: 'copies',
  PORTALS: 'TODO: doors & windows',
  PAVEMENT: 'streets & sidewalks',
  STRUCTURES: 'structures',

  // occupants
  PEOPLE: 'people (TODO)',
  ANIMALS: 'animals (TODO)',
  VEHICLES: 'vehicles',
  FURNITURE: 'furniture (TODO)',

  // landscape
  GROUND: 'ground (TODO)',
  WATER: 'water',
  PLANTS: 'trees & plants',
  CLOUDS: 'clouds (TODO)',
  FOG: 'fog (TODO)',
  LIGHTNING: 'lightning (TODO)',

  // highlighting
  DISTRICTS: 'district boundaries',
  PARCELS: 'parcel boundaries',
  ROUTES: 'vehicle routes (TODO)',
  /* TODO:
  TOOLTIPS: 'tooltips',
  GRID: 'grid',
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
}

const CATEGORIES = [{
  category: 'Buildings',
  layers: [
    { id: LAYER.ROOFS },
    { id: LAYER.WALLS },
    { id: LAYER.FLOORS },
    { id: LAYER.COPIES },
    { id: LAYER.PORTALS },
    { id: LAYER.PAVEMENT, description: 'streets, sidewalks, bike paths, parking lots' },
    { id: LAYER.STRUCTURES }
  ]
}, {
  category: 'Occupants',
  layers: [
    { id: LAYER.PEOPLE },
    { id: LAYER.ANIMALS },
    { id: LAYER.VEHICLES },
    { id: LAYER.FURNITURE }
  ]
}, {
  category: 'Landscape',
  layers: [
    { id: LAYER.GROUND },
    { id: LAYER.WATER },
    { id: LAYER.PLANTS },
    { id: LAYER.CLOUDS },
    { id: LAYER.FOG },
    { id: LAYER.LIGHTNING }
  ]
}, {
  category: 'Highlighting',
  layers: [
    { id: LAYER.DISTRICTS },
    { id: LAYER.PARCELS },
    { id: LAYER.ROUTES }
  ]
}, {
  category: 'Floor area (TODO)',
  layers: [
    { id: LAYER.ASSIGNABLE, description: 'homes, apartments, retail stores, office space' },
    { id: LAYER.CIRCULATION, description: 'stairs, elevators, ramps, lobbies, hallways' },
    { id: LAYER.BUILDING_SERVICES, description: 'bathrooms, trash rooms, supply closets' },
    { id: LAYER.MECHANICAL, description: 'boiler rooms, ventilation shafts' },
    { id: LAYER.STRUCTURAL, description: 'walls' }
  ]
}]

for (const categorySpec of CATEGORIES) {
  const category = categorySpec.category
  for (const layerSpec of categorySpec.layers) {
    const description = layerSpec.description
    Layer.register(layerSpec.id, { category, description })
  }
}

const keys = Object.keys(LAYER)
for (const key of keys) {
  LAYER[key] = Layer.getLayer(LAYER[key])
}

export { LAYER }
