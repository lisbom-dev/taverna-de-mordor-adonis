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

  public async show({ response, params, auth }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
    }
    if (auth.user) {
      const authReview = user.reviews.find((r) => r.sender.id === auth.user!.id)
      if (auth.user.isMaster) {
        const boards = await Board.query().where('master_id', auth.user.id)
        const masterBoardsEvaluation =
          boards.length > 0
            ? boards
                .map((b) => {
                  return b.avaluation
                })
                .reduce((count, el) => {
                  return parseFloat(count.toString()) + parseFloat(el.toString())
                }) / boards.length
            : 0
        return response.ok({ user, authReview, masterBoardsEvaluation })
      }
      return response.ok({ user, authReview })
    }
    return response.ok({ user })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    return response.ok('ok')
  }
}
