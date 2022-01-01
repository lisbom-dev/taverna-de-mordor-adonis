import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    boardId: schema.number([rules.required(), rules.exists({ table: 'boards', column: 'id' })]),
    hours: schema.array([rules.required(), rules.minLength(1)]).members(
      schema.object().members({
        startHour: schema.number([rules.required()]),
        endHour: schema.number([rules.required()]),
      })
    ),
  })

  public messages = {
    'boardId.required': 'É necessário informar a mesa!',
    'boardId.exists': 'A mesa informada não existe!',
    'hours.required': 'É necessário informar o horário da mesa!',
    'hours.minLength': 'É necessário informar pelo menos um horário para a mesa!',
    'hours.startHour.required': 'É necessário informar o horário de início da mesa!',
    'hours.endHour.required': 'É necessário informar o horário de término da mesa!',
  }
}
