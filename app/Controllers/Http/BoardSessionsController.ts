import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import StoreValidator from 'App/Validators/Session/StoreValidator'

export default class BoardSessionsController {
  public async store({ response, request, bouncer, session, params }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }
    await bouncer.with('SessionPolicy').authorize('create', board)
    const data = await request.validate(StoreValidator)
    var time = data.time.split(':')
    var timeInSeconds = +time[0] * 60 * 60 + +time[1] * 60 + (+time[2] || 0)
    await board.related('sessions').create({
      boardId: data.boardId,
      date: data.date,
      time: timeInSeconds,
    })
    session.flash('success', ['Sessão cadastrada com sucesso!'])
    return response.redirect(`/boards/${board.id}`)
  }
}
