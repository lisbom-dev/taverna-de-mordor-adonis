import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    date: schema.date({}, [rules.required(), rules.after(3, 'days')]),
    time: schema.number([rules.required()]),
    description: schema.string({}, [rules.required()]),
    location: schema.string({}, [rules.required()]),
    maxBoards: schema.number([rules.required(), rules.unsigned()]),
    theme: schema.string({}, [rules.required()]),
  })

  public messages = {
    'name.required': 'É necessário informar o nome do evento!',
    'date.required': 'É necessário informar a data do evento!',
    'date.after': 'O evento precisa ser criado 4 dias antes de acontecer!',
    'description.required': 'É necessário informar a descrição do evento!',
    'location.required': 'É necessário informar a localização do evento!',
    'maxBoards.required': 'É necessário informar o número máximo de mesas!',
    'time.required':'É necessário informar o horário de início do evento!',
  }
}
