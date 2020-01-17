export default /* eslint-disable */
{
  "$id": "district.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "District",
  "description": "A district in a city",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'district.schema.json',
      name: 'Manhattan',
      unit: 'miles',
      border: {
        shape: 'rectangle',
        size: { x: 2.3, y: 13.4 }
      },
      parcels: [],
      contents: []
    },
    {
      name: 'Manhattan'
    },
    { 
      parcels: []
    },
    { }
  ],
  "required": [],
  "properties": {
    "context": {
      "const": "city3d"
    },
    "type": {
      "const": "district.schema.json"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "border": {
      "$ref": "outline.schema.json"
    },
    "parcels": {
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    },
    "contents": {
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    }
  }
}