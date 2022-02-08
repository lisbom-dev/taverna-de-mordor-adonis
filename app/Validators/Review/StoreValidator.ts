import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    senderId: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    comment: schema.string({}, [rules.required(), rules.maxLength(300)]),
    rating: schema.number([rules.range(0.5, 5), rules.required()]),
  })

  public messages = {
    'comment.required': 'O comentário não pode estar vazio!',
    'comment.maxLength': 'O comentário não pode ultrapassar o limite de caracteres!',
    'rating.required': 'A avaliação não pode estar vazia!',
    'rating.range': 'Só é possível avaliar entre 0,5 e 5 estrelas!',
  }
}
