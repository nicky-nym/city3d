export default /* eslint-disable */
{
  "$id": "roof.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Roof",
  "description": "The roof of a building'",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'roof.schema.json',
      name: 'Cottage roof (gabled)',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 100, y: 100 }  
      },
      form: 'pitched',
      pitch: { rise: 8, run: 12 },
      eaves: 1,
      surface: {
        style: 'shingles',
        material: 'asphalt composition'
      },
      extras: { budget: {}, authors: {} }
    }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "roof.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "form": {
      "enum": ["flat", "pitched", "living", "vaulted"]
    },
    "pitch": {
      "$ref": "pitch.schema.json"
    },
    "eaves": {
      "type": "number"
    },
    "surface": {
      "$ref": "surface.schema.json"
    },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
