import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    email: schema.string({}, [rules.required(), rules.email()]),
    username: schema.string({}, [rules.required(), rules.maxLength(32)]),
    cellPhoneNumber: schema.string({}, [rules.required()]),
    instagramRef: schema.string.optional({}, []),
    photoUrl: schema.string.optional({}, []),
    description: schema.string.optional({}, [rules.maxLength(200)]),
  })

  public messages = {
    'name.required': 'É necessário informar o nome de usuário!',
    'email.required': 'É necessário informar o email!',
    'email.email': 'Formato de email inválido!',
  }
}
