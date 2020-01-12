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
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'gabled' }
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'gabled', pitch: { rise: 4, run: 12 } }
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'arched' }
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'arched', curvature: 0.4 }
    },
  ],
  "required": [ "shape" ],
  "properties": {
    "shape": {
      "enum": [ "polygon", "rectangle" ]
    },
    "corners": {
      "description": "for irregular polygons, the list of corner points",
      "type": "array",
      "minItems": 3,
      "uniqueItems": true,
      "items": { "$ref": "xy.schema.json" }
    },
    "size": { 
      "description": "for rectangles (or regular polygons), the size of the bounding box",
      "$ref": "xy.schema.json" 
    },
    "top": { 
      "type": "object",
      "required": [ "style" ],
      "properties": {
        "style": {
          "enum": [ "gabled", "arched" ]
        },
        "pitch": {
          "$ref": "pitch.schema.json"
        },
        "curvature": {
          "type": "number",
          "minimum": 0,
          "maximum": 1
        },
      }
    },
  },
  "definitions": {

  }
}
