import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Schemas/Notification'
import UpdateValidator from 'App/Validators/Notification/UpdateValidator'
import INotification from 'Contracts/interfaces/INotification'

export default class NotificationsController {
  public async index({ auth, request }: HttpContextContract) {
    const { limit, offset = 1 } = request.qs()
    const notifications: INotification[] = []
    if (limit) {
      const a = await Notification.find({ ownerId: auth.user!.id, read: false })
        .limit(parseInt(limit, 10))
        .skip(parseInt(offset, 10))
        .sort({ _id: -1 })
      notifications.push(...(a as any[]))
    } else {
      const a = await Notification.find({ ownerId: auth.user!.id, read: false }).sort({ _id: -1 })
      notifications.push(...(a as any[]))
    }
    return notifications.reverse()
  }

  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const updated = await Notification.findByIdAndUpdate(params.id, data)
    return updated
  }
}
