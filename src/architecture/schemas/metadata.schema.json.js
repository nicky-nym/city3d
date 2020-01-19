export default /* eslint-disable */
{
  "$id": "metadata.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "descriptive info about a resource, such as the license and creation data",
  "title": "metadata",
  "type": "object",
  "examples": [
    {
      license: 'UNLICENSE: This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org>',
      creator: 'Authored at <https://github.com/nicky-nym/city3d>',
      date: '2020'
    },
    { date: '2020' },
    { iggyPop: { no: 'fun' } },
    { }
  ],
  "required": [],
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
}
