import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    number: schema.number.optional([rules.range(1, 5)]),
  })

  public messages = {
    'number.range': 'Só é possível avaliar entre 1 e 5 estrelas!',
  }
}
