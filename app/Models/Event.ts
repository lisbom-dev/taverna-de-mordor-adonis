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
import User from './User'
import Review from './Review'

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

  @column()
  public time: number

  @computed()
  public get occupiedBoards(): number {
    return this.boards.length
  }

  @manyToMany(() => Review, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'review_id',
    pivotTable: 'event_reviews',
  })
  public reviews: ManyToMany<typeof Review>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'event_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
    pivotTable: 'event_boards',
  })
  public boards: ManyToMany<typeof Board>

  @beforeFind()
  @beforeFetch()
  public static preloadRelations(q: ModelQueryBuilderContract<typeof Event>) {
    q.preload('reviews')
    q.preload('boards')
  }

  public async getReviewByUser(user: User) {
    const reviews: Review = await this.reviews.builder.where('sender_id', user.id).first()
    return reviews
  }

  @computed()
  public get avaluation(): number {
    return this.reviews.length > 0
      ? this.reviews
          .map((review) => review.rating)
          .reduce((count, el) => {
            return parseFloat(count.toString()) + parseFloat(el.toString())
          }) / this.reviews.length
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
