import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
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

  public async show({ response, params, auth, bouncer }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    if (user.isMaster) {
      await user.load('reviews')
    }
    if (auth.user?.isMaster) {
      var board = await Board.findBy('master_id', auth.user!.id)
      board?.load('players')
      await bouncer.with('UserPolicy').authorize('view', user, board)
    } else {
      await bouncer.with('UserPolicy').authorize('view', user, null)
    }

    return user
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    return response.ok('ok')
  }
}
