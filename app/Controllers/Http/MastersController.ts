import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class MastersController {
  public async store(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)
    if (!user) {
      return ctx.response.notFound('User not found')
    }
    if (user.isMaster) {
      throw new BadRequestException('User already a master!')
    }
    user.isMaster = true
    await user.save()
    ctx.session.flash('success', ['O usuário ' + user.name + ' Agora é um mestre!'])
    return ctx.response.redirect('/users')
  }
}
