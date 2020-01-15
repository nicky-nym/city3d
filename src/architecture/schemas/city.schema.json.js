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
        { $id: 'The Bronx' },
        { $id: 'Brooklyn' },
        { $id: 'Manhattan' },
        { $id: 'Queens' },
        { $id: 'Staten Island' }
      ]
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
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "border": {
      "$ref": "outline.schema.json"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
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