import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/StarRating/StoreValidator'

export default class MasterStarRatingsController {
  public async store({ request, params, response }: HttpContextContract) {
    const user = await User.find(params.user_id)
    if (!user) {
      return response.notFound('Master not found!')
    }
    if (!user.isMaster) {
      throw new BadRequestException('User is not a master!')
    }
    const data = await request.validate(StoreValidator)
    await user.related('starRating').create(data)
  }
}
