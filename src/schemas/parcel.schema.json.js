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
      }],
      extras: { budget: {}, authors: {} }
    },
    { }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "parcel.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "border": {
      "$ref": "outline.schema.json"
    },
    "contents": { "$ref": "definitions.json#/def/contents" },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}