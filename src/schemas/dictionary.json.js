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
