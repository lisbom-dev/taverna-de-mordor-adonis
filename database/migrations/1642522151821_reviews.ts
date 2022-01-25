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

      const commentsMerged = comments.map((c) => Object.assign(c, { number: 1 }))
      const ratingsMerged = starRatings.map((r) =>
        Object.assign(r, {
          message:
            'O comentário referente a esta avaliação foi excluído após a atualização do sistema, por favor, altere-o',
        })
      )
      const reviews = commentsMerged.concat(ratingsMerged)
      await Promise.all(
        reviews.map((review) => {
          return db.table('reviews').insert({
            sender_id: review.sender_id | review.user_id,
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
