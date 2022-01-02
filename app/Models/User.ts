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
import Comment from './Comment'
import StarRating from './StarRating'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

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

  @manyToMany(() => Comment, {
    localKey: 'id',
    pivotForeignKey: 'master_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'comment_id',
    pivotTable: 'master_comments',
  })
  public comment: ManyToMany<typeof Comment>

  @manyToMany(() => StarRating, {
    localKey: 'id',
    pivotForeignKey: 'master_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'star_rating_id',
    pivotTable: 'master_star_ratings',
    serializeAs: null,
  })
  public starRating: ManyToMany<typeof StarRating>

  public async getRatingByUser(user: User) {
    if (user.isMaster) {
      const starRating: StarRating = await this.starRating.builder
        .where('sender_id', user.id)
        .first()
      return starRating
    }
  }

  @beforeFind()
  @beforeFetch()
  public static preloadRating(q: ModelQueryBuilderContract<typeof User>) {
    q.preload('starRating')
  }

  @computed()
  public get rateNumber(): number {
    return this.starRating.length
  }

  @computed()
  public get avaluation(): number {
    return (
      this.starRating
        .map((rating) => rating.number)
        .reduce((count, el) => {
          return count + el
        }) / this.rateNumber
    )
  }

  @column()
  public photoUrl?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
