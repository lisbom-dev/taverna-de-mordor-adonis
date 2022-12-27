import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Review/StoreValidator'

export default class MasterReviewsController {
  public async store({ request, params, response, bouncer }: HttpContextContract) {
    const user = await User.find(params.user_id)
    if (!user) {
      return response.notFound({ message: 'User not found!' })
    }
    if (!user.isMaster) {
      throw new BadRequestException('User is not a master!')
    }
    await bouncer.with('MasterReviewPolicy').authorize('create', user)
    const data = await request.validate(StoreValidator)
    await user.related('reviews').create(data)
    return response.ok({ message: 'ok' })
  }
}
