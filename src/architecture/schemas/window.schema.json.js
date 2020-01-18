export default /* eslint-disable */
{
  "$id": "window.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Window",
  "description": "A window in a window frame, or a set of windows sharing a window frame.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'window.schema.json',
      name: 'kitchen window',
      unit: 'feet',
      motion: 'casement',
      outline: { shape: 'rectangle', data: { x: 16, y: 7 } },
      leafCount: { cols: 2 },
      lites: { rows: 2, cols: 1 },
      center: { x: 4, y: 3 },
      casing: { width: 0.5 },
      extras: { budget: {}, authors: {} }
    }
  ],
  "required": [  ],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "window.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "motion": {
      "enum": ["casement", "awning", "sliding", "hung", "picture"]
    },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "leafCount": {
      "$ref": "grid.schema.json"
    },
    "lites": {
      "$ref": "grid.schema.json"
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
