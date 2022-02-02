import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  belongsTo,
  BelongsTo,
  column,
  manyToMany,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Board from './Board'
import Event from './Event'
import User from './User'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rating: number

  @column()
  public comment: string

  @column()
  public senderId: number

  @belongsTo(() => User, {
    foreignKey: 'senderId',
  })
  public sender: BelongsTo<typeof User>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'review_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
    pivotTable: 'board_reviews',
  })
  public board: ManyToMany<typeof Board>

  @manyToMany(() => Event, {
    localKey: 'id',
    pivotForeignKey: 'review_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'event_id',
    pivotTable: 'event_reviews',
  })
  public event: ManyToMany<typeof Event>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'review_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'master_id',
    pivotTable: 'master_reviews',
  })
  public master: ManyToMany<typeof User>

  @beforeFetch()
  @beforeFind()
  public static preloadRelations(q: ModelQueryBuilderContract<typeof Review>) {
    q.preload('sender')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
