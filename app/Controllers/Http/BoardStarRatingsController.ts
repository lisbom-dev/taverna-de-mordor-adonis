import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/StarRating/StoreValidator'

export default class BoardStarRatingsController {
  public async store({ request, response, params }: HttpContextContract) {
    const board = await Board.find(params.id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    const data = await request.validate(StoreValidator)
    await board.related('starRating').create(data)
  }
}
