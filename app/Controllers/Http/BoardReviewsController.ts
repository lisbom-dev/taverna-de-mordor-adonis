import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/Review/StoreValidator'

export default class BoardReviewsController {
  public async store({ request, params, response, bouncer }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    await board.load('reviews')
    await bouncer.with('BoardReviewPolicy').authorize('create', board)
    const data = await request.validate(StoreValidator)
    await board.related('reviews').create(data)
    return response.ok('ok')
  }
}
