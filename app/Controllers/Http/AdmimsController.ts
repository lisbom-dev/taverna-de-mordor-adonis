import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class AdmimsController {
  public async store(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)
    if (!user) {
      return ctx.response.notFound('User not found')
    }
    if (user.isAdm) {
      throw new BadRequestException('User already admin!')
    }
    user.isAdm = true
    await user.save()
    return ctx.response.redirect('/users')
  }
}
