import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Board from './Board'
import Comment from './Comment'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public date: DateTime

  @column()
  public description: string

  @column()
  public maxBoards: number

  @manyToMany(() => Comment, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'comment_id',
  })
  public comment: ManyToMany<typeof Comment>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
  })
  public events: ManyToMany<typeof Board>

  @column()
  public location: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
