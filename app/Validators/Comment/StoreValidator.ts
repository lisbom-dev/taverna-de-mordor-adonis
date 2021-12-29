import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message: schema.string({}, [rules.required()]),
  })

  public messages = {
    'message.required': 'O comentário não pode estar vazio!',
  }
}
