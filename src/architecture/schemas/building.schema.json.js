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
      storeys: [{
        floor: {
          shape: 'rectangle',
          size: { x: 200, y: 200 }
        }
      }]
    },
    {
      name: 'Garage',
      unit: 'feet',
      storeys: [{
        height: 8,
        floor: { shape: 'rectangle', size: { x: 24, y: 21 } },
        rooms: [],
        roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
        ceiling: {},
        walls: []
      }]

    }
  ],
  "required": [],
  "properties": {
    "context": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "storeys": {
      "type": "array",
      "items": {
        "$ref": "storey.schema.json"
      }
    }
  }
}