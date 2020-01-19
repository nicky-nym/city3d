export default /* eslint-disable */
{
  "$id": "floor.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Floor",
  "description": "The floor of a room or a of a whole storey. NOT an entire storey, like the '3rd floor'",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'floor.schema.json',
      name: 'Expansive hardwood floor',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 100, y: 100 }
      },
      surface: {
        style: 'parquet',
        material: 'wood'
      },
      extras: { budget: {}, authors: {} }
    }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "floor.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "surface": {
      "$ref": "surface.schema.json"
    },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
