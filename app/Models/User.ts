import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
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
    pivotTable: 'master_star_rating',
  })
  public starRating: ManyToMany<typeof StarRating>

  @column()
  public photoUrl?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
