import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Board from './Board'
import Session from './Session'

export default class EventBoard extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column()
  public boardId: number

  @belongsTo(() => Event, { foreignKey: 'eventId' })
  public event: BelongsTo<typeof Event>

  @belongsTo(() => Board, { foreignKey: 'boardId' })
  public board: BelongsTo<typeof Board>

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  @beforeFind()
  @beforeFetch()
  public static preloadRelations(q: ModelQueryBuilderContract<typeof EventBoard>) {
    q.preload('sessions')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
