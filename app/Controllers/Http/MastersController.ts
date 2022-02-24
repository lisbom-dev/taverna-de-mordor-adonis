import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class MastersController {
  public async store({ params, response, session }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
    }
    if (user.isMaster) {
      throw new BadRequestException('User already a master!')
    }
    user.isMaster = true
    await user.save()
    session.flash('success', ['O usuário ' + user.name + ' Agora é um mestre!'])
    return response.redirect(`/users/${user.id}`)
  }

  public async delete({ params, response, session }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound('User not found')
    }
    if (!user.isMaster) {
      throw new BadRequestException('User is not a master!')
    }
    user.isMaster = false
    await user.save()
    session.flash('success', ['O usuário ' + user.name + ' Agora é um usuário comum!'])
    return response.redirect(`/users/${user.id}`)
  }
}
