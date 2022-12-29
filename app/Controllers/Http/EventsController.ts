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

  public async store({ response, request, bouncer }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    var time = data.time.split(':')
    var timeInSeconds = +time[0] * 60 * 60 + +time[1] * 60 + (+time[2] || 0)

    await bouncer.with('EventPolicy').authorize('invoke')
    await Event.create(data)
    return response.ok('ok')
  }

  public async update({ params, response, request, bouncer }: HttpContextContract) {
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

  public async destroy({ response, params, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('invoke')
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound('Event Not Found')
    }

    await event.delete()
    return response.ok('ok')
  }
}
