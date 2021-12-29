import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Board from 'App/Models/Board'

export default class BoardPolicy extends BasePolicy {
  public async create(user: User) {
    return user.isMaster
  }

  public async invoke(user: User, board: Board) {
    if (user.id === board.masterId || user.isAdm) {
      return true
    }
    return false
  }
}
