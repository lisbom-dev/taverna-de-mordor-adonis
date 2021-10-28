import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
