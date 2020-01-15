export default /* eslint-disable */
{
  "$id": "ceiling.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Ceiling",
  "description": "The ceiling of a room or a of a whole storey.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'ceiling.schema.json',
      name: 'Living room ceiling',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 14, y: 16 }  
      },
      surface: {
        style: 'flat',
        material: 'stucco'
      },
      fixtures: [] // TODO: add light fixture example
    }
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
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "surface": {
      "$ref": "surface.schema.json"
    },
    "fixtures": {
      "type": "array",
      "items": { "$ref": "fixture.schema.json" }
    }
  }
}