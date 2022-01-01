import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Board from './Board'
import Time from './Time'

export default class EventBoard extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column()
  public boardId: number

  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>

  @belongsTo(() => Board)
  public board: BelongsTo<typeof Board>

  @hasMany(() => Time)
  public times: HasMany<typeof Time>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
