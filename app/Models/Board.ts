import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  computed,
  HasOne,
  hasOne,
  manyToMany,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Users from './User'
import User from './User'
import Comment from './Comment'
import StarRating from './StarRating'

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

  @manyToMany(() => Comment, {
    localKey: 'id',
    pivotForeignKey: 'board_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'comment_id',
    pivotTable: 'board_comments',
  })
  public comment: ManyToMany<typeof Comment>

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

  @manyToMany(() => StarRating, {
    localKey: 'id',
    pivotForeignKey: 'board_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'star_rating_id',
    pivotTable: 'board_star_ratings',
    serializeAs: null,
  })
  public starRating: ManyToMany<typeof StarRating>

  @beforeFind()
  @beforeFetch()
  public static preloadRating(q: ModelQueryBuilderContract<typeof Board>) {
    q.preload('starRating')
  }

  @computed()
  public get rateNumber(): number {
    return this.starRating.length
  }

  @computed()
  public get avaluation(): number {
    return this.starRating.length > 0
      ? this.starRating
          .map((rating) => rating.number)
          .reduce((count, el) => {
            return count + el
          }) / this.rateNumber
      : 0
  }

  public async getRatingByUser(user: User) {
    const starRating: StarRating = await this.starRating.builder.where('sender_id', user.id).first()
    return starRating
  }

  @column()
  public currentSection: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
