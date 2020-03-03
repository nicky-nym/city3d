export default /* eslint-disable */
{
  "$id": "copy.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "copy",
  "description": "The specification of how to place an object in 3D space",
  "type": "object",
  "examples": [
    {
      name: '1414 Ivy Street',
      copy: {
        $ref: 'CITY.buildings.cottage'
      },
      pose: { x: 1, y: 2, z: 0 }
    },
    {
      name: '1418 Ivy Street',
      copy: { $ref: 'CITY.buildings.cottage' },
      pose: {
        x: 1, y: 2, z: 0, rotated: 90, mirrored: true
      },
      settings: {
        storeys: [{
          height: 7,
          roof: { form: 'pitched', pitch: { rise: 12, run: 12 } }
        }]
      }
    },
    {
      name: 'telephone poles',
      copy: { $ref: 'CITY.structures.utility_pole' },
      pose: { x: 0, y: 0, z: 0 },
      repeat: { count: 5, offset: { y: 160 } }
    }
  ],
  "required": [ "copy" ],
  "properties": {
    "name": {
      "description": "the name of this particular copy, if this copy has it's own name",
      "type": "string",
    },
    "pose": {
      "description": "where the copy goes, and the direction it is oriented in",
      "$ref": "pose.schema.json"
    },
    // "repeat": {
    //   "description": "to make multiple copies at once, set the number of rows and columns",
    //   "$ref": "grid.schema.json"
    // },
    "repeat": {
      "description": "to make multiple copies at once, set the repeat count and offset",
      "type": "object",
      "required": [ "count", "offset" ],
      "properties": {
        "count": {
          "type": "number"
        },
        "offset": {
          "$ref": "pose.schema.json"
        }
      }
    },
    "numRandomPartitions": {
      "description": "number of partitions into which copy poses can be randomly put",
    },
    "copy": {
      "description": "an identifier that specifies what model this is a copy of",
      "type": "object",
      "required": [ "$ref" ],
      "properties": {
        "$ref": {
          "type": "string"
        }
      }
    },
    "settings": {
      "description": "override settings for any property values specific to this copy",
      "type": "object"
    }
  }
}
