import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StoreValidator from 'App/Validators/Comment/StoreValidator'

export default class EventCommentsController {
  public async store({ request, params, response }: HttpContextContract) {
    const event = await Event.find(params.event_id)
    if (!event) {
      return response.notFound('Board not found!')
    }
    const data = await request.validate(StoreValidator)
    event.related('comment').create(data)
  }
}
