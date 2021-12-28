import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class EventPolicy extends BasePolicy {
  public async invoke(user: User) {
    return user.isAdm
  }
}
