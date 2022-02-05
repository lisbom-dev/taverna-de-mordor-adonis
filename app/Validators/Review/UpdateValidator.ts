import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    senderId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    comment: schema.string.optional({}, [rules.minLength(1), rules.maxLength(220)]),
    rating: schema.number.optional([rules.range(0.5, 5)]),
  })

  public messages = {
    'comment.minLength': 'O comentário não pode estar vazio!',
    'comment.maxLength': 'O comentário não pode ultrapassar o limite de caracteres!',
    'rating.range': 'Só é possível avaliar entre 0,5 e 5 estrelas!',
  }
}
