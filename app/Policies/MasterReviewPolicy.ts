import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class MasterReviewPolicy extends BasePolicy {
  public async create(user: User, master: User) {
    const masterReview = user.reviews.find((r) => r.senderId === user.id)
    if (masterReview) {
      return false
    }
    return true
  }
}
