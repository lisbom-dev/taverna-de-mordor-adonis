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
      const masterComments = await db.from('master_comments')
      const masterStarRatings = await db.from('master_star_ratings')

      const masterReviews = masterComments.concat(masterStarRatings)

      await Promise.all(
        masterReviews.map((review) => {
          return db.table('master_reviews').insert({
            master_id: review.master_id,
            review_id: review.comment_id | review.star_rating_id,
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
