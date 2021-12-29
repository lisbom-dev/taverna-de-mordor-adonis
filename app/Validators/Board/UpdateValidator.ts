import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, []),
    system: schema.string.optional({}, []),
    maxPlayers: schema.number.optional([]),
    masterId: schema.number.optional([rules.exists({ table: 'users', column: 'id' })]),
    currentSection: schema.number.optional([]),
  })

  public messages = {
    'masterId.exists': 'O mestre informado não existe!',
  }
}
