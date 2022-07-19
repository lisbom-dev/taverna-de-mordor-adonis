import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StoreValidator from 'App/Validators/Event/StoreValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'

export default class EventsController {
  public async index({ request }: HttpContextContract) {
    const { month = '0' } = request.qs()
    const date = parseInt(month, 10) ? addMonths(new Date(), parseInt(month, 10)) : new Date()
    const events = await Event.query().whereBetween('date', [startOfMonth(date), endOfMonth(date)])
    return {
      events,
      month: parseInt(month, 10),
    }
  }

  public async create({ bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    return view.render('events/create')
  }

  public async store({ response, request, bouncer, session }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await bouncer.with('EventPolicy').authorize('invoke')
    await Event.create(data)
    session.flash('success', ['Evento criado com sucesso!'])
    return response.redirect('/events')
  }

  public async edit({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    const event = await Event.find(params.id)
    if (!event) {
      return response.notFound('Event Not Found')
    }

    return event
  }

  public async update({ params, response, request, bouncer, session }: HttpContextContract) {
    const event = await Event.find(params.id)
    await bouncer.with('EventPolicy').authorize('invoke')
    if (!event) {
      return response.notFound('Event Not Found')
    }

    const data = await request.validate(UpdateValidator)
    event.merge(data)
    await event.save()
    return response.ok('ok')
  }

  public async show({ response, params }: HttpContextContract) {
    const event = await Event.find(params.id)
    if (!event) {
      return response.notFound('Event Not Found')
    }
    await event.load('reviews')
    return event
  }

  public async destroy({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound('Event Not Found')
    }

    await event.delete()
    return response.ok('ok')
  }
}
