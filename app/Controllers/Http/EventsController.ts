import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

export default class EventsController {
  public async index(ctx: HttpContextContract) {
    const events = await Event.query()
    return ctx.view.render('events/list', {
      events,
    })
  }
}
