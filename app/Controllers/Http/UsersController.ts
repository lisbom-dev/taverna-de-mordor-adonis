import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.query()
    return view.render('users/list', {
      users,
    })
  } // listar todos os usuários
  public async show({ response, view, params }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
    }
    if (user.isMaster) {
      await user.load('comment')
    }

    return view.render('users/index', {
      user,
    })
  } // exibir um usuário específico

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    session.flash('success', ['Cadastrado(a) com sucesso!'])
    return response.redirect('/')
  }
}
