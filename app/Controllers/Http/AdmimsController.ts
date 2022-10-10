import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class AdmimsController {
  public async store({ response, params }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    if (user.isAdm) {
      throw new BadRequestException('User is already admin!')
    }
    user.isAdm = true
    await user.save()
    return response.ok('ok')
  }
}
