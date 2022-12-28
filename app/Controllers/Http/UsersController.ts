import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('invoke')
    const { page = '1' } = request.qs()
    const users = await User.query().paginate(parseInt(page, 10), 10)
    return {
      users,
      page,
    }
  }

  public async show({ response, params, auth }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    const authReview = user.reviews.find((r) => r.sender.id === auth.user?.id)

    return response.ok({ user, authReview })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    return response.ok('ok')
  }
}
