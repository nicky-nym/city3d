export default /* eslint-disable */
{
  "$id": "wall.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Wall",
  "description": "A single wall, on one side of one storey of a building'",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'wall.schema.json',
      name: '2nd floor, south wall',
      unit: 'feet',
      roofline: 'gabled',
      doors: [{
        name: 'garage door',
        yLeafCount: 5,
        motion: 'overhead',
        shape: { shape: 'rectangle', data: { x: 16, y: 7 } },
        center: { x: 12 },
        casing: { width: { x: 0.5 } }
      }],
      windows: [],
      outside: {
        surface: {
          style: 'clapboard',
          material: 'fiber-cement'
        },
        fixtures: [{
          at: { x: +2, y: 6 },
          copy: { $ref: 'CITY.fixtures.sconce' }
        }, {
          at: { x: -2, y: 6 },
          copy: { $ref: 'CITY.fixtures.sconce' }
        }],
        downspouts: [
          { at: { x: +0.25 } },
          { at: { x: -0.25 } }
        ]
      },
      inside: {
        surface: {
          style: 'flat',
          material: 'drywall'
        },
        fixtures: []
      },
      extras: { budget: {}, authors: {} }
    }
  ],
  "required": [  ],
  "additionalProperties": false,
  "properties": {
    "context": { "$ref": "definitions.json#/def/context" },
    "type": { "const": "wall.schema.json" },
    "name": { "$ref": "definitions.json#/def/name" },
    "metadata": { "$ref": "metadata.schema.json" },
    "comments": { "$ref": "definitions.json#/def/comments" },
    "unit": { "$ref": "definitions.json#/def/unit" },
    "begin": { "$ref": "definitions.json#/def/beginOrEnd" },
    "end": { "$ref": "definitions.json#/def/beginOrEnd" },
    "roofline": {
      "enum": ["gabled", "pitched"]
    },
    "doors": {
      "type": "array",
      "items": { "$ref": "door.schema.json" }
    },
    "windows": {
      "type": "array",
      "items": { "$ref": "window.schema.json" }
    },
    "outside": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "surface": {
          "$ref": "surface.schema.json"
        },
        "fixtures": {
          "type": "array",
          "items": { "$ref": "copy.schema.json" }
        },
        "downspouts": {
          "type": "array",
          "items": { 
            "type": "object",
            "required": [  ],
            "properties": {  }
          }
        }
      }
    },
    "inside": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "surface": {
          "$ref": "surface.schema.json"
        },
        "fixtures": {
          "type": "array",
          "items": { "$ref": "copy.schema.json" }
        }
      }
    },
    "extras": { "$ref": "definitions.json#/def/extras" }
  }
}
