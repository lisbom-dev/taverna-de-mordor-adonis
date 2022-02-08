import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  belongsTo,
  column,
  computed,
  BelongsTo,
  manyToMany,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Users from './User'
import User from './User'
import System from './System'
import Review from './Review'

export default class Board extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public systemId: number

  @column()
  public maxPlayers: number

  @column()
  public masterId: number

  @belongsTo(() => User, {
    foreignKey: 'masterId',
  })
  public master: BelongsTo<typeof User>

  @belongsTo(() => System, {
    foreignKey: 'systemId',
  })
  public system: BelongsTo<typeof System>

  @manyToMany(() => Review, {
    localKey: 'id',
    pivotForeignKey: 'board_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'review_id',
    pivotTable: 'board_reviews',
  })
  public reviews: ManyToMany<typeof Review>

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

  @beforeFind()
  @beforeFetch()
  public static preloadRelations(q: ModelQueryBuilderContract<typeof Board>) {
    q.preload('players')
    q.preload('master')
    q.preload('system')
    q.preload('reviews')
  }


  @computed()
  public get avaluation(): number {
    return this.reviews.length > 0
      ? this.reviews
          .map((review) => {
            return review.rating
          })
          .reduce((count, el) => {
            return parseFloat(count.toString()) + parseFloat(el.toString())
          }) / this.reviews.length
      : 0
  }

  public async getReviewByUser(user: User) {
    const review: Review = await this.reviews.builder.where('sender_id', user.id).first()
    return review
  }

  @column()
  public currentSection: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
