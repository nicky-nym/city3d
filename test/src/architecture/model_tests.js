/**
 * @file model_tests.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../../node_modules/ajv/dist/ajv.min.js'
import { Building } from '../../../src/architecture/building.js'
import { City } from '../../../src/architecture/city.js'
import { District } from '../../../src/architecture/district.js'
import { Door } from '../../../src/architecture/door.js'
import { Floor } from '../../../src/architecture/floor.js'
import { Outline } from '../../../src/core/outline.js'
import { Parcel } from '../../../src/architecture/parcel.js'
import { Pitch } from '../../../src/core/pitch.js'
import { Pose } from '../../../src/core/pose.js'
import { Ray } from '../../../src/core/ray.js'
import { Roof } from '../../../src/architecture/roof.js'
import { SCHEMA } from '../../../src/schemas/schema.js'
import { Storey } from '../../../src/architecture/storey.js'
import { Structure } from '../../../src/architecture/structure.js'
import { Wall } from '../../../src/architecture/wall.js'
import { Window } from '../../../src/architecture/window.js'

/* global describe, it, before, after, expect */

// 'NA' means there is no corresponding class.
// TODO: should some of these missing classes actually exist?
const modelClasses = {
  'definitions.json': 'NA',
  'metadata.schema.json': 'NA',
  'building.schema.json': Building,
  'ceiling.schema.json': 'NA',
  'city.schema.json': City,
  'copy.schema.json': 'NA',
  'district.schema.json': District,
  'door.schema.json': Door,
  'floor.schema.json': Floor,
  'grid.schema.json': 'NA',
  'line.schema.json': 'NA',
  'outline.schema.json': Outline,
  'parcel.schema.json': Parcel,
  'pitch.schema.json': Pitch,
  'pose.schema.json': Pose,
  'roof.schema.json': Roof,
  'room.schema.json': 'NA',
  'route.schema.json': 'NA',
  'storey.schema.json': Storey,
  'structure.schema.json': Structure,
  'surface.schema.json': 'NA',
  'vehicle.schema.json': 'NA',
  'wall.schema.json': Wall,
  'window.schema.json': Window,
  'xy.schema.json': 'NA',
  'xyz.schema.json': 'NA'
}

const notYetWorking = [
  'city.schema.json', // makeModelFromSpec() not defined yet
  'district.schema.json', // makeModelFromSpec() takes 3 arguments
  'outline.schema.json', // makeModelFromSpec() not defined yet
  'parcel.schema.json', // makeModelFromSpec() takes 3 arguments
  'pitch.schema.json', // makeModelFromSpec() not defined yet
  'pose.schema.json', // makeModelFromSpec() not defined yet
  'roof.schema.json', // makeModelFromSpec() takes 3 arguments
  'wall.schema.json' // makeModelFromSpec() is currently broken
]

describe('Model', function () {
  const ajv = new Ajv()
  const schemas = Object.keys(SCHEMA).map(item => SCHEMA[item])

  before(function () {
    Object.keys(SCHEMA).forEach(item => ajv.addSchema(SCHEMA[item], SCHEMA[item].$id))
  })

  after(function () {
    Object.keys(SCHEMA).forEach(item => ajv.removeSchema(SCHEMA[item]))
  })

  schemas.forEach(schema => {
    describe(schema.$id, function () {
      it('should have an entry in modelClasses.', function () {
        modelClasses.should.have.property(schema.$id)
      })

      if (modelClasses[schema.$id] !== 'NA' && modelClasses[schema.$id] !== 'TODO') {
        describe('#makeModelFromSpec', function () {
          it('should succeed for every example.', function () {
            if (notYetWorking.includes(schema.$id)) {
              this.skip()
            }

            schema.examples.forEach(example => {
              const model = new modelClasses[schema.$id]()
              const ray = new Ray()
              const msg = `example.name = ${example.name}`

              expect(() => model.makeModelFromSpec(example, ray), msg).to.not.throw()
            })
          })
        })
      }
    })
  })
})
