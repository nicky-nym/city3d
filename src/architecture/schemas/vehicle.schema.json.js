export default /* eslint-disable */
{
  "$id": "vehicle.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Any sort of small vehicle, with parts including wheels, axles, bench seats & bike saddles, and handlebars",
  "title": "xy",
  "type": "object",
  "examples": [
    {
      context: 'city3d',
      type: 'vehicle.schema.json',
      name: 'Pedicab (bicycle rickshaw)',
      color: 0x0066ff,
      unit: 'feet',
      saddles: [{ forward: 3.2, up: 3 }],
      body: [{ forward: 1, width: 3, length: 1.2 }],
      seating: [{ forward: 0.2, up: 2 }],
      wheels: [{
        axleWidth: 3.5,
        diameter: 2.25,
        spokes: 18
      }, {
        handlebars: { forward: -0.8 },
        forward: 6,
        diameter: 2.25,
        spokes: 12
      }]
    },
    { }
  ],
  "required": [],
  "properties": { },
  "additionalProperties": {
    "type": "object",
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
      "color": {
        "default": 0xffffff,
        "type": "number"
      },
      "unit": {
        "type": "string"
      },
      "saddles": { 
        "type": "array",
        "items": { 
          "type": "object",
          "required": [  ],
          "properties": {
            "forward": {
              "type": "number"
            },
            "up": {
              "type": "number"
            },
            "bottomOffset": { // TODO: delete this once Vehicle is fixed to not need it
              "type": "number"
            }
          }
        }
      },
      "body": { 
        "type": "array",
        "items": { 
          "type": "object",
          "required": [  ],
          "properties": {
            "forward": {
              "type": "number"
            },
            "up": {
              "type": "number"
            },
            "width": {
              "type": "number"
            },
            "length": {
              "type": "number"
            },
            "height": {
              "type": "number"
            }
          }
        }
      },
      "seating": { 
        "type": "array",
        "items": { 
          "type": "object",
          "required": [  ],
          "properties": {
            "forward": {
              "type": "number"
            },
            "up": {
              "type": "number"
            }
          }
        }
      },
      "wheels": { 
        "type": "array",
        "items": { 
          "type": "object",
          "required": [  ],
          "properties": {
            "forward": {
              "type": "number"
            },
            "up": {
              "type": "number"
            },
            "diameter": {
              "type": "number"
            },
            "spokes": {
              "type": "number"
            },
            "axleWidth": {
              "type": "number"
            },
            "tireWidth": {
              "type": "number"
            },
            "handlebars": { 
              "type": "object",
              "required": [  ],
              "properties": {
                "forward": {
                  "type": "number"
                },
                "up": {
                  "type": "number"
                },
                "width": {
                  "type": "number"
                }
              }
            }
          }
        }
      }
    }
  }
}
