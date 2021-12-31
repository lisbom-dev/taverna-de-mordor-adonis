import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    const users = await User.query()
    return ctx.view.render('users/list', {
      users,
    })
  } // listar todos os usuários
  public async show(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)
    if (!user) {
      return ctx.response.notFound('User not found')
    }
    if (user.isMaster) {
      await user.load('comment')
    }

    return ctx.view.render('users/index', {
      user,
    })
  } // exibir um usuário específico
}
