/** @file schematic.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import DICTIONARY from './dictionary.json.js'

/// import DEFINITIONS from './definitions.json.js'
/// import METADATA from './metadata.schema.json.js'

/**
 * Schematic is a class for generating and providing JSON Schemas.
 * The Schematic code reads schema info in a DRY, concise format from
 * dictionary.json.js, and then uses that concise info to generate full-fledged
 * schemas in the JSON Schema format (see https://json-schema.org/), which are
 * used to run schema validation checks on building spec files.
 */
class Schematic {
  /**
   * Creates a new Schematic
   */
  constructor () {
    this.entityKeys = Object.keys(DICTIONARY.entityDefinitions)
    this.propertyKeys = Object.keys(DICTIONARY.propertyDefinitions)
    this.schemas = {}
  }

  /**
   * Returns a type definition found in dictionary.json.js
   */
  static getTypeDefinition (typeName) {
    const typeDefinition = DICTIONARY.typeDefinitions[typeName]
    if (typeDefinition) {
      return typeDefinition
    } else {
      throw new Error(`Schematic.getTypeDefinition('${typeName}'): no schema dictionary entry for '${typeName}'`)
    }
  }

  /**
   * Returns an property definition found in dictionary.json.js
   */
  static getPropertyDefinition (propertyName) {
    const propertyDefinition = DICTIONARY.propertyDefinitions[propertyName]
    if (propertyDefinition) {
      return propertyDefinition
    } else {
      throw new Error(`Schematic.getPropertyDefinition('${propertyName}'): no schema dictionary entry for '${propertyName}'`)
    }
  }

  /**
   * Returns an entity definition found in dictionary.json.js
   */
  static getEntityDefinition (entityName) {
    const entityDefinition = DICTIONARY.entityDefinitions[entityName]
    if (entityDefinition) {
      return entityDefinition
    } else {
      throw new Error(`Schematic.getEntity('${entityName}'): no schema dictionary entry for '${entityName}'`)
    }
  }

  /**
   * Returns a JSON Schema object for the given entityName.
   * If necessary, builds the Schema object based on the entity
   * definition found in definitions.json.js
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
   * Builds a JSON Schema object for the entity definition in definitions.json.js
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
      }
      schema.properties[key] = value
    }
  }
}

export { Schematic }
