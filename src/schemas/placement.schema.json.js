export default /* eslint-disable */
{
  "$id": "placement.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "placement",
  "description": "The specification of how to place an object in 3D space",
  "type": "object",
  "examples": [
    {
      x: 1, y: 2, z: 0
    },
    {
      x: 1
    },
    {
      x: 1, y: -2, from: 'center'
    },
    {
      x: 1, y: 2, z: 0, rotated: 90
    },
    {
      x: 1,
      y: 2,
      z: 0,
      rotated: 90,
      mirrored: true
    },
    {
      x: 1,
      y: 2,
      z: 0,
      from: 'center',
      rotated: 90,
      mirrored: true
    },
    {
      rotated: 270,
      mirrored: true
    },
    {
      rotated: 180
    },
    {
      mirrored: true
    },
    {  }
  ],
  "required": [],
  "properties": {
    "x": {
      "description": "an x-axis distance, in the default unit of measure",
      "default": 0,
      "type": "number"
    },
    "y": {
      "description": "a y-axis distance, in the default unit of measure",
      "default": 0,
      "type": "number"
    },
    "z": {
      "description": "a z-axis distance, in the default unit of measure",
      "default": 0,
      "type": "number"
    },
    "from": {
      "enum": ["left", "center", "right"]
    },
    "rotated": {
      "description": "a compass bearing in degrees (0 to 360)",
      "type": "number",
      "default": 0,
      "minimum": 0,
      "exclusiveMaximum": 360,
    },
    "mirrored": {
      "description": "true if the xy-geometry of this object should be 'flipped' around the axis of rotation",
      "type": "boolean",
      "default": false
    }
  }
}
