export default /* eslint-disable */
{
  "$id": "door.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Door",
  "description": "A door in a door frame, or a set of doors sharing a door frame.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'door.schema.json',
      name: 'garage door',
      unit: 'feet',
      motion: 'overhead',
      outline: { shape: 'rectangle', data: { x: 16, y: 7 } },
      leafCount: { rows: 5 },
      handleSide: 'left',
      center: { x: 12 },
      casing: { width: 0.5 },
      extras: { budget: {}, authors: {} }
    }
  ],
  "required": [  ],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "door.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "motion": {
      "enum": ["overhead", "swinging", "sliding", "pocket", "folding", "revolving"]
    },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "leafCount": {
      "$ref": "grid.schema.json"
    },
    "handleSide": {
      "enum": ["left", "center", "right"]
    },
    "center": {
      "$ref": "xy.schema.json"
    },
    "casing": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "width": {
          "type": "number"
        }
      }
    },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
