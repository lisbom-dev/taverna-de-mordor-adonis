import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StoreValidator from 'App/Validators/StarRating/StoreValidator'

export default class EventStarRatingsController {
  public async store({ request, params, response }: HttpContextContract) {
    const event = await Event.find(params.id)
    if (!event) {
      return response.notFound('Event not found!')
    }
    const data = await request.validate(StoreValidator)
    await event.related('starRating').create(data)
  }

  public async show({ auth, params, response }: HttpContextContract) {
    const event = await Event.find(params.event_id)

    if (!event) {
      return response.notFound('Event not found!')
    }

    const starRating = await event
      .related('starRating')
      .query()
      .where('sender_id', auth.user!.id)
      .first()

    if (!starRating) {
      return
    }

    return starRating
  }
}
