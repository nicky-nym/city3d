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
      floors: [{
        outline: {
          shape: 'rectangle',
          size: { x: 200, y: 200 }
        }
      }],
      extras: { budget: {}, authors: {} }
    },
    {
      height: 8,
      altitude: 40,
      floors: [],
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
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "storey.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "repeat": { "$ref": "definitions.json#/def/number" },
    "altitude": { "$ref": "definitions.json#/def/number" },
    "height": { "$ref": "definitions.json#/def/number" },
    "incline": { "$ref": "definitions.json#/def/number" },
    "floors": {
      "type": "array",
      "items": {
        "$ref": "floor.schema.json"
      }
    },
    "staircases": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [  ],
        "properties": {
          "name": { "$ref": "definitions.json#/def/name" },
          "unit": { "$ref": "definitions.json#/def/unit" },
          "pitch": { "$ref": "pitch.schema.json" },
          "outline": { "$ref": "outline.schema.json" },
          "surface": { "$ref": "surface.schema.json" }
        }
      }
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
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
