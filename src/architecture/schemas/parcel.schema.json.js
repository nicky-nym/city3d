export default /* eslint-disable */
{
  "$id": "parcel.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A parcel of land in a city district",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'parcel.schema.json',
      name: '#032-203-060',
      unit: 'feet',
      border: {
        shape: 'rectangle',
        size: { x: 50, y: 211 }
      },
      buildings: [
        { "$ref": "garage" },
        { "$ref": "cottage" },
        { "$ref": "house" },
      ]
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
    "contents": {
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    }
  }
}