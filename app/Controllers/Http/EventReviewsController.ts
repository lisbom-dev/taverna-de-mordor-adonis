import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StoreValidator from 'App/Validators/Review/StoreValidator'

export default class EventReviewsController {
  public async store({ request, params, response }: HttpContextContract) {
    const event = await Event.find(params.event_id)
    if (!event) {
      return response.notFound('Event not found!')
    }
    const data = await request.validate(StoreValidator)
    await event.related('reviews').create(data)
  }
}
