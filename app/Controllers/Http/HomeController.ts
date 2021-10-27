import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ response }: HttpContextContract) {
    response.redirect('/events')
  }
}
