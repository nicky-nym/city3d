export default /* eslint-disable */
{
  "$id": "room.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Room",
  "description": "A room in a building'",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'room.schema.json',
      name: 'Lobby',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 12, y: 14 }
      },
      use: 'circulation',
      contents: [{
        copy: { $ref: 'CITY.furniture.sofa' },
        at: { x: 6, y: 0 }
      }],
      extras: { budget: {}, authors: {} }
    }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": {
      "const": "city3d"
    },
    "type": {
      "const": "room.schema.json"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "use": {
      "enum": ["circulation", "building service", "mechanical", "assignable"]
    },
    "contents": {
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    },
    "extras": {
      "description": "any additional data to keep track of",
      "type": "object"
    }
  }
}
