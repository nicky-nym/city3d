export default /* eslint-disable */
{
  "$type": "outline",
  "examples": [
    {
      shape: 'rectangle',
      size: { x: 1, y: 2 }
    },
    {
      shape: 'polygon',
      corners: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 }
      ]
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'gabled' }
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'gabled', pitch: { rise: 4, run: 12 } }
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'arched' }
    },
    {
      shape: 'rectangle',
      size: { x: 4, y: 8 },
      top: { style: 'arched', curvature: 0.4 }
    },
    { 
      $ref: '#/def/RECTANGLE'
    }
  ]
}
