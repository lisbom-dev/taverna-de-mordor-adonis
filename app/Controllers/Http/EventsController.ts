import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import EventPolicy from 'App/Policies/EventPolicy'
import StoreValidator from 'App/Validators/Event/StoreValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'

export default class EventsController {
  public async index({ view }: HttpContextContract) {
    const events = await Event.query()
    return view.render('events/list', {
      events,
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
