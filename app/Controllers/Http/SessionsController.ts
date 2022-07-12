import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.ok('ok')
  }

  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password, { expiresIn: '7days' })

    const { user } = token

    return { token, user }
  }
}
