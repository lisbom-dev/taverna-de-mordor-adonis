import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Event from './Event'
import Board from './Board'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'comment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'master_id',
  })
  public master: ManyToMany<typeof User>

  @manyToMany(() => Event, {
    localKey: 'id',
    pivotForeignKey: 'comment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'event_id',
  })
  public event: ManyToMany<typeof Event>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'comment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
  })
  public board: ManyToMany<typeof Board>

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
