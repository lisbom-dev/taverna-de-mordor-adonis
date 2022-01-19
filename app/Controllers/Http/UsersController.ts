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

  public async show({ response, view, params, auth, bouncer }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
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

    return view.render('users/index', {
      user,
    })
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    session.flash('success', ['Cadastrado(a) com sucesso!'])
    return response.redirect('/')
  }
}
