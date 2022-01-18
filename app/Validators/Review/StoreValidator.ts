import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    comment: schema.string({}, [rules.required(), rules.maxLength(220)]),
    rating: schema.number.optional([rules.range(1, 5)]),
  })

  public messages = {
    'comment.required': 'O comentário não pode estar vazio!',
    'comment.maxLength': 'O comentário não pode ultrapassar o limite de caracteres!',
    'rating.range': 'Só é possível avaliar entre 1 e 5 estrelas!',
  }
}
