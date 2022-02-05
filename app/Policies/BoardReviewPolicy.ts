import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import User from 'App/Models/User'

export default class BoardReviewPolicy extends BasePolicy {
  public async create(user: User, board: Board) {
    const boardReview = board.reviews.find((r) => r.senderId === user.id)
    if (boardReview) {
      return false
    }
    return true
  }
}
