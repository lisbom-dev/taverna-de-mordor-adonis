import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StoreValidator from 'App/Validators/Event/StoreValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'

export default class EventsController {
  public async index({ view, request }: HttpContextContract) {
    const { month = '0' } = request.qs()
    const date = parseInt(month, 10) ? addMonths(new Date(), parseInt(month, 10)) : new Date()
    const events = await Event.query().whereBetween('date', [startOfMonth(date), endOfMonth(date)])
    return view.render('events/list', {
      events,
      month: parseInt(month, 10),
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    return view.render('events/create')
  }

  public async store({ response, request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await Event.create(data)
    return response.redirect('/events')
  }

  public async edit({ response, view, params, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    const event = await Event.find(params.id)
    if (!event) {
      return response.notFound('Event Not Found')
    }

    return view.render('events/edit', { event })
  }

  public async update({ params, response, request }: HttpContextContract) {
    const event = await Event.find(params.id)
    if (!event) {
      return response.notFound('Event Not Found')
    }

    const data = await request.validate(UpdateValidator)
    event.merge(data)
    await event.save()
    return response.redirect('/events')
  }

  public async show({ response, view, params }: HttpContextContract) {
    const event = await Event.find(params.id)
    if (!event) {
      return response.notFound('Event Not Found')
    }
    await event.load('comment')
    return view.render('events/index', { event })
  }

  public async destroy({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound('Event Not Found')
    }

    await event.delete()
    return response.redirect('/events')
  }
}
