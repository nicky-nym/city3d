/** @file sandbox-memory.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { CITY } from '../src/citylib.js'

let N = 5

async function addBuildings (city, threeOutput, memoryOutput) {
  let complex

  await memoryOutput.add('after initial render')

  complex = new CITY.MidriseComplex({ x0: -1000, y0: 1000, numRowPairs: N, numColPairs: N })
  city.add(complex)
  await memoryOutput.add(`created ${N} x ${N} complex`)
  threeOutput.add(complex)
  await memoryOutput.add(`rendered ${N} x ${N} complex`)

  complex = new CITY.MidriseComplex({ x0: -1000, y0: -1000, numRowPairs: N, numColPairs: N })
  city.add(complex)
  await memoryOutput.add(`created ${N} x ${N} complex`)
  threeOutput.add(complex)
  await memoryOutput.add(`rendered ${N} x ${N} complex`)

  N *= 2

  complex = new CITY.MidriseComplex({ x0: 1000, y0: -1000, numRowPairs: N, numColPairs: N })
  city.add(complex)
  await memoryOutput.add(`created ${N} x ${N} complex`)
  threeOutput.add(complex)
  await memoryOutput.add(`rendered ${N} x ${N} complex`)

  complex = new CITY.MidriseComplex({ x0: 1000, y0: 1000, numRowPairs: N, numColPairs: N })
  city.add(complex)
  await memoryOutput.add(`created ${N} x ${N} complex`)
  threeOutput.add(complex)
  await memoryOutput.add(`rendered ${N} x ${N} complex`)
}

function main () {
  const city = new CITY.City('Paracosm')
  const threeOutput = new CITY.ThreeOutput([city])
  CITY.Output.addOutput(threeOutput)
  const memoryOutput = new CITY.MemoryOutput(city)
  CITY.Output.addOutput(memoryOutput)

  addBuildings(city, threeOutput, memoryOutput)
}

main()
