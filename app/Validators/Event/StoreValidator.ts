import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    date: schema.date({}, [rules.required(), rules.after(4, 'days')]),
    description: schema.string({}, [rules.required()]),
    location: schema.string({}, [rules.required()]),
  })

  public messages = {}
}
