export default /* eslint-disable */
{
  "$id": "surface.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "surface",
  "description": "Any building surface finish, such as a asphalt shingle roof surface, a clapboard wall siding, or a hardwood floor surface",
  "type": "object",
  "examples": [
    {
      style: 'flat', // default
      material: 'drywall'
    },
    {
      style: 'clapboard',
      material: 'fiber-cement'
    },
    {
      style: 'shingles',
      material: 'asphalt composition'
    },
    {
      style: 'parquet',
      material: 'wood'
    },
    {
      style: 'flat'
    },
    {
      material: 'drywall'
    },
    {  }
  ],
  "required": [  ],
  "properties": {
    "style": {
      "enum": [
        "flat",
        "clapboard",
        "shingled",
        "standing seam",
        "parquet",
        "batten"
      ]
    },
    "material": {
      "enum": [
        "ceramic tile",
        "rammed earth",
        "brick",
        "cinder block",
        "stone",
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
}
