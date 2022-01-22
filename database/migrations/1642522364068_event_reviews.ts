import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventReviews extends BaseSchema {
  protected tableName = 'event_reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('event_id')
        .notNullable()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('review_id')
        .notNullable()
        .references('id')
        .inTable('reviews')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      const eventComments = await db.from('event_comments')
      const eventStarRatings = await db.from('event_star_ratings')
      const mergedCommentsIndex = new Map()

      for (const eventComment of eventComments) {
        mergedCommentsIndex.set(eventComment.id, eventComment)
      }

      const merged = eventStarRatings.map((rating) => {
        return Object.assign(rating, mergedCommentsIndex.get(rating.id) || {})
      })

      const eventReviews = merged.filter((m) => Object.keys(m).length === 6)

      await Promise.all(
        eventReviews.map((review) => {
          return db.table('event_reviews').insert({
            event_id: review.event_id,
            review_id: review.comment_id,
            created_at: review.created_at,
            updated_at: review.updated_at,
          })
        })
      )
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
