import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Event from 'App/Models/Event'
import EventBoard from 'App/Models/EventBoard'
import StoreValidator from 'App/Validators/EventBoard/StoreValidator'

export default class EventBoardsController {
  public async store({ params, response, request, session, bouncer }: HttpContextContract) {
    const event = await Event.find(params.event_id)

    if (!event) {
      return response.notFound('Event not found!')
    }
    if (event.occupiedBoards === event.maxBoards) {
      throw new BadRequestException('All seats have already been filled!')
    }

    const data = await request.validate(StoreValidator)
    await bouncer.with('EventBoardPolicy').authorize('invoke', data.boardId, event.id)
    const eventBoard = await EventBoard.create({ boardId: data.boardId, eventId: event.id })

    data.hours.forEach(async (h) => {
      const time = h.time.split(':')
      const timeInSeconds = +time[0] * 60 * 60 + +time[1] * 60 + (+time[2] || 0)
      await eventBoard.related('sessions').create({
        date: data.date,
        time: timeInSeconds,
        eventBoardId: eventBoard.id,
      })
    })

    session.flash('success', ['mesa adicionada ao evento com sucesso!'])
    return response.redirect('/events')
  }
}
