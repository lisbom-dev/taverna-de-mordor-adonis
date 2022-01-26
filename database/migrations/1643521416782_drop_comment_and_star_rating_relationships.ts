import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropCommentAndStarRatingRelationships extends BaseSchema {
  public async up() {
    this.schema.dropTable('event_comments')
    this.schema.dropTable('board_comments')
    this.schema.dropTable('master_comments')
    this.schema.dropTable('event_star_ratings')
    this.schema.dropTable('board_star_ratings')
    this.schema.dropTable('master_star_ratings')
  }

  public async down() {
    this.schema.createTable('event_comments', (table) => {
      table.increments('id')
      table
        .integer('event_id')
        .notNullable()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('comment_id')
        .notNullable()
        .references('id')
        .inTable('comments')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.createTable('board_comments', (table) => {
      table.increments('id')
      table
        .integer('board_id')
        .notNullable()
        .references('id')
        .inTable('boards')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('comment_id')
        .notNullable()
        .references('id')
        .inTable('comments')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.createTable('master_comments', (table) => {
      table.increments('id')
      table
        .integer('master_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('comment_id')
        .notNullable()
        .references('id')
        .inTable('comments')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.createTable('event_star_ratings', (table) => {
      table.increments('id')
      table
        .integer('event_id')
        .notNullable()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('star_rating_id')
        .notNullable()
        .references('id')
        .inTable('star_ratings')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.createTable('board_star_ratings', (table) => {
      table.increments('id')
      table
        .integer('board_id')
        .notNullable()
        .references('id')
        .inTable('boards')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('star_rating_id')
        .notNullable()
        .references('id')
        .inTable('star_ratings')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.createTable('master_star_ratings', (table) => {
      table.increments('id')
      table
        .integer('master_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('star_rating_id')
        .notNullable()
        .references('id')
        .inTable('star_ratings')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
}
