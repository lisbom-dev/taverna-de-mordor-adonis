import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment'
import UpdateValidator from 'App/Validators/Comment/UpdateValidator'

export default class CommentsController {
  public async update({ request, bouncer, params, response }: HttpContextContract) {
    const comment = await Comment.find(params.id)

    if (!comment) {
      return response.notFound('Comment not found')
    }

    await bouncer.with('CommentPolicy').authorize('update', comment)

    const data = await request.validate(UpdateValidator)

    comment.merge(data)
    await comment.save()
    return response.redirect().back()
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const comment = await Comment.find(params.id)
    if (!comment) {
      return response.notFound('Comment not found')
    }
    await bouncer.with('CommentPolicy').authorize('delete', comment)
    await comment.delete()
    return response.redirect().back()
  }
}
