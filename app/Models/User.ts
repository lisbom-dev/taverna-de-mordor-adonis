import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

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
  })
  public comment: ManyToMany<typeof Comment>

  @column()
  public photoUrl?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
