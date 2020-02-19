export default /* eslint-disable */
{
  "$id": "line.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "line",
  "description": "The specification of how to place an object in 3D space",
  "type": "object",
  "examples": [
    {
      name: 'wooden truss',
      material: 'wood',
      vertices: [
        { x: 11, y: -4.5, z: 0 },
        { x: 0, y: 0, z: 8 },
        { x: 11, y: +4.5, z: 0 }
      ]
    }
  ],
  "required": [  ],
  "properties": {
    "name": {
      "description": "the name of this line",
      "type": "string",
    },
    "material": {
      "description": "TODO: refactor this with the 'material' in surface.schema.json.js",
      "type": "string",
    },
    "vertices": {
      "description": "a list of end points and corner points",
      "type": "array",
      "minItems": 2,
      "uniqueItems": false,
      "items": { "$ref": "definitions.json#/def/xyzOrRef" }
    },
    "radius": {
      "type": "number"
    }
  }
}
