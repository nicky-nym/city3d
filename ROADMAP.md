## City3D software features

### Geometry features

|    | Current                                     | Future                    |
|:-- | :-----                                      | :-----                    |
|    | *(as of March 2020)*                        |
|    | Shapes:<br>~ lines<br>~ polygonal slabs with holes<br>~ inclined slabs | ~ puffy trees<br>~ curved arches    
|    | ~ Rotated objects<br>~ Mirrored objects                  | ~ Scaled objects
|    | Levels of Detail *(LOD)*                     | Materials & textures
|    | Animation & path-following                  | Shadows
|    | Layers                                      | Light bulbs
|    | Instanced features                          |

### Architectural modeling features

|    | Current                                     | Future                    |
|:-- | :-----                                      | :-----                    |
|    | Basic components:<br>~ walls<br>~ floors<br>~ roofs<br>~ pavement<br>~ window & door openings<br>~ stairs | More components:<br>~ railings & fences <br>~ elevators<br>~ ceilings<br>~ light fixtures<br>~ window panes<br>~ door panels<br>~ skylights & atriums
|    | Roof features:<br>~ gables<br>~ pitched<br>~ shed<br>~ living roofs | Complex roof solver *(via straight skeletons)*
|    | Parcels & districts                         |
|    | Repeat patterns                             | Building materials & textures
|    | Randomness                                  | Paint colors
|    | JSON spec file formats |

### Content models

|    | Current                                  | Future                    |
|:-- | :-----                                   | :-----                    |
|    | Bicycles, vehicles, and routes           |
|    | Landscape elements: canals, trees        |
|    | Structures:<br>~ SwingSet<br>~ EiffelTower<br>~ Pyramid<br>~ UtilityPole<br>~ Table |
|    | Districts & buildings:<br>~ suburbia: house_353<br>~ rural: house_1127<br>~ urban: highrise<br>~ kinematic: lattice & midrise<br>~ campus: Wurster Hall |

### Traffic simulation

|    | Current                                  | Future                    |
|:-- | :-----                                   | :-----                    |
|    | Animated bicycles                        | Traffic flow simulation   |
|    |                                          | Conjestion heatmaps       |
|    |                                          | Analysis & reporting      |
|    |                                          | Kinematic range reporting |

### Output rendering

|    | Current                                    | Future                    |
|:-- | :-----                                     | :-----                    |
|    | Web browser *(via Three.js & WebGL)*       | VR headset                |

### UI features

|    | Current                                   | Future                    |
|:-- | :-----                                    | :-----                     |
|    | First-person camera controls via keyboard | Vehicles as camera dollies |
|    | Orbit controls via mouse                  | Time-of-day & time-of-year lighting
|    | Save & restore camera location            | Fog, rain, and other weather visual effects
|    | Menus *(via dat.gui)*                     |
|    | Section cut views                         |
|    | Model-switcher UI                         | 

### Metrics & reporting

|    | Current                                  | Future                    |
|:-- | :-----                                   | :-----                    |
|    | Table views for reporting metrics        | ~ Graphs<br>~ Charts          |
|    | Simple metrics like floor area           | More metrics:<br>~ Floor Area Ratio (FAR)<br>~ Daylight Factor Estimates<br>~ Kinematic Range Estimates |


### Software Dev Infrastructure

|    | Current                                    | Future                    |
|:-- | :-----                                     | :-----                    |
|    | Unit tests *(via mocha, chai, & standard)* |                           |
|    | Build step *(via rollup)*                  | minification *(via terser)* |
|    | Schema validation *(via Ajv)*              |                           |
|    | Online demo page                           |                           |







