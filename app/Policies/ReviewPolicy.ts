import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Review from 'App/Models/Review'
import User from 'App/Models/User'

export default class ReviewPolicy extends BasePolicy {
  public async update(user: User, review: Review) {
    return user.id === review.sender.id
  }
  public async delete(user: User, review: Review) {
    return user.id === review.sender.id || user.isAdm
  }
}
