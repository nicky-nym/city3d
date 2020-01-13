export default /* eslint-disable */
{
  "$id": "pitch.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "pitch",
  "description": "A ratio of rise-to-run, to specify a roof pitch",
  "type": "object",
  "examples": [
    { rise: 4, run: 12 },
    { rise: 2.2, run: 1 },
    { rise: 0, run: 12.0 }
  ],
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
}
