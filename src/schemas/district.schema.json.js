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
      contents: [],
      extras: { budget: {}, authors: {} }
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
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "district.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "border": {
      "$ref": "outline.schema.json"
    },
    "parcels": {
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    },
    "contents": { "$ref": "definitions.json#/def/contents" },
    "pavement": { "$ref": "definitions.json#/def/pavement" },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}