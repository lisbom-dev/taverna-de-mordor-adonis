import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async index({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('invoke')
    const { page = '1' } = request.qs()
    const users = await User.query().paginate(parseInt(page, 10), 10)
    return view.render('users/list', {
      users,
      page,
    })
  }

  public async show({ response, view, params, auth }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
    }
    const authReview = user.reviews.find((r) => r.sender.id === auth.user?.id)

    if (user.isMaster) {
      const boards = await Board.query().where('master_id', user.id)
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
      return view.render('users/index', { user, auth, masterBoardsEvaluation, authReview })
    }
    return view.render('users/index', { user })
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    session.flash('success', ['Cadastrado(a) com sucesso!'])
    return response.redirect('/')
  }
}
