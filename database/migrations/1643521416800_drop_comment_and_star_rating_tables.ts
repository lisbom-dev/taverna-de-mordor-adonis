import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropCommentAndStarRatingTables extends BaseSchema {
  public async up() {
    this.schema.dropTable('comments')
    this.schema.dropTable('star_ratings')
  }

  public async down() {
    this.schema.createTable('comments', (table) => {
      table.increments('id').primary()
      table.string('message').notNullable()
      table
        .integer('user_id')
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

    this.schema.createTable('star_ratings', (table) => {
      table.increments('id')
      table.integer('number').notNullable()
      table
        .integer('sender_id')
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
  }
}
