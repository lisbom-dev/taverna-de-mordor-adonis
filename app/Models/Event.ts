import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  computed,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Board from './Board'
import Comment from './Comment'
import StarRating from './StarRating'
import User from './User'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public date: DateTime

  @column()
  public description: string

  @column()
  public maxBoards: number

  @computed()
  public get occupiedBoards(): number {
    return this.boards.length
  }

  @beforeFetch()
  @beforeFind()
  public static preloadBoards(q: ModelQueryBuilderContract<typeof Event>) {
    q.preload('boards')
  }

  @manyToMany(() => Comment, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'comment_id',
    pivotTable: 'event_comments',
  })
  public comment: ManyToMany<typeof Comment>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
    pivotTable: 'event_boards',
  })
  public boards: ManyToMany<typeof Board>

  @manyToMany(() => StarRating, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'star_rating_id',
    pivotTable: 'event_star_ratings',
    serializeAs: null,
  })
  public starRating: ManyToMany<typeof StarRating>

  @beforeFind()
  @beforeFetch()
  public static preloadRating(q: ModelQueryBuilderContract<typeof Event>) {
    q.preload('starRating')
  }

  public async getRatingByUser(user: User) {
    const starRating: StarRating = await this.starRating.builder.where('sender_id', user.id).first()
    return starRating
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

  @column()
  public theme: string

  @column()
  public location: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
