import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Board from 'App/Models/Board'
import Event from 'App/Models/Event'
import EventBoard from 'App/Models/EventBoard'
import StoreValidator from 'App/Validators/Session/StoreValidator'

export default class BoardSessionsController {
  public async store({ response, request, bouncer, session, params }: HttpContextContract) {
    const board = await Board.find(params.board_id)
    if (!board) {
      return response.notFound('Board not found!')
    }

    const eventBoards = (await EventBoard.query()).filter(async (eb) => {
      const event = await Event.find(eb.eventId)
      eb.boardId === board.id &&
        new Date(event!.date.toString().replace(/-/g, '/')).getTime() > new Date().getTime()
    })

    if (!eventBoards) {
      throw new BadRequestException(
        'Para poder inserir uma sessão, a mesa precisa estar cadastrada em um evento!'
      )
    }

    await bouncer.with('SessionPolicy').authorize('create', board)
    const data = await request.validate(StoreValidator)
    var time = data.time.split(':')
    var timeInSeconds = +time[0] * 60 * 60 + +time[1] * 60 + (+time[2] || 0)

    const sessionAlreadyExists = eventBoards.map((eb) =>
      eb.sessions?.find((s) => {
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
    )[0]

    if (sessionAlreadyExists) {
      throw new BadRequestException('Não é possível criar duas sessões com mesmo dia e hora!')
    }

    const validEventBoard = eventBoards.find(async (eb) => {
      const requiredDate = new Date(data.date.toString()).toLocaleString('pt-BR').slice(0, 10)

      const event = await Event.find(eb.eventId)
      const eventBoardDate = new Date(event!.date.toString().replace(/-/g, '/'))
        .toJSON()
        .substring(0, 10)
        .replace(/-/g, '/')
        .split('/')
        .reverse()
        .toString()
        .replace(/,/g, '/')

      const requiredTime = timeInSeconds
      console.log(eb.times)

      const requiredTimeIsValid = eb.times.find((t) => {
        console.log(t.startHour, t.endHour)

        const starHourInSeconds =
          +t.startHour[0] * 60 * 60 +
          +t.startHour[1] * 60 +
          (+t.startHour[2] || 0) +
          t.startHour[0] * 60 * 60 +
          +t.startHour[1] * 60 +
          (+t.startHour[2] || 0)

        const endHourInSeconds =
          +t.endHour[0] * 60 * 60 +
          +t.endHour[1] * 60 +
          (+t.endHour[2] || 0) +
          t.endHour[0] * 60 * 60 +
          +t.endHour[1] * 60 +
          (+t.endHour[2] || 0)

        return starHourInSeconds <= requiredTime && endHourInSeconds >= requiredTime
      })

      return requiredDate === eventBoardDate && requiredTimeIsValid
    })

    if (!validEventBoard) {
      throw new BadRequestException(
        'Os dados da sessão não estão de acordo com nenhum evento em que a mesa está cadastrada!'
      )
    } else {
      await validEventBoard.related('sessions').create({
        eventBoardId: validEventBoard.id,
        date: data.date,
        time: timeInSeconds,
      })
      session.flash('success', ['Sessão cadastrada com sucesso!'])
    }

    return response.redirect(`/boards/${board.id}`)
  }
}
