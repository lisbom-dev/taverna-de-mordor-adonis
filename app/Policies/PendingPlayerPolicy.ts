import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import User from 'App/Models/User'

export default class PendingPlayerPolicy extends BasePolicy {
  public async create(user: User, board: Board) {
    const pendingPlayer = board.pendingPlayers.find((p) => p.id === user.id)
    const player = board.players.find((p) => p.id === user.id)
    if (user.id === board.masterId) {
      return false
    }
    if (!pendingPlayer && !player) {
      return true
    }
    return false
  }

  public async delete(user: User, board: Board) {
    const pendingPlayer = board.pendingPlayers.find((p) => p.id === user.id)
    if (user.id === board.masterId) {
      return true
    }
    if (pendingPlayer) {
      return true
    }

    return false
  }
}
