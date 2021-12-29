import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'

export default class CommentPolicy extends BasePolicy {
  public async update(user: User, comment: Comment) {
    return user.id === comment.sender.id
  }
  public async delete(user: User, comment: Comment) {
    return user.id === comment.sender.id || user.isAdm || user.isMaster
  }
}
