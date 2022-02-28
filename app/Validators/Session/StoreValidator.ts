import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    boardId: schema.number([
      rules.required(),
      rules.exists({ column: 'board_id', table: 'event_boards' }),
    ]),
    date: schema.date({}, [rules.required(), rules.after(2, 'days')]),
    time: schema.string({}, [rules.required()]),
  })

  public messages = {
    'time.required': 'É necessário informar o horário de início da sessão!',
    'boardId.required': 'É necessário informar a mesa da sessão!',
    'boardId.exists': 'A mesa informada não está inserida em nenhum evento!',
    'date.required': 'É necessário informar a data em que ocorrerá a sessão!',
    'date.after': 'A sessão precisa ser cadastrada com pelo menos 2 dias de antecedência!',
  }
}
