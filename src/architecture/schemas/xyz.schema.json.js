export default /* eslint-disable */
{
  "$id": "../schemas/xyz.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "xyz",
  "description": "A point (or vector) in a 3D space",
  "type": "object",
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
    }
  }
}
