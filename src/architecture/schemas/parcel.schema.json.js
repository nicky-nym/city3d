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
      contents: [{
        copy: { $ref: 'CITY.buildings.garage' },
        at: { x: 34, y: 152 }
      }, {
        copy: { $ref: 'CITY.buildings.cottage' },
        at: { x: 34, y: 120 }
      }, {
        copy: { $ref: 'CITY.buildings.house' },
        at: { x: 30, y: 40 }
      }]
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
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "border": {
      "$ref": "outline.schema.json"
    },
    "contents": {
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    }
  }
}