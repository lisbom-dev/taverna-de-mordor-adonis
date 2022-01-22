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
      const mergedCommentsIndex = new Map()

      for (const masterComment of masterComments) {
        mergedCommentsIndex.set(masterComment.id, masterComment)
      }

      const merged = masterStarRatings.map((rating) => {
        return Object.assign(rating, mergedCommentsIndex.get(rating.id) || {})
      })

      const masterReviews = merged.filter((m) => Object.keys(m).length === 6)

      await Promise.all(
        masterReviews.map((review) => {
          return db.table('master_reviews').insert({
            master_id: review.master_id,
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
