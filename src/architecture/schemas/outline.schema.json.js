export default /* eslint-disable */
{
  "$id": "outline.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "outline",
  "description": "Any simple 2D outline shape (like a triangle or a trapezoid) that forms a closed, counterclockwise loop",
  "type": "object",
  "examples": [
    {
      shape: 'rectangle',
      size: { x: 1, y: 2 }
    },
    {
      shape: 'polygon',
      corners: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 }
      ]
    }
  ],
  "required": [ "shape" ],
  "properties": {
    "shape": {
      "enum": [ "rectangle", "polygon" ]
    },
    "size": { 
      "description": "for rectangles (or regular polygons), the size of the bounding box",
      "$ref": "xy.schema.json" 
    },
    "corners": {
      "description": "for irregular polygons, the list of corner points",
      "type": "array",
      "minItems": 3,
      "uniqueItems": true,
      "items": { "$ref": "xy.schema.json" }
    }
  },
  "definitions": {

  }
}
