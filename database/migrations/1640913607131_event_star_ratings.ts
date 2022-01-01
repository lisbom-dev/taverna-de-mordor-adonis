import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventStarRatings extends BaseSchema {
  protected tableName = 'event_star_ratings'

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

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
