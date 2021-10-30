import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class MestresController {
  public async store(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)
    if (!user) {
      return ctx.response.notFound('User not found')
    }
    if (user.isMaster) {
      return ctx.response.badRequest('User aready an Master')
    }
    user.isMaster = true
    await user.save()
    return ctx.response.redirect('/users')
  }
}
