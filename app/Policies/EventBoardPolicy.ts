import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Board from 'App/Models/Board'
import EventBoard from 'App/Models/EventBoard'
import User from 'App/Models/User'

export default class EventBoardPolicy extends BasePolicy {
  public async invoke(user: User, boardId: number, eventId: number) {
    const eventBoard = await (
      await EventBoard.query()
    ).find((eb) => eb.eventId === eventId && eb.boardId === boardId)

    const board = await Board.find(boardId)

    if (board!.masterId !== user.id && eventBoard) {
      return false
    }

    return true
  }
}
