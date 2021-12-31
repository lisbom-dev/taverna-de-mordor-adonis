import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    number: schema.number([rules.required(), rules.range(1, 5)]),
  })

  public messages = {
    'number.required': 'Um número de estrelas é necessário!',
    'number.range': 'Só é possível avaliar entre 1 e 5 estrelas!',
  }
}
