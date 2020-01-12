export default /* eslint-disable */
{
  "$id": "city.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A city full of buildings, people, streets, and vehicles",
  "type": "object",
  "required": [],
  "properties": {
    "name": {
      "type": "string"
    },
    "border": {
      "$ref": "outline.schema.json"
    },
    "unit": {
      "type": "string",
      "description": "the name of default unit of measure for distances"
    },
    "vehicles": {
      "type": "array",
      "items": {
        "$ref": "vehicle.schema.json"
      }
    },
    "districts": {
      "type": "array",
      "items": {
        "$ref": "district.schema.json"
      }
    }
  }
}