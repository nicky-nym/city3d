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
      outside: {
        surface: {
          style: 'clapboard',
          material: 'fiber-cement'
        },
        doors: [{
          name: 'garage door',
          yLeafCount: 5,
          motion: 'overhead',
          shape: { shape: 'rectangle', data: { x: 16, y: 7 } },
          center: { x:12 },
          casing: { width: { x:0.5 } }
        }],
        windows: [],
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
    "context": {
      "const": "city3d"
    },
    "type": {
      "const": "wall.schema.json"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "roofline": {
      "enum": ["gabled", "pitched"]
    },
    "outside": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "surface": {
          "$ref": "surface.schema.json"
        },
        "doors": {
          "type": "array",
          "items": { "$ref": "door.schema.json" }
        },
        "windows": {
          "type": "array",
          "items": { "$ref": "window.schema.json" }
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
    "extras": {
      "description": "any additional data to keep track of",
      "type": "object"
    }
  }
}
