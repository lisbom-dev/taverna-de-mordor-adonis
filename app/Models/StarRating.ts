import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import User from './User'
import Board from './Board'

export default class StarRating extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public sender_id: number

  @hasOne(() => User, {
    foreignKey: 'sender_id',
  })
  public sender: HasOne<typeof User>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'star_rating_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
    pivotTable: 'board_star_rating',
  })
  public board: ManyToMany<typeof Board>

  @manyToMany(() => Event, {
    localKey: 'id',
    pivotForeignKey: 'star_rating_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'event_id',
    pivotTable: 'event_star_rating',
  })
  public event: ManyToMany<typeof Event>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'star_rating_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'master_id',
    pivotTable: 'master_star_rating',
  })
  public master: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
