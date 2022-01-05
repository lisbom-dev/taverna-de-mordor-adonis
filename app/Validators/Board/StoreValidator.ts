import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    systemId: schema.number([rules.required(), rules.exists({ table: 'systems', column: 'id' })]),
    maxPlayers: schema.number([rules.required(), rules.unsigned()]),
    masterId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    currentSection: schema.number([rules.required()]),
  })

  public messages = {
    'name.required': 'É necessário informar o nome da mesa!',
    'systemId.required': 'É necessário informar o sistema da mesa!',
    'systemId.exists': 'O sistema informado não existe!',
    'maxPlayers.required': 'É necessário informar o número máximo de jogadores da mesa!',
    'masterId.required': 'É necessário informar o mestre da mesa!',
    'masterId.exists': 'O mestre informado não existe!',
    'currentSection.required': 'É necessário informar a sessão da mesa!',
  }
}
