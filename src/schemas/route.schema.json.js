export default /* eslint-disable */
{
  "$id": "route.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "route",
  "description": "Any path that a vehicle travels along",
  "type": "object",
  "examples": [
    {
      name: 'driveway to house',
      waypoints: [
        { x: 1, y: 2 },
        { x: 11, y: 22 },
        { x: 110, y: 22 }
      ]
    },
    {
      name: 'historic canal',
      mode: 'canal',
      waypoints: [
        { $ref: '#/def/A' },
        { $ref: '#/def/B' },
        { $ref: '#/def/C' },
        { $ref: '#/def/D' },
      ]
    }
  ],
  "required": [],
  "properties": {
    "name": { "$ref": "definitions.json#/def/name" },
    "mode": {
      "enum": ["canal", "walkway", "bikeway", "roadway"]
    },
    "waypoints": {
      "type": "array",
      "minItems": 2,
      "items": { "$ref": "definitions.json#/def/xyOrRef" }
    }
  }
}
