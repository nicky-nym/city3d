export default /* eslint-disable */
{
  "$id": "building.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Building",
  "description": "Any building, with walls, floors, a roof, etc.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'building.schema.json',
      name: 'Empire State Building',
      unit: 'feet',
      anchorPoint: { x: 0, y: 0, z: 0 },
      storeys: [{
        floor: {
          outline: {
            shape: 'rectangle',
            size: { x: 200, y: 200 }  
          }
        }
      }],
      extras: { permitInfo: {}, budget: {}, authors: {} }
    },
    {
      name: 'Garage',
      unit: 'feet',
      storeys: [{
        height: 8,
        floor: { 
          outline: { shape: 'rectangle', size: { x: 24, y: 21 } },
        },
        rooms: [],
        roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
        ceiling: {},
        walls: []
      }],
      extras: { permitInfo: {}, budget: {}, authors: {} }
    }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "building.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "def": { "$ref": "definitions.json#/def/def" },
    "anchorPoint": {
      "description": "the point that serves as the center of the building when the building is place on a parcel",
      "$ref": "xy.schema.json"
    },
    "storeys": {
      "type": "array",
      "items": {
        "$ref": "storey.schema.json"
      }
    },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
