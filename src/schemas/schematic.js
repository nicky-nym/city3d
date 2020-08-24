/** @file schematic.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import Ajv from '../../node_modules/ajv/dist/ajv.min.js'
import SCHEMA from './schema.defs.json.js'

/**
 * Schematic is a class for generating and providing JSON Schemas.
 * The Schematic code reads schema info in a DRY, concise format from
 * schema.defs.json.js
 *, and then uses that concise info to generate full-fledged
 * schemas in the JSON Schema format (see https://json-schema.org/), which are
 * used to run schema validation checks on building spec files.
 */
class Schematic {
  /**
   * Creates a new Schematic
   */
  constructor () {
    this.entityKeys = Object.keys(SCHEMA.entityDefs)
    this.propertyKeys = Object.keys(SCHEMA.propertyDefs)
    this.schemas = {}
  }

  /**
   * Factory to create a new Ajv instance initialized with our entity schemas.
   */
  static createAjv () {
    const ajv = new Ajv()
    Object.keys(SCHEMA.typeDefs).forEach(item => ajv.addSchema(SCHEMA.typeDefs[item], `~/typeDefs/${item}`))
    // Object.keys(SCHEMA.typeDefs).forEach(item => ajv.addSchema(SCHEMA.typeDefs[item], `~/typeDefs/${item}`))
    const items = ['route', 'door', 'window', 'room', 'wall', 'ceiling', 'roof', 'floor', 'staircase', 'storey']
    items.forEach(item => ajv.addSchema(Schematic.getSchema(item), `${item}.schema.json`))
    return ajv
  }

  /**
   * Returns an Ajv schema validator function for an data type schema.
   */
  static getTypeValidator (typeName) {
    const ajv = Schematic.createAjv()
    const validator = ajv.compile(SCHEMA.typeDefs[typeName])
    return validator
  }

  /**
   * Returns an Ajv schema validator function for an entity schema.
   */
  static getEntityValidator (entityName) {
    const ajv = Schematic.createAjv()
    const schema = Schematic.getSchema(entityName)
    const validator = ajv.compile(schema)
    return validator
  }

  /**
   * Returns a type definition found in schema.defs.json.js
   *
   */
  static getTypeDefinition (typeName) {
    const typeDefinition = SCHEMA.typeDefs[typeName]
    if (typeDefinition) {
      return typeDefinition
    } else {
      throw new Error(`Schematic.getTypeDefinition('${typeName}'): no schema definition entry for '${typeName}'`)
    }
  }

  /**
   * Returns an property definition found in schema.defs.json.js
   *
   */
  static getPropertyDefinition (propertyName) {
    const propertyDefinition = SCHEMA.propertyDefs[propertyName]
    if (propertyDefinition) {
      return propertyDefinition
    } else {
      throw new Error(`Schematic.getPropertyDefinition('${propertyName}'): no schema definition entry for '${propertyName}'`)
    }
  }

  /**
   * Returns an entity definition found in schema.defs.json.js
   *
   */
  static getEntityDefinition (entityName) {
    const entityDefinition = SCHEMA.entityDefs[entityName]
    if (entityDefinition) {
      return entityDefinition
    } else {
      throw new Error(`Schematic.getEntity('${entityName}'): no schema definition entry for '${entityName}'`)
    }
  }

  /**
   * Returns a JSON Schema object for the given entityName.
   * If necessary, builds the Schema object based on the entity
   * definition found in schema.defs.json.js
   *
   */
  static getSchema (entityName) {
    if (!Schematic._schemas) {
      Schematic._schemas = {}
    }
    let schema = Schematic._schemas[entityName]
    if (schema) {
      return schema
    }
    schema = Schematic._buildSchemaForEntity(entityName)
    Schematic._schemas[entityName] = schema
    return schema
  }

  /**
   * Builds a JSON Schema object for the entity definition in schema.defs.json.js
   *
   */
  static _buildSchemaForEntity (entityName) {
    const entity = Schematic.getEntityDefinition(entityName)
    const schema = {
      $id: `${entityName}.schema.json`,
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: `${entityName}`,
      description: entity.description,
      type: 'object',
      examples: [],
      required: [],
      additionalProperties: false,
      properties: {}
    }
    Schematic._addProperties(schema, Schematic.getEntityDefinition('file'))
    Schematic._addProperties(schema, entity)
    return schema
  }

  static _addProperties (schema, entity) {
    const keys = Object.keys(entity.properties)
    for (const key of keys) {
      let value = entity.properties[key]
      if (value === null) {
        value = Schematic.getPropertyDefinition(key)
      } else if (typeof value === 'object' && typeof value.properties === 'object') {
        // TODO: this modifies the original entity definition itself,
        // which is a bug, because we want it to only modify the generated schema
        Schematic._addProperties(value, value)
      }
      schema.properties[key] = value
    }
  }
}

export { Schematic }
