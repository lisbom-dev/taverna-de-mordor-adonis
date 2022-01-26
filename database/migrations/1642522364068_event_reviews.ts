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
      const eventComments = await db
        .from('event_comments')
        .innerJoin('comments', 'comments.id', '=', 'event_comments.comment_id')
      const eventStarRatings = await db
        .from('event_star_ratings')
        .innerJoin('star_ratings', 'star_ratings.id', '=', 'event_star_ratings.star_rating_id')
      const eventReviews = [...eventComments, ...eventStarRatings]

      await Promise.all(
        eventReviews.map(async (review) => {
          return db.table('event_reviews').insert({
            event_id: review.event_id,
            review_id: review.review_id,
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
