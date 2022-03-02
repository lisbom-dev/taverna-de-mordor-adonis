import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    boardId: schema.number([rules.required(), rules.exists({ table: 'boards', column: 'id' })]),
    hours: schema.array([rules.required(), rules.minLength(1)]).members(
      schema.object().members({
        time: schema.string({}, [rules.required()]),
      })
    ),
    date: schema.date({}, [rules.required(), rules.after(2, 'days')]),
  })

  public messages = {
    'boardId.required': 'É necessário informar a mesa!',
    'boardId.exists': 'A mesa informada não existe!',
    'hours.required': 'É necessário informar o horário da mesa!',
    'hours.minLength': 'É necessário informar pelo menos um horário para a mesa!',
    'hours.time.required': 'É necessário informar o horário de início da mesa!',
    'date.after': 'A mesa precisa ser inserida pelo menos 2 dias antes do evento acontecer!',
  }
}
