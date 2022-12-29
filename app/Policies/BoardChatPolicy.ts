import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import User from 'App/Models/User'

export default class BoardChatPolicy extends BasePolicy {
  public async view(user: User, board: Board) {
    const exists = await board
      .related('players')
      .query()
      .where('board_players.player_id', user.id)
      .first()
    if (!!exists || board.masterId === user.id) {
      return true
    }
  }
}
