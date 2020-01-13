export default /* eslint-disable */
{
  "$id": "floor.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Floor",
  "description": "The floor of a room or a of a whole storey. NOT an entire storey, like the '3rd floor'",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'floor.schema.json',
      name: 'Expansive hardwood floor',
      unit: 'feet',
      outline: {
        shape: 'rectangle',
        size: { x: 100, y: 100 }  
      },
      surface: {
        style: 'parquet',
        material: 'wood'
      }
    }
  ],
  "required": [],
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
    "outline": {
      "$ref": "outline.schema.json"
    },
    "surface": {
      "$ref": "surface.schema.json"
    }
  }
}
