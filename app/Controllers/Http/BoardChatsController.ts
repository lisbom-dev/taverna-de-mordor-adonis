import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import Message from 'App/Schemas/Message'

export default class BoardChatsController {
  public async index({ params, response, view }: HttpContextContract) {
    const board = await Board.find(params.board_id)

    if (!board) {
      return response.notFound('Board not found!')
    }
    const messages = await Message.find({ boardId: board.id })

    return view.render('boards/chat', { board, messages })
  }
}
