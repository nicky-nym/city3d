export default /* eslint-disable */
{
  "$id": "city.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "City",
  "description": "A city full of buildings, people, streets, and vehicles",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'city.schema.json',
      name: 'New York City',
      unit: 'miles',
      border: {
        shape: 'rectangle',
        size: { x: 18, y: 26 }
      },
      districts: [
        { copy: { $ref: 'CITY.districts.The_Bronx' } },
        { copy: { $ref: 'CITY.districts.Brooklyn' } },
        { copy: { $ref: 'CITY.districts.Manhattan' } },
        { copy: { $ref: 'CITY.districts.Queens' } },
        { copy: { $ref: 'CITY.districts.Staten_Island' } }
      ],
      contents: []
    },
    {
      name: 'London'
    },
    { 
      districts: [{}]
    },
    { }
  ],
  "required": [],
  "properties": {
    "context": {
      "const": "city3d"
    },
    "type": {
      "const": "city.schema.json"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "description": "the name of default unit of measure for distances",
      "type": "string"
    },
    "border": {
      "$ref": "outline.schema.json"
    },
    "districts": {
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