export default /* eslint-disable */
{
  "$id": "grid.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A grid of rows and columns",
  "title": "grid",
  "type": "object",
  "examples": [
    { rows: 0, cols: 0 },
    { rows: 2 },
    { cols: 10 },
    { iggyPop: { no: 'fun' } },
    { }
  ],
  "required": [],
  "properties": {
    "rows": {
      "description": "the number of rows in the grid",
      "default": 0,
      "type": "integer"
    },
    "cols": {
      "description": "the number of columns in the grid",
      "default": 0,
      "type": "integer"
    }
  }
}
