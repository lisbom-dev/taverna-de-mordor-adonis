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
}
