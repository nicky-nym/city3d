export default /* eslint-disable */
{
  "$id": "placement.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "placement",
  "description": "The specification of how to place an object in 3D space",
  "type": "object",
  "examples": [
    {
      xyz: { x: 1, y: 2, z: 0 }
    },
    {
      xyz: { x: 1 }
    },
    {
      xyz: { x: 1, y: 2, z: 0 },
      rotated: 90
    },
    {
      xyz: { x: 1, y: 2, z: 0 },
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
    "xyz": { 
      "description": "the location of the center of the object, relative to the absolute xyz origin (or to a parent/host object)",
      "$ref": "xyz.schema.json" 
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
