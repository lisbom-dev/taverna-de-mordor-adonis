import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    characterName: schema.string({}, [rules.required()]),
  })

  public messages = {
    'characterName.required': 'É necessário informar o nome do personagem!',
  }
}
