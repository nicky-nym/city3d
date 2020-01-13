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
      xLeafCount: 2,
      lites: { rows: 2, cols: 1 },
      center: { x: 4, y: 3 },
      casing: { width: 0.5 }
    }
  ],
  "required": [  ],
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
    "motion": {
      "enum": ["casement", "awning", "sliding", "hung", "picture"]
    },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "xLeafCount": {
      "type": "number"
    },
    "yLeafCount": {
      "type": "number"
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
    }
  }
}
