export default /* eslint-disable */
{
  "$id": "definitions.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "shared definitions",
  "def": {
    "context": {
      "description": "use this so that people who come across our json file will have a chance of knowing what the file is about",
      "const": "city3d"
    },
    "name": {
      "description": "a display name for users to see",
      "type": "string"
    },
    "comments": {
      "description": "just a space for any notes the author wants to include",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "unit": {
      "description": "the name of default unit of measure for distances",
      "type": "string"
    },
    "contents": {
      "description": "other model objects that are inside this one, like a car in a garage, or a sofa in a living room",
      "type": "array",
      "items": {
        "$ref": "copy.schema.json"
      }
    },
    "def": {
      "description": "schema definitions for property values that are shared across schemas",
      "type": "object"
    },
    "$$ref": {
      "type": "string",
      "format": "uri-reference"
    },
    "number": {
      "description": "a number literal, or a specification for a random number",
      "oneOf": [{
        "type": "number"
      }, { 
        "type": "object",
        "required": [ "type" ],
        "properties": {
          "type": {
            "const": "randomInt"
          },
          "min": {
            "type": "number"
          },
          "max": {
            "type": "number"
          }
        }
      }]
    },
    "xyOrRef": {
      "anyOf": [{
        "type": "object",
        "required": [ "$ref" ],
        "properties": {
          "$ref": {
            "type": "string",
            "format": "uri-reference"
          }
        }
      }, {
        "type": "object",
        "required": [  ],
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
      }]
    },
    "extras": {
      "description": "any additional data to keep track of",
      "type": "object"
    }
  }
}