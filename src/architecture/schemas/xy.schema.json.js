export default /* eslint-disable */
{
  "$id": "xy.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A point (or vector) in a 2D space",
  "title": "xy",
  "type": "object",
  "examples": [
    { x: 0, y: 0 },
    { x: 10, y: -20 },
    { x: 20.666, y: -20 / 3 },
    { x: 3, y: 4, z: 5 },
    { x: 4 },
    { y: 5 },
    { z: 6 },
    { iggyPop: { no: 'fun' } },
    { }
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
    }
  }
}
