import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Schemas/Notification'

export default class NotificationsController {
  public async index({ auth }: HttpContextContract) {
    const notifications = await Notification.find({ ownerId: auth.user!.id })
    return notifications
  }
}
