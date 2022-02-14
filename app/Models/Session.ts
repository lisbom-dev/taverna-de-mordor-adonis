import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Board from './Board'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public boardId: number

  @belongsTo(() => Board, {
    foreignKey: 'boardId',
  })
  public board: BelongsTo<typeof Board>

  @column()
  public date: DateTime

  @column()
  public time: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
