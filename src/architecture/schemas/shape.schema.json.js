export default /* eslint-disable */
{
  "$id": "../schemas/shape.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "shape",
  "description": "An outline of a 2D shape",
  "type": "object",
  "required": [ "shape" ],
  "properties": {
    "shape": {
      "enum": [ "rectangle", "polygon" ]
    },
    "size": { 
      "description": "for rectangles (or regular polygons), the size of the bounding box",
      "$ref": "../schemas/xy.schema.json" 
    },
    "corners": {
      "description": "for irregular polygons, the list of corner points",
      "type": "array",
      "minItems": 3,
      "uniqueItems": true,
      "items": { "$ref": "../schemas/xy.schema.json" }
    }
  },
  "definitions": {

  }
}
