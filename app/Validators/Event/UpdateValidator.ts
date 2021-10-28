import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    name: schema.string.optional({}, []),
    date: schema.date.optional({}, [rules.after(4, 'days')]),
    description: schema.string.optional({}, []),
    location: schema.string.optional({}, []),
  })

  public messages = {}
}
