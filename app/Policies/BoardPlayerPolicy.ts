import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import User from 'App/Models/User'

export default class BoardPlayerPolicy extends BasePolicy {
  public async create(user: User, board: Board, player: User) {
    const boardPlayer = board.players.find((p) => p.id === player.id)
    if (user.id !== board.masterId) {
      return false
    }
    if (!boardPlayer) {
      return true
    }
    return false
  }

  public async delete(user: User, board: Board, player: User) {
    const boardPlayer = board.players.find((p) => p.id === player.id)
    if (user.id !== board.masterId) {
      return false
    }
    if (boardPlayer) {
      return true
    }

    return false
  }
}
