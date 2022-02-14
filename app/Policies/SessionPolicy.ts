import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import User from 'App/Models/User'

export default class SessionPolicy extends BasePolicy {
  public async create(user: User, board: Board) {
    if (user.id !== board.master.id) {
      return false
    }
    return true
  }
}
