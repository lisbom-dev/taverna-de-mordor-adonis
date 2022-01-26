import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MasterReviews extends BaseSchema {
  protected tableName = 'master_reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('master_id')
        .notNullable()
        .references('id')
        .inTable('users')
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
      const masterComments = await db
        .from('master_comments')
        .innerJoin('comments', 'comments.id', '=', 'master_comments.comment_id')
      const masterStarRatings = await db
        .from('master_star_ratings')
        .innerJoin('star_ratings', 'star_ratings.id', '=', 'master_star_ratings.star_rating_id')
      const masterReviews = [...masterComments, ...masterStarRatings]

      await Promise.all(
        masterReviews.map((review) => {
          return db.table('master_reviews').insert({
            master_id: review.master_id,
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
