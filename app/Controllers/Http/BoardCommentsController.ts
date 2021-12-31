import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/Comment/StoreValidator'

export default class BoardCommentsController {
  public async store({ request, params, response }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    const data = await request.validate(StoreValidator)
    board.related('comment').create(data)
  }
}
