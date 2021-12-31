import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Event from './Event'
import Board from './Board'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public senderId: number

  @hasOne(() => User, {
    foreignKey: 'sender_id',
  })
  public sender: HasOne<typeof User>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'comment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'master_id',
    pivotTable: 'master_comments',
  })
  public master: ManyToMany<typeof User>

  @manyToMany(() => Event, {
    localKey: 'id',
    pivotForeignKey: 'comment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'event_id',
    pivotTable: 'event_comments',
  })
  public event: ManyToMany<typeof Event>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'comment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
    pivotTable: 'board_comments',
  })
  public board: ManyToMany<typeof Board>

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
