export default /* eslint-disable */
{
  "$id": "xyzaz.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "xyzaz",
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
    },
    "az": {
      "description": "azimuth (compass bearing)",
      "type": "number",
      "default": 0,
      "minimum": 0,
      "exclusiveMaximum": 360,
      "$comment": "should the range be 0 to 360, but with 0 as an exclusiveMinimum?"
    }
  }
}
