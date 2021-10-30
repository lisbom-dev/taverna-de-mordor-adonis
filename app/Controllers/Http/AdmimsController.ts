import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdmimsController {
  public async store(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)
    if (!user) {
      return ctx.response.notFound('User not found')
    }
    if (user.isAdm) {
      return ctx.response.badRequest('User aready an Adm')
    }
    user.isAdm = true
    await user.save()
    return ctx.response.redirect('/users')
  }
}
