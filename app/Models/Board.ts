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
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Users from './User'
import User from './User'
import System from './System'
import Review from './Review'
import Session from './Session'

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
    q.preload('sessions')
  }

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

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

  @computed()
  public get nextSession() {
    const session = this.sessions
      .filter(
        (s) =>
          new Date(s.date.toString().replace(/-/g, '/')).getTime() + s.time > new Date().getTime()
      )
      .sort((a, b) => {
        if (
          new Date(a.date.toString().replace(/-/g, '/')).getTime() + a.time <
          new Date(b.date.toString().replace(/-/g, '/')).getTime() + b.time
        ) {
          return -1
        } else {
          return 0
        }
      })[1]

    if (session) {
      const date = new Date(session.date.toString().replace(/-/g, '/'))
        .toJSON()
        .substring(0, 10)
        .replace(/-/g, '/')
        .split('/')
        .reverse()
        .toString()
        .replace(/,/g, '/')

      const time = new Date(session.time * 1000).toISOString().substring(11, 16)
      const timeWithPeriod = parseInt(time.substring(0, 2), 10) >= 12 ? time + ' PM' : time + ' AM'
      return date + ' - ' + timeWithPeriod
    }

    return 'Não definida'
  }

  @computed()
  public get currentSession() {
    return this.sessions.length > 0
      ? this.sessions
          .filter(
            (s) =>
              new Date(s.date.toString().replace(/-/g, '/')).getTime() + s.time >
              new Date().getTime()
          )
          .sort((a, b) => {
            if (
              new Date(a.date.toString().replace(/-/g, '/')).getTime() + a.time <
              new Date(b.date.toString().replace(/-/g, '/')).getTime() + b.time
            ) {
              return -1
            } else {
              return 0
            }
          })[0].id
      : 0
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
