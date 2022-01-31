import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  manyToMany,
  ManyToMany,
  beforeFind,
  beforeFetch,
  ModelQueryBuilderContract,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Review from './Review'
import Board from './Board'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public description: string

  @column()
  public rememberMeToken?: string

  @column()
  public isMaster: boolean

  @column()
  public isAdm: boolean

  @column()
  public cellPhoneNumber: string

  @column()
  public instagramRef?: string

  @manyToMany(() => Review, {
    localKey: 'id',
    pivotForeignKey: 'master_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'review_id',
    pivotTable: 'master_reviews',
  })
  public reviews: ManyToMany<typeof Review>

  @manyToMany(() => Board, {
    localKey: 'id',
    pivotForeignKey: 'player_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'board_id',
    pivotTable: 'board_pending_players',
    pivotColumns: ['character_name'],
  })
  public boards: ManyToMany<typeof Board>

  public async getReviewByUser(user: User) {
    if (user.isMaster) {
      const reviews: Review = await this.reviews.builder.where('sender_id', user.id).first()
      return reviews
    }
  }

  @beforeFind()
  @beforeFetch()
  public static preloadRelations(q: ModelQueryBuilderContract<typeof User>) {
    q.preload('reviews')
  }

  @computed()
  public get reviewNumber(): number {
    return this.reviews.length
  }

  @computed()
  public get avaluation(): number {
    return this.reviews.length > 0
      ? this.reviews
          .map((review) => review.rating)
          .reduce((count, el) => {
            return count + el
          }) / this.reviewNumber
      : 0
  }

  @column()
  public photoUrl?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
