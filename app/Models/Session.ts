import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import EventBoard from './EventBoard'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventBoardId: number

  @belongsTo(() => EventBoard, {
    foreignKey: 'eventBoardId',
  })
  public eventBoard: BelongsTo<typeof EventBoard>

  @column()
  public date: DateTime

  @column()
  public time: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
