import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Board from 'App/Models/Board'

export default class BoardPolicy extends BasePolicy {
  public async viewList(user: User) {}
  public async view(user: User, board: Board) {}

  public async create(user: User) {
    return user.isMaster
  }

  public async invoke(user: User) {
    return user.isMaster || user.isAdm
  }
}
