import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import StarRating from 'App/Models/StarRating'
import User from 'App/Models/User'

export default class StarPolicy extends BasePolicy {
  public async update(user: User, starRating: StarRating) {
    return user.id === starRating.sender.id
  }

  public async delete(user: User, starRating: StarRating) {
    return user.id === starRating.sender.id || user.isAdm
  }
}
