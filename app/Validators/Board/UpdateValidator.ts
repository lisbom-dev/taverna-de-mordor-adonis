import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, []),
    systemId: schema.number.optional([rules.exists({ table: 'systems', column: 'id' })]),
    maxPlayers: schema.number.optional([rules.unsigned()]),
    masterId: schema.number.optional([rules.exists({ table: 'users', column: 'id' })]),
    currentSection: schema.number.optional([]),
  })

  public messages = {
    'systemId.exists': 'O sistema informado não existe!',
    'masterId.exists': 'O mestre informado não existe!',
  }
}
