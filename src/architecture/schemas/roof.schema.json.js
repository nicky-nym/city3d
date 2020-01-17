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
      }
    }
  ],
  "required": [],
  "properties": {
    "context": {
      "const": "city3d"
    },
    "type": {
      "const": "roof.schema.json"
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
    }
  }
}
