import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
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
    const alreadyExists = board.sessions.find((s) => {
      return (
        new Date(s.date.toString().replace(/-/g, '/'))
          .toJSON()
          .substring(0, 10)
          .replace(/-/g, '/')
          .split('/')
          .reverse()
          .toString()
          .replace(/,/g, '/') ===
          new Date(data.date.toString()).toLocaleString('pt-BR').slice(0, 10) &&
        s.time === timeInSeconds
      )
    })

    if (alreadyExists) {
      throw new BadRequestException('Não é possível criar duas sessões com mesmo dia e hora!')
    }

    await board.related('sessions').create({
      boardId: data.boardId,
      date: data.date,
      time: timeInSeconds,
    })
    session.flash('success', ['Sessão cadastrada com sucesso!'])
    return response.redirect(`/boards/${board.id}`)
  }
}
