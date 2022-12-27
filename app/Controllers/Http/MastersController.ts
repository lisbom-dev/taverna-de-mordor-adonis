import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class MastersController {
  public async store({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    if (user.isMaster) {
      throw new BadRequestException('User already a master!')
    }
    user.isMaster = true
    await user.save()
    return response.ok('ok')
  }
}
