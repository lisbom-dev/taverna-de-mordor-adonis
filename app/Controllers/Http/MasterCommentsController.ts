import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Comment/StoreValidator'

export default class MasterCommentsController {
  public async store({ response, request, params }: HttpContextContract) {
    const user = await User.find(params.user_id)
    if (!user) {
      return response.notFound('Board not found!')
    }
    if (!user.isMaster) {
      return response.badRequest('User is not a master')
    }
    const data = await request.validate(StoreValidator)
    user.related('comment').create(data)
  }
}
