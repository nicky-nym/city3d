export default /* eslint-disable */
{
  "$id": "structure.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Structure",
  "description": "Any structure that is not a building, such as a street light or a swing set.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'structure.schema.json',
      name: 'Swing set',
      unit: 'feet',
      anchorPoint: { x: 5, y: 0, z: 0 },
      lines: [{
        name: 'left truss',
        material: 'wood',
        vertices: [
          { x: -1, y: -4.5, z: 0 },
          { x: 0, y: 0, z: 8 },
          { x: -1, y: +4.5, z: 0 }
        ]
      }, {
        name: 'cross bar',
        material: 'wood',
        vertices: [
          { x: 0, y: 0, z: 8 },
          { x: 10, y: 0, z: 8 }
        ]
      }, {
        name: 'right truss',
        material: 'wood',
        vertices: [
          { x: 1 + 10, y: -4.5, z: 0 },
          { x: 0, y: 0, z: 8 },
          { x: 1 + 10, y: +4.5, z: 0 }
        ]
      }],
      extras: { permitInfo: {}, budget: {}, authors: {} }
    }
  ],
  "required": [],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "structure.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "def": { "$ref": "definitions.json#/def/def" },
    "anchorPoint": {
      "description": "the point that serves as the center of the building when the building is place on a parcel",
      "$ref": "xy.schema.json"
    },
    "lines": {
      "type": "array",
      "items": {
        "$ref": "line.schema.json"
      }
    },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
