import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async invoke(user: User) {
    return user.isAdm
  }

  public async view(userSeeing: User, userSeen: User, board: Board | null) {
    if (userSeeing.isAdm) {
      return true
    }
    if (userSeen.isMaster) {
      return true
    }
    if (userSeeing.isMaster && board) {
      var player = board.players.find((b) => b.id === userSeen.id)
      if (!player) {
        return false
      }
      return true
    }
    if (userSeeing.id === userSeen.id) {
      return true
    }
    return false
  }
}
