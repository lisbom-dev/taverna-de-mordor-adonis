import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BoardReviews extends BaseSchema {
  protected tableName = 'board_reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('board_id')
        .notNullable()
        .references('id')
        .inTable('boards')
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
      const boardComments = await db.from('board_comments')
      const boardStarRatings = await db.from('board_star_ratings')

      const boardReviews = boardComments.concat(boardStarRatings)

      await Promise.all(
        boardReviews.map((review) => {
          return db.table('board_reviews').insert({
            board_id: review.board_id,
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
