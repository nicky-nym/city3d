export default /* eslint-disable */
{
  /* See "propertyDefinitions" section below for definitions of the properties */
  "entityDefinitions": {
    "file": {
      "required": [],
      "additionalProperties": false,
      "properties": {
        "context": null,
        "name": null,
        "metadata": null,
        "comments": null,
        "extras": null
      }
    },
    "building": {
      "description": "Any building, with walls, floors, a roof, etc.",
      "properties": {
        "type": { "const": "building.schema.json" },
        "unit": null,
        "def": null,
        "anchorPoint": null,
        "routes": null,
        "storeys": null
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
        "contents": null
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
        "pavement": null,
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
        "name": null,
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
        "def": null,
        "anchorPoint": null,
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
          "required": [  ],
          "properties": {
            "surface": null,
            "fixtures": null,
            "downspouts": null
          }
        },
        "inside": { 
          "type": "object",
          "required": [  ],
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
        "$ref": { "$ref": "#/typeDefinitions/$$ref" },
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
  /* These are definitions of the properties used in the "entityDefinitions" section above */
  "propertyDefinitions": {
    "altitude": { "$ref": "#/typeDefinitions/numberOrRandom" },
    "anchorPoint": {
      "description": "the point that serves as the center of the building when the building is place on a parcel",
      "$ref": "xy.schema.json"
    },
    "at": { "$ref": "pose.schema.json" },
    "begin": { "$ref": "#/typeDefinitions/xyOrRef" },
    "border": { "$ref": "outline.schema.json" },
    "casing": { 
      "type": "object",
      "required": [  ],
      "properties": {
        "width": {
          "type": "number"
        }
      }
    },
    "ceiling": { "$ref": "#/entityDefinitions/ceiling" },
    "comments": {
      "description": "just a space for any notes the author wants to include",
      "type": "array",
      "items": { "type": "string" }
    },
    "contents": {
      "description": "other model objects that are inside this one, like a car in a garage, or a sofa in a living room",
      "type": "array",
      "items": { "$ref": "copy.schema.json" }
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
      "items": { "$ref": "copy.schema.json" }
    },
    "doors": {
      "type": "array",
      "items": { "$ref": "#/entityDefinitions/door" }
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
    "end": { "$ref": "#/typeDefinitions/xyOrRef" },
    "extras": {
      "description": "any additional data to keep track of",
      "type": "object"
    },
    "fixtures": {
      "type": "array",
      "items": { "$ref": "copy.schema.json" }
    },
    "floors": {
      "type": "array",
      "items": { "$ref": "#/entityDefinitions/floor" }
    },
    "form": {
      "enum": ["none", "flat", "pitched", "hipped", "shed", "living", "vaulted"]
    },
    "handleSide": {
      "enum": ["left", "center", "right"]
    },
    "height": { "$ref": "#/typeDefinitions/numberOrRandom" },
    "incline": { "$ref": "#/typeDefinitions/numberOrRandom" },
    "leafCount": { "$ref": "grid.schema.json" },
    "lines": {
      "type": "array",
      "items": { "$ref": "line.schema.json" }
    },
    "lites": { "$ref": "grid.schema.json" },
    "metadata": { "$ref": "metadata.schema.json" },
    "mode": {
      "enum": ["canal", "walkway", "bikeway", "roadway"]
    },
    "motion": {
      "enum": ["casement", "awning", "sliding", "hung", "picture", "open"]
    },
    "name": {
      "description": "a display name for users to see",
      "type": "string"
    },
    "openings": {
      "type": "array",
      "items": { "$ref": "outline.schema.json" }
    },
    "outline": { "$ref": "outline.schema.json" },
    "parapetHeight": {
      "type": "number"
    },
    "parcels": {
      "type": "array",
      "items": { "$ref": "copy.schema.json" }
    },
    "pavement": {
      "description": "paved surfaces, like streets, sidewalks, driveways, and bike paths",
      "type": "array",
      "items": { 
        "type": "object",
        "required": [],
        "properties": {
          "name": { "type": "string" },
          "surface": { "$ref": "surface.schema.json" },
          "outline": { "$ref": "outline.schema.json" }
        }
      }
    },
    "pitch": { "$ref": "pitch.schema.json" },
    "repeat": { "$ref": "#/typeDefinitions/numberOrRandom" },
    /* TODO: fix me $$ref */
    "$ref": { "$ref": "#/typeDefinitions/$$ref" },
    "roof": { "$ref": "#/entityDefinitions/roof" },
    "roofline": {
      "enum": ["none", "gabled", "pitched", "shed"]
    },
    "rooms": {
      "type": "array",
      "items": { "$ref": "#/entityDefinitions/room" }
    },
    "routes": {
      "type": "array",
      /* TODO: { "$ref": "#/entityDefinitions/route" } */
      "items": { "$ref": "route.schema.json" }
    },
    "staircases": {
      "type": "array",
      "items": { "$ref": "#/entityDefinitions/staircase" }
    },
    "storeys": {
      "type": "array",
      /* TODO: { "$ref": "#/entityDefinitions/storey" } */
      "items": { "$ref": "storey.schema.json" }
    },
    "surface": { "$ref": "surface.schema.json" },
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
          "items": { "$ref": "#/entityDefinitions/wall" }
        },
        "interior": {
          "type": "array",
          "items": { "$ref": "#/entityDefinitions/wall" }
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
          "outline": { "$ref": "outline.schema.json" }
        }
      }
    },
    "waypoints": {
      "type": "array",
      "minItems": 2,
      "items": { "$ref": "#/typeDefinitions/xyOrRef" }
    },
    "windows": {
      "type": "array",
      "items": { "$ref": "#/entityDefinitions/window" }
    }
  },
  /* These are definitions of the data types used in the "propertyDefinitions" section above */
  "typeDefinitions": {
    "$$ref": {
      "type": "string",
      "format": "uri-reference"
    },
    "copy": {
      "description": "The specification of how to place an object in 3D space",
      "type": "object",
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
    },
    "grid": {
      "description": "A grid of rows and columns",
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
      "type": "object",
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
    },
    "metadata": {
      "description": "descriptive info about a resource, such as the license and creation data",
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
          "items": { "$ref": "definitions.json#/def/xyOrRef" }
        },
        "size": { 
          "description": "for rectangles (or regular polygons), the size of the bounding box",
          "$ref": "xy.schema.json" 
        },
        "top": { 
          "type": "object",
          "required": [ "style" ],
          "properties": {
            "style": {
              "enum": [ "gabled", "arched" ]
            },
            "pitch": {
              "$ref": "pitch.schema.json"
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
    }
  }
}
