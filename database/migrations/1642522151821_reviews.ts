import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reviews extends BaseSchema {
  protected tableName = 'reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rating').notNullable()
      table.text('comment').notNullable()
      table
        .integer('sender_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      const comments = await db.from('comments')
      const starRatings = await db.from('star_ratings')
      const mergedCommentsIndex = new Map()

      for (const comment of comments) {
        mergedCommentsIndex.set(comment.id, comment)
      }

      const merged = starRatings.map((rating) => {
        return Object.assign(rating, mergedCommentsIndex.get(rating.id) || {})
      })

      const reviews = merged.filter((m) => Object.keys(m).length === 7)

      await Promise.all(
        reviews.map((review) => {
          return db.table('reviews').insert({
            sender_id: review.sender_id,
            comment: review.message,
            rating: review.number,
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
