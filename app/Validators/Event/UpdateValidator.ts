import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    name: schema.string.optional({}, []),
    time: schema.number.optional(),
    date: schema.date.optional({}, [rules.after(3, 'days')]),
    description: schema.string.optional({}, []),
    location: schema.string.optional({}, []),
    maxBoards: schema.number.optional([rules.unsigned()]),
    theme: schema.string.optional({}, []),
  })

  public messages = {}
}
