export default /* eslint-disable */
{
  "$type": "window.schema.json",
  "examples": [
    {
      context: 'city3d',
      type: 'window.schema.json',
      name: 'kitchen window',
      unit: 'feet',
      motion: 'casement',
      outline: { shape: 'rectangle', size: { x: 16, y: 7 } },
      leafCount: { cols: 2 },
      lites: { rows: 2, cols: 1 },
      at: { x: 4, y: 3, from: 'left' },
      casing: { width: 0.5 },
      extras: { budget: {}, authors: {} }
    },
    // {
    //   $ref: '#/def/WINDOW'
    // }
  ]
}
