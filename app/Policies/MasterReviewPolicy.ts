import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class MasterReviewPolicy extends BasePolicy {
  public async create(user: User, master: User) {
    const masterReview = master.reviews.find((r) => r.senderId === user.id)
    if (masterReview) {
      return false
    }
    if (user.id === master.id) {
      return false
    }
    return true
  }
}
