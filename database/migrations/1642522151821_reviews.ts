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

    this.schema.alterTable('star_ratings', (table) => {
      table
        .integer('review_id')
        .references('id')
        .inTable('reviews')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })

    this.schema.alterTable('comments', (table) => {
      table
        .integer('review_id')
        .references('id')
        .inTable('reviews')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
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
      const reviews = [...commentsMerged, ...ratingsMerged]

      await Promise.all(
        reviews.map(async (r) => {
          const review = await db
            .table('reviews')
            .insert({
              sender_id: r.sender_id | r.user_id,
              comment: r.message,
              rating: r.number,
              created_at: r.created_at,
              updated_at: r.updated_at,
            })
            .returning(['id'])

          if (
            r.message ===
            'O comentário referente a esta avaliação foi excluído após a atualização do sistema, por favor, altere-o'
          ) {
            await db.knexRawQuery(`UPDATE star_ratings SET review_id = ? WHERE id = ?`, [
              review[0].id,
              r.id,
            ])
          } else {
            await db.knexRawQuery(`UPDATE comments SET review_id = ? WHERE id = ?`, [
              review[0].id,
              r.id,
            ])
          }
        })
      )
    })
  }
  public async down() {
    this.schema.alterTable('comments', (table) => {
      table.dropColumn('review_id')
    })
    this.schema.alterTable('star_ratings', (table) => {
      table.dropColumn('review_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
