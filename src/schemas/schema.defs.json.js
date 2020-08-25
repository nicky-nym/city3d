export default /* eslint-disable */
{
  /* See "propertyDefs" section below for definitions of the properties */
  "entityDefs": {
    "file": {
      "required": [],
      "additionalProperties": false,
      "properties": {
        "context": null,
        "name": null,
        "metadata": null,
        "comments": null,
        "def": null,
        "extras": null
      }
    },
    "building": {
      "description": "Any building, with walls, floors, a roof, etc.",
      "properties": {
        "type": { "const": "building.schema.json" },
        "unit": null,
        "anchorPoint": null,
        "routes": null,
        "storeys": null,
        "lines": null
      }
    },
    "ceiling": {
      "description": "The ceiling of a room or a of a whole storey.",
      "properties": {
        "type": { "const": "ceiling.schema.json" },
        "unit": null,
        "outline": null,
        "surface": null,
        "fixtures": null
      }
    },
    "city": {
      "description": "A city full of buildings, people, streets, and vehicles",
      "properties": {
        "type": { "const": "city.schema.json" },
        "unit": null,
        "border": null,
        "districts": null,
        "contents": null,
        "pavement": null,
        "water": null,
        "routes": null
      }
    },
    "district": {
      "description": "A district in a city",
      "properties": {
        "type": { "const": "district.schema.json" },
        "unit": null,
        "border": null,
        "parcels": null,
        "contents": null,
        "zoning": null,
        "pavement": null,
        "water": null,
        "routes": null
      }
    },
    "door": {
      "description": "A door in a door frame, or a set of doors sharing a door frame.",
      "properties": {
        "type": { "const": "door.schema.json" },
        "unit": null,
        "motion": null,
        "outline": null,
        "leafCount": null,
        "handleSide": null,
        "at": null,
        "casing": null
      }
    },
    "floor": {
      "description": "The floor of a room or a of a whole storey. NOT an entire storey, like the '3rd floor'",
      "properties": {
        "type": { "const": "floor.schema.json" },
        "unit": null,
        "incline": null,
        "outline": null,
        "openings": null,
        "surface": null
      }
    },
    "parcel": {
      "description": "A parcel of land in a city district",
      "properties": {
        "type": { "const": "parcel.schema.json" },
        "unit": null,
        "anchorPoint": null,
        "border": null,
        "contents": null,
        "setbacks": null,
        "zoning": null,
        "pavement": null,
        "water": null,
        "routes": null
      }
    },
    "roof": {
      "description": "The roof of a building'",
      "properties": {
        "type": { "const": "roof.schema.json" },
        "unit": null,
        "outline": null,
        "openings": null,
        "form": null,
        "parapetHeight": null,
        "pitch": null,
        "eaves": null,
        "surface": null
      }
    },
    "room": {
      "description": "A room in a building'",
      "properties": {
        "type": { "const": "room.schema.json" },
        "unit": null,
        "outline": null,
        "use": null,
        "contents": null
      }
    },
    "route": {
      "description": "Any path that a vehicle travels along",
      "properties": {
        "type": { "const": "route.schema.json" },
        "mode": null,
        "waypoints": null
      }
    },
    "staircase": {
      "description": "A flight of stairs.",
      "properties": {
        "unit": null,
        "pitch": null,
        "outline": null,
        "surface": null
      }
    },
    "storey": {
      "description": "A single storey, with walls, rooms, a floor, a ceiling, etc.",
      "properties": {
        "type": { "const": "storey.schema.json" },
        "unit": null,
        "repeat": null,
        "altitude": null,
        "height": null,
        "incline": null,
        "floors": null,
        "staircases": null,
        "roof": null,
        "ceiling": null,
        "walls": null,
        "rooms": null
      }
    },
    "structure": {
      "description": "Any structure that is not a building, such as a street light or a swing set.",
      "properties": {
        "type": { "const": "structure.schema.json" },
        "unit": null,
        "anchorPoint": null,
        "routes": null,
        "storeys": null,
        "lines": null
      }
    },
    "wall": {
      "description": "A single wall, on one side of one storey of a building'",
      "properties": {
        "type": { "const": "wall.schema.json" },
        "unit": null,
        "height": null,
        "begin": null,
        "end": null,
        "roofline": null,
        "doors": null,
        "windows": null,
        "outside": { 
          "type": "object",
          "required": [],
          "properties": {
            "surface": null,
            "fixtures": null,
            "downspouts": null
          }
        },
        "inside": { 
          "type": "object",
          "required": [],
          "properties": {
            "surface": null,
            "fixtures": null
          }
        }
      }
    },
    "window": {
      "description": "A window in a window frame, or a set of windows sharing a window frame.",
      "properties": {
        "$ref": { "$ref": "~/typeDefs/$$ref" },
        "type": { "const": "window.schema.json" },
        "unit": null,
        "motion": null,
        "outline": null,
        "leafCount": null,
        "lites": null,
        "at": null,
        "casing": null
      }
    }
  },
  /* These are definitions of the properties used in the "entityDefs" section above */
  "propertyDefs": {
    "altitude": { "$ref": "~/typeDefs/numberOrRandom" },
    "anchorPoint": {
      "description": "the point that serves as the center of the building when the building is place on a parcel",
      "$ref": "~/typeDefs/xy"
    },
    "at": { "$ref": "~/typeDefs/pose" },
    "begin": { "$ref": "~/typeDefs/xyOrRef" },
    "border": { "$ref": "~/typeDefs/outline" },
    "casing": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "width": {
          "type": "number"
        }
      }
    },
    "ceiling": { "$ref": "ceiling.schema.json" },
    "comments": {
      "description": "just a space for any notes the author wants to include",
      "type": "array",
      "items": { "type": "string" }
    },
    "contents": {
      "description": "other model objects that are inside this one, like a car in a garage, or a sofa in a living room",
      "type": "array",
      "items": { "$ref": "~/typeDefs/copy" }
    },
    "context": {
      "description": "use this so that people who come across our json file will have a chance of knowing what the file is about",
      "const": "city3d"
    },
    "def": {
      "description": "schema definitions for property values that are shared across schemas",
      "type": "object"
    },
    "districts": {
      "type": "array",
      "items": { "$ref": "~/typeDefs/copy" }
    },
    "doors": {
      "type": "array",
      "items": { "$ref": "door.schema.json" }
    },
    "downspouts": {
      "type": "array",
      "items": { 
        "type": "object",
        "required": [  ],
        "properties": {  }
      }
    },
    "eaves": {
      "type": "number"
    },
    "end": { "$ref": "~/typeDefs/xyOrRef" },
    "extras": {
      "description": "any additional data to keep track of",
      "type": "object"
    },
    "fixtures": {
      "type": "array",
      "items": { "$ref": "~/typeDefs/copy" }
    },
    "floors": {
      "type": "array",
      "items": { "$ref": "floor.schema.json" }
    },
    "form": {
      "enum": ["none", "flat", "pitched", "hipped", "shed", "living", "vaulted"]
    },
    "handleSide": {
      "enum": ["left", "center", "right"]
    },
    "height": { "$ref": "~/typeDefs/numberOrRandom" },
    "incline": { "$ref": "~/typeDefs/numberOrRandom" },
    "leafCount": { "$ref": "~/typeDefs/grid" },
    "lines": {
      "type": "array",
      "items": { "$ref": "~/typeDefs/line" }
    },
    "lites": { "$ref": "~/typeDefs/grid" },
    "metadata": { "$ref": "~/typeDefs/metadata" },
    "mode": {
      "enum": ["canal", "walkway", "bikeway", "roadway"]
    },
    "motion": {
      /* TODO: remove "hung" and just use "swinging" instead */
      "enum": ["casement", "awning", "sliding", "pocket", "hung", "swinging", "picture", "open", "overhead", "pivoting", "folding", "up-and-over", "revolving", "rolling", "collapsible"]
    },
    "name": {
      "description": "a display name for users to see",
      "type": "string"
    },
    "openings": {
      "type": "array",
      "items": { "$ref": "~/typeDefs/outline" }
    },
    "outline": { "$ref": "~/typeDefs/outline" },
    "parapetHeight": {
      "type": "number"
    },
    "parcels": {
      "type": "array",
      "items": { "$ref": "~/typeDefs/copy" }
    },
    "pavement": {
      "description": "paved surfaces, like streets, sidewalks, driveways, and bike paths",
      "type": "array",
      "items": { 
        "type": "object",
        "required": [],
        "properties": {
          "name": { "type": "string" },
          "surface": { "$ref": "~/typeDefs/surface" },
          "outline": { "$ref": "~/typeDefs/outline" }
        }
      }
    },
    "pitch": { "$ref": "~/typeDefs/pitch" },
    "repeat": { "$ref": "~/typeDefs/numberOrRandom" },
    /* TODO: fix me $$ref */
    "$ref": { "$ref": "~/typeDefs/$$ref" },
    "roof": { "$ref": "roof.schema.json" },
    "roofline": {
      "enum": ["none", "gabled", "pitched", "shed"]
    },
    "rooms": {
      "type": "array",
      "items": { "$ref": "room.schema.json" }
    },
    "routes": {
      "type": "array",
      /* TODO: "items": { "$ref": "~/entityDefs/route" } */
      "items": { "$ref": "route.schema.json" }
    },
    "setbacks": {
      "description": "minimum distances that structures must be set back from a parcel boundary",
      "$ref": "~/typeDefs/$$reservedForFutureUse"
    },
    "staircases": {
      "type": "array",
      "items": { "$ref": "staircase.schema.json" }
    },
    "storeys": {
      "type": "array",
      /* TODO: { "$ref": "#/entityDefs/storey" } */
      "items": { "$ref": "storey.schema.json" }
    },
    "surface": { "$ref": "~/typeDefs/surface" },
    "unit": {
      "description": "the name of default unit of measure for distances",
      "type": "string"
    },
    "use": {
      "enum": ["circulation", "building service", "mechanical", "assignable"]
    },
    "walls": {
      "type": "object",
      "required": [  ],
      "properties": {
        "exterior": {
          "type": "array",
          "items": { "$ref": "wall.schema.json" }
        },
        "interior": {
          "type": "array",
          "items": { "$ref": "wall.schema.json" }
        }
      }
    },
    "water": {
      "description": "water bodies, like creeks, canals, ponds, and swimming pools",
      "type": "array",
      "items": { 
        "type": "object",
        "required": [],
        "properties": {
          "name": { "type": "string" },
          "outline": { "$ref": "~/typeDefs/outline" }
        }
      }
    },
    "waypoints": {
      "type": "array",
      "minItems": 2,
      "items": { "$ref": "~/typeDefs/xyOrRef" }
    },
    "windows": {
      "type": "array",
      "items": { "$ref": "window.schema.json" }
    },
    "zoning": {
      "description": "a land use zone, such as 'resdential R1' or 'commercial C2'",
      "$ref": "~/typeDefs/$$reservedForFutureUse"
    }
  },
  /* These are definitions of the data types used in the "propertyDefs" section above */
  "typeDefs": {
    "$$ref": {
      "examples": [
        '#/def/RECTANGLE',
        'definitions.json#/def/TRIANGLE',
      ],
      "type": "string",
      "format": "uri-reference"
    },
    "$$reservedForFutureUse": {},
    "copy": {
      "description": "The specification of how to place an object in 3D space",
      "examples": [
        {
          name: '1414 Ivy Street',
          copy: { $ref: 'CITY.buildings.cottage' },
          pose: { x: 1, y: 2, z: 0 }
        },
        {
          name: 'telephone poles',
          copy: { $ref: 'CITY.structures.utility_pole' },
          pose: { x: 0, y: 0, z: 0 },
          repeat: { count: 5, offset: { y: 160 } }
        }
      ],
      "type": "object",
      "required": [ "copy" ],
      "properties": {
        "name": {
          "description": "the name of this particular copy, if this copy has it's own name",
          "type": "string",
        },
        "pose": {
          "description": "where the copy goes, and the direction it is oriented in",
          "$ref": "~/typeDefs/pose"
        },
        // "repeat": {
        //   "description": "to make multiple copies at once, set the number of rows and columns",
        //   "$ref": "~/typeDefs/grid"
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
              "$ref": "~/typeDefs/pose"
            }
          }
        },
        "numRandomPartitions": {
          "description": "number of partitions into which copy poses can be randomly put",
        },
        /* TODO: consider renaming this so that "copy" is not both the name of the type and the name of the property */
        /* TODO: allow not just a $ref value, but alternatively an inline model spec */
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
    },
    "grid": {
      "description": "A grid of rows and columns",
      "examples": [
        { rows: 0, cols: 0 },
        { rows: 2 },
        { cols: 10 }
      ],
      "type": "object",
      "properties": {
        "rows": {
          "description": "the number of rows in the grid",
          "default": 0,
          "type": "integer",
          "minimum": 0
        },
        "cols": {
          "description": "the number of columns in the grid",
          "default": 0,
          "type": "integer",
          "minimum": 0
        }
      }
    },
    "line": {
      "description": "The specification of how to place an object in 3D space",
      "examples": [
        {
          material: 'wood',
          vertices: [
            { x: 11, y: -4.5, z: 0 },
            { x: 0, y: 0, z: 8 },
            { x: 11, y: +4.5, z: 0 }
          ]
        }
      ],
      "type": "object",
      "properties": {
        "name": {
          "description": "the name of this line",
          "type": "string",
        },
        "material": {
          "description": "TODO: refactor this with the 'material' in 'surface'",
          "type": "string",
        },
        "vertices": {
          "description": "a list of end points and corner points",
          "type": "array",
          "minItems": 2,
          "uniqueItems": false,
          "items": { "$ref": "~/typeDefs/xyzOrRef" }
        },
        "radius": {
          "type": "number"
        }
      }
    },
    "metadata": {
      "description": "descriptive info about a resource, such as the license and creation data",
      "examples": [
        {
          creator: 'Scrooge McDuck',
          license: 'All rights reserved'
        },
        {
          license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
          creator: 'Authored at <https://github.com/nicky-nym/city3d>',
          date: '2020'
        }
      ],
      "type": "object",
      "properties": {
        "license": {
          "description": "the legal terms this content is available under",
          "type": "string"
        },
        "creator": {
          "description": "the person or entity primarily responsible for making this content",
          "type": "string"
        },
        "date": {
          "description": "the year(s) (or dates) of authorship",
          "type": "string"
        }
      }
    },
    "numberOrRandom": {
      "description": "a number literal, or a specification for a random number",
      "examples": [
        -8,
        { $random: [2, 4, 8, 16] }
      ],
      "oneOf": [{
        "type": "number"
      }, {
        "type": "object",
        "required": [ "$random" ],
        "properties": {
          "$random": {
            "type": "array",
            "items": { 
              "type": "number"
            }
          }
        }
      }]
    },
    "outline": {
      "description": "Any simple 2D outline shape (like a triangle or a trapezoid) that forms a closed, counterclockwise loop",
      "examples": [
        { shape: 'rectangle', size: { x: 1, y: 2 } },
        { $ref: '#/def/RECTANGLE' },
        { shape: 'polygon',
          corners: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 }
          ] }
      ],
      "type": "object",
      "properties": {
        "shape": {
          "enum": [ "polygon", "rectangle" ]
        },
        "corners": {
          "description": "for irregular polygons, the list of corner points",
          "type": "array",
          "minItems": 3,
          "uniqueItems": false,
          "items": { "$ref": "~/typeDefs/xyOrRef" }
        },
        "size": { 
          "description": "for rectangles (or regular polygons), the size of the bounding box",
          "$ref": "~/typeDefs/xy" 
        },
        "top": { 
          "type": "object",
          "required": [ "style" ],
          "properties": {
            "style": {
              "enum": [ "gabled", "arched" ]
            },
            "pitch": {
              "$ref": "~/typeDefs/pitch"
            },
            "curvature": {
              "type": "number",
              "minimum": 0,
              "maximum": 1
            }
          }
        },
        "$ref": {
          "type": "string",
          "format": "uri-reference"
        }
      }
    },
    "pitch": {
      "description": "A ratio of rise-to-run, to specify a roof pitch",
      "examples": [
        { rise: 4, run: 12 },
        { rise: 2.2, run: 1 },
        { rise: 0, run: 12.0 }
      ],
      "type": "object",
      "required": ["rise", "run"],
      "properties": {
        "rise": {
          "description": "the amount of height increase per run length",
          "type": "number",
          "minimum": 0
        },
        "run": {
          "description": "the amount of horizontal distance per rise height",
          "type": "number",
          "exclusiveMinimum": 0
        }
      }
    },
    "pose": {
      "description": "The specification of how to place an object in 3D space",
      "examples": [
        { x: 1, y: 2, z: 0 },
        { x: 1, y: -2, from: 'left' },
        { x: 1, y: 2, z: 0, rotated: 90 },
        { x: 1, y: 2, z: 0, rotated: 90, mirrored: true },
        { rotated: 270, mirrored: true },
      ],
      "type": "object",
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
        },
        "z": {
          "description": "a z-axis distance, in the default unit of measure",
          "default": 0,
          "type": "number"
        },
        "from": {
          "enum": ["left", "center", "right"]
        },
        "rotated": {
          "description": "a compass bearing in degrees (0 to 360)",
          "type": "number",
          "default": 0,
          "minimum": 0,
          "exclusiveMaximum": 360,
        },
        "mirrored": {
          "description": "true if the xy-geometry of this object should be 'flipped' around the axis of rotation",
          "type": "boolean",
          "default": false
        }
      }
    },
    "surface": {
      "description": "Any building surface finish, such as a asphalt shingle roof surface, a clapboard wall siding, or a hardwood floor surface",
      "examples": [
        { style: 'flat', material: 'drywall' },
        { style: 'shingled', material: 'asphalt composition' },
        { style: 'parquet', material: 'wood' }
      ],
      "type": "object",
      "properties": {
        "style": {
          "enum": [
            "flat",
            "clapboard",
            "shingled",
            "standing seam",
            "parquet",
            "batten",
            "rusticated"
          ]
        },
        "material": {
          "enum": [
            "ceramic tile",
            "rammed earth",
            "brick",
            "cinder block",
            "stone",
            "gravel",
            "wood",
            "glulam",
            "bamboo",
            "thatch",
            "straw bale",
            "drywall",
            "plaster",
            "stucco",
            "concrete",
            "fiber-cement", 
            "asphalt composition",
            "glass",
            "steel",
            "steel, weathering",
            "aluminum",
            "zinc",
            "copper",
            "brass",
            "bronze",
            "fiberglass",
            "vinyl",
            "carpet",
            "fabric"
          ]
        }
      }
    },
    "xy": {
      "description": "A point (or vector) in a 2D space",
      "examples": [
        { x: 0, y: 0 },
        { x: 10, y: -20 },
        { x: 4 },
        { y: 5 }
      ],
      "type": "object",
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
    },
    "xyOrRef": {
      "examples": [
        { x: 5, y: 10 },
        { $ref: "#/def/pointA"}
      ],
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
        "required": [],
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
    "xyzOrRef": {
      "description": "A point (or vector) in a 3D space",
      "examples": [
        { x: 5, y: 10, z: 88 },
        { $ref: "#/def/pointA"}
      ],
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
        "required": [],
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
          },
          "z": {
            "description": "a z-axis distance, in the default unit of measure",
            "default": 0,
            "type": "number"
          }
        }
      }]
    }
  }
}
