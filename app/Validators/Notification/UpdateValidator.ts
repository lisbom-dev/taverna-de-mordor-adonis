import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }
  public schema = schema.create({
    read: schema.boolean([rules.required()]),
  })
  public messages = {
    'read.required': 'A informação de leitura é obrigatória',
  }
}
