import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Users from './User'
import User from './User'

export default class Board extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public system: string

  @column()
  public maxPlayers: number

  @column()
  public masterId: number

  @hasOne(() => User, {
    foreignKey: 'master_id',
  })
  public master: HasOne<typeof User>

  @manyToMany(() => Event, {
    localKey: 'id',
    pivotForeignKey: 'board_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'event_id',
    pivotTable: 'event_boards',
  })
  public events: ManyToMany<typeof Event>

  @manyToMany(() => Users, {
    localKey: 'id',
    pivotForeignKey: 'board_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'player_id',
    pivotTable: 'board_players',
  })
  public players: ManyToMany<typeof Users>

  @column()
  public currentSection: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
