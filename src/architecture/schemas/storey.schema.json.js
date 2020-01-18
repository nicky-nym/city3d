export default /* eslint-disable */
{
  "$id": "storey.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Storey",
  "description": "A single storey, with walls, rooms, a floor, a ceiling, etc.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'storey.schema.json',
      name: 'Third floor',
      unit: 'feet',
      floor: {
        outline: {
          shape: 'rectangle',
          size: { x: 200, y: 200 }
        }
      },
      extras: { budget: {}, authors: {} }
    },
    {
      height: 8,
      floor: {  },
      rooms: [],
      roof: { form: 'pitched', pitch: { rise: 8, run: 12 } },
      ceiling: {},
      walls: {
        exterior: [],
        interior: []
      }
    }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": {
      "const": "city3d"
    },
    "type": {
      "const": "storey.schema.json"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "height": {
      "type": "number"
    },
    "floor": {
      "$ref": "floor.schema.json"
    },
    "roof": {
      "$ref": "roof.schema.json"
    },
    "ceiling": {
      "$ref": "ceiling.schema.json"
    },
    "walls": {
      "type": "object",
      "required": [  ],
      "properties": {
        "exterior": {
          "type": "array",
          "items": {
            "$ref": "wall.schema.json"
          }
        },
        "interior": {
          "type": "array",
          "items": {
            "$ref": "wall.schema.json"
          }
        }
      }
    },
    "rooms": {
      "type": "array",
      "items": {
        "$ref": "room.schema.json"
      }
    },
    "extras": {
      "description": "any additional data to keep track of",
      "type": "object"
    }
  }
}
