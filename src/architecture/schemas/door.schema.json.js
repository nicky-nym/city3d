export default /* eslint-disable */
{
  "$id": "door.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Door",
  "description": "A door in a door frame, or a set of doors sharing a door frame.",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'door.schema.json',
      name: 'garage door',
      unit: 'feet',
      motion: 'overhead',
      outline: { shape: 'rectangle', data: { x: 16, y: 7 } },
      yLeafCount: 5,
      handleSide: 'left',
      center: 12,
      casing: { width: 0.5 }
    }
  ],
  "required": [  ],
  "properties": {
    "context": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "motion": {
      "enum": ["overhead", "swinging", "sliding", "pocket", "folding", "revolving"]
    },
    "outline": {
      "$ref": "outline.schema.json"
    },
    "xLeafCount": {
      "type": "number"
    },
    "yLeafCount": {
      "type": "number"
    },
    "handleSide": {
      "enum": ["left", "center", "right"]
    },
    "center": {
      "type": "number"
    },
    "casing": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "width": {
          "type": "number"
        }
      }
    }
  }
}
