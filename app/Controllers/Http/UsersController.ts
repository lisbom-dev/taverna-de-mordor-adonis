import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async index({ view, request }: HttpContextContract) {
    const { page = '1' } = request.qs()
    const users = await User.query().paginate(parseInt(page, 10), 10)
    return view.render('users/list', {
      users,
      page,
    })
  }

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
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    await auth.login(user)
    return response.redirect('/')
  }
}
