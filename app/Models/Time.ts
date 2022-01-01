import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EventBoard from './EventBoard'

export default class Time extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public startHour: number

  @column()
  public endHour: number

  @column()
  public eventBoardId: number

  @belongsTo(() => EventBoard)
  public eventBoard: BelongsTo<typeof EventBoard>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
